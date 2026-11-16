export type LookbookCategoryId = 'look1' | 'look2' | 'look3';

export type LookbookProduct = {
  productId: string;
  shadeName: string;
  shadeHex: string;
  note: string;
  image?: string;
};

export type LookbookLook = {
  id: string;
  category: LookbookCategoryId;
  mood: string;
  subtitle: string;
  image: string;
  imagePosition?: string;
  accent: string;
  products: LookbookProduct[];
};

export const lookbookCategories: {
  id: LookbookCategoryId;
  label: string;
  english: string;
  caption: string;
}[] = [
  { id: 'look1', label: '구황작물', english: 'Baked Harvest', caption: '우리가 찾던 진짜 브라운' },
  { id: 'look2', label: '#피치_못할_사람', english: 'Peach People', caption: '결국에는 찾게 될 나만의 피치' },
  { id: 'look3', label: '도파민 찾기', english: 'Find Dopamine', caption: '매일매일 새로운 도파민을 찾아 헤매는 당신에게!' },
];

// 샘플 shadeHex와 note는 편집용 컬러 가이드이며 실제 발색을 보증하지 않습니다.
// 보조 사용 제품은 공통 선 밀크 샘플입니다. 실제 각 화보에 사용된 제품으로 교체하세요.
const baseLookProduct: LookbookProduct = { productId: 'sun', shadeName: '1. 흰 우유', shadeHex: '#f2ead6', note: '가볍고 산뜻하게 완성하는 밀키 톤업' };

const patch: LookbookProduct = { productId: 'patch', shadeName: '슬림 카밍 패치', shadeHex: '#e43636', note: '신경 쓰이는 뾰루지에 나만의 포인트를 톡!'};

export const lookbookLooks: LookbookLook[] = [
  {
    id: 'blur-brown-01',
    category: 'look1',
    mood: 'WARM AUTUMN',
    subtitle: '고소하고 깊은 리얼 브라운 컬러',
    image: '/media/lookbooks/he_bl.png',
    imagePosition: 'center center',
    accent: '#532119',
    products: [
      { productId: 'blur', shadeName: '26. 고구마 버터', shadeHex: '#894749', note: '차분한 로지 브라운', image: '/media/blur.jpg' },
      { productId: 'blur', shadeName: '24. 감자 버터', shadeHex: '#b67c78', note: '포근한 베이지 브라운', image: '/media/blur.jpg' },
    ],
  },

  {
    id: 'blur-brown-02',
    category: 'look1',
    mood: 'WARM AUTUMN',
    subtitle: '고소하고 깊은 리얼 브라운 컬러',
    image: '/media/lookbooks/he_bl2.png',
    imagePosition: 'center center',
    accent: '#532119',
    products: [
      { productId: 'blur', shadeName: '25. 군밤 버터', shadeHex: '#96615d', note: '깊이감 있는 뉴트럴 브라운', image: '/media/blur.jpg' },
      baseLookProduct,
    ],
  },

  {
    id: 'glow-fresh-peach-01',
    category: 'look2',
    mood: 'FRESH PEACH',
    subtitle: '싱그럽고 폭닥한 핑크 LOOK',
    image: '/media/lookbooks/pe_gl.png',
    imagePosition: 'center center',
    accent: '#ef8b78',
    products: [
      { productId: 'glow', shadeName: '12. 꿀 황도', shadeHex: '#f37076', note: '부드러운 살구빛 코랄' },
      { productId: 'blur', shadeName: '21. 백도 버터', shadeHex: '#c56f6e', note: '뉴트럴 피치 핑크', image: '/media/blur.jpg' },
    ],
  },
  {
    id: 'glow-fresh-peach-02',
    category: 'look2',
    mood: 'FRESH PEACH',
    subtitle: '웃음처럼 번지는 말랑한 핑크 글로우',
    image: '/media/lookbooks/pe_gl2.jpg',
    imagePosition: 'center center',
    accent: '#ee9db3',
    products: [
      { productId: 'glow', shadeName: '11. 꿀 백도', shadeHex: '#e66d80', note: '뉴트럴 피치 핑크' },
      { productId: 'sun', shadeName: '2. 딸기 우유', shadeHex: '#f7d5cc', note: '맑게 생기를 더해주는 핑크 톤업',image: '/media/sun2.jpg' },
    ],
  },
  {
    id: 'syrup-dopamine-red-01',
    category: 'look3',
    mood: 'DOPAMINE RED',
    subtitle: '한 겹만으로 선명하게 차오르는 레드 시럽',
    image: '/media/lookbooks/do_lip.png',
    imagePosition: 'center center',
    accent: '#c02b37',
    products: [
      { productId: 'syrup', shadeName: '03. 도파민 시럽', shadeHex: '#c02b37', note: '선명하고 짜릿한 체리 레드' },
      patch,
    ],
  },
  {
    id: 'syrup-dopamine-red-02',
    category: 'look3',
    mood: 'DOPAMINE RED',
    subtitle: '입술 위에 맑은 핑크 유리막을 얹은 듯',
    image: '/media/lookbooks/do_lip2.png',
    imagePosition: 'center center',
    accent: '#c02b37',
    products: [
      { productId: 'blur', shadeName: '19. 칠리 버터', shadeHex: '#a14030', note: '딥 웜 레드', image: '/media/blur.jpg' },
      baseLookProduct,
    ],
  },
];

export function getLooks(category: LookbookCategoryId): LookbookLook[] {
  return lookbookLooks.filter(look => look.category === category);
}

export function nextLookIndex(current: number, delta: number, count: number): number {
  if (count <= 0) return 0;
  return ((current + delta) % count + count) % count;
}
