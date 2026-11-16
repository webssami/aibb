import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, X, ArrowUpRight } from 'lucide-react';
import { categories, getProducts, sortOptions, type Category, type SortOrder } from '@/data/products';
import { useShop } from '@/contexts/ShopContext';
import ProductRow from '@/components/shop/ProductRow';
import { Link, useSearch } from 'wouter';

export default function Shop() {
  const [category, setCategory] = useState<Category>('all');
  const [order, setOrder] = useState<SortOrder>('newest');
  const { query, setQuery } = useShop();
  // 상단 메뉴(SHOP > LIP 등)에서 /shop?category=lip 으로 이동할 때마다 카테고리를 다시 맞춥니다.
  const search = useSearch();
  useEffect(() => {
    const requested = new URLSearchParams(search).get('category') as Category | null;
    if (requested && ['all', 'lip', 'base', 'acc', 'set'].includes(requested)) setCategory(requested);
  }, [search]);
  const visible = useMemo(() => getProducts(category, order, query), [category, order, query]);
  useEffect(() => {
    // 룩북 상품 카드 → /shop#product-blur 등의 앵커를 렌더 후 처리합니다.
    const anchor = window.location.hash.slice(1);
    if (!anchor.startsWith('product-')) return;
    const frame = requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView({ block: 'start', behavior: 'instant' }));
    return () => cancelAnimationFrame(frame);
  }, []);
  return <main className="shop-page">
    <div className="shop-heading"><div><div className="section-eyebrow"><span className="tiny-star">✦</span> COLLECTIBLE BEAUTY</div><h1>Shop your color<span>.</span></h1></div><p>오늘의 나를 표현하는 가장 작은 선택.<br /><strong>My color, My choice.</strong></p></div>
    <div className="shop-controls">
      <div className="category-tabs" role="tablist" aria-label="상품 카테고리">{categories.map(item => <button key={item.id} role="tab" aria-selected={category === item.id} onClick={() => setCategory(item.id)} className={category === item.id ? 'active' : ''}><span>{item.label}</span><small>{item.korean}</small></button>)}</div>
      <div className="sort-control"><select aria-label="상품 정렬" value={order} onChange={e => setOrder(e.target.value as SortOrder)}>{sortOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select><ChevronDown size={14} /></div>
    </div>
    <div className="catalog-heading"><div><h2>{query ? 'SEARCH RESULT' : `${category.toUpperCase()} PRODUCT`}<span>{String(visible.length).padStart(2, '0')}</span></h2>{query && <button className="search-chip" onClick={() => setQuery('')}>“{query}”<X size={12} /></button>}</div><span>작은 컬러 하나로, 더 나다운 하루.</span></div>
    <section className="product-list" aria-label="상품 목록" aria-live="polite">{visible.map(product => <ProductRow key={product.id} product={product} />)}{visible.length === 0 && <div className="empty-search"><h2>아직 찾는 컬러가 없네요.</h2><p>다른 상품명으로 검색하거나 전체 컬러를 만나보세요.</p><button className="primary-button" onClick={() => { setQuery(''); setCategory('all'); }}>전체 상품 보기</button></div>}</section>
    <div className="shop-endnote"><span className="tiny-star">✦</span><span>Color outside the lines.</span><Link href="/brand">에이쁘 이야기<ArrowUpRight size={15} /></Link></div>
  </main>;
}
