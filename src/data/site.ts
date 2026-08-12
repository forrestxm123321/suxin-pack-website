/**
 * 全站配置数据
 */
export const SITE = {
  name: '厦门塑鑫包装科技有限公司',
  shortName: '塑鑫包装',
  tagline: 'VCI气相防锈袋源头生产厂家',
  description:
    '厦门塑鑫包装科技有限公司是专业VCI气相防锈袋源头生产厂家，自有吹膜、印刷、制袋全套生产线。主营防锈平口袋、防锈方底袋、PE袋、PP袋、拉链袋、真空袋、铝铂袋等工业包装袋，为汽配、新能源、五金、模具等行业提供一站式工业包装解决方案。',
  url: 'https://suxin-pack.pages.dev',
  email: 'info@suxinpack.com',
  phone: '138-XXXX-XXXX', // 替换为实际电话
  address: '福建省厦门市',
  icp: '', // ICP备案号，备案后填写
};

/**
 * 导航链接（产品中心含下拉子菜单）
 */
export const NAV_LINKS = [
  { label: '首页', href: '/' },
  {
    label: '产品中心',
    href: '/products/',
    children: [
      { label: 'VCI防锈袋系列', href: '/products/#vci-rustproof' },
      { label: 'PE塑料袋系列', href: '/products/#pe-bag' },
      { label: 'PP塑料袋系列', href: '/products/#pp-bag' },
      { label: '特种功能袋系列', href: '/products/#specialty' },
    ],
  },
  { label: '客户案例', href: '/cases/' },
  { label: '关于我们', href: '/about/' },
  { label: '技术文章', href: '/blog/' },
  { label: '联系我们', href: '/contact/' },
];

/**
 * 首页优势亮点
 */
export const ADVANTAGES = [
  {
    icon: 'factory',
    title: '源头生产厂家',
    description: '自有吹膜、印刷、制袋全套生产线，自产自销，省去中间环节，价格实在。',
  },
  {
    icon: 'shield',
    title: 'VCI防锈技术',
    description: '专业气相防锈包装技术，为金属零部件提供长效防锈保护，替代传统涂油工艺。',
  },
  {
    icon: 'truck',
    title: '交期快速',
    description: '全链条自主生产，产能充足，响应迅速，常规订单快至3-5天交付。',
  },
  {
    icon: 'leaf',
    title: '环保合规出口',
    description: '产品符合RoHS、REACH等国际环保标准，适配出口需求，助力企业绿色供应链。',
  },
  {
    icon: 'tools',
    title: '一站式解决方案',
    description: '覆盖防锈、防潮、防尘全场景包装需求，提供定制化尺寸、厚度、印刷方案。',
  },
  {
    icon: 'badge',
    title: '品质可靠',
    description: '严选原料，全程品控，产品性能稳定可靠，服务汽配、新能源等行业头部客户。',
  },
];

/**
 * 公司数据（关于我们页）
 */
export const COMPANY_STATS = [
  { value: '15+', label: '年行业经验' },
  { value: '5000+', label: '厂房面积（㎡）' },
  { value: '1000+', label: '服务客户数' },
  { value: '99.8%', label: '客户满意度' },
];

/**
 * 生产工艺流程
 */
export const PRODUCTION_FLOW = [
  { step: '01', title: '原料检验', desc: '精选优质LDPE/HDPE原料，VCI防锈剂严格检测入厂' },
  { step: '02', title: '吹膜成型', desc: '多层共挤吹膜，VCI在线添加，精确控制薄膜厚度和性能' },
  { step: '03', title: '印刷定制', desc: '高速柔版印刷，支持单色至多色，Logo和产品信息清晰牢固' },
  { step: '04', title: '制袋成型', desc: '全自动制袋生产线，平口袋/方底袋/拉链袋/真空袋多袋型兼容' },
  { step: '05', title: '质量检测', desc: '在线质检+抽检双保险，焊缝强度、厚度均匀性、防锈性能逐项把关' },
  { step: '06', title: '打包出货', desc: '标准化打包，标签清晰，快速物流直达客户' },
];

/**
 * 服务行业
 */
export const INDUSTRIES = [
  { name: '汽车零部件', icon: 'car', desc: '发动机缸体、变速器齿轮、刹车盘、轴承防锈包装' },
  { name: '新能源电池', icon: 'battery', desc: '电池极片、汇流排、电池壳体防锈防潮保护' },
  { name: '五金工具', icon: 'wrench', desc: '螺丝螺母、弹簧、刀具、量具通用防锈包装' },
  { name: '精密模具', icon: 'cube', desc: '注塑模具、冲压模具封存防锈方案' },
  { name: '电箱电柜', icon: 'bolt', desc: '铜排、接线端子、开关器件防锈防尘包装' },
  { name: '工程机械', icon: 'cog', desc: '液压缸、活塞杆、大型齿轮出口防锈包装' },
];

/**
 * 关键词（用于SEO）
 */
export const KEYWORDS = [
  'VCI气相防锈袋',
  '防锈塑料包装袋',
  '防锈平口袋',
  '防锈方底袋',
  'PE袋',
  'PP袋',
  '工业包装袋',
  '塑料包装袋厂家',
  '厦门塑鑫包装',
  '拉链袋',
  '真空袋',
  '铝铂袋',
  '气相防锈包装',
  '防潮防锈包装',
  '五金防锈包装',
  '汽车零部件防锈',
  '新能源防锈包装',
];
