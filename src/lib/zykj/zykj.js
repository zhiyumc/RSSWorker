import { renderRss2 } from '../../utils/util';

// Favicon mapping per subdomain (browser tab icon)
const FAVICON_MAP = {
    'www.zykj.edu.cn': 'https://www.zykj.edu.cn/favicon.ico',
    'lxsy.zykj.edu.cn': 'https://www.zykj.edu.cn/favicon.ico',
    'jjxy.zykj.edu.cn': 'https://jjxy.zykj.edu.cn/skin/sites/2023jgxb/d/images/favicon.ico',
    'glxy.zykj.edu.cn': 'https://www.zykj.edu.cn/favicon.ico',
    'dysy.zykj.edu.cn': 'https://www.zykj.edu.cn/favicon.ico',
    'tjxy.zykj.edu.cn': 'https://tjxy.zykj.edu.cn/skin/sites/2023lgxb/d/images/favicon.ico',
    'jdxy.zykj.edu.cn': 'https://jdxy.zykj.edu.cn/skin/sites/2023lgxb/d/images/favicon.ico',
    'xxgcxy.zykj.edu.cn': 'https://xxgcxy.zykj.edu.cn/skin/sites/2023lgxb/d/images/favicon.ico',
    'dqydzgcxy.zykj.edu.cn': 'https://dqydzgcxy.zykj.edu.cn/skin/sites/2023lgxb/d/images/favicon.ico',
    'ztsy.zykj.edu.cn': 'https://www.zykj.edu.cn/favicon.ico',
    'wcxy.zykj.edu.cn': 'https://www.zykj.edu.cn/favicon.ico',
    'wyxy.zykj.edu.cn': 'https://www.zykj.edu.cn/favicon.ico',
    'ycsy.zykj.edu.cn': 'https://www.zykj.edu.cn/favicon.ico',
    'jyxy.zykj.edu.cn': 'https://jyxy.zykj.edu.cn/images/favicon.ico',
    'yywdxy.zykj.edu.cn': 'https://yywdxy.zykj.edu.cn/images/favicon.ico',
    'yssjxy.zykj.edu.cn': 'https://www.zykj.edu.cn/favicon.ico',
    'ggys.zykj.edu.cn': 'https://www.zykj.edu.cn/favicon.ico',
    'mkszyxy.zykj.edu.cn': 'https://www.zykj.edu.cn/favicon.ico',
    'ggtyjyzx.zykj.edu.cn': 'https://www.zykj.edu.cn/favicon.ico',
    'dwzzb.zykj.edu.cn': 'https://www.zykj.edu.cn/favicon.ico',
    'xwzx.zykj.edu.cn': 'https://www.zykj.edu.cn/favicon.ico',
    'jwbgs.zykj.edu.cn': 'https://www.zykj.edu.cn/favicon.ico',
    'jsfzzx.zykj.edu.cn': 'https://www.zykj.edu.cn/favicon.ico',
    'xgc.zykj.edu.cn': 'https://www.zykj.edu.cn/favicon.ico',
    'hqc.zykj.edu.cn': 'https://www.zykj.edu.cn/favicon.ico',
    'gh.zykj.edu.cn': 'https://www.zykj.edu.cn/favicon.ico',
    'tw.zykj.edu.cn': 'https://www.zykj.edu.cn/favicon.ico',
    'dzb.zykj.edu.cn': 'https://www.zykj.edu.cn/favicon.ico',
    'fzghc.zykj.edu.cn': 'https://www.zykj.edu.cn/favicon.ico',
    'jwc.zykj.edu.cn': 'https://www.zykj.edu.cn/favicon.ico',
    'kjc.zykj.edu.cn': 'https://www.zykj.edu.cn/favicon.ico',
    'zs.zykj.edu.cn': 'https://www.zykj.edu.cn/favicon.ico',
    'job.zykj.edu.cn': 'https://img.goworkla.cn/college/5c2c5007c623471b949089fb/logo.png',
    'oia.zykj.edu.cn': 'https://www.zykj.edu.cn/favicon.ico',
    'gjhzyjlc.zykj.edu.cn': 'https://www.zykj.edu.cn/favicon.ico',
    'hr.zykj.edu.cn': 'https://www.zykj.edu.cn/favicon.ico',
    'nic.zykj.edu.cn': 'https://nic.zykj.edu.cn/images/favicon.png',
    'tsg.zykj.edu.cn': 'https://www.zykj.edu.cn/favicon.ico',
    'xljkjyzx.zykj.edu.cn': 'https://www.zykj.edu.cn/favicon.ico',
    'xyh.zykj.edu.cn': 'https://www.zykj.edu.cn/favicon.ico',
};

function getFavicon(url) {
    try {
        const host = new URL(url).host;
        return FAVICON_MAP[host] || 'https://www.zykj.edu.cn/favicon.ico';
    } catch {
        return 'https://www.zykj.edu.cn/favicon.ico';
    }
}

// ============================================================
// Route configuration
// needCover: whether to include a cover image
// coverFromArticle: true = get first image from article; false = get thumbnail from list
// ============================================================
const ROUTES = [
    // ===== 学校新闻资讯 =====
    { path: '/zykj/school/xxyw', name: '中原科技学院 - 学校要闻', desc: '中原科技学院学校要闻栏目，报道学校最新重要新闻动态', url: 'https://www.zykj.edu.cn/index/xwzx/xxyw.htm', needCover: true, coverFromArticle: false },
    { path: '/zykj/school/kyjj', name: '中原科技学院 - 科研聚焦', desc: '中原科技学院科研聚焦栏目，聚焦学校科研最新进展与成果', url: 'https://www.zykj.edu.cn/index/xwzx/kyjj.htm', needCover: true, coverFromArticle: false },
    { path: '/zykj/school/jxdt', name: '中原科技学院 - 教学动态', desc: '中原科技学院教学动态栏目，报道教学管理与改革最新动态', url: 'https://www.zykj.edu.cn/index/xwzx/jxdt.htm', needCover: true, coverFromArticle: false },
    { path: '/zykj/school/jcfc', name: '中原科技学院 - 基层风采', desc: '中原科技学院基层风采栏目，展示各基层单位工作风采与亮点', url: 'https://www.zykj.edu.cn/index/xwzx/jcfc.htm', needCover: true, coverFromArticle: false },
    { path: '/zykj/school/mtgz', name: '中原科技学院 - 媒体关注', desc: '中原科技学院媒体关注栏目，汇总各类媒体对学校的报道', url: 'https://www.zykj.edu.cn/index/xwzx/mtgz.htm', needCover: true, coverFromArticle: false },

    // ===== 立心书院 =====
    { path: '/zykj/lxsy/news', name: '立心书院 - 立心动态', desc: '中原科技学院经济与管理学部立心书院立心动态', url: 'https://lxsy.zykj.edu.cn/15320/', needCover: true, coverFromArticle: false },
    { path: '/zykj/lxsy/notice', name: '立心书院 - 通知公告', desc: '中原科技学院经济与管理学部立心书院通知公告', url: 'https://lxsy.zykj.edu.cn/15321/', needCover: false },

    // ===== 经济学院 =====
    { path: '/zykj/jjxy/news', name: '经济学院 - 学院动态', desc: '中原科技学院经济学院学院动态', url: 'https://jjxy.zykj.edu.cn/17805/', needCover: true, coverFromArticle: false },
    { path: '/zykj/jjxy/notice', name: '经济学院 - 通知公告', desc: '中原科技学院经济学院通知公告', url: 'https://jjxy.zykj.edu.cn/17967/', needCover: false },

    // ===== 管理学院 =====
    { path: '/zykj/glxy/news', name: '管理学院 - 学院动态', desc: '中原科技学院管理学院学院动态', url: 'https://glxy.zykj.edu.cn/xwgg/xydt.htm', needCover: true, coverFromArticle: false },
    { path: '/zykj/glxy/notice', name: '管理学院 - 通知公告', desc: '中原科技学院管理学院通知公告', url: 'https://glxy.zykj.edu.cn/xwgg/tzgg.htm', needCover: false },

    // ===== 鼎元书院 =====
    { path: '/zykj/dysy/news', name: '鼎元书院 - 鼎元动态', desc: '中原科技学院理工学部鼎元书院鼎元动态', url: 'https://dysy.zykj.edu.cn/16367/', needCover: true, coverFromArticle: false },
    { path: '/zykj/dysy/notice', name: '鼎元书院 - 通知公告', desc: '中原科技学院理工学部鼎元书院通知公告', url: 'https://dysy.zykj.edu.cn/16368/', needCover: false },

    // ===== 土木工程学院 =====
    { path: '/zykj/tjxy/news', name: '土木工程学院 - 学院新闻', desc: '中原科技学院土木工程学院学院新闻', url: 'https://tjxy.zykj.edu.cn/13020/', needCover: true, coverFromArticle: true },
    { path: '/zykj/tjxy/notice', name: '土木工程学院 - 通知公告', desc: '中原科技学院土木工程学院通知公告', url: 'https://tjxy.zykj.edu.cn/13019/', needCover: false },

    // ===== 机电工程学院 =====
    { path: '/zykj/jdxy/news', name: '机电工程学院 - 学院动态', desc: '中原科技学院机电工程学院学院动态', url: 'https://jdxy.zykj.edu.cn/6067/', needCover: true, coverFromArticle: true },
    { path: '/zykj/jdxy/notice', name: '机电工程学院 - 通知公告', desc: '中原科技学院机电工程学院通知公告', url: 'https://jdxy.zykj.edu.cn/6068/', needCover: false },

    // ===== 信息工程学院 =====
    { path: '/zykj/xxgcxy/news', name: '信息工程学院 - 学院动态', desc: '中原科技学院信息工程学院学院动态', url: 'https://xxgcxy.zykj.edu.cn/xwgg/xydt.htm', needCover: true, coverFromArticle: true },
    { path: '/zykj/xxgcxy/notice', name: '信息工程学院 - 通知公告', desc: '中原科技学院信息工程学院通知公告', url: 'https://xxgcxy.zykj.edu.cn/xwgg/tzgg.htm', needCover: false },

    // ===== 电气与电子工程学院 =====
    { path: '/zykj/dqydzgcxy/news', name: '电气与电子工程学院 - 学院动态', desc: '中原科技学院电气与电子工程学院学院动态', url: 'https://dqydzgcxy.zykj.edu.cn/18888/', needCover: true, coverFromArticle: true },
    { path: '/zykj/dqydzgcxy/notice', name: '电气与电子工程学院 - 通知公告', desc: '中原科技学院电气与电子工程学院通知公告', url: 'https://dqydzgcxy.zykj.edu.cn/18889/', needCover: false },

    // ===== 中天书院 =====
    { path: '/zykj/ztsy/news', name: '中天书院 - 中天动态', desc: '中原科技学院人文学部中天书院中天动态', url: 'https://ztsy.zykj.edu.cn/', needCover: true, coverFromArticle: false },
    { path: '/zykj/ztsy/notice', name: '中天书院 - 通知公告', desc: '中原科技学院人文学部中天书院通知公告', url: 'https://ztsy.zykj.edu.cn/', needCover: false },

    // ===== 文学与传媒学院 =====
    { path: '/zykj/wcxy/news', name: '文学与传媒学院 - 学院新闻', desc: '中原科技学院文学与传媒学院学院新闻', url: 'https://wcxy.zykj.edu.cn/xwgg/xyxw.htm', needCover: true, coverFromArticle: true },
    { path: '/zykj/wcxy/notice', name: '文学与传媒学院 - 通知公告', desc: '中原科技学院文学与传媒学院通知公告', url: 'https://wcxy.zykj.edu.cn/xwgg/tzgg.htm', needCover: false },

    // ===== 外国语学院 =====
    { path: '/zykj/wyxy/news', name: '外国语学院 - 学院新闻', desc: '中原科技学院外国语学院学院新闻', url: 'https://wyxy.zykj.edu.cn/xwgg/xyxw.htm', needCover: true, coverFromArticle: false },
    { path: '/zykj/wyxy/notice', name: '外国语学院 - 通知公告', desc: '中原科技学院外国语学院通知公告', url: 'https://wyxy.zykj.edu.cn/xwgg/tzgg.htm', needCover: false },

    // ===== 原初书院 =====
    { path: '/zykj/ycsy/news', name: '原初书院 - 原初动态', desc: '中原科技学院教育与艺术学部原初书院原初动态', url: 'https://ycsy.zykj.edu.cn/16303/', needCover: true, coverFromArticle: false },
    { path: '/zykj/ycsy/notice', name: '原初书院 - 通知公告', desc: '中原科技学院教育与艺术学部原初书院通知公告', url: 'https://ycsy.zykj.edu.cn/16304/', needCover: false },

    // ===== 教育学院 =====
    { path: '/zykj/jyxy/news', name: '教育学院 - 学院动态', desc: '中原科技学院教育学院学院动态', url: 'https://jyxy.zykj.edu.cn/xwgg/xydt.htm', needCover: true, coverFromArticle: false },
    { path: '/zykj/jyxy/sfrz', name: '教育学院 - 师范认证', desc: '中原科技学院教育学院师范专业认证', url: 'https://jyxy.zykj.edu.cn/xwgg/sfrz.htm', needCover: true, coverFromArticle: true },
    { path: '/zykj/jyxy/notice', name: '教育学院 - 通知公告', desc: '中原科技学院教育学院通知公告', url: 'https://jyxy.zykj.edu.cn/xwgg/tzgg.htm', needCover: false },

    // ===== 音乐舞蹈学院 =====
    { path: '/zykj/yywdxy/news', name: '音乐舞蹈学院 - 学院动态', desc: '中原科技学院音乐舞蹈学院学院动态', url: 'https://yywdxy.zykj.edu.cn/xwgg/xydt.htm', needCover: true, coverFromArticle: false },
    { path: '/zykj/yywdxy/notice', name: '音乐舞蹈学院 - 通知公告', desc: '中原科技学院音乐舞蹈学院通知公告', url: 'https://yywdxy.zykj.edu.cn/xwgg/tzgg.htm', needCover: false },

    // ===== 艺术设计学院 =====
    { path: '/zykj/yssjxy/news', name: '艺术设计学院 - 学院动态', desc: '中原科技学院艺术设计学院学院动态', url: 'https://yssjxy.zykj.edu.cn/xwgg/xydt.htm', needCover: true, coverFromArticle: false },
    { path: '/zykj/yssjxy/notice', name: '艺术设计学院 - 通知公告', desc: '中原科技学院艺术设计学院通知公告', url: 'https://yssjxy.zykj.edu.cn/xwgg/tzgg.htm', needCover: false },

    // ===== 公共艺术教育教学中心 =====
    { path: '/zykj/ggys/news', name: '公共艺术教育教学中心 - 中心新闻', desc: '中原科技学院公共艺术教育教学中心新闻动态', url: 'https://ggys.zykj.edu.cn/13959/', needCover: true, coverFromArticle: true },
    { path: '/zykj/ggys/notice', name: '公共艺术教育教学中心 - 通知公告', desc: '中原科技学院公共艺术教育教学中心通知公告', url: 'https://ggys.zykj.edu.cn/13958/', needCover: false },

    // ===== 马克思主义学院 =====
    { path: '/zykj/mkszyxy/news', name: '马克思主义学院 - 学院新闻', desc: '中原科技学院马克思主义学院学院新闻', url: 'https://mkszyxy.zykj.edu.cn/15132/', needCover: true, coverFromArticle: true },
    { path: '/zykj/mkszyxy/notice', name: '马克思主义学院 - 通知公告', desc: '中原科技学院马克思主义学院通知公告', url: 'https://mkszyxy.zykj.edu.cn/15131/', needCover: false },

    // ===== 公共体育教育教学中心 =====
    { path: '/zykj/ggtyjyzx/news', name: '公共体育教育教学中心 - 新闻动态', desc: '中原科技学院公共体育教育教学中心新闻动态', url: 'https://ggtyjyzx.zykj.edu.cn/15270/', needCover: true, coverFromArticle: true },
    { path: '/zykj/ggtyjyzx/notice', name: '公共体育教育教学中心 - 通知公告', desc: '中原科技学院公共体育教育教学中心通知公告', url: 'https://ggtyjyzx.zykj.edu.cn/15269/', needCover: false },

    // ===== 党委组织（统战）部 =====
    { path: '/zykj/dwzzb/gzdt', name: '党委组织（统战）部 - 工作动态', desc: '中原科技学院党委组织（统战）部工作动态', url: 'https://dwzzb.zykj.edu.cn/gzdt.htm', needCover: true, coverFromArticle: true },
    { path: '/zykj/dwzzb/dxgz', name: '党委组织（统战）部 - 党校工作', desc: '中原科技学院党委组织（统战）部党校工作', url: 'https://dwzzb.zykj.edu.cn/dxgz.htm', needCover: true, coverFromArticle: true },
    { path: '/zykj/dwzzb/tzgz', name: '党委组织（统战）部 - 统战工作', desc: '中原科技学院党委组织（统战）部统战工作', url: 'https://dwzzb.zykj.edu.cn/tzgz.htm', needCover: true, coverFromArticle: true },
    { path: '/zykj/dwzzb/notice', name: '党委组织（统战）部 - 通知公告', desc: '中原科技学院党委组织（统战）部通知公告', url: 'https://dwzzb.zykj.edu.cn/tzgg.htm', needCover: false },

    // ===== 党委宣传部 =====
    { path: '/zykj/xwzx/bmdt', name: '党委宣传部 - 部门动态', desc: '中原科技学院党委宣传部（品牌建设办公室）部门动态', url: 'https://xwzx.zykj.edu.cn/bmdt.htm', needCover: true, coverFromArticle: true },
    { path: '/zykj/xwzx/notice', name: '党委宣传部 - 通知公告', desc: '中原科技学院党委宣传部（品牌建设办公室）通知公告', url: 'https://xwzx.zykj.edu.cn/tzgg.htm', needCover: false },

    // ===== 纪委办公室 =====
    { path: '/zykj/jwbgs/jjyw', name: '纪委办公室 - 纪检要闻', desc: '中原科技学院纪委办公室纪检要闻', url: 'https://jwbgs.zykj.edu.cn/jjyw.htm', needCover: true, coverFromArticle: true },
    { path: '/zykj/jwbgs/notice', name: '纪委办公室 - 通知公告', desc: '中原科技学院纪委办公室通知公告', url: 'https://jwbgs.zykj.edu.cn/tzgg1.htm', needCover: false },

    // ===== 教师发展中心 =====
    { path: '/zykj/jsfzzx/news', name: '教师发展中心 - 新闻动态', desc: '中原科技学院教师发展中心（党委教师工作部）新闻动态', url: 'https://jsfzzx.zykj.edu.cn/xwdt.htm', needCover: true, coverFromArticle: true },
    { path: '/zykj/jsfzzx/notice', name: '教师发展中心 - 通知公告', desc: '中原科技学院教师发展中心（党委教师工作部）通知公告', url: 'https://jsfzzx.zykj.edu.cn/pxxm.htm', needCover: false },

    // ===== 学生发展处 =====
    { path: '/zykj/xgc/gzdt', name: '学生发展处 - 工作动态', desc: '中原科技学院学生发展处工作动态', url: 'https://xgc.zykj.edu.cn/bmdt/gzdt.htm', needCover: true, coverFromArticle: false },
    { path: '/zykj/xgc/notice', name: '学生发展处 - 通知公告', desc: '中原科技学院学生发展处通知公告', url: 'https://xgc.zykj.edu.cn/bmdt/tzgg.htm', needCover: false },

    // ===== 后勤管理处 =====
    { path: '/zykj/hqc/bmdt', name: '后勤管理处 - 部门动态', desc: '中原科技学院后勤管理处部门动态', url: 'https://hqc.zykj.edu.cn/bmdt.htm', needCover: true, coverFromArticle: true },
    { path: '/zykj/hqc/notice', name: '后勤管理处 - 通知公告', desc: '中原科技学院后勤管理处通知公告', url: 'https://hqc.zykj.edu.cn/tzgg.htm', needCover: false },
    { path: '/zykj/hqc/hqgs', name: '后勤管理处 - 后勤公示', desc: '中原科技学院后勤管理处后勤公示', url: 'https://hqc.zykj.edu.cn/hqfc/hqgs.htm', needCover: false },

    // ===== 校工会 =====
    { path: '/zykj/gh/bmdt', name: '校工会 - 部门动态', desc: '中原科技学院校工会部门动态', url: 'https://gh.zykj.edu.cn/bmdt.htm', needCover: true, coverFromArticle: true },
    { path: '/zykj/gh/notice', name: '校工会 - 通知公告', desc: '中原科技学院校工会通知公告', url: 'https://gh.zykj.edu.cn/tzgg.htm', needCover: false },

    // ===== 校团委 =====
    { path: '/zykj/tw/tqyx', name: '校团委 - 团情要迅', desc: '中原科技学院校团委团情要迅', url: 'https://tw.zykj.edu.cn/bmdt/tqyx.htm', needCover: true, coverFromArticle: true },
    { path: '/zykj/tw/gzdt', name: '校团委 - 工作动态', desc: '中原科技学院校团委工作动态', url: 'https://tw.zykj.edu.cn/bmdt/gzdt.htm', needCover: true, coverFromArticle: true },
    { path: '/zykj/tw/stfc', name: '校团委 - 社团风采', desc: '中原科技学院校团委社团风采', url: 'https://tw.zykj.edu.cn/zkqn/stfc.htm', needCover: true, coverFromArticle: true },
    { path: '/zykj/tw/xxsh', name: '校团委 - 校学生会', desc: '中原科技学院校团委校学生会', url: 'https://tw.zykj.edu.cn/zkqn/xxsh.htm', needCover: true, coverFromArticle: true },
    { path: '/zykj/tw/notice', name: '校团委 - 通知公告', desc: '中原科技学院校团委通知公告', url: 'https://tw.zykj.edu.cn/bmdt/tzgg.htm', needCover: false },

    // ===== 校长办公室 =====
    { path: '/zykj/dzb/bmdt', name: '校长办公室 - 部门动态', desc: '中原科技学院校长办公室部门动态', url: 'https://dzb.zykj.edu.cn/bmdt.htm', needCover: true, coverFromArticle: true },
    { path: '/zykj/dzb/notice', name: '校长办公室 - 通知公告', desc: '中原科技学院校长办公室通知公告', url: 'https://dzb.zykj.edu.cn/tzgg.htm', needCover: false },

    // ===== 发展规划处 =====
    { path: '/zykj/fzghc/news', name: '发展规划处 - 新闻动态', desc: '中原科技学院发展规划处新闻动态', url: 'https://fzghc.zykj.edu.cn/bmdt/xwdt.htm', needCover: true, coverFromArticle: true },
    { path: '/zykj/fzghc/notice', name: '发展规划处 - 通知公告', desc: '中原科技学院发展规划处通知公告', url: 'https://fzghc.zykj.edu.cn/bmdt/tzgg.htm', needCover: false },

    // ===== 教务处 =====
    { path: '/zykj/jwc/bmdt', name: '教务处 - 部门动态', desc: '中原科技学院教务处部门动态', url: 'https://jwc.zykj.edu.cn/8942/', needCover: true, coverFromArticle: true },
    { path: '/zykj/jwc/sxjd', name: '教务处 - 实习基地', desc: '中原科技学院教务处实习基地', url: 'https://jwc.zykj.edu.cn/13508/', needCover: true, coverFromArticle: true },
    { path: '/zykj/jwc/sjjx', name: '教务处 - 实践教学', desc: '中原科技学院教务处实践教学', url: 'https://jwc.zykj.edu.cn/8912/', needCover: true, coverFromArticle: true },
    { path: '/zykj/jwc/sysaq', name: '教务处 - 实验室安全', desc: '中原科技学院教务处实验室安全', url: 'https://jwc.zykj.edu.cn/16433/', needCover: true, coverFromArticle: true },
    { path: '/zykj/jwc/sjwj', name: '教务处 - 上级文件', desc: '中原科技学院教务处上级文件', url: 'https://jwc.zykj.edu.cn/8894/', needCover: false },
    { path: '/zykj/jwc/xxwj', name: '教务处 - 学校文件', desc: '中原科技学院教务处学校文件', url: 'https://jwc.zykj.edu.cn/8895/', needCover: false },

    // ===== 科技处 =====
    { path: '/zykj/kjc/kydt', name: '科技处 - 科研动态', desc: '中原科技学院科技处科研动态', url: 'https://kjc.zykj.edu.cn/kydt.htm', needCover: true, coverFromArticle: true },
    { path: '/zykj/kjc/xmsb', name: '科技处 - 项目申报', desc: '中原科技学院科技处项目申报', url: 'https://kjc.zykj.edu.cn/tzgg/xmsb.htm', needCover: false },
    { path: '/zykj/kjc/xmjx', name: '科技处 - 项目结项', desc: '中原科技学院科技处项目结项', url: 'https://kjc.zykj.edu.cn/tzgg/xmjx.htm', needCover: false },
    { path: '/zykj/kjc/cgsb', name: '科技处 - 成果申报', desc: '中原科技学院科技处成果申报', url: 'https://kjc.zykj.edu.cn/tzgg/cgsb.htm', needCover: false },
    { path: '/zykj/kjc/xkptsb', name: '科技处 - 学科、平台申报', desc: '中原科技学院科技处学科与平台申报', url: 'https://kjc.zykj.edu.cn/tzgg/xk_ptsb.htm', needCover: false },
    { path: '/zykj/kjc/xsjl', name: '科技处 - 学术交流', desc: '中原科技学院科技处学术交流', url: 'https://kjc.zykj.edu.cn/tzgg/xsjl1.htm', needCover: false },
    { path: '/zykj/kjc/gsgg', name: '科技处 - 公示公告', desc: '中原科技学院科技处公示公告', url: 'https://kjc.zykj.edu.cn/gsgg.htm', needCover: false },

    // ===== 招生信息网 =====
    { path: '/zykj/zs/zszx', name: '招生信息网 - 招生资讯', desc: '中原科技学院招生信息网招生资讯', url: 'https://zs.zykj.edu.cn/zszx.htm', needCover: true, coverFromArticle: true },
    { path: '/zykj/zs/notice', name: '招生信息网 - 通知公告', desc: '中原科技学院招生信息网通知公告', url: 'https://zs.zykj.edu.cn/tzgg.htm', needCover: false },

    // ===== 就业信息网 =====
    { path: '/zykj/job/bmdt', name: '就业信息网 - 部门动态', desc: '中原科技学院就业信息网部门动态', url: 'https://job.zykj.edu.cn/module/newslist/id-1537/nid-4149', needCover: true, coverFromArticle: true },
    { path: '/zykj/job/notice', name: '就业信息网 - 通知公告', desc: '中原科技学院就业信息网通知公告', url: 'https://job.zykj.edu.cn/module/newslist/id-1538/nid-8687', needCover: false },

    // ===== 校地合作处 =====
    { path: '/zykj/oia/zxkx', name: '校地合作处 - 最新快讯', desc: '中原科技学院校地合作处最新快讯', url: 'https://oia.zykj.edu.cn/bmdt/zxkx.htm', needCover: true, coverFromArticle: true },
    { path: '/zykj/oia/notice', name: '校地合作处 - 通知公告', desc: '中原科技学院校地合作处通知公告', url: 'https://oia.zykj.edu.cn/tzgg.htm', needCover: false },

    // ===== 国际合作与交流处 =====
    { path: '/zykj/gjhzyjlc/news', name: '国际合作与交流处 - 新闻动态', desc: '中原科技学院国际合作与交流处新闻动态与交流合作', url: 'https://gjhzyjlc.zykj.edu.cn/', needCover: true, coverFromArticle: true },
    { path: '/zykj/gjhzyjlc/notice', name: '国际合作与交流处 - 通知公告', desc: '中原科技学院国际合作与交流处通知公告', url: 'https://gjhzyjlc.zykj.edu.cn/tzgg.htm', needCover: false },

    // ===== 人力资源处 =====
    { path: '/zykj/hr/bmdt', name: '人力资源处 - 部门动态', desc: '中原科技学院人力资源处部门动态', url: 'https://hr.zykj.edu.cn/bmdt.htm', needCover: true, coverFromArticle: true },
    { path: '/zykj/hr/notice', name: '人力资源处 - 通知公告', desc: '中原科技学院人力资源处通知公告', url: 'https://hr.zykj.edu.cn/tzgg.htm', needCover: false },

    // ===== 信息化建设与管理中心 =====
    { path: '/zykj/nic/bmdt', name: '信息化建设与管理中心 - 部门动态', desc: '中原科技学院信息化建设与管理中心部门动态', url: 'https://nic.zykj.edu.cn/index/bmdt.htm', needCover: true, coverFromArticle: true },
    { path: '/zykj/nic/notice', name: '信息化建设与管理中心 - 通知公告', desc: '中原科技学院信息化建设与管理中心通知公告', url: 'https://nic.zykj.edu.cn/index/tzgg.htm', needCover: false },

    // ===== 图书馆 =====
    { path: '/zykj/tsg/news', name: '图书馆 - 新闻动态', desc: '中原科技学院图书馆新闻动态', url: 'https://tsg.zykj.edu.cn/2899/', needCover: true, coverFromArticle: true },
    { path: '/zykj/tsg/notice', name: '图书馆 - 通知公告', desc: '中原科技学院图书馆通知公告', url: 'https://tsg.zykj.edu.cn/2898/', needCover: false },

    // ===== 学报编辑部 =====
    { path: '/zykj/xbbjb/xbdt', name: '学报编辑部 - 学报动态', desc: '中原科技学院学报编辑部学报动态', url: 'https://www.zykj.edu.cn/dzjg/xbbjb/xbdt.htm', needCover: true, coverFromArticle: true },

    // ===== 心理健康教育中心 =====
    { path: '/zykj/xljkjyzx/gzdt', name: '心理健康教育中心 - 工作动态', desc: '中原科技学院心理健康教育中心工作动态', url: 'https://xljkjyzx.zykj.edu.cn/bmdt/gzdt.htm', needCover: true, coverFromArticle: true },
    { path: '/zykj/xljkjyzx/hdy', name: '心理健康教育中心 - 心理健康活动月', desc: '中原科技学院心理健康教育中心心理健康活动月', url: 'https://xljkjyzx.zykj.edu.cn/xcjy/xljkhdy.htm', needCover: true, coverFromArticle: true },
    { path: '/zykj/xljkjyzx/notice', name: '心理健康教育中心 - 通知公告', desc: '中原科技学院心理健康教育中心通知公告', url: 'https://xljkjyzx.zykj.edu.cn/bmdt/tzgg.htm', needCover: false },

    // ===== 校友会办公室 =====
    { path: '/zykj/xyh/xydt', name: '校友会办公室 - 校友动态', desc: '中原科技学院校友会办公室校友动态', url: 'https://xyh.zykj.edu.cn/xwdt/xydt.htm', needCover: true, coverFromArticle: true },

    // ===== 学校通知公告 =====
    { path: '/zykj/school/tzgg', name: '中原科技学院 - 通知公告', desc: '中原科技学院学校通知公告栏目', url: 'https://www.zykj.edu.cn/index/xwzx/tzgg.htm', needCover: false },
];

// ============================================================
// Helper: resolve relative URL to absolute
// ============================================================
function resolveUrl(href, baseUrl) {
    if (!href) return '';
    if (href.startsWith('http://') || href.startsWith('https://')) return href;
    try {
        return new URL(href, baseUrl).href;
    } catch {
        return href;
    }
}

// ============================================================
// Helper: get base domain from URL
// ============================================================
function getBaseDomain(url) {
    try {
        const u = new URL(url);
        return `${u.protocol}//${u.host}`;
    } catch {
        return 'https://www.zykj.edu.cn';
    }
}

// ============================================================
// Helper: fix image URLs in HTML content
// ============================================================
function fixImageUrls(html, baseUrl) {
    const base = getBaseDomain(baseUrl);
    // Fix src attributes
    let fixed = html.replace(/src="(\/[^"]+)"/g, (m, p1) => `src="${base}${p1}"`);
    fixed = fixed.replace(/src='(\/[^']+)'/g, (m, p1) => `src='${base}${p1}'`);
    // Fix href attributes
    fixed = fixed.replace(/href="(\/[^"]+)"/g, (m, p1) => `href="${base}${p1}"`);
    fixed = fixed.replace(/href='(\/[^']+)'/g, (m, p1) => `href='${base}${p1}'`);
    return fixed;
}

// ============================================================
// Helper: extract first image URL from HTML
// ============================================================
function getFirstImage(html, baseUrl) {
    const base = getBaseDomain(baseUrl);
    // Match img src
    const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (match) {
        let src = match[1];
        if (src.startsWith('/')) src = base + src;
        else if (!src.startsWith('http')) src = resolveUrl(src, baseUrl);
        return src;
    }
    return '';
}

// ============================================================
// Helper: decode HTML entities
// ============================================================
function decodeEntities(text) {
    if (!text) return '';
    return text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .replace(/&#x(\w+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
        .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)))
        .trim();
}

// ============================================================
// Parse list page - extract article items
// Uses HTMLRewriter for streaming parse of different list structures
// ============================================================
async function parseList(listUrl) {
    const res = await fetch(listUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; RSSWorker/1.0)' },
    });
    const html = await res.text();

    const baseDomain = getBaseDomain(listUrl);
    const items = [];

    // Detect list type and parse accordingly
    if (html.includes('news_list2 ')) {
        // VSB main site news list (dl.news_list2)
        parseVsbMainNewsList(html, baseDomain, items);
    } else if (html.includes('news_cover_box2_list1') || html.includes('news_cover_box3')) {
        // P8CMS cover box list (gjhzyjlc homepage)
        parseP8cmsCoverList(html, baseDomain, items);
    } else if (html.includes('"news-tit') || html.includes("'news-tit")) {
        // P8CMS news list with news-tit (lxsy, dysy, ztsy, ycsy)
        parseP8cmsNewsList(html, baseDomain, items);
    } else if (html.includes('zsjz_list1') || html.includes('mtgz_list1')) {
        // VSB/P8CMS simple list (zsjz_list1)
        parseZsjzList(html, baseDomain, items);
    } else if (html.includes('wslb')) {
        // VSB sub-site wslb list (glxy, wcxy, wyxy, etc.)
        parseVsbSubWslbList(html, baseDomain, items);
    } else if (html.includes('timg-linfo')) {
        // VSB sub-site timg-list (xgc, xyh)
        parseVsbSubTimgList(html, baseDomain, items);
    } else if (html.includes('news_list1_box') && !html.includes('mtgz_list1') && !html.includes('zsjz_list1')) {
        // VSB main site notice list (item/date/text2)
        parseVsbMainNoticeList(html, baseDomain, items);
    } else if (listUrl.includes('job.zykj.edu.cn')) {
        // Job site list
        parseJobList(html, baseDomain, listUrl, items);
    } else {
        // Fallback: try to extract any article-like links
        parseFallbackList(html, baseDomain, items);
    }

    return items;
}

// Parse VSB main site news list (dl.news_list2)
function parseVsbMainNewsList(html, baseDomain, items) {
    const blockRegex = /<dd>\s*<a\s+href="([^"]*)"[^>]*>[\s\S]*?<\/a>\s*<\/dd>/g;
    let match;
    while ((match = blockRegex.exec(html)) !== null) {
        const block = match[1] + match[0];
        const href = match[1];
        const link = resolveUrl(href, baseDomain);

        // Extract title
        const titleMatch = block.match(/class="news_list2_tt[^"]*"[^>]*>([\s\S]*?)<\/div>/);
        const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim() : '';

        // Extract date (day + month/year)
        const dayMatch = block.match(/class="days"[^>]*>(\d+)/);
        const monthMatch = block.match(/class="days"[^>]*>\s*\d+\s*<\/div>\s*<div[^>]*>([^<]+)/);
        let date = '';
        if (dayMatch) {
            const day = dayMatch[1];
            const my = monthMatch ? monthMatch[1].trim() : '';
            date = `${my}.${day}`;
        }

        // Extract source
        const sourceMatch = block.match(/class="news_list2_ly[^"]*"[^>]*>([\s\S]*?)<\/div>/);
        let author = '';
        if (sourceMatch) {
            const srcText = sourceMatch[1].replace(/<[^>]*>/g, '').trim();
            author = srcText.replace(/^来源[:：]/, '').trim();
        }

        // Extract thumbnail
        const imgMatch = block.match(/class="news_list2_pic"[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"/);
        let thumbnail = '';
        if (imgMatch) {
            thumbnail = imgMatch[1].startsWith('/') ? baseDomain + imgMatch[1] : imgMatch[1];
        }

        if (title && link) {
            items.push({ title, link, date, author, thumbnail });
        }
    }
}

// Parse VSB main site notice list (div.item with date/text2)
function parseVsbMainNoticeList(html, baseDomain, items) {
    const blockRegex = /<div class="item">[\s\S]*?<div class="text2">[\s\S]*?<h3>\s*<a\s+href="([^"]*)"[^>]*title="([^"]*)"[^>]*>[\s\S]*?<\/a>\s*<\/h3>[\s\S]*?<p class="source">([^<]*)<\/p>[\s\S]*?<p class="summary">([\s\S]*?)<\/p>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g;
    let match;
    while ((match = blockRegex.exec(html)) !== null) {
        const block = match[0];
        const href = match[1];
        const title = match[2];
        const author = match[3].replace(/^来源[:：]/, '').trim();

        // Extract date
        const dayMatch = block.match(/class="d"[^>]*>(\d+)/);
        const yearMatch = block.match(/class="y"[^>]*>([^<]+)/);
        let date = '';
        if (dayMatch && yearMatch) {
            date = `${yearMatch[1].trim()}-${dayMatch[1]}`;
        }

        const link = resolveUrl(href, baseDomain);
        if (title && link) {
            items.push({ title, link, date, author, thumbnail: '' });
        }
    }

    // If the strict regex didn't match, try a looser approach
    if (items.length === 0) {
        const looseRegex = /<div class="item">[\s\S]*?<a\s+href="([^"]*)"[^>]*title="([^"]*)"[^>]*>[\s\S]*?<\/a>[\s\S]*?<\/div>/g;
        while ((match = looseRegex.exec(html)) !== null) {
            const block = match[0];
            const href = match[1];
            const title = match[2];

            const dayMatch = block.match(/class="d"[^>]*>(\d+)/);
            const yearMatch = block.match(/class="y"[^>]*>([^<]+)/);
            let date = '';
            if (dayMatch && yearMatch) {
                date = `${yearMatch[1].trim()}-${dayMatch[1]}`;
            }

            const sourceMatch = block.match(/class="source">([^<]*)<\/p>/);
            let author = '';
            if (sourceMatch) {
                author = sourceMatch[1].replace(/^来源[:：]/, '').trim();
            }

            const link = resolveUrl(href, baseDomain);
            if (title && link) {
                items.push({ title, link, date, author, thumbnail: '' });
            }
        }
    }
}

// Parse P8CMS news list (news-tit, news-date, news-summary, news-pic)
function parseP8cmsNewsList(html, baseDomain, items) {
    // Items are in <li class="clearfix"> with <a> wrapping
    const blockRegex = /<li[^>]*class="[^"]*clearfix[^"]*">[\s\S]*?<\/li>/g;
    let match;
    while ((match = blockRegex.exec(html)) !== null) {
        const block = match[0];

        // Extract href
        const hrefMatch = block.match(/<a\s+href="([^"]+)"/);
        if (!hrefMatch) continue;
        const link = resolveUrl(hrefMatch[1], baseDomain);

        // Extract title
        const titleMatch = block.match(/class="news-tit[^"]*"[^>]*>([\s\S]*?)<\/dt>/);
        const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim() : '';

        // Extract date
        const dateMatch = block.match(/class="news-date[^"]*"[^>]*>([\s\S]*?)<\/dd>/);
        const date = dateMatch ? dateMatch[1].replace(/<[^>]*>/g, '').trim() : '';

        // Extract thumbnail
        const imgMatch = block.match(/class="news-pic[^"]*"[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"/);
        let thumbnail = '';
        if (imgMatch) {
            thumbnail = imgMatch[1].startsWith('http') ? imgMatch[1] : (imgMatch[1].startsWith('/') ? baseDomain + imgMatch[1] : resolveUrl(imgMatch[1], baseDomain));
        }

        if (title && link) {
            items.push({ title, link, date, author: '', thumbnail });
        }
    }
}

// Parse zsjz_list1 (simple list: dd > a > div.tt + div.time)
function parseZsjzList(html, baseDomain, items) {
    // Extract list sections (zsjz_list1 or mtgz_list1) to avoid matching nav links
    const sectionRegex = /class="[^"]*(?:zsjz_list1|mtgz_list1)[^"]*"[^>]*>([\s\S]*?)<\/dl>/g;
    let sectionMatch;
    let sectionHtml = '';
    while ((sectionMatch = sectionRegex.exec(html)) !== null) {
        sectionHtml += sectionMatch[1];
    }
    if (!sectionHtml) sectionHtml = html;

    const ddRegex = /<dd>\s*<a\s+href="([^"]*)"[^>]*>([\s\S]*?)<\/a>\s*<\/dd>/g;
    let match;
    while ((match = ddRegex.exec(sectionHtml)) !== null) {
        const href = match[1];
        const content = match[2];
        const link = resolveUrl(href, baseDomain);

        // Extract title from div.tt
        const titleMatch = content.match(/class="tt[^"]*"[^>]*>([\s\S]*?)<\/div>/);
        const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim() : '';

        // Extract date from div.time
        const dateMatch = content.match(/class="time[^"]*"[^>]*>([\s\S]*?)<\/div>/);
        const date = dateMatch ? dateMatch[1].replace(/<[^>]*>/g, '').trim() : '';

        if (title && link) {
            items.push({ title, link, date, author: '', thumbnail: '' });
        }
    }
}

// Parse VSB sub-site wslb list
function parseVsbSubWslbList(html, baseDomain, items) {
    // Use full HTML and filter by article-like hrefs to avoid nested div section extraction issues
    const liRegex = /<li>\s*<a\s+href="([^"]*(?:info\/\d+|content-\d+)[^"]*\.(?:htm|html|shtml))"[^>]*>([\s\S]*?)<\/a>\s*<\/li>/g;
    let match;
    while ((match = liRegex.exec(html)) !== null) {
        const href = match[1];
        const content = match[2];
        const link = resolveUrl(href, baseDomain);

        // Extract title from h4
        const titleMatch = content.match(/<h4>([\s\S]*?)<\/h4>/);
        const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim() : '';

        // Extract date from div.wtime
        const dateMatch = content.match(/class="wtime"[^>]*>([\s\S]*?)<\/div>/);
        let date = '';
        if (dateMatch) {
            date = dateMatch[1].replace(/<[^>]*>/g, '').trim();
        }

        // Extract thumbnail
        const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
        let thumbnail = '';
        if (imgMatch) {
            thumbnail = imgMatch[1].startsWith('http') ? imgMatch[1] : (imgMatch[1].startsWith('/') ? baseDomain + imgMatch[1] : resolveUrl(imgMatch[1], baseDomain));
        }

        if (title && link) {
            items.push({ title, link, date, author: '', thumbnail });
        }
    }
}

// Parse VSB sub-site timg-list (xgc, xyh)
function parseVsbSubTimgList(html, baseDomain, items) {
    // Use full HTML and filter by article-like hrefs
    const liRegex = /<li[^>]*>\s*<a\s+href="([^"]*(?:info\/\d+|content-\d+)[^"]*\.(?:htm|html|shtml))"[^>]*>([\s\S]*?)<\/a>\s*<\/li>/g;
    let match;
    while ((match = liRegex.exec(html)) !== null) {
        const href = match[1];
        const content = match[2];
        const link = resolveUrl(href, baseDomain);

        // Extract title from h3/i
        const titleMatch = content.match(/<h3[^>]*><i>([\s\S]*?)<\/i><\/h3>/) || content.match(/<h3[^>]*>([\s\S]*?)<\/h3>/);
        const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim() : '';

        // Extract date from span
        const dateMatch = content.match(/<span>(\d{4}-\d{2}-\d{2})<\/span>/);
        const date = dateMatch ? dateMatch[1] : '';

        // Extract thumbnail
        const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
        let thumbnail = '';
        if (imgMatch) {
            thumbnail = imgMatch[1].startsWith('http') ? imgMatch[1] : (imgMatch[1].startsWith('/') ? baseDomain + imgMatch[1] : resolveUrl(imgMatch[1], baseDomain));
        }

        if (title && link) {
            items.push({ title, link, date, author: '', thumbnail });
        }
    }
}

// Parse P8CMS cover box list (gjhzyjlc homepage)
function parseP8cmsCoverList(html, baseDomain, items) {
    // Parse big image items (news_cover_box2_list1_item1)
    const bigRegex = /<dd>\s*<a\s+href="([^"]*)"[^>]*>[\s\S]*?<div class="news_cover_box2_list1_item1">[\s\S]*?<div class="time[^"]*"[^>]*>([\s\S]*?)<\/div>[\s\S]*?<div class="tt[^"]*"[^>]*>([\s\S]*?)<\/div>[\s\S]*?<\/a>\s*<\/dd>/g;
    let match;
    while ((match = bigRegex.exec(html)) !== null) {
        const link = resolveUrl(match[1], baseDomain);
        const date = match[2].replace(/<[^>]*>/g, '').trim();
        const title = match[3].replace(/<[^>]*>/g, '').trim();

        // Extract thumbnail
        const imgMatch = match[0].match(/<img[^>]+src="([^"]+)"/);
        let thumbnail = '';
        if (imgMatch) {
            thumbnail = imgMatch[1].startsWith('/') ? baseDomain + imgMatch[1] : imgMatch[1];
        }

        if (title && link) {
            items.push({ title, link, date, author: '', thumbnail });
        }
    }

    // Parse small image items (news_cover_box2_r_list)
    const smallRegex = /<dd>\s*<a\s+href="([^"]*)"[^>]*>[\s\S]*?class="news_cover_box2_r_list_tt[^"]*"[^>]*>([\s\S]*?)<\/div>[\s\S]*?class="news_cover_box2_r_list_time[^"]*"[^>]*>([\s\S]*?)<\/div>[\s\S]*?<\/a>\s*<\/dd>/g;
    while ((match = smallRegex.exec(html)) !== null) {
        const link = resolveUrl(match[1], baseDomain);
        const title = match[2].replace(/<[^>]*>/g, '').trim();
        const date = match[3].replace(/<[^>]*>/g, '').trim();

        // Extract thumbnail
        const imgMatch = match[0].match(/<img[^>]+src="([^"]+)"/);
        let thumbnail = '';
        if (imgMatch) {
            thumbnail = imgMatch[1].startsWith('/') ? baseDomain + imgMatch[1] : imgMatch[1];
        }

        if (title && link) {
            items.push({ title, link, date, author: '', thumbnail });
        }
    }

    // Also parse box3 items (news_cover_box3)
    const box3Regex = /<div class="news_cover_box3_l_list">[\s\S]*?<a\s+href="([^"]*)"[^>]*>[\s\S]*?class="news_cover_box3_l_t"[^>]*>([\s\S]*?)<\/div>[\s\S]*?<\/a>/g;
    while ((match = box3Regex.exec(html)) !== null) {
        const link = resolveUrl(match[1], baseDomain);
        const title = match[2].replace(/<[^>]*>/g, '').trim();

        // Try to find date
        const dateMatch = match[0].match(/class="news_cover_box3_r_list_time[^"]*"[^>]*>([\s\S]*?)<\/div>/) ||
                         match[0].match(/(\d{4}年\d{2}月\d{2}日)/);
        const date = dateMatch ? dateMatch[1].replace(/<[^>]*>/g, '').trim() : '';

        // Thumbnail
        const imgMatch = match[0].match(/<img[^>]+src="([^"]+)"/);
        let thumbnail = '';
        if (imgMatch) {
            thumbnail = imgMatch[1].startsWith('/') ? baseDomain + imgMatch[1] : imgMatch[1];
        }

        if (title && link) {
            items.push({ title, link, date, author: '', thumbnail });
        }
    }

    // Also parse any zsjz_list on the page
    if (items.length === 0 && html.includes('zsjz_list1')) {
        parseZsjzList(html, baseDomain, items);
    }
}

// Parse job site list
function parseJobList(html, baseDomain, listUrl, items) {
    // Extract category id from URL
    const nidMatch = listUrl.match(/nid-(\d+)/);
    const nid = nidMatch ? nidMatch[1] : '';

    // Parse list items: <li> with onclick="articleClick('False','articleId','categoryId',...)"
    const itemRegex = /<span class="reds">([^<]+)<\/span>\s*<span class="tim">([^<]+)<\/span>/g;
    const onclickRegex = /articleClick\('([^']+)','([^']+)','([^']+)',/g;

    let onclickMatches = [];
    let m;
    while ((m = onclickRegex.exec(html)) !== null) {
        onclickMatches.push(m[2]); // articleId
    }

    let itemMatches = [];
    let im;
    while ((im = itemRegex.exec(html)) !== null) {
        itemMatches.push({ title: im[1].trim(), date: im[2].trim() });
    }

    // Pair them up
    const count = Math.min(onclickMatches.length, itemMatches.length);
    for (let i = 0; i < count; i++) {
        const articleId = onclickMatches[i];
        const title = itemMatches[i].title;
        const date = itemMatches[i].date;
        const link = `${baseDomain}/module/newsdetail/id-${articleId}/nid-${nid}`;
        items.push({ title, link, date, author: '就业信息网', thumbnail: '' });
    }
}

// Fallback list parser
function parseFallbackList(html, baseDomain, items) {
    // Try to find any links to article pages
    const linkRegex = /<a\s+href="([^"]*(?:info\/\d+\/\d+|content-\d+)[^"]*\.(?:htm|html|shtml))"[^>]*>([\s\S]*?)<\/a>/gi;
    let match;
    while ((match = linkRegex.exec(html)) !== null) {
        const link = resolveUrl(match[1], baseDomain);
        const title = match[2].replace(/<[^>]*>/g, '').trim();
        if (title && title.length > 5 && link) {
            // Avoid duplicates
            if (!items.some(i => i.link === link)) {
                items.push({ title, link, date: '', author: '', thumbnail: '' });
            }
        }
    }
}

// ============================================================
// Parse article detail page - extract content, author, date, first image
// ============================================================
async function parseArticle(articleUrl) {
    const res = await fetch(articleUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; RSSWorker/1.0)' },
    });
    const html = await res.text();
    const baseDomain = getBaseDomain(articleUrl);

    let content = '';
    let author = '';
    let date = '';
    let firstImage = '';

    // Check if it's a job site article
    if (articleUrl.includes('job.zykj.edu.cn')) {
        // Job site article
        const contentMatch = html.match(/<div id="articleContent"[^>]*>([\s\S]*?)<\/div>/);
        if (contentMatch) {
            content = contentMatch[1].trim();
        }

        const authorMatch = html.match(/发布机构"[^>]*>[\s\S]*?<span>([^<]+)<\/span>/);
        if (authorMatch) author = decodeEntities(authorMatch[1]);

        const dateMatch = html.match(/发布时间"[^>]*>[\s\S]*?<span>([^<]+)<\/span>/);
        if (dateMatch) date = decodeEntities(dateMatch[1]);

        firstImage = getFirstImage(content, articleUrl);
        content = fixImageUrls(content, articleUrl);

        return { content, author, date, firstImage };
    }

    // VSB article (has vsb_content or v_news_content)
    const vsbMatch = html.match(/<div id="vsb_content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*(?:<script|<\/form|<div class="news_det_l_con|<div class="con_bot|$)/);
    if (!vsbMatch) {
        // Try v_news_content directly
        const vncMatch = html.match(/<div class="v_news_content"[^>]*>([\s\S]*?)<\/div>/);
        if (vncMatch) {
            content = vncMatch[1].trim();
        }
    } else {
        // Extract v_news_content from within vsb_content
        const vncMatch = vsbMatch[1].match(/<div class="v_news_content"[^>]*>([\s\S]*?)<\/div>/);
        if (vncMatch) {
            content = vncMatch[1].trim();
        } else {
            content = vsbMatch[1].trim();
        }
    }

    // If VSB content found, extract metadata
    if (content) {
        // Try news_det_l_date (main site and some sub-sites)
        const metaMatch = html.match(/class="news_det_l_date[^"]*"[^>]*>([\s\S]*?)<\/div>/);
        if (metaMatch) {
            const metaText = metaMatch[1];
            // Extract 作者 or 发布人
            const authorMatch = metaText.match(/(?:作者|发布人)[:：]([^<]*)/);
            if (authorMatch) author = decodeEntities(authorMatch[1].trim());
            // Extract 发布时间
            const dateMatch = metaText.match(/发布时间[:：]([^<]*)/);
            if (dateMatch) date = decodeEntities(dateMatch[1].trim());
            // Extract 来源
            const sourceMatch = metaText.match(/来源[:：]([^<]*)/);
            if (sourceMatch && !author) author = decodeEntities(sourceMatch[1].trim());
        }

        // Try news_det_sm (gjhzyjlc)
        if (!author || !date) {
            const smMatch = html.match(/class="news_det_sm[^"]*"[^>]*>([\s\S]*?)<\/div>/);
            if (smMatch) {
                const smText = smMatch[1];
                const authorMatch = smText.match(/发布人[:：]([^<]*)/);
                if (authorMatch) author = author || decodeEntities(authorMatch[1].trim());
                const dateMatch = smText.match(/发布时间[:：]([^<]*)/);
                if (dateMatch) date = date || decodeEntities(dateMatch[1].trim());
            }
        }

        // Try sxdiv (glxy and similar)
        if (!author || !date) {
            const sxMatch = html.match(/class="sxdiv"[^>]*>([\s\S]*?)<\/div>/);
            if (sxMatch) {
                const spans = sxMatch[1].match(/<span>([^<]*)<\/span>/g);
                if (spans) {
                    for (const span of spans) {
                        const text = span.replace(/<[^>]*>/g, '').trim();
                        if (text.match(/文\/|摄影\//)) {
                            if (!author) author = text;
                        } else if (text.match(/\d{4}-\d{2}-\d{2}/)) {
                            if (!date) date = text;
                        }
                    }
                }
            }
        }

        // Try n_con_tit area
        if (!author || !date) {
            const nctMatch = html.match(/class="n_con_tit"[^>]*>([\s\S]*?)<\/div>/);
            if (nctMatch) {
                const nctText = nctMatch[1];
                const authorMatch = nctText.match(/文\/([^\s<]+)/);
                if (authorMatch && !author) author = authorMatch[1];
            }
        }
    } else {
        // P8CMS article (detail-content or news_det_l_con)
        const dcMatch = html.match(/<div class="detail-content[^"]*"[^>]*>([\s\S]*?)(?:<\/div>\s*<div|<\/div>\s*<script|<\/div>\s*<dl|$)/);
        const ncMatch = html.match(/<div class="news_det_l_con[^"]*"[^>]*>([\s\S]*?)(?:<\/div>\s*<div|<\/div>\s*<script|<\/div>\s*<dl|$)/);

        if (dcMatch) {
            content = dcMatch[1].trim();
        } else if (ncMatch) {
            content = ncMatch[1].trim();
        }

        // If still no content, try a broader approach
        if (!content) {
            const broadMatch = html.match(/<div class="news_det_l_con[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<div class="news_det_l_con_end|<div class="con_bot|<script/g);
            if (broadMatch) {
                content = broadMatch[1].trim();
            }
        }

        // Extract metadata from sub-content or news_det_sm
        const subMatch = html.match(/class="sub-content[^"]*"[^>]*>([\s\S]*?)<\/div>/);
        if (subMatch) {
            const subText = subMatch[1];
            const authorMatch = subText.match(/发布人[:：]([^<]*)/);
            if (authorMatch) author = decodeEntities(authorMatch[1].trim());
            const dateMatch = subText.match(/发布时间[:：]([^<]*)/);
            if (dateMatch) date = decodeEntities(dateMatch[1].trim());
        }

        // Also try news_det_sm for P8CMS
        if (!author || !date) {
            const smMatch = html.match(/class="news_det_sm[^"]*"[^>]*>([\s\S]*?)<\/div>/);
            if (smMatch) {
                const smText = smMatch[1];
                const authorMatch = smText.match(/(?:作者|发布人)[:：]([^<]*)/);
                if (authorMatch) author = author || decodeEntities(authorMatch[1].trim());
                const dateMatch = smText.match(/发布时间[:：]([^<]*)/);
                if (dateMatch) date = date || decodeEntities(dateMatch[1].trim());
            }
        }

        // Try item divs with 作者/发布时间
        if (!author || !date) {
            const itemDivs = html.match(/<div class="item">[^<]*([^<]+)/g);
            if (itemDivs) {
                for (const div of itemDivs) {
                    const text = div.replace(/<[^>]*>/g, '').trim();
                    if (text.includes('作者') && !author) {
                        author = text.replace(/作者[:：]/, '').trim();
                    }
                    if (text.includes('发布时间') && !date) {
                        date = text.replace(/发布时间[:：]/, '').trim();
                    }
                    if (text.includes('发布人') && !author) {
                        author = text.replace(/发布人[:：]/, '').trim();
                    }
                }
            }
        }
    }

    // Get first image from content
    if (content) {
        firstImage = getFirstImage(content, articleUrl);
        content = fixImageUrls(content, articleUrl);
    }

    return { content, author, date, firstImage };
}

// ============================================================
// Main handler
// ============================================================
let deal = async (ctx) => {
    const routePath = ctx.req.path.replace(/^\/rss/, '');
    const config = ROUTES.find((r) => r.path === routePath);

    if (!config) {
        return ctx.text('Route not found', 404);
    }

    // Parse list page
    const listItems = await parseList(config.url);

    // Limit to 15 items to avoid timeout
    const limitedItems = listItems.slice(0, 15);

    // Fetch article details in parallel
    const deptName = config.name.split(' - ')[0];
    const detailedItems = await Promise.all(
        limitedItems.map(
            async (item) => {
                try {
                    const article = await parseArticle(item.link);
                    let description = article.content || item.summary || '';
                    let enclosure = undefined;

                    if (config.needCover) {
                        let coverUrl = '';
                        if (config.coverFromArticle) {
                            coverUrl = article.firstImage || '';
                        } else {
                            coverUrl = item.thumbnail || article.firstImage || '';
                        }
                        if (coverUrl) {
                            // Add cover image at the beginning of description
                            description = `<img src="${coverUrl}" /><br/>${description}`;
                            enclosure = {
                                url: coverUrl,
                                length: '0',
                                type: 'image/jpeg',
                            };
                        }
                    }

                    return {
                        title: item.title,
                        link: item.link,
                        description: description || '暂无内容',
                        pubDate: item.date || article.date || '',
                        author: article.author ? `${deptName}${article.author}` : (item.author ? `${deptName}${item.author}` : deptName),
                        enclosure,
                    };
                } catch (e) {
                    return {
                        title: item.title,
                        link: item.link,
                        description: item.summary || '内容获取失败',
                        pubDate: item.date || '',
                        author: deptName,
                    };
                }
            },
        ),
    );

    const data = {
        title: config.name,
        link: config.url,
        description: config.desc,
        language: 'zh-cn',
        image: getFavicon(config.url),
        items: detailedItems.filter((i) => i.title),
    };

    ctx.header('Content-Type', 'application/xml; charset=utf-8');
    return ctx.body(renderRss2(data));
};

// ============================================================
// Setup routes
// ============================================================
let setup = (route) => {
    for (const config of ROUTES) {
        route.get(config.path, deal);
    }
};

export default { setup };
