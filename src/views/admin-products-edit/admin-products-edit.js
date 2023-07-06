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