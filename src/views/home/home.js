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

// 상품 데이터 바인딩 함수
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
