// //주문
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


////////////-----------------------------------------------------//////////////////////

// import Order from '../models/Order';

// exports.getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().populate('user items.product');
//     res.json(orders);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: '서버 오류' });
//   }
// };

// exports.getOrderDetail = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.oid).populate('user items.product');
//     if (!order) {
//       return res.status(404).json({ message: '주문이 존재하지 않습니다.' });
//     }
//     res.json(order);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: '서버 오류' });
//   }
// };

// exports.addOrder = async (req, res) => {
//   try {
//     const { items, totalAmount, receiverName, receiverContact, shippingAddress } = req.body;
//     const order = new Order({
//       user: req.user._id,
//       items,
//       totalAmount,
//       receiverName,
//       receiverContact,
//       shippingAddress,
//     });
//     await order.save();
//     res.status(201).json(order);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: '서버 오류' });
//   }
// };

// exports.updateOrder = async (req, res) => {
//   try {
//     const { items, totalAmount, receiverName, receiverContact, shippingAddress, shippingStatus } = req.body;
//     const order = await Order.findById(req.params.oid);
//     if (!order) {
//       return res.status(404).json({ message: '주문이 존재하지 않습니다.' });
//     }
//     if (order.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
//       return res.status(403).json({ message: '주문을 수정할 권한이 없습니다.' });
//     }
//     if (items) order.items = items;
//     if (totalAmount) order.totalAmount = totalAmount;
//     if (receiverName) order.receiverName = receiverName;
//     if (receiverContact) order.receiverContact = receiverContact;
//     if (shippingAddress) order.shippingAddress = shippingAddress;
//     if (shippingStatus) order.shippingStatus = shippingStatus;
//     await order.save();
//     res.json(order);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: '서버 오류' });
//   }
// };

// exports.deleteOrder = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.oid);
//     if (!order) {
//       return res.status(404).json({ message: '주문이 존재하지 않습니다.' });
//     }
//     await order.remove();
//     res.json({ message: '주문이 삭제되었습니다.' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: '서버 오류' });
//   }
// };
