// 수량 증가 / 감소 버튼
function count(type) {
  // 결과를 표시할 element
  const resultElement = document.getElementById('result');
  const priceElement = document.getElementById('price');
  const totalpriceElement = document.getElementById('totalPrice');

  // 현재 화면에 표시된 값
  let number = parseInt(resultElement.innerText);
  let price = parseInt(priceElement.innerText);
  let totalprice = parseInt(totalpriceElement.innerText);

  // 더하기/빼기
  if (type === 'plus') {
    number += 1;
    totalprice += price;
  } else if (type === 'minus') {
    if (number > 1) {
      number -= 1;
      totalprice -= price;
    }
  }

  // 결과 출력
  resultElement.innerText = number;
  totalpriceElement.innerText = totalprice;
}

// 상품 데이터 바인딩 함수
async function fetchProduct() {
  const id = getUrl();
  try {
    const detailContainer = document.getElementById('detailContainer');
    const book = await getProduct(id);
    const detailContent = `<div class="detail-img">
      <img src=${book.imageUrl} alt="">
    </div>
    <div class="detail-info">
      <p class="detail-cate web">#${book.category}</p>
      <h3>${book.title}</h3>
      <p class="detail-description">${book.description}</p>
      <p class="detail-description">이웅모 (지은이) / 956쪽</p>
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
        <button class="detail-cart"></button>
        <button class="detail-buy">바로 구매하기</button>
      </div>
    </div>`;

    detailContainer.innerHTML = detailContent;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function getProduct(id){
  const response = await fetch(`/api/product/${id}`);
  const book = await response.json();

  return book;
}

function getUrl(){
  const url = window.location.pathname;
  const parts = url.split('/').filter(Boolean);
  const id = parts.pop();

  return id;
}

fetchProduct();
