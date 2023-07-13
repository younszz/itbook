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
    if (!orders.length) { 
      document.querySelector(".my-body").innerHTML = orderEmpty;
      return;
    }

    // 주문 정보가 있을 때
    let orderList = "";
    
    for (let order of orders) {
      // 각 주문 내의 모든 제품 정보 표시
      let productInfo = "";
      let totalPrice = order.totalAmount.toLocaleString();
      for (let product of order.products) {
        productInfo += `${product.id.title} / ${product.quantity}권<br />`;

      }

      const orderTimestamp = parseInt(order._id.toString().substring(0, 8), 16) * 1000;
      const orderDate = new Date(orderTimestamp).toLocaleDateString();
      const orderTime = new Date(orderTimestamp).toLocaleTimeString();
      console.log(totalPrice)
      orderList += `<tr>
        <td>${orderDate} ${orderTime}</td>
        <td>${productInfo}</td>
        <td>${totalPrice}원</td> <!-- 총 가격 표시 -->
        <td>${order.deliveryStatus}</br><button data-id="${order._id}">주문취소</button></td>
      </tr>`;
    }

    const table = `<table>
      <thead>
        <th>주문 날짜</th>
        <th>주문 정보</th>
        <th>총 가격</th>
        <th>주문 상태</th>
        <th></th>
      </thead>
      <tbody>
          ${orderList}
      </tbody>
    </table>`;

    // 주문 정보를 화면에 표시
    document.querySelector(".my-body").innerHTML = table;


    document.querySelectorAll('button[data-id]').forEach(button => {
      button.addEventListener('click', async () => {
        const orderId = button.dataset.id;
        try {
          const response = await fetch(`/api/order/cancel/${orderId}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            const data = await response.json();
            // 주문 취소 후 페이지 새로고침
            window.alert(data.message);
            window.location.reload();
          } else {
            const data = await response.json();
            window.alert(data.message);
          }
        } catch (err) {
          const data = await response.json();
          window.alert(data.message);
        }
      });
    });
  } catch (err) {
    console.error("Error:", err);
    document.querySelector(".my-body").innerHTML = `<p>주문 정보를 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.</p>`;
  }
}
userOrder();
