import Order from '../models/Order';

//주문 생성
export const postOrder = async (req, res) => {
  const {
    products,
    address,
    addressDetail,
    totalAmount
  } = req.body;
  const order = new Order({
    userId : req.user._id,
    products,
    address,
    addressDetail,
    totalAmount
  });
  try {
    await order.save();
    res.status(201).json({ message: '주문 완료' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버에 문제가 발생했습니다' });
  }
};

// 주문 조회 - 관리자
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버에 문제가 발생했습니다' });
  }
};

// 주문 조회 - 사용자
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버에 문제가 발생했습니다' });
  }
};

// 주문 수정 (관리자 - 배송 상태)
export const updateOrderStatus = async (req, res) => {
  const orderId = req.params.oid;
  const { deliveryStatus } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: '주문을 찾을 수 없습니다.' });
    }
    order.deliveryStatus = deliveryStatus;
    const result = await order.save();
    console.log('배송 상태 수정');
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: '서버에 문제가 발생했습니다.' });
  }
};

// 주문 수정 (사용자 - 배송 전)
export const updateOrder = async (req, res) => {
  const orderId = req.params.oid;
  const { deliveryAddress, recipientName, recipientContact } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: '주문을 찾을 수 없습니다.' });
    }
    if (order.deliveryStatus !== '상품 준비중') {
      return res
        .status(400)
        .json({ message: '배송이 시작되면 주문 정보를 수정할 수 없습니다.' });
    }
    order.deliveryAddress = deliveryAddress;
    order.recipientName = recipientName;
    order.recipientContact = recipientContact;
    const result = await order.save();
    console.log('주문 정보 수정');
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: '서버에 문제가 발생했습니다.' });
  }
};

// 주문 취소 (사용자 - 배송전)
export const cancelOrder = async (req, res) => {
  const orderId = req.params.oid;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: '주문을 찾을 수 없습니다.' });
    }
    if (order.deliveryStatus !== '상품 준비중') {
      throw new Error('배송이 시작되면 주문을 취소할 수 없습니다.');
    }
    await Order.findByIdAndRemove(orderId);
    console.log('주문 취소');
    res.status(201).json({ message: '주문이 취소되었습니다.' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: '서버에 문제가 발생했습니다.' });
  }
};

// 주문 삭제 (관리자)
export const deleteOrder = async (req, res) => {
  const orderId = req.params.oid;

  try {
    await Order.findByIdAndRemove(orderId);
    console.log('주문 삭제');
    res.status(200).json({ message: '주문이 삭제되었습니다.' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: '서버에 문제가 발생했습니다.' });
  }
};
