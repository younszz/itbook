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

// 상품 추가
const postProduct = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  const token = getTokenFromCookieI();

  
  try {
    // POST 요청
    const response = await fetch('/api/product', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      // HTTP 상태 코드가 2xx인 경우
      alert('상품이 생성되었습니다.');
      window.location.href = '/admin';
    } else {
      alert('상품이 생성에 실패했습니다.');
    }
  } catch (error) {
    console.error(error);
  }
};


// 상품 업데이트
const updateProduct = async (e, id) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  const token = getTokenFromCookieI();
  try {
    const response = await fetch(`/api/product/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      alert('상품이 수정되었습니다.');
      window.location.href = '/admin';
    } else {
      alert('상품 수정에 실패했습니다.');
    }
  } catch (error) {
    console.error(error);
    alert('잘못된 요청입니다.');
    window.location.href = '/admin';
  }
};

// /edit 으로 진입시 서버에서 상품 데이터 받아오기
const getProductFromDB = async (id) => {
  try {
    const response = await fetch(`/api/product/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

// 카테고리 select 렌더링
const renderCategorySelect = async () => {
  try {
    const response = await fetch('/api/category');
    const data = await response.json();

    const catecorySelect = document.querySelector('#category');
    data.forEach((item) => {
      const option = document.createElement('option');
      option.innerText = item;
      catecorySelect.appendChild(option);
    });
  } catch (error) {
    console.log('Error:', error);
  }
};

// 페이지 로드 시 실행
const onLoadPage = async () => {
  const url = window.location.pathname;
  const parts = url.split('/').filter(Boolean);
  const mode = parts.pop();

  await renderCategorySelect();
  // mode가 'add'면 빈 form 랜더링, mode가 'edit'이면 현재 데이터로 value 값들이 채워진 form 렌더링
  if (mode === 'add') {
    document.getElementById('form').addEventListener('submit', postProduct);
  } else if (mode === 'edit') {
    const id = parts.pop();
    const product = await getProductFromDB(id);

    const fields = [
      'imageUrl',
      'title',
      'description',
      'price',
      'category',
      'author',
      'pages',
    ];
    fields.forEach((field) => {
      document.getElementById(field).value = product[field];
    });

    document
      .getElementById('form')
      .addEventListener('submit', (e) => updateProduct(e, id));
  }
};

onLoadPage();
