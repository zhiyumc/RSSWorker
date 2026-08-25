import { Hono } from 'hono';
import { basicAuth } from 'hono/basic-auth';
import { cors } from 'hono/cors';
import indexHtml from './html/index.html';
import notFoundHtml from './html/404.html';
import errorHtml from './html/err.html';
import robotsTxt from './robots.txt';

import route from './route';
import { trackFeedRequest, buildTrackerTag } from './lib/iris';

const app = new Hono();

// Iris Analytics：RSS 路由抓取统计（服务端写入 Analytics Engine，需在 wrangler.toml 绑定 AnalyticsBinding）
// 注意：必须注册在 app.route('/rss') 之前才能拦截到 RSS 请求
app.use('/rss/*', async (c, next) => {
	await next();
	// 仅统计真正的 RSS 输出（content-type 为 XML）；路由未命中时返回 200 + 404 HTML，不统计
	const contentType = c.res?.headers?.get('content-type') || '';
	if (c.req.method === 'GET' && (c.res?.status === 200 || c.res?.status === 304) && contentType.includes('xml')) {
		const url = new URL(c.req.url);
		trackFeedRequest(c.env, c, {
			host: url.hostname,
			path: url.pathname,
			userAgent: c.req.header('user-agent') || '',
			country: c.req.raw?.cf?.country || '',
			ip: c.req.header('cf-connecting-ip') || '',
		});
	}
});

app.route('/rss', route);
app.get('/', (ctx) => {
	// Iris Analytics：配置环境变量 IRIS_TRACKER_URL 后，首页自动注入 tracker.min.js
	const trackerTag = buildTrackerTag(ctx.env?.IRIS_TRACKER_URL);
	if (trackerTag) {
		return ctx.html(indexHtml.replace('<!-- IRIS_TRACKER -->', trackerTag));
	}
	return ctx.html(indexHtml);
});
app.get('robots.txt', (ctx) => {
	return ctx.text(robotsTxt);
});
app.get('/debug', (ctx) => {
	return ctx.json(ctx.req.raw?.cf);
});
app.notFound((ctx) => {
	return ctx.html(notFoundHtml);
});
app.onError((err, c) => {
	let stack_str = err.stack;
	let stack_arr = stack_str.split('\n').join('<br>');
	let result = errorHtml.replace('{ERROR_MESSAGE}', `${err}`);
	result = result.replace('{ERROR_STACK}', `${stack_arr}`);
	return c.html(result, 500);
});
// app.use(
// 	'/*',
// 	basicAuth({
// 		username: 'user',
// 		password: 'password',
// 	})
// );
app.use('/*', cors());

export default app;
