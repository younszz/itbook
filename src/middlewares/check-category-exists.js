import Category from '../models/category'

const checkCategoryExists = async (req, res, next) => {
  const { categoryName } = req.params;
  const category = await Category.findOne({ 'value': { $in: [categoryName] } });
  if (!category) {
    return serveStatic('error')(req, res, next);
  }
  next();
}

export default checkCategoryExists;