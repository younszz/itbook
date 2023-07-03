const modalBtns = document.querySelectorAll(".modal-btn");
const modals = document.querySelectorAll(".modal");
const btnCloses = document.querySelectorAll(".btn-close");
const inputs = document.querySelectorAll("input");

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
  }
}
