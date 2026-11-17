import { useState } from 'react';
import { Link } from 'wouter';
import * as Dialog from '@radix-ui/react-dialog';
import * as Popover from '@radix-ui/react-popover';
import { ArrowUpRight, ChevronDown, Plus, Minus, Check, X, Star } from 'lucide-react';
import { toast } from 'sonner';
import { type Product, type Color, formatPrice } from '@/data/products';
import { useShop } from '@/contexts/ShopContext';
import { publicAsset } from '@/utils/publicAsset';

export default function ProductRow({ product }: { product: Product }) {
  const { addToCart, favorites, toggleFavorite } = useShop();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selected, setSelected] = useState<Record<string, Color>>({});
  const [quantity, setQuantity] = useState(1);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [posterOpen, setPosterOpen] = useState(false);
  const collection = product.collections[activeIndex];
  const activeColor = selected[collection.id];
  const isSet = product.category === 'set';
  const isPatch = product.id === 'patch';
  const requiredCollections = product.collections.filter(item => item.colors && item.colors.length > 0);
  const hasColor = Boolean(collection.colors?.length);
  const complete = requiredCollections.every(item => selected[item.id]) && (!isPatch || quantity > 0);
  const favorite = favorites.includes(product.id);
  const groups = [...new Set(collection.colors?.map(color => color.group))];
  const image = activeColor?.image || (isSet && activeColor ? collection.image : product.image);

const lookbooksByProduct: Record<
  string,
  {
    href: string;
    className: string;
    title: string;
    image: string;
    alt: string;
  }
> = {
  blur: {
    href: '/lookbook/blur',
    className: 'lookbook-banner-01',
    title: 'Baked Harvest',
    image: '/media/lookbook1.png',
    alt: '에이쁘 블러 룩북',
  },

  glow: {
    href: '/lookbook/glow',
    className: 'lookbook-banner-02',
    title: 'Peach People',
    image: '/media/lookbook2.png',
    alt: '에이쁘 글로우 룩북',
  },

  syrup: {
    href: '/lookbook/syrup',
    className: 'lookbook-banner-03',
    title: 'Find Dopamine',
    image: '/media/lookbook3.png',
    alt: '에이쁘 도파민 룩북',
  },

  patch: {
    href: '/lookbook/syrup',
    className: 'lookbook-banner-03',
    title: 'Find Dopamine',
    image: '/media/lookbook3.png',
    alt: '에이쁘 도파민 룩북',
  },
};

const hideLookbook = product.id === 'sun';

const lookbook = hideLookbook
  ? null
  : lookbooksByProduct[product.id] ?? {
      href: '/lookbook',
      className: 'lookbook-banner-01',
      title: 'AIBB LOOKBOOK',
      image: '/media/lookbook1.png',
      alt: '에이쁘 룩북',
    };

    const eventByProduct: Record<
  string,
  {
    href: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    className: string;
  }
> = {
  syrup: {
    href: '/event',
    eyebrow: 'New EVENT',
    title: 'Lip Syrup',
    subtitle: '바를 때마다 #도파민충전',
    className: 'event-banner-syrup',
  },

  patch: {
    href: '/event',
    eyebrow: 'New EVENT',
    title: 'Lip Syrup',
    subtitle: '바를 때마다 #도파민충전',
    className: 'event-banner-syrup',
  },
};

const event = eventByProduct[product.id] ?? null;


  const chooseColor = (color: Color) => {
    setSelected(current => ({ ...current, [collection.id]: color }));
    setPickerOpen(false);
  };
  const add = () => {
    if (!complete) { toast.error(isSet ? '세트 구성품의 컬러를 모두 선택해 주세요.' : '마음에 드는 컬러를 먼저 선택해 주세요.'); setPickerOpen(true); return; }
    addToCart(product, requiredCollections.map(item => ({ collectionId: item.id, label: item.label, color: selected[item.id] })), isPatch ? quantity : 1);
  };

  return <article id={`product-${product.id}`} className={`product-row ${isSet ? 'set-product' : ''}`} aria-label={product.name}>
    <div className="product-visual" style={{ '--selected-color': activeColor?.hex || '#f9eced' } as React.CSSProperties}>
      <img key={image} src={publicAsset(image)} alt={`${product.name}${activeColor ? ` — ${activeColor.name} 샘플 이미지` : ''}`} className="product-image" loading="lazy" />
      <div className="image-badges">{product.id === 'syrup' && <span className="new-badge">NEW</span>}{isSet && <span className="set-badge">SET · {product.discount}% OFF</span>}</div>
      <button className={`favorite-button ${favorite ? 'is-favorite' : ''}`} onClick={() => toggleFavorite(product.id)} aria-label={`${product.name} ${favorite ? '관심상품 해제' : '관심상품 담기'}`} aria-pressed={favorite}><span className="favorite-heart-outline" aria-hidden="true">♡</span><span className="favorite-heart-filled" aria-hidden="true">♥</span></button>
      {activeColor && <div className="image-color-label"><span style={{ background: activeColor.hex }} />{activeColor.name}<Check size={12} /><small>SAMPLE</small></div>}
      <span className="visual-caption">{isSet ? 'BETTER TOGETHER' : 'MY COLOR, MY CHOICE'}</span>
    </div>

    <div className="product-information">
      <div className="product-eyebrow">{product.english}<span><Star size={11} fill="currentColor" /> REVIEW {product.reviews}</span></div>
      <h2>{isSet && <span className="set-label">[SET] </span>}{product.name}</h2>
      <div className="price-line">{product.discount && <strong className="discount">{product.discount}%</strong>}<strong>{formatPrice(product.price)}</strong>{product.originalPrice && <del>{formatPrice(product.originalPrice)}</del>}</div>
      <p className="product-description">{product.description}</p>
      <div className={`product-tags ${isSet ? 'component-tabs' : ''}`}>
        {isSet ? product.collections.map((item, index) => <button key={item.id} className={index === activeIndex ? 'selected' : ''} onClick={() => { setActiveIndex(index); setPickerOpen(false); }} aria-pressed={index === activeIndex}>{item.label}{selected[item.id] && <Check size={11} />}</button>) : product.tags.map(tag => <span key={tag}>{tag}</span>)}
        {hasColor && <span className="color-count-tag">{collection.colors?.length} COLORS</span>}
      </div>
      {hasColor ? <div className={`color-palette ${isSet ? 'set-palette' : ''}`} aria-label={`${collection.fullName} 컬러 팔레트`}>
        {groups.map(group => <div className="palette-group" key={group}>
          <span className="palette-label"># {group}</span>
          <div className="palette-swatches">{collection.colors?.filter(color => color.group === group).map(color => <button key={color.id} className={`swatch ${activeColor?.id === color.id ? 'is-selected' : ''}`} style={{ '--swatch': color.hex } as React.CSSProperties} onClick={() => chooseColor(color)} aria-label={`${collection.label} ${color.name} 선택`} aria-pressed={activeColor?.id === color.id} title={color.name}>{activeColor?.id === color.id && <Check size={12} strokeWidth={2.4} />}</button>)}</div>
        </div>)}
      </div> : null}
      <div className="palette-footer" aria-live="polite"><span>{!hasColor ? null : activeColor ? <><span className="selection-dot" style={{ background: activeColor.hex }} />{collection.label} · {activeColor.name}</> : '컬러를 눌러 나의 취향을 찾아보세요.'}</span><span className="release-date">{product.released.replace('-', '.')} 출시</span></div>
    </div>

    <aside className="product-actions" aria-label={`${product.name} 구매 옵션`}>
      {!isSet && (
  <div className="product-banners">

    {event && (
    <Link
      className="event-banner"
      href="/event"
    >
      <div>
        <span className="banner-eyebrow">New EVENT</span>
        <strong>Lip Syrup</strong>
        <small>바를 때마다 #도파민충전</small>
      </div>

      <span className="banner-spark">✦</span>
      <ArrowUpRight
        size={16}
        className="banner-arrow"
      />
    </Link>
    )}

{lookbook && (
  <Link
    className={`lookbook-banner ${lookbook.className}`}
    href={lookbook.href}
  >
    <div>
      <span className="banner-eyebrow">IN THE LOOKBOOK</span>

      <strong>{lookbook.title}</strong>

      <small>
        이 컬러가 담긴 룩 <ArrowUpRight size={11} />
      </small>
    </div>

    <img
      src={publicAsset(lookbook.image)}
  alt={lookbook.alt}
      loading="lazy"
    />
  </Link>
)}
  </div>
)}

          {isSet && <div className="set-choice-panel"><span className="set-panel-title">MAKE YOUR OWN SET <Plus size={13} /></span><p>각자의 컬러, 더 좋은 조합.</p>{product.collections.map((item, index) => !item.colors?.length ? null : <button className={`set-choice ${index === activeIndex ? 'active' : ''}`} key={item.id} onClick={() => { setActiveIndex(index); setPickerOpen(Boolean(item.colors?.length)); }}><span className="set-choice-name">{item.label}</span><span>{selected[item.id] ? <><i style={{ background: selected[item.id].hex }} />{selected[item.id].name}</> : '컬러 선택'}<ChevronDown size={12} /></span></button>)}</div>}
      <Dialog.Root open={posterOpen} onOpenChange={setPosterOpen}>
        <Dialog.Trigger asChild><button className="details-button">자세히 보기<ArrowUpRight size={14} /></button></Dialog.Trigger>
        <Dialog.Portal><Dialog.Overlay className="modal-overlay" /><Dialog.Content className="poster-dialog"><Dialog.Title>{product.name}</Dialog.Title><Dialog.Description>제품 소개 포스터 </Dialog.Description><Dialog.Close className="poster-dialog-close" aria-label="포스터 닫기"><X size={20} /></Dialog.Close><div className="poster-scroll">
  <div className="poster-images">
    {product.poster.map((posterImage, index) => (
      <img
        key={`${product.id}-poster-${index}`}
        src={publicAsset(posterImage)}
        alt={`${product.name} 소개 포스터 ${index + 1}`}
        loading={index === 0 ? 'eager' : 'lazy'}
      />
    ))}
  </div>

  <div className="poster-copy">
    <span>MY COLOR, MY CHOICE</span>
    <h3>{product.name}</h3>
    <p>{product.description}</p>
    <small>
      제품 소개 포스터
    </small>
  </div>
</div>
</Dialog.Content></Dialog.Portal>
      </Dialog.Root>
      <div className="purchase-row">
        {isPatch ? <div className="quantity-control" role="group" aria-label="수량 선택"><button type="button" className="qty-button" onClick={() => setQuantity(value => Math.max(1, value - 1))} disabled={quantity <= 1} aria-label="수량 줄이기"><Minus size={15} /></button><strong aria-live="polite">{quantity}</strong><button type="button" className="qty-button" onClick={() => setQuantity(value => value + 1)} aria-label="수량 늘리기"><Plus size={15} /></button></div> : hasColor ? <Popover.Root open={pickerOpen} onOpenChange={setPickerOpen}>
          <Popover.Trigger asChild><button className={`color-picker-trigger ${activeColor ? 'has-selection' : ''}`} aria-label={`${collection.fullName} ${collection.colors?.length}개 컬러 선택`}>{activeColor && <i style={{ background: activeColor.hex }} />}<span>{collection.colors?.length} COLOR</span><ChevronDown size={13} /></button></Popover.Trigger>
          <Popover.Portal>
  <Popover.Content
    className="color-picker-popover"
    side="bottom"
    align="end"
    sideOffset={8}
    collisionPadding={16}
    avoidCollisions={true}
  >
    <div className="picker-heading">
      <strong>{collection.fullName}</strong>
      <Popover.Close aria-label="컬러 목록 닫기">
        <X size={16} />
      </Popover.Close>
    </div>

    <p>{collection.colors?.length}가지 중 마음에 드는 컬러를 골라보세요.</p>

    <div className="picker-options">
      {collection.colors?.map((color, index) => (
        <button
          key={color.id}
          onClick={() => chooseColor(color)}
          className={activeColor?.id === color.id ? 'selected' : ''}
        >
          <span
            className="picker-swatch"
            style={{ background: color.hex }}
          />
          <span>
            <small>{String(index + 1).padStart(2, '0')}</small> {color.name}
          </span>
          {activeColor?.id === color.id && <Check size={14} />}
        </button>
      ))}
    </div>
  </Popover.Content>
</Popover.Portal>
        </Popover.Root> : null}
        <button className={`add-button ${complete ? 'ready' : ''}`} onClick={add}>담기<Plus size={15} /></button>
      </div>
      {requiredCollections.length > 0 && <span className={`purchase-hint ${complete ? 'ready' : ''}`}>{complete ? '나의 컬러를 담을 준비 완료!' : isSet ? '구성품별 컬러를 선택해 주세요.' : '컬러 선택 후 담아주세요.'}</span>}
    </aside>
  </article>;
}

