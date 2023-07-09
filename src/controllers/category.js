import Category from '../models/category';

// 카테고리
export const getCategories = (req, res) => {
  Category.findOne()
    .then((category) => {
      if (!category) {
        return res.status(404).json({ message: 'No category' });
      }
      res.json(category.value);
    })
    .catch((err) => console.log(err));
};

export const updateCategory = (req, res) => {
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