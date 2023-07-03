const modalLogin = document.querySelector("#modalLogin");
const modal = document.querySelector(".modal");
const btnClose = document.querySelector(".btn-close");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

function loginClick() {
  const modalBg = document.createElement("div");
  modalBg.className = "modal-bg";
  modal.classList.add("show");
  document.body.append(modalBg);
  emailInput.addEventListener("focusin", inputFocusIn);
  emailInput.addEventListener("focusout", inputFocusOut);
  passwordInput.addEventListener("focusin", inputFocusIn);
  passwordInput.addEventListener("focusout", inputFocusOut);
}
function closeClick() {
  modal.classList.remove("show");
  document.querySelector(".modal-bg").remove();
}
function inputFocusIn(e) {
  e.target.parentNode.classList.add("focus");
}
function inputFocusOut(e) {
  if (e.target.value.length === 0) {
    e.target.parentNode.classList.remove("focus");
  }
}
modalLogin.addEventListener("click", loginClick);
btnClose.addEventListener("click", closeClick);
