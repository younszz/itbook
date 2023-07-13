import User from '../models/user';

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
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
  res.json(user.cart.items);
};

// 로그인시 로컬스토래지의 장바구니를 서버와 합치기
export const mergeCarts = async (req, res) => {
  console.log(req.user)
  try {
    const user = await User.findById(req.user._id);
    const localCartItems = req.body;

    localCartItems.forEach(localItem => {
      const cartItem = user.cart.items.find((item) => item.id == localItem.id);
      if (cartItem) {
        cartItem.quantity += localItem.quantity;
      } else {
        user.cart.items.push(localItem);
      }
    });

    await user.save();
    res.json({ message: '장바구니가 병합되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '서버 오류' });
  }
};

//장바구니 추가
export const addToCart = async (req, res) => {
  const user = await User.findById(req.user._id);
  const { id, quantity } = req.body;

  const cartProductIndex = user.cart.items.findIndex((cp) => {
    return cp.id.toString() === id.toString();
  });

  let newQuantity = quantity;
  const updatedCartItems = [...user.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = user.cart.items[cartProductIndex].quantity + quantity;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      id: id,
      quantity: newQuantity,
    });
  }

  user.cart = {
    items: updatedCartItems,
  };

  await user.save();
  res.json(user);
};

// 장바구니 상품 수량 조절
export const adjustQuantity = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { id, direction } = req.params;
    const cartItem = user.cart.items.find((item) => item.id == id);
    if (!cartItem) {
      return res.status(400).json({ message: '장바구니 정보를 찾을 수 없음' });
    }
    
    let adjustment = direction === 'increase' ? 1 : -1;
    if (cartItem.quantity + adjustment < 1) {
      return res.status(400).json({ message: '1 이하로 감소시킬 수 없습니다.' });
    }
    
    cartItem.quantity += adjustment;
    await user.save();

    res.json({ message: '장바구니 수량이 변경되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '서버 오류' });
  }
};

// 장바구니 상품 삭제
export const removeItem = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { id } = req.params;

    const cartItemIndex = user.cart.items.findIndex((item) => item.id == id);

    if (cartItemIndex === -1) {
      return res.status(400).json({ message: '상품을 찾을 수 없습니다' });
    }
    
    user.cart.items.splice(cartItemIndex, 1);
    await user.save();
    
    res.json({ message: '상품이 장바구니에서 제거되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '서버 오류' });
  }
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
