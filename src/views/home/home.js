
// 메인 swiper
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

// 스크롤 시 헤더 고정
let header = document.querySelector("header");
let lnb = header.offsetTop;

window.addEventListener("scroll", function() {
    let windowScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (lnb < windowScroll) {
        header.classList.add("fixed");
    } else {
        header.classList.remove("fixed");
    }
});

// 스크롤 top-btn
let Top = document.querySelector('.top-btn');

window.addEventListener('scroll', function() {
  if (this.scrollY > 200) {
    Top.classList.add('on');
  } else {
    Top.classList.remove('on');
  }
})

Top.addEventListener('click', function (e) {
  e.preventDefault();
  window.scrollTo({top: 0, behavior: 'smooth'});
})


// book-list swiper
var swiper = new Swiper(".list-swiper", {
  slidesPerView: 3,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true,
});