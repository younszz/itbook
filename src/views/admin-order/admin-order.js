const getOrderList = async () => {
  try{
    const response = await fetch('/api/orders');
    const data = await response.json();

    return data;
  }catch(e){
    console.error(e);
  }
}
window.addEventListener("load", async ()=>{

  const orderList = await getOrderList();
  console.log(orderList);
})