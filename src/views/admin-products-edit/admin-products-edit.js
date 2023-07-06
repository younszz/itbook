async function fetchProducts() {
  try {
    const response = await fetch('/products');
    const data = await response.json();
    console.log(data)

  } catch (error) {
    console.error('Error:', error);
  }
}

fetchProducts();