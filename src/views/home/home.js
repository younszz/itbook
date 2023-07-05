// 메인 swiper
var swiper = new Swiper('.main-swiper', {
  cssMode: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
  },
  loop: true,
  mousewheel: true,
  keyboard: true,
});

// 스크롤 시 헤더 고정
let header = document.querySelector('header');
let lnb = header.offsetTop;

window.addEventListener('scroll', function () {
  let windowScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (lnb < windowScroll) {
    header.classList.add('fixed');
  } else {
    header.classList.remove('fixed');
  }
});



// book-list swiper
var swiper = new Swiper('.list-swiper', {
  slidesPerView: 3,
  spaceBetween: 10,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  loop: true,
});

async function fetchProducts() {
  try {
    const bookList = document.getElementById('bookList');
    const response = await fetch('/products');
    const data = await response.json();

    const books = data
      .map(
        (book) =>
          `<div class="list-box">
      <a><img src=${book.imageUrl} alt="" /></a>
      <div class="info">
        <p class="cate new">${book.category}</p>
        <p class="name">${book.title}</p>
        <p class="price">${book.description}</p>
      </div>
    </div>`
      )
      .join('');
    bookList.innerHTML = books;
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchProducts();
