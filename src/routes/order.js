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
import apiAdminRequired from '../middlewares/api-admin-required';
import apiLoginRequired from '../middlewares/api-login-required';

const router = express.Router();

router.post('/api/order', apiLoginRequired, postOrder);

router.get('/api/orders', apiAdminRequired, getAllOrders);

router.get('/api/orders/me', apiLoginRequired, getMyOrders);

router.put('/api/order/status/:oid', apiAdminRequired, updateOrderStatus);

router.put('/api/order/:oid', apiLoginRequired, updateOrder);

router.delete('/api/order/cancel/:oid', apiLoginRequired, cancelOrder)

router.delete('/api/order/:oid', apiAdminRequired, deleteOrder);

export default router;
