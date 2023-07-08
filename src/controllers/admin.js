const Product = require('../models/product');
import Category from '../models/category';
const Order = require('../models/order');


//상품 생성 수정 삭제
exports.postProduct = (req, res) => {
  const { title, description, price, pages, author, category, imageUrl } =
    req.body;

  const product = new Product({
    title,
    description,
    price,
    pages,
    author,
    category,
    imageUrl,
  });

  product
    .save()
    .then((result) => {
      console.log('상품 생성');
    })
    .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res) => {
  const productId = req.body.productId;
  console.log(productId);
  Product.findByIdAndRemove(productId)
    .then(() => {
      console.log('상품 삭제');
      res.redirect('/admin');
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res) => {
  const { prodId, description, imageUrl, price, title, pages, author } =
    req.body;

  Product.findById(prodId)
    .then((product) => {
      product.title = title;
      product.pages = pages;
      product.author = author;
      product.price = price;
      product.description = description;
      product.imageUrl = imageUrl;
      return product.save();
    })
    .then((result) => {
      console.log('상품 업데이트');
      res.redirect('/admin');
    })
    .catch((err) => console.log(err));
};
//주문 조회 수정 삭제
exports.getOrders = (req, res) => {
  Order.find()
    .then((orders) => {
      console.log('주문 조회');
      res.json(orders);
    })
    .catch((err) => console.log(err));
};

exports.editOrder = (req, res) => {
  const { orderId, newStatus } = req.body;

  Order.findById(orderId)
    .then((order) => {
      order.status = newStatus;
      return order.save();
    })
    .then(() => {
      console.log('주문 업데이트');
      res.redirect('/admin');
    })
    .catch((err) => console.log(err));
};

exports.deleteOrder = (req, res) => {
  const orderId = req.body.orderId;

  Order.findByIdAndRemove(orderId)
    .then(() => {
      console.log('주문 삭제');
      res.redirect('/admin');
    })
    .catch((err) => console.log(err));
};

//카테고리 조회 수정

exports.getCategories = (req, res) => {
  Category.findOne()
    .then((category) => {
      if (!category) {
        return res.status(404).json({ message: 'No category' });
      }
      res.json(category.value);
    })
    .catch((err) => console.log(err));
};

exports.updateCategory = (req, res) => {
  const newValue = req.body;

  if (!Array.isArray(newValue)) {
    console.log('배열이 아님');
    return;
  }

  Category.findOneAndUpdate(
    {},
    { $set: { value: newValue } },
    { useFindAndModify: false }
  )
    .then(() => {
      console.log('카테고리 수정 완료');
      res.status(200).send({ message: '카테고리 수정 완료' });
    })
    .catch((err) => console.log(err));
};
