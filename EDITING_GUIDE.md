# AIBB 포트폴리오 수정 가이드

이 문서는 디자인 작업을 빠르게 수정하기 위한 파일 지도입니다. 대부분의 콘텐츠는 배열의 문구나 이미지 경로만 바꾸면 화면에 반영됩니다. 이미지는 `client/public` 아래에 넣고 코드에서는 `/home-assets/파일명` 또는 `/media/폴더/파일명`처럼 public 기준 경로를 사용합니다.

## 가장 자주 바꾸는 파일

| 바꾸려는 내용 | 수정할 파일 | 수정 위치 |
| --- | --- | --- |
| 메인 히어로 배너 사진·제목·설명 | `client/src/pages/Home.tsx` | `heroSlides` |
| 메인 BEST 상품 | `client/src/pages/Home.tsx` | `products` 배열 |
| 포토리뷰 문구·해시태그·사진 | `client/src/pages/Home.tsx` | `reviews` 배열 |
| 메인 룩북 사진·룩 제목·사용 제품 | `client/src/pages/Home.tsx` | `looks` 배열 |
| 메인 홈 간격·폰트·배너 높이·모바일 | `client/src/pages/Home.css` | `.home-page` 선택자와 하단 media query |
| 메인 홈 이미지 교체 | `client/public/home-assets/` | 파일을 추가한 뒤 `Home.tsx` 경로 변경 |
| 상세 룩북 사진·무드·컬러 정보 | `client/src/data/lookbooks.ts` | `lookbookLooks` |
| 상세 룩북 배치·사진 비율·간격 | `client/src/pages/Lookbook.css` | `.lb-` 선택자 |
| 상품명·가격·할인·컬러 HEX | `client/src/data/products.ts` | `products`, 각 `Collection` |
| 상품 목록 행과 컬러 선택 UI | `client/src/components/shop/ProductRow.tsx` | JSX와 상태 로직 |
| Shop 화면 간격·상품 행·검색·카테고리 | `client/src/index.css` | `.shop-page`, `.product-row`, `.shop-controls` |
| 공통 헤더·메뉴·검색·푸터 | `client/src/components/shop/SiteLayout.tsx` | `links`, Header, Footer |
| 마이페이지 문구·프로필 샘플 | `client/src/pages/MyPage.tsx` | `defaultProfile`, JSX |
| 마이페이지 색상·카드 간격 | `client/src/pages/Account.css` | `.account-` 선택자 |
| 장바구니 문구·배송비 기준 | `client/src/pages/Cart.tsx` | `shipping`, JSX |
| 장바구니 레이아웃·요약 패널 | `client/src/pages/Cart.css` | `.cart-` 선택자 |
| 이벤트 카드·상세 문구 | `client/src/pages/Event.tsx` | `events` 배열 |
| 이벤트 레이아웃·스크롤 박스 | `client/src/pages/Event.css` | `.event-` 선택자 |
| 브랜드 이미지·문구 | `client/src/pages/Brand.tsx` | `brandSlides`, JSX |
| 브랜드 레이아웃·롤링 속도 | `client/src/pages/Brand.css` | `.brand-` 선택자 |
| 공지사항 제목·날짜·내용 | `client/src/pages/Notice.tsx` | `notices` 배열 |
| 공지사항 레이아웃·행 간격 | `client/src/pages/Notice.css` | `.notice-` 선택자 |
| FAQ 질문·답변 | `client/src/pages/Service.tsx` | `faqs` 배열 |
| FAQ·고객센터 스타일 | `client/src/index.css` | `.service-` 선택자 |
| 브랜드 컬러·전체 페이지 폭 | `client/src/index.css` | `:root` 변수 |

## 룩북 사진 교체

상세 룩북 사진은 `client/public/media/lookbooks/`에 넣습니다. `client/src/data/lookbooks.ts`에서 해당 룩의 `image` 경로를 변경하세요. 세로 화보는 `imagePosition: 'center center'`를 기준으로 사용하면 안정적입니다. 사진이 위나 아래로 잘리면 `imagePosition`을 `'center top'`, `'center 35%'`처럼 조정하고, 전체 사진을 더 많이 보여주려면 `client/src/pages/Lookbook.css`의 `.lb-hero-image` 또는 `.lb-photo`의 `object-fit`과 높이를 수정합니다.

메인 홈의 룩북은 별도 데이터가 아니라 `Home.tsx`의 `looks` 배열에 있습니다. 홈 사진만 바꾸려면 `client/public/home-assets/`에 사진을 넣고 배열의 `image` 값을 바꿉니다.

## 콘텐츠별 간격 조정

전체 기본 간격은 `client/src/index.css`에서 조정하고, 페이지 전용 간격은 각 페이지 CSS에서 수정합니다. 예를 들어 포토리뷰 카드 사이 간격은 `Home.css`의 `.review-grid` 또는 `.review-card`, 룩북 섹션 제목과 본문 사이 간격은 `.lookbook-block .section-heading`와 `.lookbook-stage`, 마이페이지 카드 사이 간격은 `Account.css`의 `.archive-grid`, 장바구니 상품 사이 간격은 `Cart.css`의 `.full-cart-item`에서 바꿀 수 있습니다.

`@media(max-width:720px)` 또는 `@media(max-width:600px)` 아래 규칙은 모바일 전용입니다. PC만 바꾸려면 media query 밖의 값을 수정하고, 모바일만 바꾸려면 해당 media query 안의 값을 수정하세요. 너무 많은 선택자를 새로 만들기보다 기존 페이지 접두사인 `.home-page`, `.lb-`, `.account-`, `.cart-`, `.notice-`, `.event-` 아래에 규칙을 추가하는 방식을 권장합니다.

## 문구 정리

문구는 대부분 각 페이지 상단의 배열 또는 JSX에 직접 있습니다. 포트폴리오용 샘플이라는 표현을 실제 브랜드 문구로 바꾸려면 `SiteLayout.tsx`, `Service.tsx`, `Editorial.tsx`, `Lookbook.tsx`의 `sample`, `샘플`, `리뉴얼 프로젝트` 문구를 검색하세요. 가격·할인율·리뷰 수는 화면 여러 곳에서 공유하므로 먼저 `products.ts`를 수정하고, 홈의 별도 연출 문구만 `Home.tsx`에서 수정합니다.

## 샘플 기능의 저장 위치

장바구니는 `aibb-shop-cart-v1`, 컬러 테스트 결과는 `aibb-color-result`, 마이페이지 프로필은 `aibb-profile-v1` 키로 브라우저에 저장됩니다. 실제 서버 저장은 없습니다. 기능을 초기화하려면 브라우저 개발자 도구의 localStorage에서 해당 키를 삭제하면 됩니다.

## 이미지·권리 주의

현재 일부 이미지는 포트폴리오 샘플입니다. 공개 배포 전에는 브랜드가 보유한 원본 이미지와 사용 권리를 확인하고, 같은 파일명으로 교체하거나 데이터 배열의 경로를 바꾸세요. 이미지 교체만으로 레이아웃을 바꾸고 싶지 않다면 가로세로 비율이 기존 이미지와 비슷한 파일을 사용하세요.
