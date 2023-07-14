import Category from '../models/category';

export const getCategories = async (req, res) => {
  try {
    const category = await Category.findOne();
    if (!category) {
      return res.status(404).json({ message: '없는 카테고리' });
    }
    res.json(category.value);
  } catch (err) {
    console.log(err);
  }
};

export const updateCategory = async (req, res) => {
  const newValue = req.body;

  if (!Array.isArray(newValue)) {
    return;
  }

  try {
    await Category.findOneAndUpdate(
      {},
      { $set: { value: newValue } },
      { useFindAndModify: false }
    );
    res.status(200).send({ message: '카테고리 수정 완료' });
  } catch (err) {
    console.log(err);
  }
};