import { describe, expect, it } from 'vitest';
import { restoreCart } from './cart';
const valid = { key: 'blur:blur-01', productId: 'blur', name: '블러 틴 팟', price: 8500, image: '/media/blur.jpg', quantity: 1,
  options: [{ collectionId: 'blur', label: '블러', color: { id: 'blur-01', name: '체리', group: 'RED', hex: '#a93c40' } }] };
describe('장바구니 데이터 복원', () => {
  it('정상 데이터는 옵션과 수량을 유지한다', () => { expect(restoreCart([valid])).toEqual([valid]); });
  it('손상된 중첩 옵션을 제외해 렌더 오류를 예방한다', () => {
    expect(restoreCart([{ ...valid, options: [null] }, { ...valid, options: [{}] }, { ...valid, options: [{ color: null }] }, valid])).toEqual([valid]);
  });
  it('비배열 및 잘못된 금액/수량을 제외한다', () => {
    expect(restoreCart(null)).toEqual([]);
    expect(restoreCart({})).toEqual([]);
    expect(restoreCart([{ ...valid, price: NaN }, { ...valid, quantity: 0 }])).toEqual([]);
  });
});
