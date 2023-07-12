async function productsByCategory() {
  const url = window.location.pathname;
  const parts = url.split("/").filter(Boolean);
  const category = decodeURIComponent(parts.pop());
  try {
    const response = await fetch(`/api/products?category=${category}`);
    const data = await response.json();
    const books = data
      .map(
        (book) =>
          `<li>
          <a href="/product/${book._id}">
            <img src="${book.imageUrl}" alt="${book.title}" />
            <div class="info">
              <p class="cate">${book.category}</p>
              <p class="name">${book.title}</p>
              <p class="price">${book.price}원</p>
            </div>
          </a>
        </li>`
      )
      .join("");
    const wrap = document.querySelector(".wrap");
    wrap.insertAdjacentHTML(
      "beforeend",
      `<div class="product-title">
    <h2>${category}</h2>
    <p>총 ${data.length}개</p>
  </div>
  <div class="product-list">
    <div class="b-list">
      <ul class="list-box">
        ${books}
      </ul>
    </div>
  </div>`
    );
  } catch (error) {
    console.error("Error:", error);
  }
}
productsByCategory();
