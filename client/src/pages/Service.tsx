import { useState } from 'react';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';
import './Notice.css';

const faqs = [
  { question: '컬러는 어떻게 선택하나요?', answer: '상품의 컬러 팔레트 또는 오른쪽 COLOR 버튼에서 원하는 컬러를 선택하세요. 선택한 컬러명이 표시되면 담기를 눌러 장바구니에 추가할 수 있어요.' },
  { question: '세트의 컬러는 각각 고를 수 있나요?', answer: '네. 블러, 립 시럽 등 구성품 버튼을 눌러 각각의 컬러를 선택해 주세요. 모든 구성품의 컬러를 고르면 하나의 세트로 담을 수 있어요.' },
  { question: '새로고침하면 장바구니가 사라지나요?', answer: '같은 브라우저에서는 장바구니가 유지됩니다. 이 샘플 페이지는 브라우저의 로컬 저장소를 사용하므로 브라우저 데이터를 삭제하면 장바구니도 삭제됩니다.' },
  { question: '이 페이지에서 실제 주문할 수 있나요?', answer: '현재는 AIBB 리뉴얼 프로젝트의 인터랙션 샘플입니다. 결제, 회원가입, 주문, 배송은 연결되어 있지 않습니다.' },
];

export default function Service() {
  const [open, setOpen] = useState<number | null>(null);
  return <main className="notice-page service-page">
    <div className="notice-tabs"><Link href="/notice">NOTICE</Link><Link href="/service" className="active">FAQ</Link></div>
    <section className="notice-board faq-board">
      <div className="faq-contact"><div><span>HERE TO HELP</span><h1>Customer service<span>.</span></h1><p>컬러가 궁금할 땐, 편하게 문의해주세요.<br />평일 10:00–17:00 · 점심 12:00–13:00</p></div><a href="tel:0328587784">032-858-7784<ArrowUpRight size={18} /></a></div>
      <div className="notice-table-head"><span>자주 묻는 질문</span><span>작성일</span></div>
      <div className="faq-notice-list">{faqs.map((faq, index) => <article className={`notice-item ${open === index ? 'is-open' : ''}`} key={faq.question}><button className="notice-row" aria-expanded={open === index} aria-controls={`faq-${index}`} onClick={() => setOpen(open === index ? null : index)}><span className="faq-number">{String(index + 1).padStart(2, '0')}.</span><span>{faq.question}</span>{open === index ? <Minus size={18} /> : <Plus size={18} />}</button><time>{['2026.10.08', '2026.09.26', '2026.09.19', '2026.09.12'][index]}</time>{open === index && <div className="notice-body" id={`faq-${index}`}>{faq.answer}</div>}</article>)}</div>
      <div className="notice-pagination"><span className="active">●</span><span>●</span><span>●</span></div>
    </section>
  </main>;
}
