# 오픈마켓 서비스

## 프로젝트 개요

이 프로젝트는 상품에 대한 CRUD(Create, Read, Update, Delete)가 가능하고 SPA으로 만들었습니다.<br>

배포 URL : https://hodu-market-dev.netlify.app/

테스트용 계정 <br>

```
구매자
ID : buyer1
PW : hodu0910

판매자
ID : seller1
PW : hodu0910
```

## ⚙️ 개발환경 및 기술 스택

- React
- React Query
- TypeScript
- styled-components
- Recoil

## 📂 폴더구조

```
hodu-market
├─ .eslintrc.json
├─ .github
│  └─ ISSUE_TEMPLATE
│     ├─ ♻️refactor.md
│     ├─ ✨feature.md
│     ├─ 🐛bug.md
│     └─ 💄style.md
├─ .gitignore
├─ .prettierrc
├─ package-lock.json
├─ package.json
├─ public
│  ├─ assets
│  │  ├─ check-box.svg
│  │  ├─ check-fill-box.svg
│  │  ├─ icon-404.svg
│  │  ├─ icon-check-off.svg
│  │  ├─ icon-check-on.svg
│  │  ├─ icon-check.svg
│  │  ├─ icon-delete.svg
│  │  ├─ icon-down-arrow.svg
│  │  ├─ icon-fb.svg
│  │  ├─ icon-img.png
│  │  ├─ icon-insta.svg
│  │  ├─ icon-minus-line.svg
│  │  ├─ icon-plus-line.svg
│  │  ├─ icon-plus.svg
│  │  ├─ icon-rhigt-arrow.svg
│  │  ├─ icon-search.svg
│  │  ├─ icon-shopping-bag.png
│  │  ├─ icon-shopping-bag.svg
│  │  ├─ icon-shopping-cart-2.svg
│  │  ├─ icon-shopping-cart.svg
│  │  ├─ icon-swiper-1.png
│  │  ├─ icon-swiper-1.svg
│  │  ├─ icon-swiper-2.png
│  │  ├─ icon-swiper-2.svg
│  │  ├─ icon-up-arrow.svg
│  │  ├─ icon-user-2.svg
│  │  ├─ icon-user.svg
│  │  ├─ icon-yt.svg
│  │  └─ Logo-hodu.png
│  ├─ index.html
│  └─ _redirects
├─ README.md
├─ src
│  ├─ api
│  │  ├─ apiURL.ts
│  │  ├─ cart
│  │  │  ├─ deleteCartItemAPI.ts
│  │  │  ├─ getCartItemAPI.ts
│  │  │  ├─ postCartItemAPI.ts
│  │  │  └─ putCartItemAPI.ts
│  │  ├─ login
│  │  │  ├─ loginAPI.ts
│  │  │  └─ logoutAPI.ts
│  │  ├─ product
│  │  │  ├─ deleteSellerProductAPI.ts
│  │  │  ├─ getAllProductsAPI.ts
│  │  │  ├─ getDetailProductAPI.ts
│  │  │  ├─ getSearchProductsAPI.ts
│  │  │  ├─ getSellerProductsAPI.ts
│  │  │  ├─ postSellerProductAPI.ts
│  │  │  └─ putSellerProductAPI.ts
│  │  └─ user
│  │     ├─ buyerSignUpAPI.ts
│  │     └─ sellerSignUpAPI.ts
│  ├─ App.tsx
│  ├─ atoms
│  │  └─ Atoms.js
│  ├─ components
│  │  ├─ cartList
│  │  │  └─ CartList.tsx
│  │  ├─ common
│  │  │  ├─ carousel
│  │  │  │  ├─ Carousel.tsx
│  │  │  │  └─ ImgList.ts
│  │  │  ├─ footer
│  │  │  │  └─ Footer.tsx
│  │  │  ├─ inputBox
│  │  │  │  └─ InputBox.tsx
│  │  │  ├─ memberType
│  │  │  │  └─ MemberType.tsx
│  │  │  ├─ nav
│  │  │  │  ├─ Nav.tsx
│  │  │  │  └─ SellerNav.tsx
│  │  │  ├─ pagination
│  │  │  │  └─ Pagiation.tsx
│  │  │  ├─ products
│  │  │  │  └─ Products.tsx
│  │  │  └─ textEditor
│  │  │     └─ TextEditor.tsx
│  │  ├─ modal
│  │  │  └─ MyPageModal.tsx
│  │  ├─ signUp
│  │  │  ├─ BuyerSignUpForm.tsx
│  │  │  └─ SellerSignUpForm.tsx
│  │  └─ tabContent
│  │     └─ TabContent.tsx
│  ├─ hooks
│  │  ├─ hooks.txt
│  │  └─ UseGetProducts.tsx
│  ├─ index.tsx
│  ├─ model
│  │  └─ market.ts
│  ├─ pages
│  │  ├─ Cart.tsx
│  │  ├─ Home.tsx
│  │  ├─ Login.tsx
│  │  ├─ Page404.tsx
│  │  ├─ Payment.tsx
│  │  ├─ ProductDetail.tsx
│  │  ├─ SellerCenter.tsx
│  │  ├─ SignUp.tsx
│  │  └─ UploadProduct.tsx
│  ├─ styles
│  │  └─ Globalstyled.jsx
│  └─ types
│     └─ custom.d.ts
├─ tsconfig.json
└─ yarn.lock

```

## 구현 리스트

- 구매자/판매자로 서비스를 이용하실 수 있습니다.
- 로그인 하지 않아도 일부 서비스는 이용가능하며 주문 및 마이페이지는 로그인 후 사용 가능합니다.
- 구매자는 장바구니, 상품 주문및 주문 확인이 가능합니다.
- 판매자는 판매자 센터를 통해 상품 등록, 수정및 삭제가 가능합니다.

## 트러블 슈팅

## 리팩토링 리스트

- 검색어 디바운싱
- 반응형 적용
- 이미지 압축 및 예외처리
- 웹 접근성 높이기
