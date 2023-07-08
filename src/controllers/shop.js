import Product from '../models/product';
import Category from '../models/category';

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
