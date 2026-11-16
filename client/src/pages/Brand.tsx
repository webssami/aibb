import { ArrowLeft, ArrowUpRight, Instagram } from 'lucide-react';
import { Link } from 'wouter';
import './Brand.css';

// 수정 포인트: 브랜드 이미지 5장을 이 배열에서 교체하세요.
const brandSlides = [
  { image: '/home-assets/74309.png', label: 'COLLECTIBLE OBJECT', caption: '작은 컬러를 모으는 즐거움' },
  { image: '/home-assets/fc1b4.png', label: 'COLOR OUTSIDE THE LINES', caption: '정해진 틀 없이 자유롭게' },
  { image: '/home-assets/33ca9.png', label: 'MY COLOR, MY CHOICE', caption: '오늘의 나를 위한 컬러' },
  { image: '/home-assets/br1.png', label: 'AIBB DAILY COLOR', caption: '매일의 무드에 스며드는 컬러' },
  { image: '/home-assets/br2.png', label: 'PLAY WITH COLOR', caption: '나답게 고르고 솔직하게' },
];
const marqueeSlides = [...brandSlides, ...brandSlides];

export default function Brand() {
  return <main className="brand-page-new">
    <div className="brand-topline"><Link href="/"><ArrowLeft size={15} /> HOME</Link><span>OUR BRAND STORY</span></div>
    <section className="brand-hero-new">
      <div><span className="brand-kicker">AIBB COLOR ARCHIVE</span><h1>My Colors,<br /><em>My Choice!</em></h1><p>단 하나로 정의할 수 없는<br />나를 위한 컬러 브랜드</p></div>
    </section>
    <section className="brand-gallery" aria-label="AIBB 브랜드 이미지 슬라이드">
      <div className="brand-gallery-viewport"><div className="brand-gallery-track">{marqueeSlides.map((item, index) => <div className="brand-gallery-image" key={`${item.image}-${index}`}><img src={item.image} alt="AIBB 브랜드 이미지" /></div>)}</div></div>
    </section>
    <section className="brand-message"><span className="brand-kicker">COLLECTIBLE BEAUTY BRAND</span><h2><span className="brand-message-full">정해진 틀 없이 자유롭고 솔직하게<br />LOOK에 나만의 한 끗 차이를!</span><span className="brand-message-compact">정해진 틀 없이<br />자유롭고 솔직하게</span></h2><p>컬러를 고르는 순간부터 나를 표현하는 일이 시작됩니다.<br />에이쁘는 작은 컬러 하나로도 오늘의 기분과 취향을 담을 수 있다고 믿어요.</p><Link href="/shop" className="brand-cta">나의 컬러 찾기 <ArrowUpRight size={17} /></Link></section>
    <section className="brand-social-links"><h2>더 많은, 빠른 정보를 만나보세요 <span>☺</span></h2><a href="https://www.instagram.com/aibb_official/" target="_blank" rel="noreferrer"><span className="social-logo"><Instagram size={24} /></span><span>instagram</span><ArrowUpRight size={18} /></a><a href="https://x.com/" target="_blank" rel="noreferrer"><span className="social-logo x-logo">𝕏</span><span>X</span><ArrowUpRight size={18} /></a></section>
  </main>;
}
