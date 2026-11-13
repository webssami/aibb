# AIBB Portfolio 정리 상태

- [x] 실제 서버·DB·OAuth·tRPC·Drizzle·스토리지·지도·LLM 스캐폴드를 제거하고 Vite 정적 포트폴리오 실행만 남겼다.
- [x] 샘플 상품·룩북·이벤트·공지 데이터와 localStorage 기반 인터랙션은 유지했다.
- [x] 메인 홈, Shop, Lookbook, Brand, Event, My Page, Cart, Notice, FAQ의 수정 위치를 `EDITING_GUIDE.md`에 정리했다.
- [x] 불필요한 데모 컴포넌트, 서버 설정, DB 마이그레이션, 인증·API 관련 파일을 삭제했다.
- [x] 타입 검사, 샘플 데이터 테스트, 정적 빌드를 통과했다.

## 최근 UI 보정

- [x] Shop의 COLOR DAYS 이벤트 배너를 `/event` 현재 이벤트 아카이브로 연결했다.
- [x] FAQ를 NOTICE와 같은 탭·게시판·페이지네이션 언어로 교체하고 문의전화 박스를 컴팩트하게 줄였다.
- [x] Event와 My Page 상단 스티커 및 소개 영역의 세로 점유를 줄였다.
- [x] 메인 히어로 문구 박스는 첫 번째 이미지에만 노출되도록 하고, 테스트 배너 이미지에 좌측 투명 그라디언트를 적용했다.
- [x] 메인 홈 고정 컬러 시뮬레이션 버튼의 아이콘·문구가 원형 밖으로 튀어나오지 않도록 조정했다.
- [x] 메인 BEST RANKING 상품 카드 전체를 Shop 하이퍼링크로 연결했다.
- [x] Lookbook 정보성 텍스트 최소 크기를 12px로 보정하고 Brand SNS 버튼에 브랜드 컬러를 적용했다.
- [x] Event LONG 상세 뷰어의 가로 박스 폭을 키우고 기존 내부 세로 스크롤을 유지했다.
