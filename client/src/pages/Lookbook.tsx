import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { Link } from 'wouter';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { lookbookCategories, getLooks, nextLookIndex, type LookbookCategoryId } from '@/data/lookbooks';
import { products, formatPrice } from '@/data/products';
import { useShop } from '@/contexts/ShopContext';
import './Lookbook.css';
import { publicAsset } from '@/utils/publicAsset';

export default function Lookbook({ initialCategory = 'look1' }: { initialCategory?: LookbookCategoryId }) {

  const categoryBackground: Record<LookbookCategoryId, string> = {
  look1: '#f3e7dc', // 구황작물 — 베이지·브라운
  look2: '#ffe5eb', // 피치 — 피치·핑크
  look3: '#ffbaba', // 도파민 — 레드·로즈
};

  const [category, setCategory] = useState<LookbookCategoryId>(initialCategory);
  const [slideByCategory, setSlideByCategory] = useState<Record<LookbookCategoryId, number>>({ look1: 0, look2: 0, look3: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { setQuery } = useShop();
  useEffect(() => { setCategory(initialCategory); }, [initialCategory]);
  useEffect(() => {
    const previous = document.title;
    document.title = 'LOOKBOOK — AIBB | Color in real life';
    return () => { document.title = previous; };
  }, []);
  const looks = getLooks(category);
  const index = slideByCategory[category] < looks.length ? slideByCategory[category] : 0;
  const look = looks[index];
  const categoryInfo = lookbookCategories.find(item => item.id === category)!;
  const featured = look.products.flatMap(item => {
    const product = products.find(product => product.id === item.productId);
    return product ? [{ ...item, product }] : [];
  });
  const moveSlide = (delta: number) => setSlideByCategory(current => ({ ...current, [category]: nextLookIndex(index, delta, looks.length) }));
  function tabKeyboard(event: KeyboardEvent<HTMLButtonElement>, current: number) {
    let next = current;
    if (event.key === 'ArrowRight') next = (current + 1) % lookbookCategories.length;
    else if (event.key === 'ArrowLeft') next = (current + lookbookCategories.length - 1) % lookbookCategories.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = lookbookCategories.length - 1;
    else return;
    event.preventDefault();
    setCategory(lookbookCategories[next].id);
    tabRefs.current[next]?.focus();
  }

  return <main
  className="lb-page"
  style={
    {
      '--look-accent': look.accent,
      '--look-background': categoryBackground[category],
    } as CSSProperties
  }
>

    <div className="lb-background" aria-hidden="true" />
    <div className="lb-container">
      <div className="lb-intro"><span>LOOKBOOK <i /> COLOR IN REAL LIFE</span><p>컬러가 당신의 하루가 되는 순간.</p></div>
      <div className="lb-tabs" role="tablist" aria-label="룩북 카테고리">
        {lookbookCategories.map((item, tabIndex) => <button key={item.id} ref={node => { tabRefs.current[tabIndex] = node; }} id={`lb-tab-${item.id}`} role="tab" aria-selected={category === item.id} aria-controls="lb-panel" tabIndex={category === item.id ? 0 : -1} className={category === item.id ? 'active' : ''} onClick={() => setCategory(item.id)} onKeyDown={event => tabKeyboard(event, tabIndex)}><span>{item.label}</span><small>{item.english}</small></button>)}
      </div>
      <section className="lb-stage" role="tabpanel" id="lb-panel" aria-labelledby={`lb-tab-${category}`}>
        <figure className="lb-photo" tabIndex={0} aria-label={`${categoryInfo.label} ${look.mood} 룩북, ${index + 1}/${looks.length}. 좌우 방향키로 이동`} onKeyDown={event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); moveSlide(event.key === 'ArrowRight' ? 1 : -1); } }}>
          {/* 수정 포인트: 실제 세로 룩북 화보는 lookbooks.ts의 image/imagePosition에서 교체합니다. */}
          <img className="lb-hero-image" key={look.id} src={publicAsset(look.image)} alt={`${categoryInfo.label} — ${look.mood} 메이크업 화보 샘플`} style={{ objectPosition: look.imagePosition || 'center' }} fetchPriority="high" />
          <span className="lb-photo-label">AIBB LOOKBOOK <span>{categoryInfo.label}</span></span>
          <button className="lb-arrow prev" onClick={() => moveSlide(-1)} aria-label="이전 룩북" disabled={looks.length < 2}><ChevronLeft size={21} strokeWidth={1.5} /></button>
          <button className="lb-arrow next" onClick={() => moveSlide(1)} aria-label="다음 룩북" disabled={looks.length < 2}><ChevronRight size={21} strokeWidth={1.5} /></button>
          <figcaption className="lb-photo-caption"><span>MY COLOR, MY CHOICE.</span><strong>{look.mood}</strong><div className="lb-photo-counter"><span>{String(index + 1).padStart(2, '0')}</span><i /><span>{String(looks.length).padStart(2, '0')}</span></div></figcaption>
        </figure>
        <div className="lb-details" key={look.id}>
          <div className="lb-title-block"><span className="lb-eyebrow">THE COLOR EDIT <span>0{index + 1}</span></span><h1>{categoryInfo.english}</h1><div className="lb-mood"><span>LOOK</span><h2>— {look.mood}</h2></div><p>{look.subtitle}</p></div>
          <div className="lb-used-heading"><span>COLORS IN THIS LOOK</span></div>
          <div className="lb-used-products">
            {featured.map((item, itemIndex) => <Link key={`${look.id}-${item.productId}-${itemIndex}`} href={`/shop#product-${item.productId}`} className="lb-product" onClick={() => setQuery('')} aria-label={`${item.product.name} ${item.shadeName} 상품 보기`}>
              <div className="lb-product-photo"><img src={publicAsset(item.image || item.product.image)} alt={item.product.name} loading="lazy" /><span><ArrowUpRight size={14} /></span></div>
              <div className="lb-product-info"><h3>{item.product.name}</h3><div className="lb-shade"><i style={{ backgroundColor: item.shadeHex }} /><span>{item.shadeName}</span></div><p>{item.note}</p><div className="lb-product-link"><span>{formatPrice(item.product.price)}</span><span>상품 보기 <ArrowUpRight size={12} /></span></div></div>
            </Link>)}
          </div>
          <div className="lb-detail-end"><p>{categoryInfo.caption}</p></div>
        </div>
      </section>
      <div className="lb-bottom"><div className="lb-dots" aria-label="룩북 페이지 선택">{looks.map((item, page) => <button key={item.id} aria-label={`${page + 1}번째 ${item.mood} 룩 보기`} aria-current={page === index ? 'true' : undefined} className={page === index ? 'active' : ''} onClick={() => setSlideByCategory(current => ({ ...current, [category]: page }))} />)}</div><span>각자의 컬러, 각자의 무드.</span></div>
    </div>
  </main>;
}
