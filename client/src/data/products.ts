export type Category = 'all' | 'lip' | 'base' | 'acc' | 'set';
export type SortOrder = 'newest' | 'price-low' | 'price-high' | 'reviews';
export type Color = { id: string; name: string; hex: string; group: string; image?: string };
export type Collection = { id: string; label: string; fullName: string; colors?: Color[]; image: string };
export type Product = {
  id: string; name: string; english: string; price: number; originalPrice?: number;
  discount?: number; description: string; category: Exclude<Category, 'all'>;
  released: string; reviews: number; tags: string[]; image: string;
  collections: Collection[]; poster: string[];
};

// 수정 포인트 1: 색상명/HEX/그룹/이미지 경로는 모두 샘플입니다.
// 실제 컬러별 사진을 준비하면 각 Color의 image에 '/media/blur/01.jpg' 등을 입력하세요.
// public/media 파일은 기존 공식 상품 사진을 샘플로 사용합니다.
function colorList(prefix: string, groups: { group: string; values: [string, string][] }[]): Color[] {
  let index = 0;
  return groups.flatMap(({ group, values }) => values.map(([name, hex]) => ({
    id: `${prefix}-${String(++index).padStart(2, '0')}`, name, hex, group,
    // 아래 사진은 같은 제품 원본의 크롭 샘플이며 실제 컬러별 사진이 아닙니다.
    image: `/media/colors/${prefix}-${String(index).padStart(2, '0')}.jpg`,
  })));
}

export const blur: Collection = {
  id: 'blur', label: '블러', fullName: '블러 틴 팟', image: '/media/blur.jpg',
  colors: colorList('blur', [
    { group: 'RED', values: [['튤립', '#dd6567'], ['동백', '#cc5d62'], ['살사', '#a33f3d'], ['칠리', '#a14030'], ['페퍼', '#813d34']] },
    { group: 'ROSE', values: [['진저', '#d58d7f'], ['무화과', '#d57d78'], ['로즈', '#b96467'], ['피치', '#c76363'], ['파파야', '#cd796e']] },
    { group: 'PINK', values: [['리치', '#db7775'], ['딸기', '#d17783'], ['체리', '#a64b5c'], ['구아바', '#d6817a'], ['벚꽃', '#d97e7d'], ['무궁화', '#de858b'], ['백도', '#c56f6e'], ['황도', '#c77c77'], ['신비', '#bb6e80']] },
    { group: 'BROWN', values: [['아몬드', '#d38c7a'], ['초콜릿', '#946553'], ['시나몬', '#aa645c'], ['피칸', '#964d44'], ['감자', '#b67c78'], ['군밤', '#96615d'], ['고구마', '#894749']] },
  ]),
};
export const glow: Collection = {
  id: 'glow', label: '글로우', fullName: '글로우 틴 팟', image: '/media/glow.jpg',
  colors: colorList('glow', [
    { group: 'LIGHT', values: [['꿀 딸기', '#f67e88'], ['꿀 복숭아', '#e97070'], ['꿀 살구', '#e96a5c'], ['꿀 황도', '#f37076']] },
    { group: 'MIDDLE', values: [['꿀 장미', '#d97e7d'], ['꿀 사과', '#d57d78'], ['꿀 자몽', '#b96467'], ['꿀 백도', '#e66d80'], ['꿀 신비', '#e34870']] },
    { group: 'DEEP', values: [['꿀 포도', '#a64b5c'], ['꿀 대추', '#d6817a'], ['꿀 밤', '#cd796e'], ['꿀 체리', '#c76363']] },
  ]),
};
export const syrup: Collection = {
  id: 'syrup', label: '립 시럽', fullName: '립 시럽', image: '/media/syrup.jpg',
  colors: colorList('syrup', [
    { group: '01 모닝 시럽', values: [['모닝 시럽', '#ffffff']] },
    { group: '02 엔젤 시럽', values: [['엔젤 시럽', '#d5978e']] },
    { group: '03 도파민 시럽', values: [['도파민 시럽', '#d3050c']] },
    { group: '04 하트 시럽', values: [['하트 시럽', '#d94876']] },
    { group: '05 쿠키 시럽', values: [['쿠키 시럽', '#98615b']] },
  ]),
};
export const sun: Collection = {
  id: 'sun', label: '선 밀크', fullName: 'UV 톤업 선 밀크', image: '/media/sun.jpg',
  colors: colorList('sun', [{ group: '01 흰 우유', values: [['흰 우유', '#fff']] }, { group: '02 딸기 우유', values: [['딸기 우유', '#f7d5cc']] }]),
};
export const patch: Collection = {
  id: 'patch',
  label: '카밍 패치',
  fullName: '슬림 카밍 패치',
  image: '/media/patch.jpg',
};

export const brush: Collection = {
  id: 'brush',
  label: '브러쉬',
  fullName: '실리콘 립 브러쉬 미니',
  image: '/media/brush.jpg',
};

// 수정 포인트 2: 가격/설명/출시일/리뷰/어필태그/대표사진/소개 포스터를 이곳에서 수정합니다.
// 세트 추가 시 collections에 구성품을 넣으면 버튼/팔레트/필수 옵션이 자동 연결됩니다.
export const products: Product[] = [

  { id: 'blur', name: '블러 틴 팟', english: 'BLUR TIN POT', price: 8500, description: '닿는 순간 사르르- 스칠수록 섬세하게 번져요', category: 'lip', released: '2025-03', reviews: 2, tags: ['포슬포슬', '부드러운', '벨벳 텍스처'], image: '/media/blur-collection.jpg', collections: [blur], poster: ['/media/poster1/b1.jpg','/media/poster1/b2.gif','/media/poster1/b3.jpg','/media/poster1/b4.jpg','/media/poster1/b5.gif','/media/poster1/b6.jpg','/media/poster1/b7.jpg','/media/poster1/b8.jpg','/media/poster1/b9.jpg','/media/poster1/b10.jpg','/media/poster1/b11.jpg','/media/poster1/b12.jpg','/media/poster1/b13.gif','/media/poster1/b14.jpg'] },

  { id: 'glow', name: '글로우 틴 팟', english: 'GLOW TIN POT', price: 8500, description: '과즙에서 영감을 얻은 광택 립앤치크', category: 'lip', released: '2025-03', reviews: 5, tags: ['과즙 광택', '촉촉한', '립앤치크'], image: '/media/glow.jpg', collections: [glow], poster: ['/media/poster2/g1.jpg','/media/poster2/g2.jpg','/media/poster2/g3.jpg','/media/poster2/g4.gif','/media/poster2/g5.gif','/media/poster2/g6.jpg','/media/poster2/g7.jpg','/media/poster2/g8.jpg','/media/poster2/g9.jpg','/media/poster2/g10.jpg' ]},

  { id: 'syrup', name: '립 시럽', english: 'LIP SYRUP', price: 10000, description: '도파민 좌르르 고발색 립오일', category: 'lip', released: '2025-08', reviews: 2, tags: ['고발색', '유리알 광택', '도파민 충전'], image: '/media/syrup.jpg', collections: [syrup], poster: ['/media/poster3/d1.jpg','/media/poster3/d2.jpg','/media/poster3/d3.jpg','/media/poster3/d4.gif','/media/poster3/d5.jpg','/media/poster3/d6.jpg','/media/poster3/d7.jpg','/media/poster3/d8.gif','/media/poster3/d9.jpg','/media/poster3/d10.gif','/media/poster3/d11.jpg'] },

  { id: 'sun', name: 'uv 톤업 선 밀크', english: 'UV TONE-UP SUN MILK', price: 12500, description: '안 바른 듯 산뜻 초경량, 하루종일 리얼 롱웨어', category: 'base', released: '2025-04', reviews: 3, tags: ['초경량', '산뜻한', '리얼 롱웨어'], image: '/media/sun.jpg', collections: [sun], poster:['/media/poster4/s1.jpg','/media/poster4/s2.jpg','/media/poster4/s3.gif','/media/poster4/s4.jpg','/media/poster4/s5.gif','/media/poster4/s6.jpg','/media/poster4/s7.jpg','/media/poster4/s8.jpg','/media/poster4/s9.jpg','/media/poster4/s10.gif','/media/poster4/s11.jpg'] },

  { id: 'blur-syrup', name: '블러 + 립시럽', english: 'YOUR DAILY LIP DUO', price: 15700, originalPrice: 18500, discount: 15, description: '블러 1개 + 시럽 1개', category: 'set', released: '2025-05', reviews: 5, tags: [], image: '/media/blur-syrup.jpg', collections: [blur, syrup], poster:[ '/media/poster1/b1.jpg','/media/poster1/b2.gif','/media/poster1/b3.jpg','/media/poster1/b4.jpg','/media/poster1/b5.gif','/media/poster1/b6.jpg','/media/poster1/b7.jpg','/media/poster1/b8.jpg','/media/poster1/b9.jpg','/media/poster1/b10.jpg','/media/poster1/b11.jpg','/media/poster1/b12.jpg','/media/poster1/b13.gif','/media/poster1/b14.jpg','/media/poster3/d1.jpg','/media/poster3/d2.jpg','/media/poster3/d3.jpg','/media/poster3/d4.gif','/media/poster3/d5.jpg','/media/poster3/d6.jpg','/media/poster3/d7.jpg','/media/poster3/d8.gif','/media/poster3/d9.jpg','/media/poster3/d10.gif','/media/poster3/d11.jpg']},

  { id: 'patch', name: '슬림 카밍 패치', english: 'SLIM CALMING PATCH', price: 2000, description: '고민 부위를 귀엽게 빠르게 케어', category: 'acc', released: '2025-06', reviews: 2, tags: ['슬림 핏', '빠른 케어', '귀여운 포인트'], image: '/media/patch.jpg', collections: [patch], poster: ['/media/poster5/p1.jpg'] },

  { id: 'glow-brush', name: '글로우 틴 팟 + 실리콘 립 브러쉬 미니', english: 'GLOW & GO DUO', price: 10800, originalPrice: 13500, discount: 20, description: '글로우 1개 + 실리콘 브러쉬 1개', category: 'set', released: '2025-06', reviews: 6, tags: [], image: '/media/glow-brush.jpg', collections: [glow, brush], poster: ['/media/poster6/br1.jpg','/media/poster6/br2.jpg','/media/poster2/g1.jpg','/media/poster2/g2.jpg','/media/poster2/g3.jpg','/media/poster2/g4.gif','/media/poster2/g5.gif','/media/poster2/g6.jpg','/media/poster2/g7.jpg','/media/poster2/g8.jpg','/media/poster2/g9.jpg','/media/poster2/g10.jpg'] },

];

export const categories: { id: Category; label: string; korean: string }[] = [
  { id: 'all', label: 'ALL', korean: '전체' }, { id: 'lip', label: 'LIP', korean: '립' },
  { id: 'base', label: 'BASE', korean: '베이스' }, { id: 'acc', label: 'ACC', korean: '액세서리' },
  { id: 'set', label: 'SET', korean: '세트' },
];
export const sortOptions: { value: SortOrder; label: string }[] = [
  { value: 'newest', label: '신상품순' }, { value: 'price-low', label: '낮은 가격순' },
  { value: 'price-high', label: '높은 가격순' }, { value: 'reviews', label: '리뷰순' },
];
export const formatPrice = (price: number) => `${price.toLocaleString('ko-KR')}원`;
export function getProducts(category: Category, order: SortOrder, query = '') {
  return products.filter(p => (category === 'all' || p.category === category) &&
    (!query || `${p.name} ${p.english} ${p.description}`.toLowerCase().includes(query.toLowerCase())))
    .sort((a, b) => {
      if (order === 'price-low') return a.price - b.price;
      if (order === 'price-high') return b.price - a.price;
      if (order === 'reviews') return b.reviews - a.reviews;
      return b.released.localeCompare(a.released);
    });
}
