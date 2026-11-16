import { useState } from 'react';
import { ArrowUpRight, CalendarDays, ChevronDown, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import './Event.css';

type EventItem = {
  title: string;
  eyebrow: string;
  date: string;
  views: string;
  image: string;
  detail: string;
  description: string;
  status: '진행중' | '종료';
  accent: string;
};

const events: EventItem[] = [
  { title: '2026.10 LIP SYRUP', eyebrow: 'NEW DROP', date: '2026.10.08', views: '097', image: '/media/events/ing-01.png', detail: '/media/events/ing-detail.jpg', description: '바르자마자 도파민 싹! 새로운 립 시럽과 단독 구성 혜택을 만나보세요.', status: '진행중', accent: 'pink' },
  { title: 'AIBB MEMBERSHIP', eyebrow: 'SPECIAL BENEFIT', date: '2026.03.17', views: '633', image: '/media/events/ing-03.jpg', detail: '/media/events/ing-detail-03.jpg', description: '에이쁘 멤버십을 위한 특별한 컬러 혜택을 준비했어요.', status: '진행중', accent: 'red' },
  { title: 'FLAGSHIP MONTHLY LOG', eyebrow: 'OFFLINE EVENT', date: '2026.03.25', views: '306', image: '/media/events/ing-02.jpg', detail: '/media/events/ing-detail-02.jpg', description: '성수 플래그십 스토어에서만 만날 수 있는 이달의 작은 이벤트.', status: '진행중', accent: 'coral' },
  { title: '에이쁘 첫 돌 기념 UP TO 66%', eyebrow: 'ARCHIVE EVENT', date: '2026.09.29', views: '361', image: '/media/events/end-01.png', detail: '/media/events/end-detail.jpg', description: '첫 돌을 기념해 진행된 공식몰 단독 프로모션입니다.', status: '종료', accent: 'cream' },
  { title: '2026 beauty_festa', eyebrow: 'BEAUTY FESTA', date: '2026.08.10', views: '222', image: '/media/events/end-03.png', detail: '/media/events/end-detail-03.jpg', description: '컬러와 혜택이 가득했던 2026 뷰티 페스타 아카이브.', status: '종료', accent: 'blue' },
  { title: '2026.08 baked harvest EVENT', eyebrow: 'BAKED HARVEST', date: '2026.08.27', views: '310', image: '/media/events/end-02.png', detail: '/media/events/end-detail-02.jpg', description: '가을의 무드를 담은 베이크드 하베스트 이벤트 기록.', status: '종료', accent: 'yellow' },
];

export default function Event() {
  const [tab, setTab] = useState<'진행중' | '종료'>('진행중');
  const [selected, setSelected] = useState<EventItem>(events[0]);
  const visible = events.filter(event => event.status === tab);

  const changeTab = (next: '진행중' | '종료') => {
    setTab(next);
    const first = events.find(event => event.status === next);
    if (first) setSelected(first);
  };

  return <main className="event-page">
    <section className="event-intro">
      <div>
        <span className="event-kicker"><i>✦</i> AIBB EVENT ARCHIVE</span>
        <h1>컬러가 터지는 <em>이벤트</em> 캘린더.</h1>
        <p>지금 진행 중인 혜택부터 지나간 순간까지,<br />에이쁘의 컬러풀한 이벤트를 한 곳에 모았어요.</p>
      </div>
    </section>

    <section className="event-shell">
      <div className="event-tabs" role="tablist" aria-label="이벤트 상태">
        {(['진행중', '종료'] as const).map(status => <button key={status} role="tab" aria-selected={tab === status} className={tab === status ? 'active' : ''} onClick={() => changeTab(status)}>{status} 이벤트 <ChevronDown size={16} /></button>)}
      </div>
      <div className="event-layout">
        <div className="event-list" role="tabpanel">
          <div className="event-list-head"><span>{tab === '진행중' ? 'LIVE NOW' : 'EVENT ARCHIVE'}</span><b>{String(visible.length).padStart(2, '0')} ITEMS</b></div>
          {visible.map((event, index) => <button key={event.title} className={`event-card ${selected.title === event.title ? 'selected' : ''}`} onClick={() => setSelected(event)}>
            <span className={`event-card-image tone-${event.accent}`}><img src={event.image} alt="" />{tab === '종료' && <i>EVENT<br />ENDED</i>}</span>
            <span className="event-card-copy"><small>{event.eyebrow}</small><strong>{event.title}</strong><span><CalendarDays size={13} /> {event.date} <b>·</b> 조회 {event.views}</span></span>
            <span className="event-card-arrow"><span>{String(index + 1).padStart(2, '0')}</span><ChevronRight size={22} /></span>
          </button>)}
        </div>
        <aside className={`event-preview tone-${selected.accent}`}>
          <div className="preview-top"><span>{selected.status === '진행중' ? 'LIVE EVENT' : 'ARCHIVE'}</span><span>✦ AIBB</span></div>
          <div className="preview-scroll" aria-label={`${selected.title} 상세 이미지 스크롤 영역`}><div className="preview-poster"><img src={selected.detail} alt={`${selected.title} 상세 혜택`} /></div><div className="preview-copy"><small>{selected.eyebrow}</small><h2>{selected.title}</h2><p>{selected.description}</p><span className="preview-scroll-hint">위아래로 스크롤해서 혜택을 확인하세요 ↓</span></div></div>
        </aside>
      </div>
    </section>
    <div className="event-bottom-note"><span>KEEP COLLECTING<br /><em>YOUR COLORS</em></span><b>✦</b><span>새로운 이벤트는<br /><em>인스타그램에서도!</em></span><Link href="https://www.instagram.com/aibb_official/" target="_blank" rel="noreferrer">@aibb_official <ArrowUpRight size={15} /></Link></div>
  </main>;
}
