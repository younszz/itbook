// 로그인 모달창
const showLoginModal = () => {
  // 모달div 생성
  const modal = document.createElement("div");
  modal.setAttribute("class", "modal");
  modal.setAttribute("id", "modalLogin");
  modal.innerHTML = `
  <div class="modal-header">
  <h2 class="modal-title">로그인</h2>
  <button class="btn-close"><i class="fa-solid fa-xmark"></i></button>
</div>
<div class="modal-body">
  <form id="loginForm">
    <ul class="form-list">
      <li class="input-box">
        <label class="label" for="loginEmail">이메일</label>
        <input
          type="email"
          name="loginEmail"
          autocomplete="off"
          id= "loginEmail"
        />
      </li>
      <li class="input-box">
        <label class="label" for="loginPassword">비밀번호</label>
        <input type="password" name="password" id="loginPassword" />
      </li>
    </ul>
  </form>
</div>
<div class="modal-footer">
  <button type="submit" form="loginForm">로그인</button>
</div>
</div>
  `;
  // 모달 보여질때 뒤에 배경
  const modalBg = document.createElement("div");
  modalBg.className = "modal-bg";
  document.body.append(modalBg);

  // body맨앞에 모달div 생성
  document.body.prepend(modal);

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

  // 유효성 검사
  const loginEmail = document.querySelector("#loginEmail");
  const loginPassword = document.querySelector("#loginPassword");
  const loginForm = document.querySelector("#loginForm");
  loginForm.addEventListener("submit", (e) => {
    // e.preventDefault();
    if (!loginEmail.value) {
      alert("이메일을 입력하세요.");
      loginEmail.focus();
      return false;
    }
    if (!loginPassword.value) {
      alert("비밀번호를 입력하세요.");
      loginPassword.focus();
      return false;
    }
  });

  // 모달배경, 모달창 사라짐
  const closeBtn = document.querySelector(".btn-close");
  const modalClose = () => {
    modal.remove();
    document.querySelector(".modal-bg").remove();
  };
  modalBg.addEventListener("click", modalClose);
  closeBtn.addEventListener("click", modalClose);
};

// 회원가입 모달창
const showJoinModal = () => {
  const modal = document.createElement("div");
  modal.setAttribute("class", "modal");
  modal.setAttribute("id", "modalJoin");
  modal.innerHTML = `
  <div class="modal-header">
  <h2 class="modal-title">회원가입</h2>
  <button class="btn-close"><i class="fa-solid fa-xmark"></i></button>
</div>
<div class="modal-body">
  <form id="joinForm" action="/signup" method="POST">
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
        <input type="password" name="joinPassword" id="joinPassword" />
      </li>
      <li class="input-box">
        <label class="label" for="passwordCheck">비밀번호 확인</label>
        <input type="password" name="passwordCheck" id="passwordCheck" />
      </li>
    </ul>
  </form>
</div>
<div class="modal-footer">
  <button type="submit" form="joinForm">회원가입</button>
</div>
</div>
  `;

  const modalBg = document.createElement("div");
  modalBg.className = "modal-bg";
  document.body.append(modalBg);

  document.body.prepend(modal);

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

  const joinUserName = document.querySelector("#joinUserName");
  const joinEmail = document.querySelector("#joinEmail");
  const joinPassword = document.querySelector("#joinPassword");
  const passwordCheck = document.querySelector("#passwordCheck");
  const joinForm = document.querySelector("#joinForm");
  joinForm.addEventListener("submit", (e) => {
    // e.preventDefault();
    if (!joinUserName.value) {
      alert("이름을 입력하세요.");
      joinUserName.focus();
      return false;
    }
    if (!joinEmail.value) {
      alert("이메일을 입력하세요.");
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
  });

  const closeBtn = document.querySelector(".btn-close");
  const modalClose = () => {
    modal.remove();
    document.querySelector(".modal-bg").remove();
  };
  modalBg.addEventListener("click", modalClose);
  closeBtn.addEventListener("click", modalClose);
};

const renderHeader = () => {
  const header = document.createElement("header");
  header.innerHTML = `
    <a href="/">
      <img src="/img/logo.png" alt="logo">
    </a>
  </div>
  <!-- 메뉴 -->
  <ul class="header-menu">

    <li><a href="/products">알고리즘</a></li>
    <li><a href="/products">Ai</a></li>
    <li><a href="/products">웹</a></li>
    <li><a href="/products">모바일</a></li>
    <li><a href="/products">대학서적</a></li>

  </ul>
  <!-- 로그인/회원가입/장바구니 -->
  <div class="header-btn">
    <ul>
      <li><i class="fas fa-magnifying-glass fa-lg"></i></li>
      <li><a href=""><i class="fas fa-cart-shopping fa-lg"></i></a></li>
      <li id="loginBtn">로그인</li>
      <li id="JoinBtn">회원가입</li>
    </ul>
  </div>
</header>
  `;

  header.querySelector("#loginBtn").addEventListener("click", showLoginModal);
  header.querySelector("#JoinBtn").addEventListener("click", showJoinModal);
  return header;
};
