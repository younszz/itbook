//데이터 바인딩 함수
async function fetchProducts() {
  try {
    const response = await fetch('/api/products');
    const bookList = document.getElementById('adminTbl');
    console.log(response);
    const data = await response.json();
    const books = data
      .map(
        (book) =>
          `<tr>
            <td><input type="checkbox" /></td>
            <td class="p-img">
              <img src=${book.imageUrl} alt="" />
            </td>
            <td>${book.title}</td>
            <td>${book.price}원</td>
            <td>${book.category}</td>
            <td>
              <button class="admin-change"><a href="/admin/products/edit/:pid">수정</a></button>
              <button class="admin-remove-in">삭제</button>
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

