import { modal, showModal } from "./modal.js";

// 쿠키에 name="jwt"로 저장되어있는 값 찾음
const getTokenFromCookie = () => {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "jwt") {
      return decodeURIComponent(value);
    }
  }
  return null;
};

const getUserInfo = async () => {
  const token = getTokenFromCookie();
  if (token !== null) {
    try {
      const response = await fetch("/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("실패");
      }
    } catch (err) {
      console.error(err);
    }
  }
};

// 쿠키삭제 후 새로고침(로그아웃)
const deleteCookie = (name) => {
  document.cookie = `${encodeURIComponent(
    name
  )}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  window.location.href = "/";
};

const renderHeader = () => {
  const header = document.createElement("header");
  const handleUserInfo = async () => {
    try {
      const userInfo = await getUserInfo();
      if (userInfo == undefined) {
        // 비로그인
        header.innerHTML = `
        <a href="/" class="logo-img">
          <img src="/img/logo2.svg">
        </a>
      </div>
      <!-- 메뉴 -->
      <ul class="header-menu" id="headerMenu">
  
      </ul>
      <!-- 로그인/회원가입/장바구니 -->
      <div class="header-btn">
        <ul>
          <li><a href="/admin">관리자(임시)</i></a></li>
<<<<<<< HEAD
          <li id="cartIcon"><a href="/cart"><i class="fas fa-cart-shopping fa-lg"></i><span id ="cartCount"></span></a></li>
=======
          <li><a href="/cart"><i class="fas fa-cart-shopping fa-lg"></i></a></li>
>>>>>>> parent of 0e89253 (feat : 반응형 추가)
          <li id="loginBtn">로그인</li>
          <li id="JoinBtn">회원가입</li>
        </ul>
      </div>
    </header>
      `;

        header.querySelector("#loginBtn").addEventListener("click", showModal);
        header.querySelector("#JoinBtn").addEventListener("click", showModal);
      } else if (userInfo.isAdmin) {
        // 관리자계정
        header.innerHTML = `
        <a href="/" class="logo-img">
        <img src="/img/logo2.svg">
      </a>
    </div>
    <!-- 메뉴 -->
    <ul class="header-menu" id="headerMenu">
    
    </ul>
    <!-- 관리자페이지/로그아웃/장바구니 -->
    <div class="header-btn">
      <ul>
<<<<<<< HEAD
        <li id="cartIcon"><a href=""><i class="fas fa-cart-shopping fa-lg"></i><span id ="cartCount"></span></a></li>
=======
        <li><i class="fas fa-magnifying-glass fa-lg"></i></li>
        <li><a href=""><i class="fas fa-cart-shopping fa-lg"></i></a></li>
>>>>>>> parent of 0e89253 (feat : 반응형 추가)
        <li><a href="/admin">관리자</a></li>
        <li id="logout">로그아웃</li>
      </ul>
    </div>
    </header>
    `;
        header.querySelector("#logout").addEventListener("click", () => {
          deleteCookie("jwt");
        });
      } else if (!userInfo.isAdmin) {
        // 일반 계정
        header.innerHTML = `
      <a href="/" class="logo-img">
        <img src="/img/logo2.svg" alt="logo">
      </a>
    </div>
    <!-- 메뉴 -->
    <ul class="header-menu" id="headerMenu">
    
    </ul>
    <!-- 마이페이지/로그아웃/장바구니 -->
    <div class="header-btn">
      <ul>
<<<<<<< HEAD
        <li id="cartIcon"><a href=""><i class="fas fa-cart-shopping fa-lg"></i><span id ="cartCount"></span></a></li>
=======
        <li><i class="fas fa-magnifying-glass fa-lg"></i></li>
        <li><a href=""><i class="fas fa-cart-shopping fa-lg"></i></a></li>
>>>>>>> parent of 0e89253 (feat : 반응형 추가)
        <li><a href="/user/info">마이페이지</a></li>
        <li id="logout">로그아웃</li>
      </ul>
    </div>
    </header>
    `;
        header.querySelector("#logout").addEventListener("click", () => {
          deleteCookie("jwt");
        });
      }
      await headerMenuList();
    } catch (err) {
      console.error(err);
    }
  };
  // 헤더 카테고리
  const headerMenuList = async () => {
    try {
      const response = await fetch("/api/category");
      const data = await response.json();

      const headerMenu = document.querySelector("#headerMenu");
      // console.log(headerMenu);
      for (const item of data) {
        if (item) {
          // 빈칸이 아닐 때
          const li = document.createElement("li");
          li.innerHTML = `<a href="/products/${item}">${item}</a>`;
          headerMenu.appendChild(li);
        }
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  handleUserInfo();
<<<<<<< HEAD
  modal();
=======

  const loginModalContent = `
  <div class="modal fade" id="loginModalContent">
<div class="modal-header">
<h2 class="modal-title">로그인</h2>
<button class="btn-close"><i class="fa-solid fa-xmark"></i></button>
</div>
<div class="modal-body">
<form id="loginForm" class="form">
  <ul class="form-list">
    <li class="input-box">
      <label class="label" for="loginEmail">이메일</label>
      <input
        type="email"
        name="loginEmail"
        autocomplete="off"
        id= "loginEmail"
        value="admin@admin.com"
      />
    </li>
    <li class="input-box">
      <label class="label" for="loginPassword">비밀번호</label>
      <input type="password" name="password" id="loginPassword" autocomplete="off" />
    </li>
  </ul>
</form>
</div>
<div class="modal-footer">
<button type="submit" form="loginForm">로그인</button>
</div>
</div>
</div>
`;
  const joinModalContent = `
  <div class="modal fade" id="joinModalContent">
  <div class="modal-header">
  <h2 class="modal-title">회원가입</h2>
  <button class="btn-close"><i class="fa-solid fa-xmark"></i></button>
</div>
<div class="modal-body">

  <form id="joinForm"  method="POST" class="form">
    <ul class="form-list">
      <li class="input-box">
        <label class="label" for="joinUserName">이름</label>
        <input type="text" name="joinUserName" id="joinUserName" />
      </li>
      <li class="input-box">
        <label class="label" for="joinEmail">이메일</label>
        <input type="email" name="joinEmail" id="joinEmail" />
      </li>
      <li class="input-box">
        <label class="label" for="joinPassword">비밀번호</label>
        <input type="password" name="joinPassword" id="joinPassword" autocomplete="off" />
      </li>
      <li class="input-box">
        <label class="label" for="passwordCheck">비밀번호 확인</label>
        <input type="password" name="passwordCheck" id="passwordCheck" autocomplete="off" />
      </li>
    </ul>
  </form>
</div>
<div class="modal-footer">
  <button type="submit" form="joinForm">회원가입</button>
</div>
</div>
</div>
      `;
  const modalBg = document.createElement("div");
  modalBg.classList.add("modal-bg", "fade");
  div.append(modalBg);
  div.insertAdjacentHTML("afterbegin", joinModalContent);
  div.insertAdjacentHTML("afterbegin", loginModalContent);
  document.body.prepend(div);

>>>>>>> parent of 0e89253 (feat : 반응형 추가)
  return header;
};

document.body.prepend(renderHeader());

// 스크롤 시 헤더 고정
let header = document.querySelector("header");
let lnb = header.offsetTop;

window.addEventListener("scroll", function () {
  let windowScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (lnb < windowScroll) {
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
  }
});
<<<<<<< HEAD


// 장바구니 숫자 
document.addEventListener("DOMContentLoaded", function() {
  getLocalBooks();
});

function getLocalBooks() {
  const books = JSON.parse(localStorage.getItem("books"));
  const cartCount = document.getElementById("cartCount");

  if (books && books.length > 0) {
    cartCount.innerHTML = books.length;
  } else {
    cartCount.classList.add("count-none")
  }
}







=======
>>>>>>> parent of 0e89253 (feat : 반응형 추가)
