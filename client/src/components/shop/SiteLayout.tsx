import { useEffect, useState, type FormEvent } from 'react';
import { Link, useLocation } from 'wouter';
import {
  Search,
  UserRound,
  ShoppingBag,
  Menu,
  X,
  Instagram,
  ArrowUpRight,
  ChevronDown
} from 'lucide-react';

import { useShop } from '@/contexts/ShopContext';

// 수정 포인트: 기존 메인 HTML의 상단 영역은 Header 컴포넌트만 교체하면 됩니다.
export function Wordmark({ inverted = false, src = '/media/logo.png' }: { inverted?: boolean; src?: string }) {
  return <img className={`wordmark logo-image ${inverted ? 'inverted' : ''}`} src={src} alt="AIBB" />;
}
export function Header() {
  const [location, navigate] = useLocation();
  const { cart, query, setQuery } = useShop();
  const [search, setSearch] = useState(query);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  useEffect(() => { setSearch(query); }, [query]);
  const submitSearch = (event: FormEvent) => { event.preventDefault(); setQuery(search.trim()); navigate('/shop'); setMobileOpen(false); };
  const links = [ ['SHOP', '/shop'], ['LOOKBOOK', '/lookbook'], ['BRAND', '/brand'], ['EVENT', '/event'], ['CUSTOMER SERVICE', '/notice'] ];
  return <>
    <div className="announcement">My color, My choice. <span>나만의 컬러, 나만의 에이쁘.</span><span className="announcement-star">✦</span></div>
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="logo-link" aria-label="AIBB shop 홈"><Wordmark /></Link>
<nav
  className={`main-nav ${mobileOpen ? 'mobile-open' : ''}`}
  aria-label="메인 메뉴"
>
  {links.map(([label, href]) => {
    const active =
      label === 'SHOP'
        ? location.startsWith('/shop')
        : label === 'CUSTOMER SERVICE'
        ? location.startsWith('/notice') || location.startsWith('/service')
        : location.startsWith(
            href.split('/')[1] ? '/' + href.split('/')[1] : href
          );

    const submenu =
      label === 'SHOP'
        ? [
            ['ALL', '/shop?category=all'],
            ['LIP', '/shop?category=lip'],
            ['BASE', '/shop?category=base'],
            ['ACC', '/shop?category=acc'],
            ['SET', '/shop?category=set']
          ]
        : label === 'CUSTOMER SERVICE'
        ? [
            ['NOTICE', '/notice'],
            ['FAQ', '/service']
          ]
        : null;

    const isMobileSubmenuOpen = mobileOpenDropdown === label;

    return (
      <div
        key={label}
        className={`main-nav-item ${submenu ? 'has-submenu' : ''}`}
        onMouseEnter={() => submenu && setOpenDropdown(label)}
        onMouseLeave={() => submenu && setOpenDropdown(null)}
      >
        <Link
          href={href}
          onClick={() => {
  setMobileOpen(false);
  setMobileOpenDropdown(null);
  setOpenDropdown(null);
}}
          className={active ? 'active' : ''}
        >
          {label}
        </Link>

        {submenu && (
          <button
            type="button"
            className={`mobile-submenu-toggle ${
              isMobileSubmenuOpen ? 'is-open' : ''
            }`}
            aria-label={`${label} 세부 메뉴`}
            aria-expanded={isMobileSubmenuOpen}
            onClick={() =>
              setMobileOpenDropdown(
                isMobileSubmenuOpen ? null : label
              )
            }
          >
            <ChevronDown size={17} />
          </button>
        )}

        {submenu && (
          <div
            className={`main-nav-dropdown ${
              openDropdown === label || isMobileSubmenuOpen
                ? 'is-open'
                : ''
            }`}
          >
            {submenu.map(([subLabel, subHref]) => (
              <Link
                key={subLabel}
                href={subHref}
                onClick={() => {
                  setMobileOpen(false);
                  setMobileOpenDropdown(null);
                  setOpenDropdown(null);
                }}
              >
                {subLabel}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  })}

  
{/* 모바일 전용 추가 메뉴 */}
<div className="mobile-nav-extra">
  <Link
    href="/mypage"
    onClick={() => {
      setMobileOpen(false);
      setMobileOpenDropdown(null);
      setOpenDropdown(null);
    }}
  >
    MY PAGE
  </Link>

  <Link
    href="/cart"
    onClick={() => {
      setMobileOpen(false);
      setMobileOpenDropdown(null);
      setOpenDropdown(null);
    }}
  >
    CART
    <span>{count}</span>
  </Link>
</div>
</nav>

<div className="header-tools">
  <form className="search-field" onSubmit={submitSearch} role="search">
    <input
      aria-label="상품 검색"
      placeholder="나의 컬러 찾기"
      value={search}
      onChange={e => {
        setSearch(e.target.value);
        if (!e.target.value) setQuery('');
      }}
    />
    <button type="submit" aria-label="검색">
      <Search size={17} strokeWidth={1.6} />
    </button>
  </form>

  <Link href="/mypage" className="icon-button account-button" aria-label="마이페이지">
    <UserRound size={23} strokeWidth={1.5} />
  </Link>

  <Link href="/cart" className="icon-button cart-trigger" aria-label={`장바구니 ${count}개`}>
    <ShoppingBag size={23} strokeWidth={1.5} />
    <span className="cart-count">{count}</span>
  </Link>

  <button
    className="icon-button mobile-menu"
    onClick={() => {
      setMobileOpen(!mobileOpen);
      setMobileOpenDropdown(null);
    }}
    aria-label={mobileOpen ? '메뉴 닫기' : '메뉴 열기'}
    aria-expanded={mobileOpen}
  >
    {mobileOpen ? <X size={23} /> : <Menu size={23} />}
  </button>
</div>
</div>
</header>
</>;
}

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-main">
      <div className="footer-brand"><Link href="/"><Wordmark src="/media/logo_black.png" /></Link><p>Collectible Beauty.<br />정해진 틀 없이, 나를 위한 컬러.</p><small>이 페이지는 aibb 리뉴얼 프로젝트 샘플입니다.</small></div>
      <div className="footer-center"><h3>CUSTOMER CENTER</h3><a href="tel:0328587784" className="footer-phone">032-858-7784</a><p>평일 10:00–17:00 (점심 12:00–13:00)<br />토·일·공휴일 휴무</p><div className="footer-pills"><Link href="/notice">NOTICE <ArrowUpRight size={13} /></Link><Link href="/service">FAQ <ArrowUpRight size={13} /></Link></div></div>
      <div className="footer-social"><h3>CONTACT & SOCIAL</h3><a href="mailto:aibb.mkt@bbia.co.kr">aibb.mkt@bbia.co.kr</a><a href="https://www.instagram.com/aibb_official/" target="_blank" rel="noreferrer" className="instagram-link"><Instagram size={17} /> @aibb_official <ArrowUpRight size={14} /></a><p>My color, My choice!</p></div>
    </div>
    <div className="footer-bottom"><div><Link href="/service?section=terms">이용약관</Link><Link href="/service?section=privacy">개인정보처리방침</Link><Link href="/service?section=shipping">이용안내</Link><Link href="/notice">공지사항</Link><Link href="/service">FAQ</Link></div><span>Copyright © AIBB. All Rights Reserved.</span></div>
  </footer>;
}
