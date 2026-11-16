import { useMemo, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Link } from 'wouter';
import './Notice.css';

type NoticeItem = { title: string; date: string; body: string };
// 수정 포인트: 공지 제목·날짜·내용은 이 배열에서 관리합니다.
const notices: NoticeItem[] = [
  { title: '10월 추석 배송 관련 안내', date: '2026.10.01', body: '추석 연휴 기간 주문 및 배송 일정을 안내드립니다. 연휴 기간에는 택배사의 사정에 따라 배송이 평소보다 늦어질 수 있습니다.' },
  { title: '웹 페이지 서비스 점검 안내', date: '2026.09.28', body: '더 나은 서비스 제공을 위해 정기 점검을 진행합니다. 점검 시간 동안 일부 페이지 이용이 제한될 수 있습니다.' },
  { title: '멤버십 서비스 제도 개편 안내', date: '2026.09.22', body: 'aibb 멤버십 혜택과 운영 정책이 새롭게 개편됩니다. 자세한 내용은 추후 다시 안내드리겠습니다.' },
  { title: "'상품준비중' 단계 주문 취소 및 변경 안내", date: '2026.09.15', body: '상품준비중 상태의 주문 변경 및 취소 방법을 확인해 주세요.' },
];
export default function Notice() {
  const [open, setOpen] = useState<number | null>(null); const [query, setQuery] = useState('');
  const visible = useMemo(() => notices.filter(item => `${item.title} ${item.body}`.includes(query)), [query]);
  return <main className="notice-page"><div className="notice-tabs"><Link href="/notice" className="active">NOTICE</Link><Link href="/service">FAQ</Link></div><section className="notice-board"><div className="notice-search"><input value={query} onChange={e => setQuery(e.target.value)} placeholder="검색어를 입력해주세요." aria-label="공지사항 검색" /><Search size={18} /></div><div className="notice-table-head"><span>제목</span><span>작성일</span></div><div className="notice-list">{visible.map((item,index) => <article className={`notice-item ${open === index ? 'is-open' : ''}`} key={item.title}><button className="notice-row" onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index}><span>{item.title}</span><ChevronDown size={22} /></button><time>{item.date}</time>{open === index && <div className="notice-body">{item.body}</div>}</article>)}{visible.length === 0 && <p className="notice-empty">검색 결과가 없습니다.</p>}</div><div className="notice-pagination"><button aria-label="이전 페이지"><ChevronLeft size={18} /></button><span className="active">●</span><span>●</span><span>●</span><button aria-label="다음 페이지"><ChevronRight size={18} /></button></div></section></main>;
}
