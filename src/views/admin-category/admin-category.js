// 카테고리 리스트 만들기 (ul)
const createCategoryList = (categories) => {
  const ul = document.createElement('ul');

  for (let i = 0; i < 7; i++) {
    const li = document.createElement('li');
      li.innerHTML = `
    <label for="cate${i}">분류${i + 1}</label>
    <input name="cate${i}" id="cate${i}" type="text" value="${categories[i] || ''}" />
    `;
    ul.appendChild(li);
  }

  return ul;
};

// DB의 카테고리 데이터를 가져와서 form 요소에 추가
const getCategoryFromDB = async () => {
  try {
    const response = await fetch('/api/category');
    const data = await response.json();

    const form = document.getElementById('form');
    const ul = createCategoryList(data);
    form.prepend(ul);
  } catch (error) {
    console.log('Error:', error);
  }
};

// 입력한 카테고리 내용을 db에 저장
const postCategoryToDB = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const dataArr = Array.from(formData.values());
  console.log(dataArr);

  try {
    const response = await fetch('/api/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataArr),
    });

    if (!response.ok) {
      throw new Error('POST 요청 실패');
    }

    alert('카테고리가 수정되었습니다');
    location.reload();
  } catch (error) {
    console.log('Error:', error);
  }
};


// 페이지가 로드되면 db에서 가져온 카테고리를 UI로 보여줌
getCategoryFromDB();

// form 제출 이벤트
const form = document.getElementById('form');
form.addEventListener('submit', postCategoryToDB);