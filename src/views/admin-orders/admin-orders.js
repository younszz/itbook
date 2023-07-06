async function fetchProduct() {
  const url = window.location.pathname;
  const parts = url.split('/').filter(Boolean);
  const id = parts.pop();
}