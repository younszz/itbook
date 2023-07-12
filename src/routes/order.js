import express from 'express';
import passport from 'passport';
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

router.post(
  '/api/order',
  passport.authenticate('jwt', { session: false }),
  postOrder
);

router.get(
  '/api/orders',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  getAllOrders
);

router.get(
  '/api/orders/me',
  passport.authenticate('jwt', { session: false }),
  getMyOrders
);

router.put(
  '/api/order/status/:oid',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  updateOrderStatus
);

router.put(
  '/api/order/:oid',
  passport.authenticate('jwt', { session: false }),
  updateOrder
);

router.put(
  '/api/order/cancel/:oid',
  passport.authenticate('jwt', { session: false }),
  cancelOrder
);

router.delete(
  '/api/order/:oid',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  deleteOrder
);

export default router;
