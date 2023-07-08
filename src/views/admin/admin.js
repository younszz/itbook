// 데이터 바인딩 함수
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
            <td><input type="checkbox" class="selectCheck"></td>
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

    // 삭제 버튼 클릭 이벤트 처리
    bookList.addEventListener('click', (e) => {
      if (e.target.className !== 'admin-remove-in') {
        return;
      }
      const confirmDelete = confirm('상품을 삭제하시겠습니까?');
      if (!confirmDelete) {
        return;
      }
      const itemId = e.target.parentElement.parentElement.id;
      deleteLocalItem(itemId);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchProducts();

// checkbox
const allCheckBox = document.querySelector('#allCheck');
window.addEventListener('load', () => {
  allCheckBox.addEventListener('change', () => {
    console.log(allCheckBox.checked); // 값 출력

    const selectCheckBoxs = document.querySelectorAll('td input.selectCheck');
    if (allCheckBox.checked) {
      selectCheckBoxs.forEach((box) => {
        box.checked = true;
      });
    } else {
      selectCheckBoxs.forEach((box) => {
        box.checked = false;
      });
    }
  });
});


// 상품 검색
const searchbtn = document.querySelector('#searchBtn'); // 검색 버튼 엘리먼트 선택
const input = document.querySelector('#searchName'); // 입력창 엘리먼트 선택
const bookList = document.querySelector('#adminTbl'); // 결과를 표시할 컨테이너 선택

searchbtn.addEventListener('click', async (event) => {
  event.preventDefault(); // 기본 동작 방지

  const searchKeyword = input.value; // 입력된 검색 단어 가져오기

  try {
    const response = await fetch('/api/products'); // 데이터 가져오기
    const data = await response.json(); // JSON 형식의 데이터 변환

    // title 값을 검색 단어와 비교하여 필터링
    const filteredData = data.filter((book) => {
      return book.title.includes(searchKeyword);
    });

    // 필터링된 데이터를 HTML 문자열로 변환
    const books = filteredData
      .map((book) => {
        return `<tr>
                  <td><input type="checkbox" class="selectCheck"></td>
                  <td class="p-img">
                    <img src="${book.imageUrl}" alt="" />
                  </td>
                  <td>${book.title}</td>
                  <td>${book.price}원</td>
                  <td>${book.category}</td>
                  <td>
                    <button class="admin-change"><a href="/admin/products/edit/:pid">수정</a></button>
                    <button class="admin-remove-in">삭제</button>
                  </td>
                </tr>`;
      })
      .join('');

    // 결과를 표시할 컨테이너에 HTML 문자열 삽입
    bookList.innerHTML = books;
  } catch (error) {
    console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
  }
});



