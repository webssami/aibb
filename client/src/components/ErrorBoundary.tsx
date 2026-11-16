import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Component, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError(): State { return { hasError: true }; }
  render() {
    if (!this.state.hasError) return this.props.children;
    return <main className="error-page"><AlertTriangle size={40} /><p>AIBB COLOR ARCHIVE</p><h1>잠시 컬러를<br /><em>정리하고 있어요.</em></h1><button onClick={() => window.location.reload()}><RotateCcw size={16} /> 다시 불러오기</button></main>;
  }
}
