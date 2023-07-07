const Product = require('../models/product');

exports.postProduct = (req, res) => {
  const {
    title,
    description,
    price,
    pages,
    author,
    category,
    imageUrl,
  } = req.body;

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
  console.log(productId)
  Product.findByIdAndRemove(productId)
    .then(() => {
      console.log('상품 삭제');
      res.redirect('/admin');
    })
    .catch(err => console.log(err));
}