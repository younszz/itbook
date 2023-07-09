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
    const response = await fetch('/api/products');
    const data = await response.json();
    const books = data
      .map(
        (book) =>
          `<div class="list-box">
            <a href="/product/${book._id}">
              <div class="img-wrap">
                <img src=${book.imageUrl} alt="" />
              </div>
              <div class="info">
                <p class="cate">${book.category}</p>
                <p class="name">${book.title}</p>
                <p class="price">${book.price}원</p>
              </div>
            </a>
          </div>`
      )
      .join('');
    bookList.innerHTML = books;

    // 카테고리 별 색상 적용
    categoryColor();
  } catch (error) {
    console.error('Error:', error);
  }
}

async function categoryColor() {
  try {
    const cateList = document.getElementsByClassName("cate");
    Array.from(cateList).forEach((cate) => {
      const category = cate.textContent;
      if (category === "웹") {
        cate.classList.add("green");
      } else if (category === "Ai") {
        cate.classList.add("orange");
      } else if (category === "알고리즘") {
        cate.classList.add("blue");
      } else if (category === "모바일") {
        cate.classList.add("pink");
      } else{
        cate.classList.add("purple");
      } 
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchProducts();
