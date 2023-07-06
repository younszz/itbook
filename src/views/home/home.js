// 메인 swiper
var swiper = new Swiper(".main-swiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: true // 쓸어 넘기거나 버튼 클릭 시 자동 슬라이드 정지.
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

// 상품 데이터 바인딩 함수
async function fetchProducts() {
  try {
    const bookList = document.getElementById('bookList');
    const response = await fetch('/products');
    console.log(response)
    const data = await response.json();
    const books = data
      .map(
        (book) =>
          `<div class="list-box">
      <a href="/product">
      <div class="img-wrap">
        <img src=${book.imageUrl} alt="" />
      </div>
      <div class="info">
        <p class="cate new">${book.category}</p>
        <p class="name">${book.title}</p>
        <p class="price">${book.price}원</p>
      </div>
      </a>
    </div>`
      )
      .join('');
    bookList.innerHTML = books;
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchProducts();
