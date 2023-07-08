async function fetchProduct() {
  const url = window.location.pathname;
  const parts = url.split('/').filter(Boolean);
  const id = parts.pop();
}

//데이터 바인딩 함수
async function fetchProducts() {
  try {
    const bookList = document.getElementById('adminTbl');
    const response = await fetch('/api/products');
    console.log(response);
    const data = await response.json();
    const books = data
      .map(
        (book) =>
        `<tr>
        <td><input type="checkbox"></td>
        <td>${book.title}</td>
        <td>개</td>
        <td>${book.price}원</td>
        <td>원</td>
        <td>
          <select name="" id="">
            <option value="">주문</option>
            <option value="">배송</option>
          </select>
        </td>
      </tr>`
      )
      .join('');
    
    bookList.innerHTML = books;

    const listCount = document.getElementById('listCount');
    const count = data.length;
    listCount.innerHTML = count;
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchProducts();

//

let data = $('#orderList').find("td:eq(1)").text();
console.log(data);
