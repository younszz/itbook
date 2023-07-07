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


// 삭제
bookList.addEventListener('click',(e)=>{
    if(e.target.className !== 'admin-remove-in'){
      return ;
    }
    const confirmDelete = confirm('상품을 삭제하시겠습니까?');
    if(!confirmDelete){
      return;
    }
    const itemId = e.target.parentElement.parentElement.id;
    deleteLocalItem(itemId);
    
  })
