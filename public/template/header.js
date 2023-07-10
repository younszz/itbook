// 모달창
const showModal = (e) => {
  const mode = e.target.id;
  const loginModalContent = document.querySelector("#loginModalContent");
  const joinModalContent = document.querySelector("#joinModalContent");
  const bg = document.querySelector(".modal-bg");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (mode === "loginBtn") {
    bg.classList.add("show");
    loginModalContent.classList.add("show");

    // 유효성 검사
    const loginEmail = document.querySelector("#loginEmail");
    const loginPassword = document.querySelector("#loginPassword");
    const loginForm = document.querySelector("#loginForm");
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!emailRegex.test(loginEmail.value)) {
        alert("유효한 이메일을 입력하세요.");
        loginEmail.focus();
        return false;
      }
      if (!loginPassword.value) {
        alert("비밀번호를 입력하세요.");
        loginPassword.focus();
        return false;
      }
      //fetch추가코드
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail.value,
          password: loginPassword.value,
        }),
      });

      if (response.ok) {
        alert("로그인 성공");
        // 로그인 성공 시 메인페이지로 이동
        window.location.href = "/";
      } else {
        alert(`로그인 실패`);
      }
    });
  } else if (mode === "JoinBtn") {
    bg.classList.add("show");
    joinModalContent.classList.add("show");

    // 유효성 검사
    const joinUserName = document.querySelector("#joinUserName");
    const joinEmail = document.querySelector("#joinEmail");
    const joinPassword = document.querySelector("#joinPassword");
    const passwordCheck = document.querySelector("#passwordCheck");
    const joinForm = document.querySelector("#joinForm");
    joinForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!joinUserName.value) {
        alert("이름을 입력하세요.");
        joinUserName.focus();
        return false;
      }
      if (!emailRegex.test(joinEmail.value)) {
        alert("유효한 이메일을 입력하세요.");
        joinEmail.focus();
        return false;
      }
      if (!joinPassword.value) {
        alert("비밀번호를 입력하세요.");
        joinPassword.focus();
        return false;
      }
      if (joinPassword.value !== passwordCheck.value) {
        alert("비밀번호가 일치하지 않습니다.");
        passwordCheck.focus();
        return false;
      }
      //fetch
      const response = await fetch("/api/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: joinUserName.value,
          email: joinEmail.value,
          password: joinPassword.value,
          password_confirm: passwordCheck.value,
        }),
      });

      if (response.ok) {
        alert("회원가입 성공");
        // 회원가입 성공 시 메인페이지로 이동
        window.location.href = "/";
      } else {
        // const errorData = await response.json();
        alert(`회원가입 실패`);
      }
    });
  }
  // 인풋창 포커스in-out 이벤트
  const inputs = document.querySelectorAll("input");
  function inputFocusIn(e) {
    e.target.parentNode.classList.add("focus");
  }
  function inputFocusOut(e) {
    if (e.target.value.length === 0) {
      e.target.parentNode.classList.remove("focus");
    } else if (e.target.value) {
      e.target.style.borderColor = "#ddd";
    }
  }
  inputs.forEach((input) => {
    input.addEventListener("focusin", inputFocusIn);
  });
  inputs.forEach((input) => {
    input.addEventListener("focusout", inputFocusOut);
  });

  // 닫기
  const closeBtn = document.querySelectorAll(".btn-close");
  const modalClose = () => {
    bg.classList.remove("show");
    loginModalContent.classList.remove("show");
    joinModalContent.classList.remove("show");
  };
  closeBtn.forEach((btn) => {
    btn.addEventListener("click", modalClose);
  });
  document.querySelector(".modal-bg").addEventListener("click", modalClose);
};

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
  const div = document.createElement("div");

  const handleUserInfo = async () => {
    try {
      const userInfo = await getUserInfo();
      if (userInfo == undefined) {
        // 비로그인
        header.innerHTML = `
        <a href="/">
          <img src="/img/logo.png" alt="logo">
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
      <a href="/">
        <img src="/img/logo.png" alt="logo">
      </a>
    </div>
    <!-- 메뉴 -->
    <ul class="header-menu" id="headerMenu">
    
    </ul>
    <!-- 로그인/회원가입/장바구니 -->
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
    <!-- 로그인/회원가입/장바구니 -->
    <div class="header-btn">
      <ul>
        <li><i class="fas fa-magnifying-glass fa-lg"></i></li>
        <li><a href=""><i class="fas fa-cart-shopping fa-lg"></i></a></li>
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
