// 토큰 (로그인 확인)
const getTokenFromCookie = () => {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "token") {
      return decodeURIComponent(value);
    }
  }
  return null;
};

const count = (type) => {
  const resultElement = document.getElementById("result");
  const priceElement = document.getElementById("price");
  const totalpriceElement = document.getElementById("totalPrice");
  const addCommas = (number) =>
    number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  let number = parseInt(resultElement.innerText);
  let price = parseInt(priceElement.innerText.replace(/,/g, "")); // 쉼표 제거
  let totalprice = parseInt(totalpriceElement.innerText.replace(/,/g, "")); // 쉼표 제거

  if (type === "plus") {
    number += 1;
    totalprice += price;
  } else if (type === "minus") {
    if (number > 1) {
      number -= 1;
      totalprice -= price;
    }
  }

  resultElement.innerText = number;
  totalpriceElement.innerText = addCommas(totalprice);
};

const appndProduct = async () => {
  const id = getUrl();
  try {
    const detailContainer = document.getElementById("detailContainer");
    const book = await getProduct(id);
    const detailContent = detailContentTemplate(book);
    detailContainer.innerHTML = detailContent;
    categoryColor();
  } catch (error) {
    console.error("Error:", error);
  }
};

const getUrl = () => {
  const url = window.location.pathname;
  const parts = url.split("/").filter(Boolean);
  const id = parts.pop();

  return id;
};

const getProduct = async (id) => {
  try {
    const response = await fetch(`/api/product/${id}`);
    const book = await response.json();

    return book;
  } catch (error) {
    console.error("Error:", error);
  }
};

const directPurchase = (id) => {
  if (!getTokenFromCookie()) {
    alert("로그인이 필요합니다.");
    return;
  }

  const quantity = parseInt(document.getElementById("result").innerText);
  localStorage.setItem("selectedItems", JSON.stringify([{ id, quantity }]));
  location.href = "/order";
};

const detailContentTemplate = (book) => {
  const addCommas = (number) =>
    number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `<div class="detail-img">
      <img src=${book.imageUrl} alt="${book.title}">
    </div>
    <div class="detail-info">
      <p class="detail-cate">#${book.category}</p>
      <h3>${book.title}</h3>
      <p class="detail-description">${book.description}</p>
      <p class="detail-description">${book.author} (지은이) / ${
    book.pages
  }쪽</p>
      <h4><span id="price">${addCommas(book.price)}</span>원</h4>
      <div class="detail-price">
        <h5>배송정보</h5>
        <p>3,000원 (30,000원 이상 구매 시 무료)</p>
      </div>
      <div class="detail-count-info">
        <h5>수량</h5>
        <div class="count-price">
          <div class="detail-count">
            <input type='button' class="bt-minus" onclick='count("minus")' value='-'/>
            <div id='result' class="count-result">1</div>
            <input type='button' class="bt-plus" onclick='count("plus")' value='+'/>
          </div>
        </div>
      </div>
      <div class="all-price">
        <h6>총 금액</h6>
        <p><span id="totalPrice">${addCommas(book.price)}</span>원</p>
      </div>
      <div class="detail-btn">
        <button class="detail-cart" onclick="setItemToDBOrLocalStorage()"></button>
        <button class="detail-buy" onclick="directPurchase('${
          book._id
        }')">바로 구매하기</button>
      </div>
    </div>`;
};
appndProduct();

const setItemToDBOrLocalStorage = async () => {
  const id = getUrl();
  const quantity = parseInt(document.getElementById("result").innerText);
  const book = { id, quantity };
  const token = getTokenFromCookie();

  if (token) {
    // 서버에 저장
    const response = await fetch("/api/user/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
    if (!response.ok) {
      throw new Error("장바구니 저장에 실패했습니다.");
    }
  } else {
    //로컬스토래지에 저장
    let carts = JSON.parse(localStorage.getItem("carts")) || [];
    const isBook = Object.values(carts).find((obj) => obj.id == book.id);

    if (isBook) {
      const newBook = { ...isBook, quantity: isBook.quantity + book.quantity };
      carts = Object.values(carts).filter((obj) => obj.id !== book.id);
      carts.unshift(newBook);
    } else {
      carts.unshift(book);
    }
    localStorage.setItem("carts", JSON.stringify(carts));
  }

  showPutMessage();
};

const showPutMessage = () => {
  const message = document.querySelector(".put-message-modal");
  message.classList.add("visible");
  setTimeout(() => {
    message.classList.remove("visible");
  }, 4000);
};

const categoryColor = async () => {
  try {
    const response = await fetch("/api/category");
    const products = await response.json();
    const cateList = document.getElementsByClassName("detail-cate");

    Array.from(cateList).forEach((cate) => {
      const category = cate.textContent.slice(1);
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
    console.error("Error:", error);
  }
};
