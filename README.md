# RSSWorker

RSSWorker 是一个轻量级的 RSS 订阅工具，可以部署在 Cloudflare Worker 上。

## 支持

注：以下路由均在 `[域名]/rss/` 下，如 `https://example.com/rss/bilibili/user/dynamic/1`。

### 基础路由

- bilibili 动态 (/bilibili/user/dynamic/:uid)
- bilibili 视频 (/bilibili/user/video/:uid)
- telegram 频道 (/telegram/channel/:username)
- weibo 用户 (/weibo/user/:uid)
- 小红书用户 (/xiaohongshu/user/:uid)

> 小红书更新后不能再使用小红书号，需要使用小红书用户ID。  
> 获取方法：  
> 移动端：用户页面 > 右上角三个点 > 复制链接 > 获取链接中的用户ID  
> 网页端：用户页面 > 链接中的用户ID  
> 格式：https://www.xiaohongshu.com/user/profile/5d2aec020000000012037401

> 微博更新后需要加上Cookie
> 获取方法（参考 https://docs.rsshub.app/zh/deploy/config#%E5%BE%AE%E5%8D%9A ） ：
> 1. 打开并登录微博
> 2. 从个人微博主页的网址中获取uid，在`https://m.weibo.cn/api/container/getIndex?type=uid&value=`后追加uid，访问该链接
> 2. 按下F12打开控制台，切换至Network（网络）面板
> 3. 在该网页切换至任意关注分组，并在面板打开最先捕获到的请求 （该情形下捕获到的请求路径应包含/feed/group）
> 4. 查看该请求的Headers（请求头）, 找到Cookie字段并复制内容
> 5. 命令行中输入`wrangler secret put WEIBO_COOKIE`，按下回车后再将第4步中复制的Cookie字段粘贴，后按下回车

### 中原科技学院 (/zykj/*)

中原科技学院全站 RSS 订阅，覆盖学校新闻、通知公告、各学院/书院动态、党政机构工作动态等共 101 条路由。

每条路由均包含：标题、作者、链接、发布日期、正文内容（含图片）。新闻动态类路由额外包含封面图片。所有 RSS 订阅均包含校徽图标与栏目介绍。

#### 学校新闻资讯

| 路由路径 | 名称 | 封面 |
|----------|------|:----:|
| `/zykj/school/xxyw` | 学校要闻 | 是 |
| `/zykj/school/kyjj` | 科研聚焦 | 是 |
| `/zykj/school/jxdt` | 教学动态 | 是 |
| `/zykj/school/jcfc` | 基层风采 | 是 |
| `/zykj/school/mtgz` | 媒体关注 | 是 |

#### 学校通知公告

| 路由路径 | 名称 | 封面 |
|----------|------|:----:|
| `/zykj/school/tzgg` | 通知公告 | 否 |

#### 经管学部 · 立心书院

| 路由路径 | 名称 | 封面 |
|----------|------|:----:|
| `/zykj/lxsy/news` | 立心动态 | 是 |
| `/zykj/lxsy/notice` | 通知公告 | 否 |
| `/zykj/jjxy/news` | 经济学院 - 学院动态 | 是 |
| `/zykj/jjxy/notice` | 经济学院 - 通知公告 | 否 |
| `/zykj/glxy/news` | 管理学院 - 学院动态 | 是 |
| `/zykj/glxy/notice` | 管理学院 - 通知公告 | 否 |

#### 理工学部 · 鼎元书院

| 路由路径 | 名称 | 封面 |
|----------|------|:----:|
| `/zykj/dysy/news` | 鼎元动态 | 是 |
| `/zykj/dysy/notice` | 通知公告 | 否 |
| `/zykj/tjxy/news` | 土木工程学院 - 学院新闻 | 是 |
| `/zykj/tjxy/notice` | 土木工程学院 - 通知公告 | 否 |
| `/zykj/jdxy/news` | 机电工程学院 - 学院动态 | 是 |
| `/zykj/jdxy/notice` | 机电工程学院 - 通知公告 | 否 |
| `/zykj/xxgcxy/news` | 信息工程学院 - 学院动态 | 是 |
| `/zykj/xxgcxy/notice` | 信息工程学院 - 通知公告 | 否 |
| `/zykj/dqydzgcxy/news` | 电气与电子工程学院 - 学院动态 | 是 |
| `/zykj/dqydzgcxy/notice` | 电气与电子工程学院 - 通知公告 | 否 |

#### 人文学部 · 中天书院

| 路由路径 | 名称 | 封面 |
|----------|------|:----:|
| `/zykj/ztsy/news` | 中天动态 | 是 |
| `/zykj/ztsy/notice` | 通知公告 | 否 |
| `/zykj/wcxy/news` | 文学与传媒学院 - 学院新闻 | 是 |
| `/zykj/wcxy/notice` | 文学与传媒学院 - 通知公告 | 否 |
| `/zykj/wyxy/news` | 外国语学院 - 学院新闻 | 是 |
| `/zykj/wyxy/notice` | 外国语学院 - 通知公告 | 否 |

#### 教育与艺术学部 · 原初书院

| 路由路径 | 名称 | 封面 |
|----------|------|:----:|
| `/zykj/ycsy/news` | 原初动态 | 是 |
| `/zykj/ycsy/notice` | 通知公告 | 否 |
| `/zykj/jyxy/news` | 教育学院 - 学院动态 | 是 |
| `/zykj/jyxy/sfrz` | 教育学院 - 师范认证 | 是 |
| `/zykj/jyxy/notice` | 教育学院 - 通知公告 | 否 |
| `/zykj/yywdxy/news` | 音乐舞蹈学院 - 原初动态 | 是 |
| `/zykj/yywdxy/notice` | 音乐舞蹈学院 - 通知公告 | 否 |
| `/zykj/yssjxy/news` | 艺术设计学院 - 原初动态 | 是 |
| `/zykj/yssjxy/notice` | 艺术设计学院 - 通知公告 | 否 |
| `/zykj/ggys/news` | 公共艺术教育教学中心 - 中心新闻 | 是 |
| `/zykj/ggys/notice` | 公共艺术教育教学中心 - 通知公告 | 否 |

#### 其他学院

| 路由路径 | 名称 | 封面 |
|----------|------|:----:|
| `/zykj/mkszyxy/news` | 马克思主义学院 - 学院新闻 | 是 |
| `/zykj/mkszyxy/notice` | 马克思主义学院 - 通知公告 | 否 |
| `/zykj/ggtyjyzx/news` | 公共体育教育教学中心 - 新闻动态 | 是 |
| `/zykj/ggtyjyzx/notice` | 公共体育教育教学中心 - 通知公告 | 否 |

#### 党委机构

| 路由路径 | 名称 | 封面 |
|----------|------|:----:|
| `/zykj/dwzzb/gzdt` | 党委组织（统战）部 - 工作动态 | 是 |
| `/zykj/dwzzb/dxgz` | 党委组织（统战）部 - 党校工作 | 是 |
| `/zykj/dwzzb/tzgz` | 党委组织（统战）部 - 统战工作 | 是 |
| `/zykj/dwzzb/notice` | 党委组织（统战）部 - 通知公告 | 否 |
| `/zykj/xwzx/bmdt` | 党委宣传部 - 部门动态 | 是 |
| `/zykj/xwzx/notice` | 党委宣传部 - 通知公告 | 否 |
| `/zykj/jwbgs/jjyw` | 纪委办公室 - 纪检要闻 | 是 |
| `/zykj/jwbgs/notice` | 纪委办公室 - 通知公告 | 否 |
| `/zykj/jsfzzx/news` | 教师发展中心 - 新闻动态 | 是 |
| `/zykj/jsfzzx/notice` | 教师发展中心 - 通知公告 | 否 |

#### 行政机构

| 路由路径 | 名称 | 封面 |
|----------|------|:----:|
| `/zykj/xgc/gzdt` | 学生发展处 - 工作动态 | 是 |
| `/zykj/xgc/notice` | 学生发展处 - 通知公告 | 否 |
| `/zykj/hqc/bmdt` | 后勤管理处 - 部门动态 | 是 |
| `/zykj/hqc/notice` | 后勤管理处 - 通知公告 | 否 |
| `/zykj/hqc/hqgs` | 后勤管理处 - 后勤公示 | 否 |
| `/zykj/gh/bmdt` | 校工会 - 部门动态 | 是 |
| `/zykj/gh/notice` | 校工会 - 通知公告 | 否 |
| `/zykj/tw/tqyx` | 校团委 - 团情要迅 | 是 |
| `/zykj/tw/gzdt` | 校团委 - 工作动态 | 是 |
| `/zykj/tw/stfc` | 校团委 - 社团风采 | 是 |
| `/zykj/tw/xxsh` | 校团委 - 校学生会 | 是 |
| `/zykj/tw/notice` | 校团委 - 通知公告 | 否 |
| `/zykj/dzb/bmdt` | 校长办公室 - 部门动态 | 是 |
| `/zykj/dzb/notice` | 校长办公室 - 通知公告 | 否 |
| `/zykj/fzghc/news` | 发展规划处 - 新闻动态 | 是 |
| `/zykj/fzghc/notice` | 发展规划处 - 通知公告 | 否 |

#### 教务与科研

| 路由路径 | 名称 | 封面 |
|----------|------|:----:|
| `/zykj/jwc/bmdt` | 教务处 - 部门动态 | 是 |
| `/zykj/jwc/sxjd` | 教务处 - 实习基地 | 是 |
| `/zykj/jwc/sjjx` | 教务处 - 实践教学 | 是 |
| `/zykj/jwc/sysaq` | 教务处 - 实验室安全 | 是 |
| `/zykj/jwc/sjwj` | 教务处 - 上级文件 | 否 |
| `/zykj/jwc/xxwj` | 教务处 - 学校文件 | 否 |
| `/zykj/kjc/kydt` | 科技处 - 科研动态 | 是 |
| `/zykj/kjc/xmsb` | 科技处 - 项目申报 | 否 |
| `/zykj/kjc/xmjx` | 科技处 - 项目结项 | 否 |
| `/zykj/kjc/cgsb` | 科技处 - 成果申报 | 否 |
| `/zykj/kjc/xkptsb` | 科技处 - 学科、平台申报 | 否 |
| `/zykj/kjc/xsjl` | 科技处 - 学术交流 | 否 |
| `/zykj/kjc/gsgg` | 科技处 - 公示公告 | 否 |

#### 招生就业

| 路由路径 | 名称 | 封面 |
|----------|------|:----:|
| `/zykj/zs/zszx` | 招生信息网 - 招生资讯 | 是 |
| `/zykj/zs/notice` | 招生信息网 - 通知公告 | 否 |
| `/zykj/job/bmdt` | 就业信息网 - 部门动态 | 是 |
| `/zykj/job/notice` | 就业信息网 - 通知公告 | 否 |

#### 其他部门

| 路由路径 | 名称 | 封面 |
|----------|------|:----:|
| `/zykj/oia/zxkx` | 校地合作处 - 最新快讯 | 是 |
| `/zykj/oia/notice` | 校地合作处 - 通知公告 | 否 |
| `/zykj/gjhzyjlc/news` | 国际合作与交流处 - 新闻动态 | 是 |
| `/zykj/gjhzyjlc/notice` | 国际合作与交流处 - 通知公告 | 否 |
| `/zykj/hr/bmdt` | 人力资源处 - 部门动态 | 是 |
| `/zykj/hr/notice` | 人力资源处 - 通知公告 | 否 |
| `/zykj/nic/bmdt` | 信息化建设与管理中心 - 部门动态 | 是 |
| `/zykj/nic/notice` | 信息化建设与管理中心 - 通知公告 | 否 |
| `/zykj/tsg/news` | 图书馆 - 新闻动态 | 是 |
| `/zykj/tsg/notice` | 图书馆 - 通知公告 | 否 |
| `/zykj/xbbjb/xbdt` | 学报编辑部 - 学报动态 | 是 |
| `/zykj/xljkjyzx/gzdt` | 心理健康教育中心 - 工作动态 | 是 |
| `/zykj/xljkjyzx/hdy` | 心理健康教育中心 - 心理健康活动月 | 是 |
| `/zykj/xljkjyzx/notice` | 心理健康教育中心 - 通知公告 | 否 |
| `/zykj/xyh/xydt` | 校友会办公室 - 校友动态 | 是 |

## 部署

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/yllhwa/RSSWorker)

## 开发

在 `src/lib/[网站名称]/[功能]` 参照已有的 demo 添加脚本，然后在 `src/route.js` 中添加插件即可。

注意事项：
1. Cloudflare Worker 有最大打包体积限制（免费用户 1 MB，付费用户 10 MB），所以插件需要尽量轻量化。如使用 fetch 进行请求、使用 Cloudflare Worker 提供的 HTMLRewriter 进行 HTML 解析等。

模板引擎使用的格式为：

```js
let items = [
	{
		title: 'Bilibili User Dynamic',
		link: `https://space.bilibili.com/${uid}/dynamic`,
		description: 'Bilibili User Dynamic233',
		pubDate: new Date().toUTCString(),
		guid: `https://space.bilibili.com/${uid}/dynamic`,
		author: 'bilibili@bilibili.com',
		category: 'video',
		comments: `https://space.bilibili.com/${uid}/dynamic`,
		enclosure: {
			url: 'https://www.bilibili.com/favicon.ico',
			type: 'image/x-icon',
			length: 0,
		},
		source: {
			title: 'Bilibili',
			url: 'https://www.bilibili.com',
		},
	},
];
let data = {
    title: `bilibili 动态`,
    link: `https://space.bilibili.com/${uid}/dynamic`,
    description: `${globalUsername} 的 bilibili 动态`,
    language: 'zh-cn',
    category: 'bilibili',
    items: items,
    image: 'https://example.com/icon.png', // optional: channel icon
};
```

## 致谢

- [RSSHub](https://github.com/DIYgod/RSSHub) 灵感和部分代码来源

- [NodeSupport](https://github.com/NodeSeekDev/NodeSupport)赞助了本项目

[![image](https://img.imgdd.com/a3ae28fb-ec40-451b-9470-b14aa6dc034a.png)](https://yxvm.com/)
