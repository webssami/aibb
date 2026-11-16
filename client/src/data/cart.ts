import type { Color } from './products';
export type CartOption = { collectionId: string; label: string; color: Color };
export type CartItem = { key: string; productId: string; name: string; price: number; image: string; options: CartOption[]; quantity: number };
const record = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;
const text = (value: unknown): value is string => typeof value === 'string' && value.length > 0;
function validOption(value: unknown): value is CartOption {
  if (!record(value) || !text(value.collectionId) || !text(value.label) || !record(value.color)) return false;
  const color = value.color;
  return text(color.id) && text(color.name) && text(color.group) && text(color.hex) && /^#[0-9a-f]{6}$/i.test(color.hex);
}
export function restoreCart(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((item): item is CartItem => record(item) && text(item.key) && text(item.productId) && text(item.name) && text(item.image) &&
    typeof item.price === 'number' && Number.isFinite(item.price) && item.price >= 0 &&
    typeof item.quantity === 'number' && Number.isSafeInteger(item.quantity) && item.quantity > 0 &&
    Array.isArray(item.options) && item.options.every(validOption));
}
