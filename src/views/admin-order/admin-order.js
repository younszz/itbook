//서버에서 주문상품목록 데이터 가져옴
const getOrderList = async () => {
  try {
    const response = await fetch('/api/orders');
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};
//변경된 주문상태 서버에 전달
const deliveryStatus = async (orderId, deliveryStatus) => {
  try {
    const response = await fetch(`/api/order/status/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deliveryStatus }),
    });
    const data = await response.json();
    alert(`"${data.deliveryStatus}" 주문 상태가 변경되었습니다.`);
  } catch (e) {
    console.error(e);
  }
};
//날짜 string으로 변환
const convertToDate = (updatedAt) => {
  const date = new Date(updatedAt);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = date.getDate();

  const formattedDateString = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  return formattedDateString;
}
const deleteOrder = async (event) => {
  const confirmDelete = confirm('해당 주문내역을 삭제하시겠습니까?');
  try{
    const oid = event.target.parentElement.parentElement.className;
    if(confirmDelete){
      const deleted = await fetch(`/api/order/${oid}`,{
        method:"DELETE",
      })
      location.reload();
    }    
  }catch(e){
    console.error(e);
  }
}
//주문상품목록 템플릿
const orderTemplate = (order) => {
  return `
          <td>${convertToDate(order.updatedAt)}</td>
          <td>${order.userId.email} [${order.userId.name}]</td>
          <td>${order.products[0].id.title} 외 ${order.products.length}건</td>
          <td>
            <select class="item-select" onchange="deliveryStatus('${order._id}', this.value)" name="orderStatus" id="orderStatus">
              <option ${order.deliveryStatus == '상품 준비중'? "selected" : ""} value="상품 준비중">상품 준비중</option>
              <option ${order.deliveryStatus == '배송중'? "selected" : ""} value="배송중">배송중</option>
              <option ${order.deliveryStatus == '배송 완료'? "selected" : ""} value="배송 완료">배송 완료</option>
            </select>
          </td>
          <td>
            <button class="item-delete-btn" onclick="deleteOrder(event)">삭제</button>
          </td>
          `;
};
//주문상품목록 생성
const createOrderList = (order) => {
  const adminTbl = document.querySelector('#adminTbl');
  const tr = document.createElement('tr');
  tr.setAttribute("class",order._id);
  tr.innerHTML = orderTemplate(order);
  adminTbl.append(tr);
};
//사용자 이름 검색
const searchUserName = (orderList)=>{
  const adminTbl = document.querySelector('#adminTbl');
  adminTbl.innerHTML = '';
  const searchInputValue = document.querySelector(".order-search-input").value;
  const filterList = orderList.filter((order) => {
    const name =  order.userId.name;
    return name.includes(searchInputValue);
  });
  filterList.map((order) => createOrderList(order));
}

window.addEventListener('load', async () => {
  const searchBtn = document.querySelector(".order-search-btn");
  const orderList = await getOrderList() || null;
  orderList.map((order) => createOrderList(order));
  searchBtn.addEventListener("click", () => searchUserName(orderList));
});