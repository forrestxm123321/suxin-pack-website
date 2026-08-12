/**
 * 产品数据
 */
export interface Product {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  description: string;
  features: string[];
  specs: string[];
  image: string;
}

export const PRODUCT_CATEGORIES = [
  { id: 'vci-rustproof', label: 'VCI防锈袋系列', icon: 'shield' },
  { id: 'pe-bag', label: 'PE塑料袋系列', icon: 'package' },
  { id: 'pp-bag', label: 'PP塑料袋系列', icon: 'layers' },
  { id: 'specialty', label: '特种功能袋系列', icon: 'star' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'vci-flat-bag',
    name: 'VCI气相防锈平口袋',
    category: 'vci-rustproof',
    categoryLabel: 'VCI防锈袋系列',
    description:
      '采用VCI气相防锈技术，将防锈剂均匀分布在PE薄膜中，缓释挥发性防锈气体，在金属表面形成分子级保护层，有效防止锈蚀。适用于各类金属零部件、五金工具、精密轴承等产品的长期防锈包装。',
    features: [
      'VCI气相防锈，保护期长达2-5年',
      '无需涂油即可防锈，清洁环保',
      '透明度高，方便识别内装物',
      '可定制尺寸、厚度、颜色和印刷',
      '符合RoHS、REACH环保标准',
    ],
    specs: ['厚度：0.06mm-0.20mm', '宽度：100mm-3000mm', '颜色：透明/蓝色/绿色/黄色/定制'],
    image: '/images/vci-flat.jpg',
  },
  {
    id: 'vci-gusset-bag',
    name: 'VCI气相防锈方底袋',
    category: 'vci-rustproof',
    categoryLabel: 'VCI防锈袋系列',
    description:
      '方底袋（立体袋）结构，底部可展开成大容量空间，配合VCI防锈功能，专为大尺寸金属件、异形件设计。广泛应用于汽车配件、新能源电池组件、工程机械零部件的防锈包装。',
    features: [
      '方底立体结构，容量大',
      '底部可完全展开，装载方便',
      'VCI防锈功能，全封闭保护',
      '抗穿刺能力强，适合重载',
      '可定制尺寸、印刷公司Logo',
    ],
    specs: [
      '厚度：0.08mm-0.20mm',
      '宽度：300mm-2000mm',
      '长度：400mm-3000mm',
      '折边：50mm-300mm',
    ],
    image: '/images/vci-gusset.jpg',
  },
  {
    id: 'vci-zip-bag',
    name: 'VCI气相防锈拉链袋',
    category: 'vci-rustproof',
    categoryLabel: 'VCI防锈袋系列',
    description:
      '自带凹凸拉链封口，可重复开启和密封，配合VCI防锈功能，方便频繁取用。适用于需要反复存取的小型金属零件、检测样品、售后配件等场景。',
    features: [
      '拉链封口，可重复使用',
      'VCI防锈保护，随取随封',
      '取用方便，提升作业效率',
      '透明可视，快速识别',
      '多种厚度可选',
    ],
    specs: ['厚度：0.06mm-0.12mm', '宽度：60mm-400mm', '长度：80mm-600mm'],
    image: '/images/vci-zip.jpg',
  },
  {
    id: 'pe-flat-bag',
    name: 'PE平口袋',
    category: 'pe-bag',
    categoryLabel: 'PE塑料袋系列',
    description:
      '采用优质LDPE/HDPE原料吹膜制成，具有良好的柔韧性、耐低温性和防水防潮性能。广泛用于工业零部件、电子元器件、家居日用品的通用包装和防尘防潮保护。',
    features: [
      '柔韧性好，不易破损',
      '防水防潮，隔离外界污染',
      '透明度高，方便查看内容物',
      '食品级原料可选',
      '成本经济，通用性强',
    ],
    specs: ['厚度：0.03mm-0.15mm', '宽度：50mm-2000mm', '长度：支持定制', '原料：LDPE/HDPE/LLDPE'],
    image: '/images/pe-flat.jpg',
  },
  {
    id: 'pe-gusset-bag',
    name: 'PE方底袋（空白）',
    category: 'pe-bag',
    categoryLabel: 'PE塑料袋系列',
    description:
      'PE材质的方底立体袋，底部展开后空间大，适用于大尺寸、大容量物品的防尘防潮包装。汽车配件、家电外壳、家具组件等行业优选通用包装方案。',
    features: [
      '方底立体结构，装载量大',
      'PE材质，柔韧耐用',
      '防尘防潮效果好',
      '价格经济实惠',
      '支持印刷定制',
    ],
    specs: [
      '厚度：0.06mm-0.15mm',
      '宽度：300mm-2000mm',
      '长度：400mm-3000mm',
      '折边：50mm-300mm',
    ],
    image: '/images/pe-gusset.jpg',
  },
  {
    id: 'ziplock-bag',
    name: 'PE拉链袋（自封袋）',
    category: 'pe-bag',
    categoryLabel: 'PE塑料袋系列',
    description:
      '自带凹凸拉链封口，轻轻一按即可密封，无需封口机。适合小型零件分类包装、样品储存、日常收纳等多种场景。操作便捷，提升包装效率。',
    features: [
      '自带拉链，按压即封',
      '可重复开合使用',
      '透明清晰，内容物一目了然',
      '不占空间，收纳方便',
      '多种规格可选',
    ],
    specs: [
      '厚度：0.04mm-0.10mm',
      '宽度：40mm-400mm',
      '长度：60mm-600mm',
      '拉链类型：凹凸骨条式',
    ],
    image: '/images/ziplock.jpg',
  },
  {
    id: 'double-zip-vacuum',
    name: '双拉链真空袋',
    category: 'specialty',
    categoryLabel: '特种功能袋系列',
    description:
      '双层拉链密封结构，配合家用或工业吸尘器抽真空使用，创造几乎无氧的真空环境。卓越的防潮、防氧化效果，特别适合需要长期储存或海运出口的精密金属零件、电子元件等。',
    features: [
      '双拉链密封，真空度持久',
      '防潮防氧化效果极佳',
      '配合家用/工业吸尘器使用',
      '节省储存空间',
      '出口海运优选方案',
    ],
    specs: ['厚度：0.08mm-0.12mm', '宽度：150mm-600mm', '长度：200mm-800mm', '材质：PA+PE复合'],
    image: '/images/double-zip-vacuum.jpg',
  },
  {
    id: 'aluminum-foil-bag',
    name: '铝铂袋（铝箔袋）',
    category: 'specialty',
    categoryLabel: '特种功能袋系列',
    description:
      '采用铝箔复合材料制成，具有极佳的阻光、阻氧、阻湿性能。适用于对光、氧、潮气敏感的电子元器件、精密机械零件、化学原料等产品的真空或防潮密封包装。',
    features: [
      '完全阻光，保护光敏产品',
      '极佳的阻氧阻湿性能',
      '支持抽真空密封',
      '金属质感外观，高档专业',
      '抗电磁干扰屏蔽功能',
    ],
    specs: [
      '厚度：0.10mm-0.18mm',
      '宽度：100mm-1000mm',
      '长度：150mm-2000mm',
      '材质：PET+AL+PE复合',
    ],
    image: '/images/aluminum-foil.jpg',
  },
  {
    id: 'pp-woven-bag',
    name: 'PP编织袋',
    category: 'pp-bag',
    categoryLabel: 'PP塑料袋系列',
    description:
      '采用聚丙烯（PP）原料编织而成，强度高、承重能力强，适合重型工业产品的外包装。广泛应用于建材、化工原料、粮食饲料、五金工具等行业的运输包装。',
    features: [
      '强度高，承重可达50-100kg',
      '耐磨耐撕裂',
      '可覆膜防潮',
      '印刷效果好',
      '可回收利用',
    ],
    specs: [
      '克重：50g/㎡-200g/㎡',
      '宽度：350mm-1200mm',
      '长度：500mm-2000mm',
      '覆膜：可选内衬PE膜',
    ],
    image: '/images/pp-woven.jpg',
  },
  {
    id: 'pp-opp-bag',
    name: 'PP/OPP透明袋',
    category: 'pp-bag',
    categoryLabel: 'PP塑料袋系列',
    description:
      '采用OPP（双向拉伸聚丙烯）材质，透明度高、光泽度好，用于产品展示型包装。适用于五金挂卡、文具玩具、服装纺织等需要展示产品外观的包装场景。',
    features: [
      '透明度极高，展示效果好',
      '平整挺括，手感佳',
      '无毒无味，安全卫生',
      '印刷精美',
      '可自粘封口',
    ],
    specs: ['厚度：0.03mm-0.08mm', '宽度：30mm-500mm', '长度：50mm-800mm', '材质：OPP/CPP'],
    image: '/images/pp-opp.jpg',
  },
];
