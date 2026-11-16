import { describe, expect, it } from 'vitest';
import { products } from './products';
import { getLooks, lookbookCategories, lookbookLooks, nextLookIndex } from './lookbooks';

describe('룩북 데이터', () => {
  it('세 카테고리와 카테고리별 두 슬라이드를 제공한다', () => {
    expect(lookbookCategories.map(category => category.id)).toEqual(['blur', 'glow', 'syrup']);
    expect(lookbookLooks).toHaveLength(6);
    for (const category of lookbookCategories) {
      expect(getLooks(category.id)).toHaveLength(2);
      expect(getLooks(category.id).every(look => look.category === category.id)).toBe(true);
    }
  });

  it('모든 룩북 상품 참조가 기존 상품 ID를 사용한다', () => {
    const productIds = new Set(products.map(product => product.id));
    for (const look of lookbookLooks) {
      expect(look.image).toMatch(/^\/media\//);
      for (const product of look.products) {
        expect(productIds.has(product.productId)).toBe(true);
      }
    }
  });

  it('순환 인덱스는 양수, 음수 이동과 경계를 래핑한다', () => {
    expect(nextLookIndex(0, 1, 2)).toBe(1);
    expect(nextLookIndex(1, 1, 2)).toBe(0);
    expect(nextLookIndex(0, -1, 2)).toBe(1);
    expect(nextLookIndex(1, -3, 2)).toBe(0);
    expect(nextLookIndex(4, 5, 3)).toBe(0);
    expect(nextLookIndex(4, -5, 3)).toBe(2);
    expect(nextLookIndex(0, 1, 0)).toBe(0);
    expect(nextLookIndex(0, -1, -2)).toBe(0);
  });
});
