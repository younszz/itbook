const Product = require('../models/product');

exports.postAddProduct = (req, res) => {
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
