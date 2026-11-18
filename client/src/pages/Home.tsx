import React, { useEffect, useRef, useState } from "react"
import { Link } from 'wouter';
import { ArrowUpRight, Instagram } from 'lucide-react';
import { useShop } from '@/contexts/ShopContext';
import './Home.css';

const A = `${import.meta.env.BASE_URL}home-assets`

type ModalName = "color" | "simulation" | null

type HeroSlide = {
  image: string
  mobileImage: string
  badge: string
  title: string
  position: string
}

const heroSlides: HeroSlide[] = [
  {
    image: "aabae.png",
    mobileImage: "h1.png",
    badge: "NEW · LIP SYRUP",
    title: "바를 때마다, #도파민충전\nNEW 립 시럽 💗",
    position: "center",
  },
  {
    image: "82f06.png",
    mobileImage: "h2.png",
    badge: "EVENT",
    title: "가을 맞이\nSUPER SALE!",
    position: "center",
  },
  {
    image: "afe0f.png",
    mobileImage: "h3.png",
    badge: "NEW COLLECTION",
    title: "제대로 과몰입 해 만든\n피치 갤러리 에디션!",
    position: "center",
  },
  {
    image: "7ec53.png",
    mobileImage: "h4.png",
    badge: "BLUR TINT POT",
    title: "바를수록 가벼운\n블러 틴 팟",
    position: "center",
  },
  {
    image: "6fc37.png",
    mobileImage: "h5.png",
    badge: "GLOW LIP SYRUP",
    title: "너만의 립 시럽을\n뽐내 봐!",
    position: "center",
  },
]

const products = [
  {
    id: 'blur',
    image: "b5047.png",
    rank: 1,
    name: "블러 틴 팟",
    detail: "24 감자 버터",
    swatch: "#b67c78",
    sale: "6%",
    price: "8,000원",
    originalPrice: "8,500원",
  },
  {
    id: 'syrup',
    image: "d3d3b.png",
    rank: 2,
    name: "립 시럽",
    detail: "03 도파민 시럽",
    swatch: "#d3050c",
    sale: "5%",
    price: "9,500원",
    originalPrice: "10,000원",
  },
  {
    id: 'glow',
    image: "ad8da.png",
    rank: 3,
    name: "글로우 틴 팟",
    detail: "01 꿀 딸기",
    swatch: "#f67e88",
    sale: "",
    price: "8,500원",
    originalPrice: "",
  },
  {
    id: 'blur-syrup',
    image: "set_1.jpg",
    rank: 1,
    name: "[2SET] 블러 + 립 시럽",
    detail: "블러 1개 + 시럽 1개",
    sale: "15%",
    price: "15,700원",
    originalPrice: "18,500원",
    saving: "2,800원 절약",
  },
  {
    id: 'glow-brush',
    image: "set_2.png",
    rank: 2,
    name: "[SET] 블러 + 글로우 틴 팟",
    detail: "블러 1개 + 글로우 1개",
    sale: "12%",
    price: "15,000원",
    originalPrice: "17,000원",
    saving: "2,000원 절약",
  },
]

function RankingFavoriteButton({ product }: { product: { id: string; name: string } }) {
  const { favorites, toggleFavorite } = useShop();
  const favorite = favorites.includes(product.id);

  return (
    <button
      className={`favorite-heart${favorite ? ' is-favorite' : ''}`}
      aria-label={`${product.name} ${favorite ? '찜 해제' : '찜하기'}`}
      aria-pressed={favorite}
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleFavorite(product.id);
      }}
    >
      <span className="heart-outline">♡</span>
      <span className="heart-filled">♥</span>
    </button>
  );
}

const reviews = [
  {
    image: "8f2af.png",
    tags: ["#25 군밤 버터", "#블러 틴 팟"],
    note: "컬러 만족👍",
  },
  { image: "10a78.png", tags: ["#04 엔젤시럽", "#립시럽"], note: "촉촉해요💧" },
  {
    image: "445cf.png",
    tags: ["#02 꿀 사과", "#글로우 틴 팟"],
    note: "재구매함💸",
  },
]

const looks = [
{
  image: "look1.png",
  title: "LOOK 01 · 딸기 축제",
  products: [
    {
      name: "UV 톤업 선 밀크",
      detail: "02 딸기 우유",
      price: "13,000원",
      position: { x: 30, y: 80 },
    },
    {
      name: "글로우 틴 팟",
      detail: "01 꿀 딸기",
      price: "8,500원",
      position: { x: 50, y: 20 },
    },
  ],
},
  {
    image: "look2.png",
    title: "LOOK 02 · 구황작물",
    products: [
      {
        name: "블러 틴 팟",
        detail: "26 고구마 버터",
        price: "8,500원",
        position: { x: 45, y: 70 },
      },
      {
        name: "블러 틴 팟",
        detail: "24 감자 버터",
        price: "8,500원",
        position: { x: 65, y: 35 },
      },
    ],
  },
  {
    image: "look3.png",
    title: "LOOK 03 · 토마토 도파민",
    products: [
      {
        name: "립 시럽",
        detail: "03 도파민 시럽",
        price: "9,500원",
        position: { x: 30, y: 70},
      },
      {
        name: "슬림 카밍 패치",
        detail: "15패치 / 2장",
        price: "2,000원",
        position: { x: 67, y: 45},
      },
    ],
  },
  {
    image: "look4.png",
    title: "LOOK 04 · 말랑 살구",
    products: [
      {
        name: "글로우 틴 팟",
        detail: "06 꿀 살구",
        price: "8,500원",
        position: { x: 40, y: 70 },
      },
      {
        name: "UV 톤업 선 밀크",
        detail: "01 흰 우유",
        price: "13,000원",
        position: { x: 60, y: 45 },
      },
    ],
  },
];

function ArrowButton({
  children,
  onClick,
  light = false,
}: {
  children: React.ReactNode
  onClick?: () => void
  light?: boolean
}) {
  return (
    <button
      className={`pill-button ${light ? "pill-button--light" : ""}`}
      onClick={onClick}
    >
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </button>
  )
}

function Header({ openMenu }: { openMenu: () => void }) {
  const [dropdown, setDropdown] = useState<string | null>(null)
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="logo" href="#top" aria-label="AIBB 메인으로 이동">
          <img src={`/aibb/media/5763a.png`} alt="AIBB" />
        </a>
        <nav className="desktop-nav" aria-label="주요 메뉴">
          <div
            className="nav-item"
            onMouseEnter={() => setDropdown("shop")}
            onMouseLeave={() => setDropdown(null)}
          >
            <a href="#best">SHOP</a>
            <div
              className={`nav-dropdown shop-dropdown ${
                dropdown === "shop" ? "is-open" : ""
              }`}
            >
              {["ALL", "LIP", "BASE", "ACC", "SET"].map((item) => (
                <a key={item} href="#best">
                  {item}
                </a>
              ))}
            </div>
          </div>
          <a href="#lookbook">LOOKBOOK</a>
          <a href="#brand">BRAND</a>
          <a href="#color-test">EVENT</a>
          <div
            className="nav-item"
            onMouseEnter={() => setDropdown("service")}
            onMouseLeave={() => setDropdown(null)}
          >
            <a href="#footer">CUSTOMER SERVICE</a>
            <div
              className={`nav-dropdown ${
                dropdown === "service" ? "is-open" : ""
              }`}
            >
              <a href="#footer">NOTICE</a>
              <a href="#footer">FAQ</a>
            </div>
          </div>
        </nav>
        <div className="header-actions">
          <label className="search-box">
            <span className="sr-only">검색</span>
            <input type="search" placeholder="검색" />
            <img src={`${A}/d152e.svg`} alt="" />
          </label>
          <div
            className="nav-item account"
            onMouseEnter={() => setDropdown("account")}
            onMouseLeave={() => setDropdown(null)}
          >
            <button aria-label="회원 메뉴">
              <img src={`${A}/99498.svg`} alt="" />
            </button>
            <div
              className={`nav-dropdown icon-dropdown ${
                dropdown === "account" ? "is-open" : ""
              }`}
            >
              <a href="#footer">MY PAGE</a>
              <a href="#footer">MY ORDER</a>
              <a href="#color-test">MY COLOR</a>
            </div>
          </div>
          <div
            className="nav-item cart"
            onMouseEnter={() => setDropdown("cart")}
            onMouseLeave={() => setDropdown(null)}
          >
            <button aria-label="장바구니">
              <img src={`${A}/161d1.svg`} alt="" />
            </button>
            <div
              className={`nav-dropdown cart-dropdown ${
                dropdown === "cart" ? "is-open" : ""
              }`}
            >
              <img src={`${A}/b5047.png`} alt="블러 틴 팟" />
              <div>
                <strong>블러 틴 팟</strong>
                <span>24 감자 버터</span>
                <b>8,000원</b>
              </div>
            </div>
          </div>
          <button
            className="menu-button"
            onClick={openMenu}
            aria-label="메뉴 열기"
          >
            <i />
            <i />
            <i />
          </button>
        </div>
      </div>
    </header>
  )
}

type MobileMenuProps = {
  open: boolean
  close: () => void
}

function MobileMenu({ open, close }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>("SHOP")
  const groups = [
    { name: "SHOP", items: ["ALL", "LIP", "BASE", "ACC", "SET"] },
    { name: "LOOKBOOK", items: [] },
    { name: "BRAND", items: [] },
    { name: "EVENT", items: [] },
    { name: "CUSTOMER SERVICE", items: ["NOTICE", "FAQ"] },
    { name: "MY PAGE", items: ["MY ORDER", "MY COLOR", "MY CART"] },
  ]
  return (
    <div className={`menu-layer ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <button className="menu-scrim" onClick={close} aria-label="메뉴 닫기" />
      <aside className="menu-panel">
        <button
          className="menu-button menu-close"
          onClick={close}
          aria-label="메뉴 닫기"
        >
          <i />
          <i />
          <i />
        </button>
        <nav>
          {groups.map((group) => (
            <div className="accordion" key={group.name}>
              <button
                onClick={() =>
                  group.items.length
                    ? setExpanded(expanded === group.name ? null : group.name)
                    : close()
                }
              >
                {group.name}
              </button>
              <div className={expanded === group.name ? "expanded" : ""}>
                {group.items.map((item) => (
                  <a
                    key={item}
                    href={item === "MY COLOR" ? "#color-test" : "#best"}
                    onClick={close}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <img
          className="menu-charm"
          src={`${A}/cc158.png`}
          alt="AIBB 블루 키링"
        />
        <img className="menu-logo" src={`${A}/5763a.png`} alt="AIBB" />
      </aside>
    </div>
  )
}

function Hero() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(
      () => setIndex((value) => (value + 1) % heroSlides.length),
      5000,
    )
    return () => window.clearInterval(timer)
  }, [playing])
  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="메인 캠페인"
    >
      <div
        className="hero-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {heroSlides.map((slide, slideIndex) => (
          <article
            className="hero-slide"
            key={slide.image}
            aria-hidden={slideIndex !== index}
          >
            <picture>
              <source
                media="(max-width: 900px)"
                srcSet={`${A}/${slide.mobileImage}`}
              />
              <img
                src={`${A}/${slide.image}`}
                alt=""
                style={{ objectPosition: slide.position }}
              />
            </picture>
          </article>
        ))}
      </div>
      <button
        className="hero-arrow prev"
        onClick={() => setIndex((index + 4) % 5)}
        aria-label="이전 배너"
      >
        ‹
      </button>
      <button
        className="hero-arrow next"
        onClick={() => setIndex((index + 1) % 5)}
        aria-label="다음 배너"
      >
        ›
      </button>
      <div className="hero-controls">
        {heroSlides.map((_, dot) => (
          <button
            key={dot}
            className={dot === index ? "active" : ""}
            onClick={() => setIndex(dot)}
            aria-label={`${dot + 1}번 배너`}
          />
        ))}
        <button
          className="play-toggle"
          onClick={() => setPlaying(!playing)}
          aria-label={playing ? "슬라이드 일시정지" : "슬라이드 재생"}
        >
          {playing ? "Ⅱ" : "▶"}
        </button>
        <small>{String(index + 1).padStart(2, "0")} / 05</small>
      </div>
    </section>
  )
}

function QuickAndTest({ openTest }: { openTest: () => void }) {
const categories = [
  ["ALL", "ca_all.png", "전체"],
  ["LIP", "ca_li.png", "립"],
  ["BASE", "ca_ba.png", "베이스"],
  ["ACC", "ca_acc.png", "액세서리"],
  ["SET", "ca_set.png", "세트"],
]
  return (
    <section className="quick-test" id="color-test">
      <div className="quick-categories">
        {categories.map(([label, image, koreanLabel]) => (
  <a href={`/shop?category=${label.toLowerCase()}`} key={label}>
    <span>
      <img src={`${A}/${image}`} alt="" />
    </span>
    <b>{label}</b>
    <small>{koreanLabel}</small>
  </a>
))}
      </div>
      <div className="test-banner">
        <img src={`${A}/f507a.png`} alt="레드와 블루 컬러 화장품" />
        <div>
          <h2>
            <span className="test-banner-title-line"><em>10초</em>로 나만의</span>{' '}
            <span className="test-banner-title-line">추구미 컬러 찾기</span>
          </h2>
          <p>3 문항 / My Color, My Choice!</p>
          <div className="test-tags">
            <span>톤</span>
            <span>분위기</span>
            <span>제형</span>
          </div>
        </div>
        <ArrowButton onClick={openTest}>테스트 하기</ArrowButton>
      </div>
    </section>
  )
}

function SectionHeading({
  children,
  accent,
  href = "#top",
}: {
  children: React.ReactNode
  accent?: string
  href?: string
}) {
  return (
    <div className="section-heading">
      <h2>{children}</h2>
      {accent && <b>{accent}</b>}
      {href.startsWith("/") ? (
        <Link href={href}>더보기 ›</Link>
      ) : (
        <a href={href}>더보기 ›</a>
      )}
    </div>
  )
}


function BestRanking() {
  return (
    <section className="content-section ranking" id="best">

      {/* 메인 제목 */}
      <div className="section-heading">
        <h2>BEST RANKING</h2>
      </div>

      <div className="ranking-content">

        {/* 제품 BEST 3 */}
        <div className="ranking-group">
          <div className="ranking-group-heading">
            <b>제품 BEST 3</b>
            <Link href="/shop?category=all">더보기 ›</Link>
          </div>

          <div className="ranking-card-grid">
            {products.slice(0, 3).map((product) => (
              <Link className="product-card" key={product.name} href="/shop?category=all">
                <div className="product-image">
                  <img src={`${A}/${product.image}`} alt={product.name} />
                  <span>{product.rank}</span>
                  <RankingFavoriteButton product={product} />
                </div>

                <h3>{product.name}</h3>

                <p className="product-detail">
                  {product.swatch && (
                    <span
                      className="product-swatch"
                      style={{ backgroundColor: product.swatch }}
                    />
                  )}
                  {product.detail}
                </p>

                <div className="price">
                  {product.sale && <em>{product.sale}</em>}
                  <b>{product.price}</b>
                  {product.originalPrice && (
                    <del>{product.originalPrice}</del>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 기획세트 BEST 2 */}
        <div className="ranking-group">
          <div className="ranking-group-heading">
            <b>기획세트 BEST 2</b>
            <Link href="/shop?category=set">더보기 ›</Link>
          </div>

          <div className="ranking-card-grid">
            {products.slice(3, 5).map((product) => (
              <Link className="product-card" key={product.name} href="/shop?category=set">
                <div className="product-image">
                  <img src={`${A}/${product.image}`} alt={product.name} />
                  <span>{product.rank}</span>
                  <RankingFavoriteButton product={product} />

                  {product.saving && (
                    <strong className="product-saving">
                      {product.saving}
                    </strong>
                  )}
                </div>

                <h3>{product.name}</h3>

                <p className="product-detail">
                  {product.detail}
                </p>

                <div className="price">
                  {product.sale && <em>{product.sale}</em>}
                  <b>{product.price}</b>
                  {product.originalPrice && (
                    <del>{product.originalPrice}</del>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}


function PhotoReview() {
  return (
    <section className="review-block">
      <SectionHeading>PHOTO REVIEW</SectionHeading>
      <div className="review-scroll">
        {reviews.map((review) => (
          <article className="review-card" key={review.image}>
            <div className="review-photo">
              <img src={`${A}/${review.image}`} alt="AIBB 제품 포토 리뷰" />
            </div>
            <div className="stars">
              ★★★★★ <b>5점</b>
            </div>
            <div className="review-tags">
              {review.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <p>
              <mark>{review.note}</mark> 정말 마음에 드는 컬러예요...
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}


function Lookbook() {
  const [index, setIndex] = useState(0)
  const [activeProduct, setActiveProduct] = useState<string | null>(null)

  return (
    <section className="lookbook-block" id="lookbook">
      <SectionHeading href="/lookbook">LOOKBOOK</SectionHeading>

      <div className="lookbook-stage">
        <div
          className="look-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {looks.map((look, slideIndex) => (
            <article className="look-slide" key={look.image}>
              <img
                src={`${A}/${look.image}`}
                alt={`AIBB 룩북 ${slideIndex + 1}`}
              />

              {look.products.map((product, productIndex) => {
                const productKey = `${slideIndex}-${productIndex}`
                const isOpen = activeProduct === productKey
                const tagX = Math.min(80, Math.max(20, product.position.x))
                const tagY = Math.min(78, Math.max(22, product.position.y))

                return (
                  <React.Fragment key={productKey}>
                    {/* 제품 + 버튼 */}
                    <button
                      className="hotspot"
                      style={{
                        left: `${product.position.x}%`,
                        top: `${product.position.y}%`,
                      }}
                      onClick={() =>
                        setActiveProduct(isOpen ? null : productKey)
                      }
                      aria-expanded={isOpen}
                      aria-label={`${product.name} 정보 보기`}
                    >
                      +
                    </button>

                    {/* 제품 설명 박스 */}
                    <div
                      className={`product-tag ${isOpen ? "show" : ""}`}
                      style={{
                        left: `${tagX}%`,
                        top: `${tagY}%`,
                      }}
                    >
                      <b>{product.name}</b>

                      <span>
                        {product.detail} · {product.price}
                      </span>

                      <button>바로 담기 →</button>
                    </div>
                  </React.Fragment>
                )
              })}

              <strong className="look-title">
  <span>{look.title}</span>
</strong>
            </article>
          ))}
        </div>
      </div>

      <div className="look-controls">
        {looks.map((_, dot) => (
          <button
            key={dot}
            className={dot === index ? "active" : ""}
            onClick={() => {
              setIndex(dot)
              setActiveProduct(null)
            }}
          />
        ))}
      </div>

      <p className="look-guide">
        + 를 누르면 제품 정보를 확인할 수 있어요!
      </p>
    </section>
  )
}


function BrandSocial() {
  return (
    <section className="brand-social" id="brand">
      <article className="brand-card">
        <img src={`${A}/edd90.png`} alt="AIBB 브랜드 컬렉션 이미지" />
        <div>
          <small>BRAND STORY</small>
          <h2>Collectible Beauty</h2>
          <p>
            정해진 틀 없이 자유롭고 솔직하게.
            <br />단 하나로 정의할 수 없는
            <br />
            나를 위한 컬러 브랜드.
          </p>
          <strong>My color, My choice!</strong>
          <Link href="/brand">브랜드 스토리 보기 →</Link>
        </div>
      </article>
      <div className="instagram-card">
        <div className="instagram-heading">
          <b><Instagram size={20} strokeWidth={1.8} /> INSTAGRAM @aibb_official</b>
          <a
            href="https://www.instagram.com/aibb_official/"
            target="_blank"
            rel="noreferrer"
          >
            팔로우 →
          </a>
        </div>
        <div>
          {["74309.png", "fc1b4.png", "33ca9.png"].map((image) => (
            <img
              key={image}
              src={`${A}/${image}`}
              alt="AIBB 공식 인스타그램 콘텐츠"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

type ModalProps = {
  type: ModalName
  close: () => void
}

type QuizTone = 'warm' | 'cool'
type QuizMood = 'lovely' | 'elegance' | 'natural' | 'unique'
type QuizTexture = 'wet' | 'soft'
type QuizAnswers = { tone?: QuizTone; mood?: QuizMood; texture?: QuizTexture }
type Recommendation = { kind: 'syrup' | 'glow' | 'blur'; title: string; detail: string }

const quizQuestions = [
  { key: 'tone', label: '톤', sub: '나에게 어울리는 온도는?', options: [['warm', 'WARM', '봄 · 가을 · 따끈 · 포근 · 햇살 · 달큰'], ['cool', 'COOL', '여름 · 겨울 · 맑음 · 산뜻 · 청량 · 시원']] },
  { key: 'mood', label: '분위기', sub: '오늘의 무드는?', options: [['lovely', '러블리', '발랄 · 큐티'], ['elegance', '엘레강스', '우아 · 성숙'], ['natural', '내추럴', '청순 · 깨끗'], ['unique', '유니크', '몽환 · 화려']] },
  { key: 'texture', label: '질감', sub: '손끝에 남기고 싶은 느낌은?', options: [['wet', '촉촉', '투명하게 반짝'], ['soft', '보송', '포슬하게 스며듦']] },
] as const

const reco = (kind: Recommendation['kind'], title: string, detail: string): Recommendation => ({ kind, title, detail })
const quizResults: Record<string, { phrase: string; products: Recommendation[] }> = {
  'warm-lovely-wet': { phrase: '따뜻하고 사랑스러운 햇살처럼, 맑게 반짝이는 컬러를 추천해요.', products: [reco('syrup', '립 시럽 03 도파민 시럽', '선명하고 촉촉한 레드'), reco('glow', '글로우 틴 팟 03 · 06', 'honey grapefruit · honey apricot')] },
  'warm-lovely-soft': { phrase: '포근한 컬러에 보송한 터치를 더해 귀엽고 편안하게 완성해요.', products: [reco('blur', '블러 틴 팟 01 · 14 · 05', 'ginger · almond · lychee')] },
  'warm-elegance-wet': { phrase: '성숙한 따뜻함이 은은하게 빛나는 우아한 조합이에요.', products: [reco('syrup', '립 시럽 02 엔젤 시럽', '부드러운 핑크 시럽'), reco('glow', '글로우 틴 팟 04 · 10', 'honey wild cherry · honey rose')] },
  'warm-elegance-soft': { phrase: '차분하고 깊은 색감으로 나만의 우아한 무드를 만들어보세요.', products: [reco('blur', '블러 틴 팟 16 · 17 · 22', 'cinnamon · pecan · yellow each')] },
  'warm-natural-wet': { phrase: '깨끗한 햇살처럼 자연스럽고 촉촉한 데일리 컬러예요.', products: [reco('syrup', '립 시럽 01 · 02', '모닝 시럽 · 엔젤 시럽'), reco('glow', '글로우 틴 팟 05 · 12', 'honey peach · honey yellow peach')] },
  'warm-natural-soft': { phrase: '꾸밈없이 편안한 컬러를 포슬하게 얹어보세요.', products: [reco('blur', '블러 틴 팟 09 · 10 · 24', 'guava · cherry blossom · potato')] },
  'warm-unique-wet': { phrase: '달콤하고 몽환적인 광택으로 오늘의 기분을 특별하게 바꿔요.', products: [reco('syrup', '립 시럽 01 · 05', '모닝 시럽 · 쿠키 시럽'), reco('glow', '글로우 틴 팟 02 · 08', 'honey apple · honey chestnut')] },
  'warm-unique-soft': { phrase: '깊고 장난스러운 컬러를 보송하게 즐기는 유니크 룩이에요.', products: [reco('blur', '블러 틴 팟 20 · 25 · 26', 'pepper · chestnut · sweet potato')] },
  'cool-lovely-wet': { phrase: '맑고 발랄한 쿨 핑크에 촉촉한 생기를 더해보세요.', products: [reco('syrup', '립 시럽 03 도파민 시럽', '청량한 도파민 레드'), reco('glow', '글로우 틴 팟 01 · 02', 'honey strawberry · honey apple')] },
  'cool-lovely-soft': { phrase: '사랑스러운 핑크 컬러를 보송하게 물들여요.', products: [reco('blur', '블러 틴 팟 06 · 10 · 11', 'strawberry · cherry blossom · mugunghwa')] },
  'cool-elegance-wet': { phrase: '차가운 장미처럼 우아하고 투명한 광택을 추천해요.', products: [reco('syrup', '립 시럽 04 하트 시럽', '차분한 로즈 시럽'), reco('glow', '글로우 틴 팟 11 · 13', 'honey white peach · honey mystic each')] },
  'cool-elegance-soft': { phrase: '맑은 쿨 로즈를 보송하게 눌러 세련된 무드를 완성해요.', products: [reco('blur', '블러 틴 팟 03 · 13 · 21', 'rose · camellia · white peach')] },
  'cool-natural-wet': { phrase: '맑고 깨끗한 피부처럼 자연스럽게 빛나는 조합이에요.', products: [reco('syrup', '립 시럽 01 모닝 시럽', '투명한 모닝 컬러'), reco('glow', '글로우 틴 팟 01 · 12', 'honey strawberry · honey yellow peach')] },
  'cool-natural-soft': { phrase: '청순한 쿨 로즈를 포슬하게 얹은 깨끗한 데일리 룩이에요.', products: [reco('blur', '블러 틴 팟 03 · 10 · 21', 'rose · cherry blossom · white peach')] },
  'cool-unique-wet': { phrase: '청량한 광택 위에 신비로운 포인트를 더해보세요.', products: [reco('syrup', '립 시럽 01 · 03', '모닝 시럽 · 도파민 시럽'), reco('glow', '글로우 틴 팟 07 · 09', 'honey grape · honey jujube')] },
  'cool-unique-soft': { phrase: '오묘한 쿨 컬러를 보송하게 표현하는 화려한 조합이에요.', products: [reco('blur', '블러 틴 팟 07 · 13 · 23', 'cherry · camellia · mystic peach')] },
}

const recoImage: Record<Recommendation['kind'], string> = { syrup: `${A}/d3d3b.png`, glow: `${A}/ad8da.png`, blur: `${A}/b5047.png` }
const choiceLabel = (answers: QuizAnswers) => `${answers.tone === 'warm' ? 'WARM' : 'COOL'} · ${answers.mood === 'lovely' ? '러블리' : answers.mood === 'elegance' ? '엘레강스' : answers.mood === 'natural' ? '내추럴' : '유니크'} · ${answers.texture === 'wet' ? '촉촉' : '보송'}`

function ColorTestModal({ close }: { close: () => void }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({})
  const result = step === 3 ? quizResults[`${answers.tone}-${answers.mood}-${answers.texture}`] : null
  const select = (value: string) => {
    const key = quizQuestions[step].key as keyof QuizAnswers
    const next = { ...answers, [key]: value } as QuizAnswers
    setAnswers(next)
    setStep(step + 1)
  }
  const restart = () => { setAnswers({}); setStep(0) }
  const save = () => { localStorage.setItem('aibb-color-result', JSON.stringify({ label: choiceLabel(answers), phrase: result?.phrase, products: result?.products.map(product => ({ ...product, image: recoImage[product.kind] })), savedAt: new Date().toISOString() })); window.location.assign('/mypage') }
  const share = (channel: 'kakao' | 'x' | 'instagram') => {
    const text = `AIBB 컬러 테스트 결과: ${choiceLabel(answers)}`
    if (channel === 'kakao') navigator.clipboard?.writeText(text)
    if (channel === 'x') window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
    if (channel === 'instagram') navigator.clipboard?.writeText(text)
  }
  return <div className="modal-layer" role="dialog" aria-modal="true" aria-labelledby="color-test-title">
    <button className="modal-scrim" onClick={close} aria-label="팝업 닫기" />
    <div className={`modal color-test-modal ${result ? 'is-result' : ''}`}>
      <button className="modal-close" onClick={close} aria-label="닫기">×</button>
      {result ? <>
        <small>AIBB COLOR RESULT</small><h2 id="color-test-title">너의 컬러는<br /><em>{choiceLabel(answers)}</em></h2>
        <p className="result-phrase">{result.phrase}</p>
        <div className="result-products">{result.products.map(product => <Link key={product.title} href="/shop?category=lip" onClick={close} className="result-product"><img src={recoImage[product.kind]} alt={product.title} /><span><b>{product.title}</b><small>{product.detail}</small></span><ArrowUpRight size={16} /></Link>)}</div>
        <div className="result-actions"><button onClick={save}>나의 컬러 저장하기</button><button onClick={restart}>다시하기</button><div className="share-actions"><span>공유하기</span><button onClick={() => share('kakao')} aria-label="카카오톡으로 결과 공유">K</button><button onClick={() => share('x')} aria-label="X로 결과 공유">𝕏</button><button onClick={() => share('instagram')} aria-label="인스타그램으로 결과 공유"><Instagram size={15} /></button></div></div>
      </> : <>
        <small>AIBB COLOR TEST · 0{step + 1} / 03</small><h2 id="color-test-title">10초로 나만의<br />추구미 컬러 찾기</h2><p>{quizQuestions[step].sub}</p>
        <div className={`quiz-options quiz-options-${quizQuestions[step].options.length}`}>{quizQuestions[step].options.map(([value, label, detail]) => <button key={value} onClick={() => select(value)}><strong>{label}</strong><span>{detail}</span></button>)}</div>
        <div className="quiz-progress"><i style={{ width: `${((step + 1) / 3) * 100}%` }} /></div>
      </>}
    </div>
  </div>
}

function Modal({ type, close }: ModalProps) {
  if (!type) return null
  if (type === 'color') return <ColorTestModal close={close} />
  return <div className="modal-layer" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <button className="modal-scrim" onClick={close} aria-label="팝업 닫기" />
    <div className="modal"><button className="modal-close" onClick={close} aria-label="닫기">×</button><small>COLOR SIMULATION</small><h2 id="modal-title">발색 시뮬레이션</h2><p>내 사진 위에 AIBB 컬러를 가상으로 입혀보세요.</p><label className="upload-box"><input type="file" accept="image/*" /><span>+</span><b>사진을 이곳에 올려주세요</b><small>JPG, PNG / 최대 10MB</small></label><ArrowButton onClick={close}>컬러 체험하기</ArrowButton></div>
  </div>
}

export default function Home() {
  const [modal, setModal] = useState<ModalName>(null)
  const appRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    document.title = 'AIBB — My color, My choice'
    document.body.style.overflow = modal ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modal])
  return (
    <div ref={appRef} className="home-page" id="top">
      <main>
        <Hero />
        <QuickAndTest openTest={() => setModal('color')} />
        <BestRanking />
        <div className="content-section split-section">
          <PhotoReview />
          <Lookbook />
        </div>
        <BrandSocial />
      </main>
      <div className="floating-actions">
        <button onClick={() => setModal('simulation')}>
          <img src={`${A}/2db09.svg`} alt="" />
          <span>컬러<br />시뮬레이션</span>
        </button>
        <a href="#top">↑<span>TOP</span></a>
      </div>
      <Modal type={modal} close={() => setModal(null)} />
    </div>
  )
}
