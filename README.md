# 잇북(IT-Book) : 개발 서적 판매 쇼핑몰 Project

## 프로젝트 주제

- 목적 : 온라인으로 빠르게 책을 구입하고 싶은 IT업계 취업준비생들을 위한 **개발 분야 서적** 판매 사이트
- 목표
    - 홈에서 신간도서와 추천도서 정보를 확인할 수 있습니다.
    - 회원 가입을 하지 않아도 상품을 구경하고 장바구니에 넣을 수 있습니다.
    - 카테고리를 세분화하여 최소한의 클릭으로 빠르게 상품을 찾고 구매할 수 있습니다.

## 페르소나

![페르소나](https://github.com/younszz/itbook/assets/127226295/a01fe20e-aca3-4c1e-86f0-aeb42807e752)

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
 - http://kdt-sw-5-team15.elicecoding.com/
 <div>
     
![로고](https://github.com/younszz/itbook/assets/127226295/0e3e9ddb-80a8-4fb7-9998-f2086bb25662)

 </div>

 ### 1-1.기능 구현 리스트

 - https://www.notion.so/elice/b47c327c54454ad08f41892dbeee89a6?v=30b981f436ef4baaa24f7880f1d84451

 ## Tech Stack

![기술스택](https://github.com/younszz/itbook/assets/127226295/38bbd263-72b2-43de-aa08-22055a22de04)

 <br/>

 ### 데모 영상



 <details><summary>홈 & 카테고리별 상품조회</summary>
     
![list](https://github.com/younszz/itbook/assets/127226295/15b0250c-aab3-4d86-8ef3-0f1516565c4e)

</details>


<details><summary>로그인 & 회원가입</summary>

![login](https://github.com/younszz/itbook/assets/127226295/4bb2e974-b777-4f04-be02-ca4bbd4605b3)

</details>


<details><summary>회원정보수정 & 회원탈퇴</summary>

![user-info](https://github.com/younszz/itbook/assets/127226295/3b996eea-b19b-4ca8-badc-4bc8c460351e)

</details>



<details><summary>장바구니 기능</summary>

![cart](https://github.com/younszz/itbook/assets/127226295/36bfe0a8-c225-4419-b091-19c872a3bb1e)

</details>


<details><summary>즉시구매 & 장바구니구매</summary>

![payment](https://github.com/younszz/itbook/assets/127226295/c528c0d2-0f93-4306-9654-313341b23992)

</details>


<details><summary>주문내역조회 & 주문취소</summary>

![user-order](https://github.com/younszz/itbook/assets/127226295/349fb879-2798-4de0-ac96-073a3a58e91f)

</details>


<details><summary>최신순 & 가격순 정렬</summary>

![filter](https://github.com/younszz/itbook/assets/127226295/ad3abf04-14c2-413d-8033-c37794430cf5)

</details>


<details><summary>관리자</summary>

![admin](https://github.com/younszz/itbook/assets/127226295/f85c87b1-17c5-4b8d-a3b0-7546702ba7c2)

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
  + 장바구니 페이지, 사용자 정보 페이지, 관리자 주문관리 기능 구현

### 백엔드 

- **Express**
- Mongodb, Mongoose
- 홍승진
  + 상품 정보 api 설계 및 구현, 사용자 인증, 로그인, 회원가입 구현, 배포, 장바구니 DB 연동.
- 김경연
  + 스키마 설계 및 API 구현, JWT token cookie 인증 방식 및 로그인


### 폴더 구조
- 프론트: `src/views` 폴더 
- 백: src/views 이외 폴더 전체
- 실행: **프론트, 백 동시에, express로 실행**

### DB 스키마

![DB스키마](https://github.com/younszz/itbook/assets/127226295/43d9cba1-ba64-440e-9d39-cf00f770047d)


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
![브랜치전략](https://github.com/younszz/itbook/assets/127226295/2f3de1de-0e9f-4f3b-881e-1244a19abd89)


## 트러블 슈팅
![트러블슈팅](https://github.com/younszz/itbook/assets/127226295/514446fd-7ea6-456f-8959-322634dcd619)


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
