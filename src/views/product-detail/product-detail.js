function count(type) {
  const resultElement = document.getElementById('result');
  const priceElement = document.getElementById('price');
  const totalpriceElement = document.getElementById('totalPrice');

  let number = parseInt(resultElement.innerText);
  let price = parseInt(priceElement.innerText);
  let totalprice = parseInt(totalpriceElement.innerText);

  if (type === 'plus') {
    number += 1;
    totalprice += price;
  } else if (type === 'minus') {
    if (number > 1) {
      number -= 1;
      totalprice -= price;
    }
  }

  resultElement.innerText = number;
  totalpriceElement.innerText = totalprice;
}


async function appndProduct() {
  const id = getUrl();
  try {
    const detailContainer = document.getElementById('detailContainer');
    const book = await getProduct(id);
    const detailContent = detailContentTemplate(book);
    detailContainer.innerHTML = detailContent;
  } catch (error) {
    console.error('Error:', error);
  }
}


function getUrl(){
  const url = window.location.pathname;
  const parts = url.split('/').filter(Boolean);
  const id = parts.pop();

  return id;
}

async function getProduct(id) {
  try {
    const response = await fetch(`/api/product/${id}`);
    const book = await response.json();

    return book;
  } catch (error) {
    console.error('Error:', error);
  }
}


function detailContentTemplate(book){
  return `<div class="detail-img">
      <img src=${book.imageUrl} alt="">
    </div>
    <div class="detail-info">
      <p class="detail-cate">#${book.category}</p>
      <h3>${book.title}</h3>
      <p class="detail-description">${book.description}</p>
      <p class="detail-description">${book.author} (지은이) / ${book.pages}쪽</p>
      <h4><span id="price">${book.price}</span>원</h4>
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
        <p><span id="totalPrice">${book.price}</span>원</p>
      </div>
      <div class="detail-btn">
        <button class="detail-cart" onclick="setLocalItems()"></button>
        <button class="detail-buy">바로 구매하기</button>
      </div>
    </div>`;
}
appndProduct();

async function setLocalItems(){
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const id = getUrl();
  const quantity = parseInt(document.getElementById("result").innerText);
  const book = { id, quantity};
  const isBook = Object.values(books).find(obj => obj.id == book.id);
  if(isBook){
    const newBook = {...isBook, quantity: book.quantity};
    const newBooks = Object.values(books).filter((obj) => obj.id !== book.id)
    newBooks.push(newBook);
    localStorage.setItem("books",JSON.stringify(newBooks));
    showPutMessage();
    return ;
  }
  books.push(book);
  localStorage.setItem("books",JSON.stringify(books));
  showPutMessage();
}

function showPutMessage(){
  const message = document.querySelector('.put-message-modal');
    message.classList.add('visible');
    setTimeout(() => {
      message.classList.remove('visible');
    },4000);
} 