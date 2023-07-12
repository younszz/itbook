import express from 'express';
import {
  getUser,
  updateUser,
  deleteUser,
  addToCart,
  getCart,
  clearCart,
  removeItem,
  mergeCarts,
  adjustQuantity
} from '../controllers/user';

const router = express.Router();

router.get('/api/user', getUser);

router.post('/api/user/', updateUser);

router.delete('/api/user/', deleteUser);

router.get('/api/user/cart', getCart);

router.put('/api/user/cart/:id/:direction', adjustQuantity);

router.post('/api/user/cart/merge', mergeCarts);

router.delete('/api/user/cart/:id', removeItem);

router.post('/api/user/cart', addToCart);

router.delete('/api/cart/all/:uid', clearCart);

export default router;
