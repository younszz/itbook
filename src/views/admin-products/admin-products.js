async function fetchProducts() {
  try {
    const response = await fetch('/api/products');
    const data = await response.json();
    console.log(data)
    

  } catch (error) {
    console.error('Error:', error);
  }
}

fetchProducts();
