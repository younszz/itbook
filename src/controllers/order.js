// 주문
// exports.getOrders = (req, res) => {
//   Order.find()
//     .then((orders) => {
//       console.log('주문 조회');
//       res.json(orders);
//     })
//     .catch((err) => console.log(err));
// };

// exports.editOrder = (req, res) => {
//   const { orderId, newStatus } = req.body;

//   Order.findById(orderId)
//     .then((order) => {
//       order.status = newStatus;
//       return order.save();
//     })
//     .then(() => {
//       console.log('주문 업데이트');
//       res.redirect('/admin');
//     })
//     .catch((err) => console.log(err));
// };

// exports.deleteOrder = (req, res) => {
//   const orderId = req.body.orderId;

//   Order.findByIdAndRemove(orderId)
//     .then(() => {
//       console.log('주문 삭제');
//       res.redirect('/admin');
//     })
//     .catch((err) => console.log(err));
// };