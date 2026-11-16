import { describe, expect, it } from 'vitest';
import { blur, glow, getProducts, products } from './products';

describe('사용자 지정 상품 데이터', () => {
  it('7개 상품과 지정 가격을 보존한다', () => {
    expect(products).toHaveLength(7);
    expect(products.map(p => p.price)).toEqual([8500, 8500, 10000, 12500, 15700, 2000, 10800]);
    expect(products.map(p => p.reviews)).toEqual([2, 5, 2, 3, 5, 2, 6]);
  });
  it('블러 26컬러 / 글로우 13컬러와 독립 세트 구성품을 제공한다', () => {
    expect(blur.colors).toHaveLength(26);
    expect(glow.colors).toHaveLength(13);
    expect(products.find(p => p.id === 'blur-syrup')?.collections.map(c => c.id)).toEqual(['blur', 'syrup']);
    expect(products.find(p => p.id === 'glow-brush')?.collections.map(c => c.id)).toEqual(['glow', 'brush']);
    const ids = products.flatMap(p =>
    p.collections.flatMap(c => (c.colors ?? []).map(color => color.id))
    );
    expect(new Set(ids).size).toBe(46);
  });
  it('카테고리별 지정 상품만 표시한다', () => {
    expect(getProducts('all', 'newest')).toHaveLength(7);
    expect(getProducts('lip', 'newest')).toHaveLength(3);
    expect(getProducts('base', 'newest')).toHaveLength(1);
    expect(getProducts('acc', 'newest')).toHaveLength(1);
    expect(getProducts('set', 'newest')).toHaveLength(2);
  });
  it('네 가지 정렬에서 출시일 / 실판매가 / 리뷰수를 사용한다', () => {
    expect(getProducts('all', 'newest')[0].id).toBe('syrup');
    expect(getProducts('all', 'price-low')[0].id).toBe('patch');
    expect(getProducts('all', 'price-high')[0].id).toBe('blur-syrup');
    expect(getProducts('all', 'reviews')[0].id).toBe('glow-brush');
  });
  it('한국어와 영문 검색이 동작한다', () => {
    expect(getProducts('all', 'newest', '블러').map(p => p.id)).toEqual(['blur-syrup', 'blur']);
    expect(getProducts('all', 'newest', 'lip syrup')[0].id).toBe('syrup');
    expect(getProducts('all', 'newest', '없는 상품')).toEqual([]);
  });
});
