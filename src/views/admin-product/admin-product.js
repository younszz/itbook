async function fetchProduct() {
  const url = window.location.pathname;
  const parts = url.split('/').filter(Boolean);
  const id = parts.pop();

  const mode = parts.pop();
  console.log(mode)
  // mode가 'add'면 빈 form 랜더링, mode가 'edit'이면 현재 데이터로 value 값들이 채워진 form 렌더링
  
  try {
    const response = await fetch(`/api/product/${id}`);
    const data = await response.json();
    console.log(data)
    
    if(mode === 'add'){
    
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

fetchProduct();


document.getElementById('form').addEventListener('submit', async function(event) {
  event.preventDefault();

  // FormData 객체로 input입력값 전부를 객체로 가져올 수 있음
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  console.log(data)

  try {
     // POST 요청
      const response = await fetch('/api/product', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });
      console.log(response);
  } catch (error) {
      console.error(error);
  }
});

// select (카테고리 렌더링)
const categoryList = async () => {
  try {
    const response = await fetch('/api/category');
    const data = await response.json();

    const categoryselect = document.querySelector("#category");
    for (let i = 0; i < 7; i++) {
      const option = document.createElement('option');
      const item = data[i] || ""; // 빈 값인 경우 빈칸으로 처리
      option.innerHTML = `${item}`;
      categoryselect.appendChild(option);
      console.log(option);
    }
  } catch (error) {
    console.log('Error:', error);
  }
};

categoryList();

