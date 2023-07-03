
// swiper
var swiper = new Swiper(".main-swiper", {
  cssMode: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
  loop: true,
  mousewheel: true,
  keyboard: true,
});
