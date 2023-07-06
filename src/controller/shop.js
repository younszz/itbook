import Product from '../models/product';

exports.getProducts = (req, res) => {
  Product.find().then((products) => {
    res.send(products);
  });
};

exports.getproductDetail = (req, res) => {
  const productId = req.params.pid;

  Product.findById(productId)
    .then((product) => {
      res.send(product);
    })
    .catch((err) => console.log(err));
};
