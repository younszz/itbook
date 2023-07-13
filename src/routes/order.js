import express from 'express';
import isAdmin from '../middlewares/admin-required';
import {
  postOrder,
  getAllOrders,
  getMyOrders,
  updateOrderStatus,
  updateOrder,
  cancelOrder,
  deleteOrder,
} from '../controllers/order';

const router = express.Router();

router.post('/api/order', postOrder);

router.get('/api/orders', isAdmin, getAllOrders);

router.get('/api/orders/me', getMyOrders);

router.put('/api/order/status/:oid', isAdmin, updateOrderStatus);

router.put('/api/order/:oid', updateOrder);

router.put('/api/order/cancel/:oid', cancelOrder);

router.delete('/api/order/:oid', isAdmin, deleteOrder);

export default router;
