# 잇북(IT-Book) : 개발 서적 판매 쇼핑몰 Project

## 프로젝트 주제

- 목적 : 온라인으로 빠르게 책을 구입하고 싶은 IT업계 취업준비생들을 위한 **개발 분야 서적** 판매 사이트
- 목표
    - 홈에서 신간도서와 추천도서 정보를 확인할 수 있습니다.
    - 회원 가입을 하지 않아도 상품을 구경하고 장바구니에 넣을 수 있습니다.
    - 카테고리를 세분화하여 최소한의 클릭으로 빠르게 상품을 찾고 구매할 수 있습니다.

## 페르소나
![페르소나](/uploads/40aa78b6bd79e4915f5bcf6644f8240e/페르소나.png)


<br />

## 서비스 소개

#### 상품 등록, 장바구니 추가, 주문하기 등 쇼핑몰의 핵심 서비스를 구현합니다. 
1. 회원가입(모달창), 로그인(모달창), 회원정보 수정 등 **유저 정보 관련 CRUD** 
2. **상품 목록**을 조회 및, **상품 상세 정보**를 조회 가능함. 
3. 장바구니에 상품을 추가할 수 있으며, **장바구니에서 CRUD** 작업이 가능함.
4. 장바구니는에 넣는 기능은 비로그인 사용자는 **LocalStorage에** 정보가 저장되고, 로그인 사용자는 **DB에** 저장됨.
5. 장바구니에서 주문을 진행하거나, 상품 상세페이지에서 바로 주문 진행 가능 **주문 완료 후 조회 및 취소**가 가능함.
6. 관리자페이지에서 **주문관리 가능** 주문내역 삭제및 주문 상태 변경 가능


<br />

## 데모 사이트
 - (배포 주소 넣기)
 <div>

 ![로고](/uploads/055f42f0e652e8dfc5e51fa8aa73ba67/로고.png)

 </div>

 ### 1-1.기능 구현 리스트

 - https://www.notion.so/elice/b47c327c54454ad08f41892dbeee89a6?v=30b981f436ef4baaa24f7880f1d84451

 ## Tech Stack

 -(기술 스택 이미지 넣기)

 <br/>

 ### 데모 영상



 <details><summary>홈 & 카테고리별 상품조회</summary>

![list](/uploads/388c28ab02039ab58cb54e8c2b7a33a6/list.gif)

</details>


<details><summary>로그인 & 회원가입</summary>

![login](/uploads/7c6bce68a1fdb9655c8d7d192913da79/login.gif)

</details>


<details><summary>회원정보수정 & 회원탈퇴</summary>

![user-info](/uploads/4ed95973a8f13ed4e560999005b0af1d/user-info.gif)

</details>



<details><summary>장바구니 기능</summary>

![cart](/uploads/6a543e811bb286adba1a370bdd95b4ed/cart.gif)

</details>


<details><summary>즉시구매 & 장바구니구매</summary>

![payment](/uploads/c01cfd477f97b84a8ed334ebd09061aa/payment.gif)

</details>


<details><summary>주문내역조회 & 주문취소</summary>

![user-order](/uploads/94caa9fc7cc571e802e89384b28e04a8/user-order.gif)

</details>


<details><summary>최신순 & 가격순 정렬</summary>

![filter](/uploads/190890a23ba560a71955a224cdb4c6b0/filter.gif)

</details>


<details><summary>관리자</summary>

![admin](/uploads/c21004ee13c57974dbf3652f477214a4/admin.gif)

</details>




<br />

## 👪 구성원 역할
<br />

| 이름 | 담당 업무 |  
| ------ | ------ |
|  승진   |  BE (팀장)   |
|  경연   |  BE   |
|  성지   |  FE   |
|  윤지   |  FE   |
|  진규   |  FE   |


### 프론트엔드

- **Vanilla javascript**, html, css
- Font-awesome 
- Daum 도로명 주소 api 
- 윤성지
  + 회원가입, 로그인, 주문서 페이지, 사용자 주문조회 페이지 레이아웃
- 이윤지
  + 메인 페이지 , 상품 페이지(서브), 상품 상세 페이지, 관리자 페이지 레이아웃 및 기능 구현 , 반응형 작업, 로고 및 배너 작업
- 김진규
  + 장바구니, 주문 (임시)

### 백엔드 

- **Express**
- Mongodb, Mongoose
- 홍승진
  + 상품 정보 api 설계 및 구현, 사용자 인증, 로그인, 회원가입 구현, 배포, 장바구니 DB 연동.
- 김경연
  + 스키마 설계 및 API 구현, JWT token cookie 인증 방식 및 로그인 (임시)


### 폴더 구조
- 프론트: `src/views` 폴더 
- 백: src/views 이외 폴더 전체
- 실행: **프론트, 백 동시에, express로 실행**


<br />


## Collaboration Tools

- Padlet : 초반 주제 기획시 의사결정 빠르게 하는 칸반 보드 용도
- Notion : 기능 구현 체크리스트, 회의록, 진행 상황 및 계획
- Discord : 음성 채팅방 활용 의견 제시
- Gitlab : Code Repository
- Gitlab Issue : 진행상황이나 Trouble Shooting 내역
- Postman Teams : API 테스트 진행


## Scrum
- 평일 오전10시 ~ 11시
- YTB(Yesterday, Today, Blocking) 기반 스크럼 회의 진행
  + 어제할일, 오늘할일, 막히는 상황 스크럼 회의때 공유
- 필요시 주말에도 프론트/백엔드 전체 스크럼 진행


## 코드 컨벤션
- 메인 폰트 : 'Pretendard'
- 비동기 방식 : async/await
- 들여쓰기 : 2칸
- 네이밍 컨벤션 : 변수명은 camelCase, 파일/폴더명은 케밥-케이스
- 함수 정의 방법 : 함수 표현식
- Css selector : class selector


## 커밋 컨벤션
- feat : 새로운 기능 추가
- fix : 버그 수정
- template : html, css, js 관련 파일 추가
- docs : 문서 수정
- style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
- refactor : 코드 리팩토링
- delete : 삭제


## 브랜치 전략
- dev -> feat~ 사진 넣기(임시)


## 실행 방법
```bash
git clone {.....repository_name}.git
cd {repository_name}
npm install
npm start
```


### .env 설정
```
JWT_SECRET_KEY = {YOUR_JWT_SECRET_KEY}
```
---

본 프로젝트에서 제공하는 모든 코드 등의는 저작권법에 의해 보호받는 ㈜엘리스의 자산이며, 무단 사용 및 도용, 복제 및 배포를 금합니다.
Copyright 2023 엘리스 Inc. All rights reserved.
