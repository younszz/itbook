import { modal, showModal } from './modal.js';

// 토큰 가져오기 (for 비로그인 상태 체크)
const getTokenFromCookie = () => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'token') {
      return decodeURIComponent(value);
    }
  }
  return null;
};

// DB 유저 정보 요청 (for 일반 & 관리자 체크)
const getUserFromDB = async () => {
  try {
    const response = await fetch('/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('실패');
    }
  } catch (err) {
    console.error(err);
  }
};

// 로그아웃 (쿠키삭제 후 새로고침)
const deleteCookie = () => {
  document.cookie = `${encodeURIComponent(
    'token'
  )}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  window.location.href = '/';
};

// 헤더 카테고리
const createMenuList = async (target) => {
  try {
    const response = await fetch('/api/category');
    const data = await response.json();
    const headerMenu = target.querySelector('#headerMenu');
    for (const item of data) {
      if (item) {
        const li = document.createElement('li');
        li.innerHTML = `<a href="/products/${item}">${item}</a>`;
        headerMenu.appendChild(li);
      }
    }
  } catch (error) {
    console.log('Error:', error);
  }
};

// 헤더 기본 템플릿
const headerTemplate = () => {
  const header = document.createElement('header');
  header.innerHTML = `
  <a href="/" class="logo-img">
    <img src="/img/logo2.svg">
  </a>
  <ul class="header-menu" id="headerMenu">
  </ul>
<div class="header-btn">
  <ul id="authMenu">
    <li><a href="/cart"><i class="fas fa-cart-shopping fa-lg"></i></a></li>
  </ul>
</div>
`;
  return header;
};

// 헤더 생성
const createHeader = async () => {
  try {
    const header = headerTemplate();
    const authMenu = header.querySelector('#authMenu');
    const token = getTokenFromCookie();
    if (!token) {
      const loginBtn = document.createElement('li');
      const joinBtn = document.createElement('li');
      loginBtn.innerText = '로그인';
      joinBtn.innerText = '회원가입';
      loginBtn.addEventListener('click', () => showModal('login'));
      joinBtn.addEventListener('click', () => showModal('join'));
      authMenu.append(loginBtn);
      authMenu.append(joinBtn);
    } else {
      const user = await getUserFromDB();
      const userBtn = document.createElement('li');
      const logoutBtn = document.createElement('li');
      logoutBtn.addEventListener('click', deleteCookie);

      userBtn.innerHTML = `<a href="${user.isAdmin ? '/admin' : '/user/info'}">${
        user.isAdmin ? '관리자' : '마이페이지'
      }</a>`;

      logoutBtn.innerText = '로그아웃';
      authMenu.appendChild(userBtn);
      authMenu.appendChild(logoutBtn);
    }

    modal();
    await createMenuList(header);
    document.body.prepend(header);
  } catch (err) {
    console.error(err);
  }
};

createHeader();

// 스크롤 시 헤더 고정
window.addEventListener('scroll', function () {
  let header = document.querySelector('header');
  let lnb = header.offsetTop;
  let windowScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (lnb < windowScroll) {
    header.classList.add('fixed');
  } else {
    header.classList.remove('fixed');
  }
});
