// 모달창
const showModal = (mode) => {
  const loginModalContent = document.querySelector('#loginModalContent');
  const joinModalContent = document.querySelector('#joinModalContent');
  const bg = document.querySelector('.modal-bg');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (mode === 'login') {
    bg.classList.add('show');
    loginModalContent.classList.add('show');

    // 유효성 검사
    const loginEmail = document.querySelector('#loginEmail');
    const loginPassword = document.querySelector('#loginPassword');
    const loginForm = document.querySelector('#loginForm');
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!emailRegex.test(loginEmail.value)) {
        alert('유효한 이메일을 입력하세요.');
        loginEmail.focus();
        return false;
      }
      if (!loginPassword.value) {
        alert('비밀번호를 입력하세요.');
        loginPassword.focus();
        return false;
      }
      //fetch
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginEmail.value,
          password: loginPassword.value,
        }),
      });

      if (response.ok) {
        alert('로그인 성공');
        // 로그인 성공 시 메인페이지로 이동
        window.location.href = '/';
      } else {
        alert(`로그인 실패`);
      }
    });
  } else if (mode === 'join') {
    bg.classList.add('show');
    joinModalContent.classList.add('show');

    // 유효성 검사
    const joinUserName = document.querySelector('#joinUserName');
    const joinEmail = document.querySelector('#joinEmail');
    const joinPassword = document.querySelector('#joinPassword');
    const passwordCheck = document.querySelector('#passwordCheck');
    const joinForm = document.querySelector('#joinForm');
    joinForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!joinUserName.value) {
        alert('이름을 입력하세요.');
        joinUserName.focus();
        return false;
      }
      if (!emailRegex.test(joinEmail.value)) {
        alert('유효한 이메일을 입력하세요.');
        joinEmail.focus();
        return false;
      }
      if (!joinPassword.value) {
        alert('비밀번호를 입력하세요.');
        joinPassword.focus();
        return false;
      }
      if (joinPassword.value !== passwordCheck.value) {
        alert('비밀번호가 일치하지 않습니다.');
        passwordCheck.focus();
        return false;
      }
      //fetch
      const response = await fetch('/api/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: joinUserName.value,
          email: joinEmail.value,
          password: joinPassword.value,
        }),
      });

      if (response.ok) {
        alert('회원가입 성공');
        // 회원가입 성공 시 메인페이지로 이동
        window.location.href = '/';
      } else {
        const errorText = await response.json();
        alert(errorText);
      }
    });
  }
  // 인풋창 포커스in-out 이벤트
  const inputs = document.querySelectorAll('input');
  function inputFocusIn(e) {
    e.target.parentNode.classList.add('focus');
  }
  function inputFocusOut(e) {
    if (e.target.value.length === 0) {
      e.target.parentNode.classList.remove('focus');
    } else if (e.target.value) {
      e.target.style.borderColor = '#ddd';
    }
  }
  inputs.forEach((input) => {
    input.addEventListener('focusin', inputFocusIn);
  });
  inputs.forEach((input) => {
    input.addEventListener('focusout', inputFocusOut);
  });

  // 닫기
  const closeBtn = document.querySelectorAll('.btn-close');
  const modalClose = () => {
    bg.classList.remove('show');
    loginModalContent.classList.remove('show');
    joinModalContent.classList.remove('show');
  };
  closeBtn.forEach((btn) => {
    btn.addEventListener('click', modalClose);
  });
  document.querySelector('.modal-bg').addEventListener('click', modalClose);
};

const modal = async () => {
  const div = document.createElement('div');
  document.body.prepend(div);
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

  const modalBg = document.createElement('div');
  modalBg.classList.add('modal-bg', 'fade');
  div.append(modalBg);

  document.body.prepend(div);
  div.insertAdjacentHTML('afterbegin', joinModalContent);
  div.insertAdjacentHTML('afterbegin', loginModalContent);
};

export { modal, showModal };
