import express from 'express';
import path from 'path';
const loginRequired = require('../middlewares/login-required');
import adminRequired from '../middlewares/admin-required';

export const serveStatic = (resource, fileName) => {
  const resourcePath = path.join(__dirname, `../views/${resource}`);
  let option = { index: `${resource}.html` };

  if (fileName) {
    option = { index: `${fileName}.html` };
  }
  return express.static(resourcePath, option);
};
const router = express.Router();
router.use('/', serveStatic('home'));

router.use('/cart', serveStatic('cart'));
router.use('/products/:categoryName', serveStatic('product-list'));

router.use('/user/info', loginRequired, serveStatic('user-info'));
router.use('/user/order', loginRequired, serveStatic('user-order'));

router.use('/admin/', adminRequired, serveStatic('admin'));
router.use(
  '/admin/product/:pid/edit',
  adminRequired,
  serveStatic('admin-product')
);
router.use('/admin/product/add/', adminRequired, serveStatic('admin-product'));
router.use('/admin/order', adminRequired, serveStatic('admin-order'));
router.use('/admin/category', adminRequired, serveStatic('admin-category'));

export default router;
