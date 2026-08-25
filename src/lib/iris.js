/**
 * Iris Analytics 服务端集成
 * https://github.com/zhiyumc/Iris-Analytics
 *
 * 两种接入方式：
 * 1. 首页浏览器统计 —— 在 index.html 注入 tracker.min.js（需配置环境变量 IRIS_TRACKER_URL）
 * 2. RSS 路由抓取统计 —— 服务端直接写 Workers Analytics Engine 数据点（无需浏览器 JS）
 *
 * 数据点 blob 布局与 Iris functions/send.js 完全一致：
 *   blob1 website | blob2 host | blob3 path | blob4 referrer | blob5 osName
 *   blob6 browserName | blob7 areaCode | blob8 UA | blob9 deviceType
 *   blob10 vendor | blob11 model | blob12 ip
 *   double1 visitor | double2 visit
 * 数据集必须与 Iris 部署一致（AnalyticsDataset），才能在同一仪表板查看。
 */

// website-id 约定：首页用 rssworker，RSS 抓取用 rssworker-feeds，在 Iris 仪表板中分别查看
const FEEDS_SITE_ID = 'rssworker-feeds';

// 常见 RSS 阅读器 / 爬虫 UA 识别（browserName）
const FEED_READERS = [
	[/\bfolo\b/i, 'Folo'],
	[/\bfollow\b/i, 'Follow'],
	[/Feedly/i, 'Feedly'],
	[/Inoreader/i, 'Inoreader'],
	[/NetNewsWire/i, 'NetNewsWire'],
	[/FreshRSS/i, 'FreshRSS'],
	[/Miniflux/i, 'Miniflux'],
	[/Tiny Tiny RSS|TTRSS/i, 'Tiny Tiny RSS'],
	[/FeedFetcher/i, 'FeedFetcher'],
	[/Feedbin/i, 'Feedbin'],
	[/NewsBlur/i, 'NewsBlur'],
	[/RSSOwl/i, 'RSSOwl'],
	[/FeedDemon/i, 'FeedDemon'],
	[/Thunderbird/i, 'Thunderbird'],
	[/python-requests|urllib|aiohttp|Python-urllib/i, 'Python'],
	[/curl\//i, 'curl'],
	[/Wget/i, 'Wget'],
	[/node-fetch|axios|undici|got\//i, 'Node.js'],
	[/Go-http-client/i, 'Go'],
	[/Java\//i, 'Java'],
	[/HTTrack/i, 'HTTrack'],
];

// 常规浏览器（直接点开 RSS 链接的场景，不算阅读器）
const BROWSERS = [
	[/Edg\//i, 'Edge'],
	[/OPR\/|Opera/i, 'Opera'],
	[/Firefox\//i, 'Firefox'],
	[/Chrome\//i, 'Chrome'],
	[/Safari\//i, 'Safari'],
];

const OS_RULES = [
	[/Windows NT 10/, 'Windows'],
	[/Windows/, 'Windows'],
	[/Mac OS X|Macintosh/, 'macOS'],
	[/Android/, 'Android'],
	[/iPhone|iPad|iOS/, 'iOS'],
	[/Linux|X11/, 'Linux'],
	[/Darwin/, 'macOS'],
];

/**
 * 轻量 UA 解析（识别阅读器名称 / OS / 设备类型）
 * 返回 { browserName, osName, deviceType }
 */
function parseUserAgent(userAgent) {
	const ua = userAgent || '';
	let browserName = 'Unknown';
	let isReader = false;

	for (const [re, name] of FEED_READERS) {
		if (re.test(ua)) {
			browserName = name;
			isReader = true;
			break;
		}
	}
	if (!isReader) {
		for (const [re, name] of BROWSERS) {
			if (re.test(ua)) {
				browserName = name;
				break;
			}
		}
	}

	let osName = 'Unknown';
	for (const [re, name] of OS_RULES) {
		if (re.test(ua)) {
			osName = name;
			break;
		}
	}

	// 阅读器/爬虫统一归为 RSS Reader 设备类型（Iris 仪表板设备分布中独立显示）
	let deviceType = 'RSS Reader';
	if (!isReader && ua) { // 浏览器访问才按设备分类
		if (/iPhone|Android.*Mobile|Windows Phone/i.test(ua)) deviceType = 'Mobile';
		else if (/iPad|Tablet|Android(?!.*Mobile)/i.test(ua)) deviceType = 'Tablet';
		else deviceType = 'Desktop';
	}

	return { browserName, osName, deviceType };
}

/**
 * 记录一次 RSS 路由请求（fire-and-forget，不阻塞响应）
 * @param {object} env Worker 环境变量（需包含 AnalyticsBinding 绑定）
 * @param {object} ctx Hono Context（用于 waitUntil）
 * @param {object} req 请求信息 { host, path, userAgent, country, ip }
 */
function trackFeedRequest(env, c, { host, path, userAgent, country, ip }) {
	if (!env || !env.AnalyticsBinding || typeof env.AnalyticsBinding.writeDataPoint !== 'function') {
		return; // 未绑定 Analytics Engine 时静默跳过
	}

	const { browserName, osName, deviceType } = parseUserAgent(userAgent);

	const writePromise = Promise.resolve(
		env.AnalyticsBinding.writeDataPoint({
			blobs: [
				FEEDS_SITE_ID, // website - blob1
				host, // host - blob2
				path || '/', // path - blob3
				'', // referrer - blob4（RSS 抓取无来源页）
				osName, // osName - blob5
				browserName, // browserName - blob6（阅读器名称，如 Folo/Feedly）
				country || 'Unknown', // areaCode - blob7
				userAgent || '', // UA - blob8
				deviceType, // deviceType - blob9（RSS Reader / Desktop / Mobile）
				'Unknown', // deviceVendor - blob10
				'Unknown', // deviceModel - blob11
				ip || '', // ip - blob12
			],
			// RSS 抓取无浏览器 localStorage 去重，visitor/visit 均按次计数（uv 语义 = 抓取次数）
			doubles: [1, 1],
		})
	).catch(() => {
		// 写入失败不影响 RSS 响应
	});

	// 挂到 waitUntil，确保 Worker 在响应后仍等待写入完成
	try {
		c.executionCtx.waitUntil(writePromise);
	} catch (e) {
		// executionCtx 不可用时（部分测试环境）忽略
	}
}

/**
 * 生成首页 tracker 脚本标签（配置 IRIS_TRACKER_URL 环境变量后生效）
 * @param {string} irisUrl Iris 部署地址，如 https://iris-xxx.pages.dev
 * @returns {string} 完整 <script> 标签
 */
function buildTrackerTag(irisUrl) {
	const base = String(irisUrl || '').trim().replace(/\/+$/, '');
	if (!base) return '';
	return `<script defer src="${base}/tracker.min.js" data-website-id="rssworker"></script>`;
}

export { trackFeedRequest, buildTrackerTag, parseUserAgent, FEEDS_SITE_ID };
