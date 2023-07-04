const modalBtns = document.querySelectorAll(".modal-btn");
const modals = document.querySelectorAll(".modal");
const btnCloses = document.querySelectorAll(".btn-close");
const inputs = document.querySelectorAll("input");

const modalLogin = document.querySelector("#modalLogin");
const modalJoin = document.querySelector("#modalJoin");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const joinUserName = document.querySelector("#joinUserName");
const joinEmail = document.querySelector("#joinEmail");
const joinPassword = document.querySelector("#joinPassword");
const passwordCheck = document.querySelector("#passwordCheck");
const btnSubmits = document.querySelectorAll("button[type=submit]");

modalBtns.forEach((modalBtn) => {
  modalBtn.addEventListener("click", (e) => {
    let id = e.currentTarget.dataset.id;
    let modal = document.getElementById(id);

    // 모달창 보이기
    modal.classList.add("show");

    const modalBg = document.createElement("div");
    modalBg.className = "modal-bg";
    document.body.append(modalBg);

    // 인풋창 포커스
    inputs.forEach((input) => {
      input.addEventListener("focusin", inputFocusIn);
    });
    inputs.forEach((input) => {
      input.addEventListener("focusout", inputFocusOut);
    });

    // 모달창 닫기
    btnCloses.forEach((btnClose) => {
      btnClose.addEventListener("click", closeClick);
    });
    modalBg.addEventListener("click", closeClick);
  });
});

btnSubmits.forEach((btnSubmit) => {
  btnSubmit.addEventListener("click", function () {
    if (modalLogin.classList.contains("show")) {
      if (!email.value || email.value.indexOf("@") === -1) {
        alert("이메일을 입력하세요.");
        email.focus();
        return false;
      }
      if (!password.value) {
        alert("비밀번호를 입력하세요.");
        password.focus();
        return false;
      }
    }
    if (modalJoin.classList.contains("show")) {
      if (!joinUserName.value) {
        alert("이름를 입력하세요.");
        joinUserName.focus();
        return false;
      }
      if (!joinEmail.value || email.value.indexOf("@") === -1) {
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
    }
  });
});

function closeClick() {
  modals.forEach((modal) => {
    modal.classList.remove("show");
  });
  document.querySelector(".modal-bg").remove();
}

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
