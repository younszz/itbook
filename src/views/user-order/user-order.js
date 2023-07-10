async function userOrder() {
  try {
    // 주문상품 없을때
    const orderEmpty = `<div class="orderEmpty">
  <p>아직 주문내역이 없습니다.</p>
  <button><a href="/">메인으로</a></button>
</div>`;
    // 주문상품 있을때
    const response = await fetch("/api/products");
    const data = await response.json();
    console.log(data);
    const orderList = `<tr>
    <td>2023-07-07</td>
    <td>모던자바스크립트 Deep Divd / 2개</td>
    <td>상품 준비중</td>
    <td><button>주문취소</button></td>
    </tr>
    <tr>
      <td>2023-07-07</td>
      <td>
        모던자바스크립트 Deep Divd / 2개<br />알기 쉬운 알고리즘 /
        1개<br />알기 쉬운 알고리즘 / 1개<br />알기 쉬운 알고리즘
        / 1개<br />알기 쉬운 알고리즘 / 1개<br />알기 쉬운
        알고리즘 / 1개<br />알기 쉬운 알고리즘 / 1개<br />알기
        쉬운 알고리즘 / 1개<br />알기 쉬운 알고리즘 / 1개<br />알기
        쉬운 알고리즘 / 1개<br />알기 쉬운 알고리즘 / 1개<br />알기
        쉬운 알고리즘 / 1개<br />알기 쉬운 알고리즘 / 1개
      </td>
      <td>배송 준비중</td>
      <td><button disabled>주문취소</button></td>
    </tr>
    <tr>
      <td>2023-07-07</td>
      <td>모던자바스크립트 Deep Divd / 2개</td>
      <td>배송 준비중</td>
      <td><button disabled>주문취소</button></td>
    </tr>`;

    const table = `<table>
    <thead>
      <th>날짜</th>
      <th>주문정보</th>
      <th>주문상태</th>
      <th></th>
    </thead>
    <tbody>
        ${orderList}
    </tbody>
  </table>`;
    const myOrderList = document.querySelector(".my-body");
    if (!data) {
      myOrderList.innerHTML = orderEmpty;
    } else {
      myOrderList.innerHTML = table;
    }
  } catch (error) {
    console.log("Error:", err);
  }
}
userOrder();
