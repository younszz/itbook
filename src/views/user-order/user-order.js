async function userOrder() {
  try {
    // 주문상품 없을때
    const orderEmpty = `<div class="orderEmpty">
  <p>아직 주문내역이 없습니다.</p>
  <button><a href="/">메인으로</a></button>
</div>`;

    // 주문 정보 가져오기
    const response = await fetch("/api/orders/me");
    const orders = await response.json();

    if (!orders.length) { // 주문 정보가 없을 때 innerHTML로 상품없을때의 문구 출력되도록 수정.
      document.querySelector(".my-body").innerHTML = orderEmpty;
      return;
    }

    // 주문 정보가 있을 때
    let orderList = "";
    for (let order of orders) {
      // 각 주문 내의 모든 제품 정보 표시
      let productInfo = "";
      for (let product of order.products) {
        productInfo += `${product.productData.name} / ${product.quantity}개<br />`;
      }

      // 주문 정보를 HTML 표 형태로 추가. 순서대로 날짜, 상품정보, 배송상태
      orderList += `<tr>
        <td>${new Date(order._id.getTimestamp()).toLocaleDateString()}</td>
        <td>${productInfo}</td>
        <td>${order.deliveryStatus}</td>
        <td><button${order.deliveryStatus !== '상품 준비중' ? ' disabled' : ''}>주문취소</button></td>
      </tr>`;
    }

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

    // 주문 정보를 화면에 표시
    document.querySelector(".my-body").innerHTML = table;

  } catch (err) {
    console.error("Error:", err);
    document.querySelector(".my-body").innerHTML = `<p>주문 정보를 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.</p>`;
  }
}
userOrder();
