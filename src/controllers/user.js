import User from '../models/user';

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) throw Error('사용자가 존재하지 않습니다.');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: ' 문제가 발생했습니다.' });
  }
};

//사용자 정보 수정
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });
    if (!user) throw Error('사용자가 존재하지 않습니다.');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: ' 문제가 발생했습니다. ' });
  }
};

//사용자 정보 삭제
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdandDelete(req.user.id);
    if (!user) throw Error('사용자가 존재하지 않습니다.');
    res.json({ message: '사용자 삭제가 완료되었습니다.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: ' 문제가 발생했습니다.' });
  }
};


// 장바구니 내역 조회
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.params.uid);
    const populatedUser = await user.populate('cart.items.productId').execPopulate();
    res.json(populatedUser.cart.items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: ' 문제가 발생했습니다.' });
  }
};

// 장바구니 추가
export const addToCart = async (req, res) => {
  try {
    const { uid } = req.params;
    const { productId, quantity } = req.body;

    const user = await User.findById(uid);
    const cartProductIndex = user.cart.items.findIndex(cp => cp.productId.toString() === productId);

    let newQuantity = quantity;
    const updatedCartItems = [...user.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = user.cart.items[cartProductIndex].quantity + quantity;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: productId,
        quantity: newQuantity
      });
    }

    user.cart = { items: updatedCartItems };

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: ' 문제가 발생했습니다.' });
  }
};

// 장바구니 상품 삭제
export const removeFromCart = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findById(uid);

    const updatedCartItems = user.cart.items.filter(item => item.productId.toString() !== uid);

    user.cart.items = updatedCartItems;
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: ' 문제가 발생했습니다.' });
  }
};

// 장바구니 전체 삭제
export const clearCart = async (req, res) => {
  try {
    const { uid } = req.params;//(req.user.id)
    const user = await User.findById(uid);

    await user.clearCart();
    res.json({ message: "장바구니가 비워졌습니다." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: ' 문제가 발생했습니다.' });
  }
};