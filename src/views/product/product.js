
// 수량 증가 / 감소 버튼
function count(type) {
  // 결과를 표시할 element
  const resultElement = document.getElementById('result');
  const priceElement = document.getElementById('price');
  const totalpriceElement = document.getElementById('totalPrice');

  // 현재 화면에 표시된 값
  let number = parseInt(resultElement.innerText);
  let price = parseInt(priceElement.innerText);
  let totalprice = parseFloat(totalpriceElement.innerText);

  // 더하기/빼기
  if (type === 'plus') {
    number += 1;
    totalprice += price;
  } else if (type === 'minus') {
    if (number > 1) {
      number -= 1;
      totalprice -= price;
    }
  }

  // 결과 출력
  resultElement.innerText = number;
  totalpriceElement.innerText = totalprice;
}
