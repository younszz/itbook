import User from '../models/user';

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) throw Error('사용자가 존재하지 않습니다.');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: ' 문제가 발생했습니다.' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });
    if (!user) throw Error('사용자가 존재하지 않습니다.');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: ' 문제가 발생했습니다. ' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    if (!user) throw Error('사용자가 존재하지 않습니다.');
    res.json({ message: '사용자 삭제가 완료되었습니다.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: ' 문제가 발생했습니다.' });
  }
};

// 장바구니 내역 조회
export const getCart = async (req, res) => {
  const user = await User.findById(req.user._id);

  user.populate('cart.items.productId').then((user) => {
    res.json(user.cart.items);
  });
};

//장바구니 추가
export const addToCart = async (req, res) => {
  const userId = req.user._id;
  const prodId = req.body.productId;
  const quantity = req.body.quantity;

  const user = await User.findById(userId);
  const cartProductIndex = user.cart.items.findIndex((cp) => {
    return cp.productId.toString() === prodId.toString();
  });

  let newQuantity = quantity;
  const updatedCartItems = [...user.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = user.cart.items[cartProductIndex].quantity + quantity;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: prodId,
      quantity: newQuantity,
    });
  }

  user.cart = {
    items: updatedCartItems,
  };

  await user.save();
  res.json(user);
};

// 장바구니 상품 삭제
export const removeFromCart = async (req, res) => {
  const user = await User.findById(req.user._id);

  const updatedCartItems = user.cart.items.filter((item) => {
    return item.productId.toString() !== prodId.toString();
  });

  user.cart.items = updatedCartItems;
  await user.save();
  res.json(user);
};

//장바구니 전부삭제
export const clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id); //(req.user.id)
    user.cart = { items: [] };
    await user.save();
    res.json({ message: '장바구니가 비워졌습니다.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: ' 문제가 발생했습니다. ' });
  }
};
