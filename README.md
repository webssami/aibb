# AIBB Color Portfolio

AIBB의 컬러·뷰티 쇼핑 경험을 보여주는 **정적 React/Vite 포트폴리오**입니다. 실제 회원가입, 결제, 주문, Firebase, 외부 API, 데이터베이스는 연결하지 않았습니다. 상품·룩북·이벤트·공지 데이터는 코드에 있는 샘플 데이터로 동작하며, 장바구니·관심상품·컬러 테스트 결과·프로필 수정은 브라우저의 `localStorage`에만 저장됩니다.

## 실행

```bash
pnpm install
pnpm dev
```

브라우저에서 `http://localhost:3000`을 열면 됩니다. 정적 배포 파일은 다음 명령으로 생성합니다.

```bash
pnpm check
pnpm test
pnpm build
```

## 주요 페이지

`/` 메인 홈, `/shop` 상품 목록, `/lookbook` 룩북, `/brand` 브랜드 스토리, `/event` 이벤트, `/mypage` 마이페이지, `/cart` 장바구니, `/notice` 공지사항, `/service` FAQ로 구성되어 있습니다. 제품 상세 전용 서버 라우트는 만들지 않았으며, 상품 링크는 포트폴리오용 `/shop` 흐름으로 연결됩니다.

## 수정 안내

실제 수정 포인트는 [EDITING_GUIDE.md](./EDITING_GUIDE.md)에 정리했습니다. 홈 카피·배너·포토리뷰·룩북, 상세 룩북 사진, 상품명·가격·컬러, 브랜드·공지·FAQ, 페이지별 CSS를 어디에서 바꾸는지 파일별로 설명합니다.

## 폴더 구조

- `client/src/pages`: 화면 단위 React 페이지와 페이지별 CSS
- `client/src/components/shop`: 공통 헤더·푸터와 상품 행
- `client/src/data`: 상품·룩북·장바구니 샘플 데이터 및 테스트
- `client/src/contexts`: localStorage 기반 장바구니·관심상품 상태
- `client/public/home-assets`: 메인 홈 이미지
- `client/public/media`: Shop·룩북·이벤트 이미지
- `client/public/home-fonts`: 홈 전용 폰트

서버·DB·OAuth·tRPC·Drizzle·스토리지·지도·LLM 스캐폴드는 포트폴리오 범위에서 제거했습니다. 이 프로젝트의 실행 명령은 Vite 정적 개발·빌드만 사용합니다.
