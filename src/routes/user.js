import express from 'express';
import {
  getUser,
  updateUser,
  deleteUser,
  addToCart,
  removeFromCart,
  getCart,
  clearCart,
} from '../controllers/user';

const router = express.Router();

router.get('/api/user', getUser);

router.post('/api/user/', updateUser);

router.delete('/api/user/', deleteUser);

router.get('/api/cart/:uid', getCart);

router.post('/api/cart/:uid', addToCart);

router.delete('/api/cart/:uid', removeFromCart);

router.delete('/api/cart/all/:uid', clearCart);

export default router;
