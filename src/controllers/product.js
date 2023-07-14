import Product from '../models/product';

export const getProducts = async (req, res) => {
  try {
    // 카테고리가 쿼리 파라미터로 제공된 경우
    if (req.query.category) {
      const products = await Product.find({ category: req.query.category }).sort({createdAt: -1});
      return res.json(products);
    }

    const products = await Product.find().sort({createdAt: -1});
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
};

export const getproductDetail = async (req, res) => {
  const productId = req.params.pid;

  try {
    const product = await Product.findById(productId);
    res.send(product);
  } catch (err) {
    console.log(err);
  }
};

export const postProduct = async (req, res) => {
  const { title, description, price, pages, author, category, imageUrl } = req.body;

  const product = new Product({
    title,
    description,
    price,
    pages,
    author,
    category,
    imageUrl,
  });

  try {
    const result = await product.save();
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
};

export const updateProduct = async (req, res) => {
  const prodId = req.params.pid;
  const { description, imageUrl, price, title, pages, author } = req.body;

  try {
    const product = await Product.findById(prodId);
    product.title = title;
    product.pages = pages;
    product.author = author;
    product.price = price;
    product.description = description;
    product.imageUrl = imageUrl;
    
    const result = await product.save();
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.pid;
  try {
    const result = await Product.findByIdAndRemove(productId);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
};