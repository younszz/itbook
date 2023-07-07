import Product from '../models/product';
import Category from '../models/category';

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
  const newValue = req.body.value;

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
    })
    .catch((err) => console.log(err));
};
