import express from 'express';
import path from 'path';
import checkCategoryExists from '../middlewares/check-category-exists';
// views폴더 내의 ${resource} 폴더 내의 모든 파일을 웹에 띄우며,
// 이 때 ${resource}.html 을 기본 파일로 설정함.
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
router.use('/product/:pid', serveStatic('product-detail'));

router.use(
  '/products/:categoryName',
  checkCategoryExists,
  serveStatic('product-list')
);

router.use('/user/info', serveStatic('user-info'));
router.use('/user/order', serveStatic('user-order'));

router.use('/admin/', serveStatic('admin'));
router.use('/admin/product/:pid/edit', serveStatic('admin-product'));
router.use('/admin/product/add/', serveStatic('admin-product'));
router.use('/admin/order', serveStatic('admin-order'));
router.use('/admin/category', serveStatic('admin-category'));

export default router;
