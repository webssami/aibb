import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Heart, Palette, Pencil, ShoppingBag, Sparkles, UserRound } from 'lucide-react';
import { Link } from 'wouter';
import { products, formatPrice } from '@/data/products';
import { useShop } from '@/contexts/ShopContext';
import './Account.css';

type SavedColor = { label: string; phrase?: string; products?: { title: string; detail: string; image?: string }[]; savedAt?: string };
type Profile = { name: string; birthday: string; phone: string; email: string; address: string };
const profileKey = 'aibb-profile-v1';
const defaultProfile: Profile = { name: '홍길동', birthday: '1998. 04. 12', phone: '010-0000-0000', email: 'hello@aibb.co.kr', address: '나의 배송지를 등록해주세요' };

export default function MyPage() {
  const { cart, favorites } = useShop();
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [draft, setDraft] = useState<Profile>(defaultProfile);
  const [savedColor, setSavedColor] = useState<SavedColor | null>(null);
  const favoriteProducts = useMemo(() => products.filter(product => favorites.includes(product.id)), [favorites]);

  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem(profileKey);
      const storedColor = localStorage.getItem('aibb-color-result');
      if (storedProfile) { const next = { ...defaultProfile, ...JSON.parse(storedProfile) }; setProfile(next); setDraft(next); }
      if (storedColor) setSavedColor(JSON.parse(storedColor));
    } catch { /* localStorage가 없는 환경에서도 페이지는 표시 */ }
  }, []);

  const updateDraft = (key: keyof Profile, value: string) => setDraft(current => ({ ...current, [key]: value }));
  const saveProfile = () => { localStorage.setItem(profileKey, JSON.stringify(draft)); setProfile(draft); setEditing(false); };
  const clearSavedColor = () => { localStorage.removeItem('aibb-color-result'); setSavedColor(null); };

  return <main className="account-page">
    <div className="account-shell">
      <header className="account-hero"><div><span className="account-kicker"><Sparkles size={15} /> MY COLOR, MY SPACE</span><h1 className="account-hero-h1">안녕하세요, <em>{profile.name}</em>님.</h1><p>오늘의 기분도, 좋아하는 컬러도 이곳에 모아둘게요.</p></div></header>

      <section className="profile-card" aria-labelledby="profile-title">
        <div className="profile-card-heading"><div><span className="section-eyebrow"><UserRound size={14} /> PROFILE</span><h2 id="profile-title">나의 회원 정보</h2></div><button className="text-action" onClick={() => setEditing(current => !current)}><Pencil size={15} /> {editing ? '닫기' : '정보 수정'}</button></div>
        {editing ? <div className="profile-form">{([['name','이름'],['birthday','생년월일'],['phone','휴대전화'],['email','이메일'],['address','주소']] as [keyof Profile,string][]).map(([key,label]) => <label key={key}><span>{label}</span><input value={draft[key]} onChange={event => updateDraft(key, event.target.value)} /></label>)}<button className="primary-button" onClick={saveProfile}>변경사항 저장하기 <ArrowUpRight size={16} /></button></div> : <div className="profile-grid"><div><span>이름</span><strong>{profile.name}</strong></div><div><span>생년월일</span><strong>{profile.birthday}</strong></div><div><span>휴대전화</span><strong>{profile.phone}</strong></div><div><span>이메일</span><strong>{profile.email}</strong></div><div className="profile-wide"><span>주소</span><strong>{profile.address}</strong></div></div>}
      </section>

      <section className="orders-section" aria-labelledby="orders-title"><div className="section-title-row"><div><span className="section-eyebrow"><ShoppingBag size={14} /> MY ORDER</span><h2 id="orders-title">주문 현황</h2></div><Link className="text-action" href="/service">주문 도움말 <ArrowUpRight size={15} /></Link></div><div className="order-statuses">{[['입금 전','0'],['배송 준비중','0'],['배송 중','0'],['배송 완료','0']].map(([label,count], index) => <div className="order-status" key={label}><strong>{count}</strong><span>{label}</span>{index < 3 && <i />}</div>)}</div><div className="order-links"><span>취소 <b>0</b></span><span>교환 <b>0</b></span><span>반품 <b>0</b></span></div></section>

      <section className="color-archive" aria-labelledby="color-title"><div className="section-title-row"><div><span className="section-eyebrow"><Heart size={14} /> MY COLOR</span><h2 id="color-title">나의 컬러 보관함</h2></div><Link className="text-action" href="/shop">컬러 더 찾기 <ArrowUpRight size={15} /></Link></div><div className="archive-grid"><article className="archive-card favorite-card"><div className="archive-card-head"><h3>관심상품</h3><Heart size={18} /></div>{favoriteProducts.length ? <div className="archive-products">{favoriteProducts.slice(0, 2).map(product => <Link href="/shop" key={product.id}><img src={product.image} alt={product.name} /><span>{product.name}</span><small>{formatPrice(product.price)}</small></Link>)}</div> : <div className="archive-empty"><Heart size={26} /><p>아직 찜한 컬러가 없어요.</p><Link href="/shop">SHOP에서 골라보기 <ArrowUpRight size={14} /></Link></div>}</article><article className="archive-card"><div className="archive-card-head"><h3>구매한 상품</h3><ShoppingBag size={18} /></div><div className="archive-empty"><ShoppingBag size={26} /><p>첫 컬러 쇼핑을 시작해보세요.</p><Link href="/shop">BEST 컬러 보기 <ArrowUpRight size={14} /></Link></div></article><article className="archive-card test-card"><div className="archive-card-head"><h3>컬러 테스트</h3><Palette size={18} /></div>{savedColor ? <div className="saved-test"><span className="saved-test-label">{savedColor.label}</span><p>{savedColor.phrase || '나에게 어울리는 컬러 조합을 저장했어요.'}</p>{savedColor.products?.slice(0, 2).map(item => <div className="saved-reco" key={item.title}>{item.image && <img src={item.image} alt="" />}<span><b>{item.title}</b><small>{item.detail}</small></span></div>)}<button className="clear-saved" onClick={clearSavedColor}>저장 결과 지우기</button></div> : <div className="archive-empty"><Palette size={26} /><p>홈에서 나만의 추구미를 찾아보세요.</p><Link href="/#color-test">10초 테스트 하기 <ArrowUpRight size={14} /></Link></div>}</article></div></section>

      <section className="account-shortcuts"><Link href="/cart"><ShoppingBag size={18} /><span>장바구니</span><b>{cart.reduce((sum, item) => sum + item.quantity, 0)}</b><ArrowUpRight size={15} /></Link><Link href="/notice"><span>NOTICE</span><b>새 소식과 배송 안내</b><ArrowUpRight size={15} /></Link><Link href="/service"><span>FAQ</span><b>자주 묻는 질문</b><ArrowUpRight size={15} /></Link></section>
    </div>
  </main>;
}
