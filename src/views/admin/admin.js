// 토큰 가져오기
const getTokenFromCookieI = () => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'jwt') {
      return decodeURIComponent(value);
    }
  }
  return null;
};
// 상품 삭제
const deleteProduct = async (e) => {
  const confirmDelete = confirm('상품을 삭제하시겠습니까?');
  if (!confirmDelete) {
    return;
  }
  const token = getTokenFromCookieI();
  const id = e.target.closest('tr').dataset.id;
  try {
    const response = await fetch(`/api/product/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      alert('상품이 삭제되었습니다.');
      window.location.href = '/admin';
    } else {
      alert('상품 삭제에 실패했습니다.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('잘못된 요청입니다.');
  }
};

// 책 목록 랜더링
const renderBookList = async (target) => {
  const response = await fetch('/api/products');
  const data = await response.json();
  const addCommas = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  data.forEach((book) => {
    const tr = document.createElement('tr');
    tr.dataset.id = book._id;
    tr.innerHTML = `
            <td><input type="checkbox" class="selectCheck"></td>
            <td class="p-img">
              <img src=${book.imageUrl} alt="${book.title}" />
            </td>
            <td><a href="/product/${book._id}" class="book-title">${book.title}</a></td>
            <td>${addCommas(book.price)}원</td>
            <td>${book.category}</td>
            <td>
              <button class="admin-change"><a href="/admin/product/${book._id}/edit">수정</a></button>
              <button class="admin-remove-in" id="deleteBtn">삭제</button>
            </td>
          `;
    tr.querySelector('#deleteBtn').addEventListener('click', deleteProduct);

    target.appendChild(tr);
  });
};

// 페이지 로드시 실행
const onLoadPage = async () => {
  const bookList = document.getElementById('adminTbl');
  await renderBookList(bookList);

  const listCount = document.getElementById('listCount');
  const count = bookList.querySelectorAll('tr').length;
  listCount.innerHTML = count;
};

onLoadPage();

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
const searchbtn = document.querySelector('#searchBtn');
const input = document.querySelector('#searchName');
const bookList = document.querySelector('#adminTbl');

searchbtn.addEventListener('click', async (event) => {
  event.preventDefault();

  const searchKeyword = input.value;

  try {
    const response = await fetch('/api/products');
    const data = await response.json();
    const filteredData = data.filter((book) => {
      return book.title.includes(searchKeyword);
    });
    const books = filteredData
      .map((book) => {
        return `<tr>
                  <td><input type="checkbox" class="selectCheck"></td>
                  <td class="p-img">
                    <img src="${book.imageUrl}" alt="${book.title}" />
                  </td>
                  <td>${book.title}</td>
                  <td>${book.price}원</td>
                  <td>${book.category}</td>
                  <td>
                    <button class="admin-change"><a href="/admin/products/${book._id}/edit">수정</a></button>
                    <button class="admin-remove-in">삭제</button>
                  </td>
                </tr>`;
      })
      .join('');

    bookList.innerHTML = books;
    const listCount = document.getElementById("listCount");
    const count = bookList.querySelectorAll("tr").length;
    listCount.innerHTML = count;
  } catch (error) {
    console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
  }
});



// 엔터키로 검색
const inputEnter = document.getElementById("searchName");

inputEnter.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("searchBtn").click();
  }
});
