import { Link } from 'wouter';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { products, formatPrice } from '@/data/products';

export default function Editorial({ type }: { type: 'event' | 'lookbook' | 'brand' }) {
  const event = type === 'event';
  const brand = type === 'brand';
  return <main className={`editorial-page ${event ? 'event-page' : ''} ${brand ? 'brand-page' : ''}`}>
    <Link className="back-link" href="/shop"><ArrowLeft size={15} /> SHOP으로 돌아가기</Link>
    <div className="editorial-heading"><span className="section-eyebrow">{event ? 'AIBB EVENT' : brand ? 'OUR BRAND STORY' : 'AIBB LOOKBOOK · 01'}</span><h1>{event ? 'COLOR DAYS' : brand ? 'Collectible Beauty.' : 'Soft & glow.'}<span>✦</span></h1><p>{event ? '취향을 모으는 시간, 나를 위한 작은 컬러.' : brand ? '정해진 틀 없이, 자유롭고 솔직하게.' : '부드럽게 물들고, 자연스럽게 빛나는 오늘.'}</p></div>
    {event ? <section className="event-detail"><div className="event-detail-copy"><span className="event-label">MY COLOR, MY CHOICE</span><h2>둘이 만나면,<br />더 나다운 조합.</h2><p>포슬한 블러와 반짝이는 립 시럽.<br />촉촉한 글로우와 섬세한 립 브러쉬.<br />취향을 담은 에이쁘의 세트를 만나보세요.</p><Link className="primary-button" href="/shop">컬러 조합 고르기<ArrowUpRight size={18} /></Link><small>이벤트 소개 샘플 · 세트별 할인율은 상품 데이터를 기준으로 표시합니다.</small></div><img src="/media/blur-syrup.jpg" alt="블러 틴 팟과 립 시럽 세트" /></section> : <section className="lookbook-detail"><img src="/media/lookbook.jpg" alt="부드러운 핑크 메이크업을 연출한 에이쁘 룩북" /><div><span className="section-eyebrow">{brand ? 'COLOR OUTSIDE THE LINES' : 'THE MOOD'}</span><h2>{brand ? <>나만의 컬러를,<br />나만의 방식으로.</> : <>있는 그대로의 나,<br />한 겹의 컬러.</>}</h2><p>{brand ? '에이쁘는 작은 컬러를 모으는 즐거움에서 시작합니다. 오늘의 기분에 맞는 색을 고르고, 나답게 표현해 보세요.' : '부드러운 컬러는 볼 위로 번지고, 은은한 광택은 입술 위로 스며들어요. 블러 틴 팟과 글로우 틴 팟으로 완성하는 가볍고 자유로운 메이크업.'}</p><Link href="/shop" className="text-link">나의 컬러 찾기<ArrowUpRight size={17} /></Link><small>리뉴얼 프로젝트용 룩북·브랜드 문구 샘플</small></div></section>}
    <section className="editorial-products"><h2>{event ? 'BETTER TOGETHER' : 'COLORS IN THIS LOOK'}<span>✦</span></h2><div>{products.filter(p => event ? p.category === 'set' : p.id === 'blur' || p.id === 'glow').map(product => <Link key={product.id} href="/shop" className="editorial-product"><img src={product.image} alt={product.name} /><div><h3>{product.name}</h3><p>{product.description}</p><strong>{product.discount && <span>{product.discount}% </span>}{formatPrice(product.price)}</strong></div><ArrowUpRight size={18} /></Link>)}</div></section>
  </main>;
}
