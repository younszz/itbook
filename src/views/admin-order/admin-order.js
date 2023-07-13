//서버에서 주문상품목록 데이터 가져옴
const getOrderList = async () => {
  try{
    const response = await fetch('/api/orders');
    const data = await response.json();
    return data;
  }catch(e){
    console.error(e);
  }
}
//주문상품목록 템플릿
const orderTemplate = (order) => {
  return `
          <td>
              <input type="checkbox" class="selectCheck">
          </td>
          <td class="user-info">${order.userId.email}[${order.userId.name}]</td>
          <td>${order.products[0].id} 외 ${order.products.length}건</td>
          <td>${order.status}</td>`;
}
//주문상품목록 생성
const createOrderList = async () => {
  const adminTbl = document.querySelector("#adminTbl");
  const orderList = await getOrderList();

  orderList && orderList.map((order) => {
      const tr = document.createElement("tr");
      tr.innerHTML = orderTemplate(order);
      adminTbl.append(tr);
  })
}

window.addEventListener("load", async ()=>{
  createOrderList();
})