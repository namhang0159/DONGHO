import { Brand, Product } from '../models/index.js';

export const getAllBrands = async () => {
  return await Brand.findAll({
    include: [
      {
        model: Product,
        as: 'products',
        attributes: ['id', 'name'],
      },
    ],
    order: [['name', 'ASC']],
  });
};

export const getBrandByIdOrSlug = async (identifier) => {
  const isNumber = !isNaN(identifier);
  const where = isNumber ? { id: Number(identifier) } : { slug: identifier };

  return await Brand.findOne({
    where,
    include: [
      {
        model: Product,
        as: 'products',
      },
    ],
  });
};

export const createBrand = async (data) => {
  return await Brand.create(data);
};

export const updateBrand = async (id, data) => {
  const brand = await Brand.findByPk(id);
  if (!brand) return null;
  await brand.update(data);
  return brand;
};

export const deleteBrand = async (id) => {
  const brand = await Brand.findByPk(id);
  if (!brand) return null;
  await brand.destroy();
  return true;
};

export default {
  getAllBrands,
  getBrandByIdOrSlug,
  createBrand,
  updateBrand,
  deleteBrand,
};
