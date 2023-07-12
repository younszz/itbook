// 메인 swiper
var swiper = new Swiper(".main-swiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: true 
  },
  loop:true,
});

// 신상품 swiper
var swiper = new Swiper(".new-swiper", {
  slidesPerView: 3,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // autoplay: {
  //   delay: 3000,
  //   disableOnInteraction: true 
  // },
  breakpoints: {
    1: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 3, 
  },
},
  loop:true,
});

// 상품 데이터 함수
async function fetchProducts() {
  try {
    const bookList = document.getElementById('bookList');
    const response = await fetch('/api/products');
    const data = await response.json();
    const sortedData = data.filter((book) => book.category === "웹");

    const books = sortedData
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
    newProducts();

    categoryColor();
  } catch (error) {
    console.error('Error:', error);
  }
}


// 신상품 정렬
async function newProducts() {
  try {
    const newswiper = document.getElementById('newSwiper');
    const response = await fetch('/api/products');
    const data = await response.json();
    const sortedData = data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    
    const books = sortedData
      .map(
        (book) =>
          `<div class="swiper-slide">
          <div class="b-list list02">
            <div class="list-box">
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
            </div>
          </div>
        </div>`
      )
      .reverse()
      .slice(0, 6)
      .join('');

      newswiper.innerHTML = books;
  }
  catch (error) {
    console.error('Error:', error);
  }
}






async function categoryColor() {
  try {
    const response = await fetch('/api/category');
    const products = await response.json();
    const cateList = document.getElementsByClassName("cate");

    Array.from(cateList).forEach((cate) => {
      const category = cate.textContent;
      const productCategory0 = products[0];
      const productCategory1 = products[1]; 
      const productCategory2 = products[2]; 
      const productCategory3 = products[3]; 
      const productCategory4 = products[4]; 
      const productCategory5 = products[5]; 

      if (category === productCategory0) {
        cate.classList.add("green");
      } else if (category === productCategory1) {
        cate.classList.add("orange");
      } else if (category === productCategory2) {
        cate.classList.add("blue");
      } else if (category === productCategory3) {
        cate.classList.add("pink");
      } else if (category === productCategory4) {
        cate.classList.add("purple");
      } else if (category === productCategory5) {
        cate.classList.add("navy");
      } else {
        cate.classList.add("red");
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchProducts();