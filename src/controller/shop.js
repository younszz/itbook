import Product from '../models/product';

exports.getProducts = (req, res) => {
  Product.find().then((products) => {
    res.send(products);
  });
};

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, price, description } = req.body;

  const product = new Product({
    title,
    imageUrl,
    description,
    price,
  });

  product
    .save()
    .then((result) => {
      console.log('상품 생성');
    })
    .catch((err) => console.log(err));
};

exports.getproductDetail = (req, res) => {
  const productId = req.params.pid;

  Product.findById(productId)
    .then((product) => {
      res.send(product);
    })
    .catch((err) => console.log(err));
};
