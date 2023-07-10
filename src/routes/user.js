import express from 'express';
import { getUser, updateUser, deleteUser, addToCart, removeFromCart, getCart, clearCart } from '../controllers/user';
import passport from 'passport';

const router = express.Router();

router.get(
  '/api/user',
  passport.authenticate('jwt', { session: false }),
  getUser
);

router.post(
  '/api/user/:uid',
  passport.authenticate('jwt', { session: false }),
  updateUser
);

router.delete(
  '/api/user/:uid',
  passport.authenticate('jwt', { session: false }),
  deleteUser
);


//cart. 로그인하지않은 사용자의 장바구니 사용은 클라이언트 localStorage에서 관리

//passport.authenticate를 사용하지않는경우 req.user값이 undefined로 실행불가.


router.get(
  '/api/cart/:uid',
  getCart
);

// router.get(
//  '/api/cart',
//   passport.authenticate('jwt', { session: false }),
//   getCart
// );



router.post(
  '/api/cart/:uid',
  addToCart
  );

// router.post(
//   '/api/cart/:uid',
//   passport.authenticate('jwt', { session: false }),
//   addToCart
// );



router.delete(
  '/api/cart/:uid',
  removeFromCart
);

// router.delete(
//   '/api/cart',
//   passport.authenticate('jwt', { session: false }),
//   removeFromCart
// );



router.delete(
  '/api/cart/all/:uid',
  clearCart
);

// router.delete(
//   '/api/cart/all',
//   passport.authenticate('jwt', { session: false }),
//   clearCart
// );





export default router;
