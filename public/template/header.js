const showModal = () => {
  const modal = document.createElement('div');
  modal.setAttribute('class', 'modal fade');
  modal.setAttribute('id', 'modalLogin');
  modal.innerHTML = `
  <div class="modal-header">
  <h2 class="modal-title">로그인</h2>
  <button class="btn-close">X</button>
</div>
<div class="modal-body">
  <form class="login-form" id="a">
    <ul class="form-list">
      <li class="input-box">
        <label class="label" for="loginEmail">이메일</label>
        <input
          type="email"
          name="loginEmail"
          autocomplete="off"
        />
      </li>
      <li class="input-box">
        <label class="label" for="password">비밀번호</label>
        <input type="password" name="password" id="password" />
      </li>
    </ul>
  </form>
</div>
<div class="modal-footer">
  <button type="submit" form="a">로그인</button>
  <a href="#">비밀번호 찾기</a>
</div>
</div>
<div class="modal fade" id="modalLogin">
<div class="modal-header">
  <h2 class="modal-title">로그인</h2>
  <button class="btn-close"><i class="fa-solid fa-xmark"></i></button>
</div>
<div class="modal-body">
  <form class="login-form">
    <ul class="form-list">
      <li class="input-box">
        <label class="label" for="loginEmail">이메일</label>
        <input
          type="email"
          name="loginEmail"
          autocomplete="off"
        />
      </li>
      <li class="input-box">
        <label class="label" for="password">비밀번호</label>
        <input type="password" name="password"  />
      </li>
    </ul>
  </form>
</div>
<div class="modal-footer">
  <button type="submit">로그인</button>
</div>
  `
  console.log(modal)
  document.body.prepend(modal);
};

const renderHeader = () => {
  const header = document.createElement('header');
  header.innerHTML = `
  <header>
  <!-- 로고 -->
  <div class="header-in">
    <a href="#">
      <img src="/img/logo.png" alt="logo">
    </a>
  </div>
  <!-- 메뉴 -->
  <ul class="header-menu">
    <li><a href="">전체</a></li>
    <li><a href="">수험서</a></li>
    <li><a href="">알고리즘</a></li>
    <li><a href="">Ai</a></li>
    <li><a href="">웹/모바일</a></li>
    <li><a href="">자기계발</a></li>
    <li><a href="">대학서적</a></li>
  </ul>
  <!-- 로그인/회원가입/장바구니 -->
  <div class="header-btn">
    <ul>
      <li><i class="fas fa-magnifying-glass fa-lg"></i></li>
      <li><a href=""><i class="fas fa-cart-shopping fa-lg"></i></a></li>
      <li><button id="loginBtn">로그인</button></li>
      <li><button>회원가입</button></li>
    </ul>
  </div>
</header>
  `;

  header.querySelector('#loginBtn').addEventListener('click', showModal);
  return header;
};

document.body.prepend(renderHeader());