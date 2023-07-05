
// 수량 증가 / 감소 버튼
function count(type) {
  // 결과를 표시할 element
  const resultElement = document.getElementById('result');

  // 현재 화면에 표시된 값
  let number = parseInt(resultElement.innerText);

  // 더하기/빼기
  if (type === 'plus') {
    number += 1;
  } else if (type === 'minus') {
    if (number > 1) {
      number -= 1;
    }
  }

  // 결과 출력
  resultElement.innerText = number;
}
