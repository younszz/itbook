async function fetchProduct() {
  const url = window.location.pathname;
  const parts = url.split('/').filter(Boolean);
  const id = parts.pop();

  const mode = parts.pop();
  // mode가 'add'면 빈 form 랜더링, mode가 'edit'이면 현재 데이터로 value 값들이 채워진 form 렌더링
  
  try {
    const response = await fetch(`/api/product/${id}`);
    const data = await response.json();
    console.log(data)

  } catch (error) {
    console.error('Error:', error);
  }
}

fetchProduct();


document.getElementById('form').addEventListener('submit', async function(event) {
  event.preventDefault();

  // FormData 객체로 input입력값 전부를 객체로 가져올 수 있음
  const formData = new FormData(event.target);

  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });

  try {
     // POST 요청
      const response = await fetch('/api/admin/product', {
          method: 'POST',
          body: formData
      });
      console.log(response);
  } catch (error) {
      console.error(error);
  }
});

