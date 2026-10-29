import { Category, Product } from '../models/index.js';

export const getAllCategories = async () => {
  return await Category.findAll({
    include: [
      {
        model: Category,
        as: 'children',
      },
    ],
    where: { parentId: null }, // Lấy danh mục gốc kèm danh mục con
    order: [['name', 'ASC']],
  });
};

export const getCategoryByIdOrSlug = async (identifier) => {
  const isNumber = !isNaN(identifier);
  const where = isNumber ? { id: Number(identifier) } : { slug: identifier };

  return await Category.findOne({
    where,
    include: [
      {
        model: Category,
        as: 'children',
      },
      {
        model: Category,
        as: 'parent',
      },
      {
        model: Product,
        as: 'products',
      },
    ],
  });
};

export const createCategory = async (data) => {
  return await Category.create(data);
};

export const updateCategory = async (id, data) => {
  const category = await Category.findByPk(id);
  if (!category) return null;
  await category.update(data);
  return category;
};

export const deleteCategory = async (id) => {
  const category = await Category.findByPk(id);
  if (!category) return null;
  await category.destroy();
  return true;
};

export default {
  getAllCategories,
  getCategoryByIdOrSlug,
  createCategory,
  updateCategory,
  deleteCategory,
};
