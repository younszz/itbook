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
          <li><a href="/cart"><i class="fas fa-cart-shopping fa-lg"></i></a></li>
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
        <li><i class="fas fa-magnifying-glass fa-lg"></i></li>
        <li><a href=""><i class="fas fa-cart-shopping fa-lg"></i></a></li>
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
      <a href="/">
        <img src="/img/logo.png" alt="logo">
      </a>
    </div>
    <!-- 메뉴 -->
    <ul class="header-menu" id="headerMenu">
    
    </ul>
    <!-- 마이페이지/로그아웃/장바구니 -->
    <div class="header-btn">
      <ul>
        <li><i class="fas fa-magnifying-glass fa-lg"></i></li>
        <li><a href="/cart"><i class="fas fa-cart-shopping fa-lg"></i></a></li>
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
  modal();
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
