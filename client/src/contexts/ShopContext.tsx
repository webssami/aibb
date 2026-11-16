import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { toast } from 'sonner';
import type { Product } from '@/data/products';
import { restoreCart, type CartItem, type CartOption } from '@/data/cart';

type ShopState = {
  cart: CartItem[];
  addToCart: (product: Product, options: CartOption[], quantity?: number) => void;
  changeQuantity: (key: string, delta: number) => void; removeItem: (key: string) => void;
  favorites: string[]; toggleFavorite: (id: string) => void;
  query: string; setQuery: (query: string) => void;
};
const ShopContext = createContext<ShopState | null>(null);
const STORAGE_KEY = 'aibb-shop-cart-v1';
function readCart(): CartItem[] {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return restoreCart(raw);
  } catch { return []; }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(readCart);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  useEffect(() => {
    // 수정 포인트: 실제 쇼핑몰 API 연결 시 이 로컬 저장을 장바구니 API로 교체하세요.
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch { /* 저장 불가 환경에서는 메모리 유지 */ }
  }, [cart]);
  function addToCart(product: Product, options: CartOption[], quantity = 1) {
const requiredCollections = product.collections.filter(
  collection => collection.colors && collection.colors.length > 0
);

if (
  options.length !== requiredCollections.length ||
  requiredCollections.some((collection, index) =>
    options[index]?.collectionId !== collection.id ||
    !collection.colors?.some(color => color.id === options[index]?.color.id)
  )
) {
  toast.error('구성품의 컬러를 모두 선택해 주세요.');
  return;
}
    const safeQuantity = Math.max(1, Math.floor(quantity));
    const key = `${product.id}:${options.map(option => option.color.id).join('|') || 'no-option'}`;
    setCart(current => {
      const existing = current.find(item => item.key === key);
      if (existing) return current.map(item => item.key === key ? { ...item, quantity: item.quantity + safeQuantity } : item);
      return [...current, { key, productId: product.id, name: product.name, price: product.price, image: product.image, options, quantity: safeQuantity }];
    });
    toast.success('나만의 컬러를 장바구니에 담았어요.', {
      description: product.name,
      action: { label: '장바구니 보기', onClick: () => window.location.assign('/cart') },
    });
  }
  const changeQuantity = (key: string, delta: number) => setCart(current => current.map(item => item.key === key ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  const removeItem = (key: string) => setCart(current => current.filter(item => item.key !== key));
  const toggleFavorite = (id: string) => setFavorites(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  return <ShopContext.Provider value={{ cart, addToCart, changeQuantity, removeItem, favorites, toggleFavorite, query, setQuery }}>{children}</ShopContext.Provider>;
}
export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error('ShopProvider 안에서 useShop을 사용하세요.');
  return context;
}
