import { ArrowLeft, Sparkles } from 'lucide-react';
import { Link } from 'wouter';

export default function NotFound() {
  return <main className="not-found-page"><Sparkles size={26} /><p>AIBB COLOR ARCHIVE</p><h1>앗, 이 컬러는<br /><em>아직 준비 중이에요.</em></h1><Link href="/"><ArrowLeft size={16} /> 홈으로 돌아가기</Link></main>;
}
