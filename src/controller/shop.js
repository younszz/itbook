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
