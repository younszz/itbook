import Product from '../models/product';

export const getProducts = async (req, res) => {
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

export const getproductDetail = (req, res) => {
  const productId = req.params.pid;

  Product.findById(productId)
    .then((product) => {
      res.send(product);
    })
    .catch((err) => console.log(err));
};

export const postProduct = (req, res) => {
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
      res.status(201).json(result);
    })
    .catch((err) => console.log(err));
};

export const updateProduct = (req, res) => {
  const prodId = req.params.pid;
  const { description, imageUrl, price, title, pages, author } = req.body;

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
      console.log('상품 수정');
      res.status(201).json(result);
    })
    .catch((err) => console.log(err));
};

export const deleteProduct = (req, res) => {
  const productId = req.params.pid;
  Product.findByIdAndRemove(productId)
    .then((result) => {
      console.log('상품 삭제');
      res.status(201).json(result);
    })
    .catch((err) => console.log(err));
};
