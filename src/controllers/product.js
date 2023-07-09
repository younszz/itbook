import Product from '../models/product';

exports.getProducts = async (req, res) => {
  try {
    // 카테고리가 쿼리 파라미터로 제공된 경우
    if (req.query.category) {
      const products = await Product.find({ category: req.query.category });
      return res.json(products);
    }

    // 카테고리가 제공되지 않은 경우 모든 제품을 반환
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
};

exports.getproductDetail = (req, res) => {
  const productId = req.params.pid;

  Product.findById(productId)
    .then((product) => {
      res.send(product);
    })
    .catch((err) => console.log(err));
};

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

exports.updateProduct = (req, res) => {
  const prodId = req.params.id;
  const { description, imageUrl, price, title, pages, author } =
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

exports.deleteProduct = (req, res) => {
  const productId = req.params.id;
  console.log(productId);
  Product.findByIdAndRemove(productId)
    .then(() => {
      console.log('상품 삭제');
      res.redirect('/admin');
    })
    .catch((err) => console.log(err));
};
