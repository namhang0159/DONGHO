import { Op } from 'sequelize';
import {
  Product,
  Brand,
  Category,
  ProductVariant,
  ProductVariantImage,
  SerialNumber,
  Feature,
} from '../models/index.js';

export const getAllProducts = async (query = {}) => {
  const {
    brandId,
    categoryId,
    gender,
    loaiBoMay,
    priceMin,
    priceMax,
    search,
    status = 'active',
    page = 1,
    limit = 20,
    sortBy = 'id',
    order = 'DESC',
  } = query;

  const where = {};

  if (status && status !== 'all') {
    where.status = status;
  }

  if (brandId) {
    where.brandId = brandId;
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (gender) {
    where.gender = gender;
  }

  if (loaiBoMay) {
    where.loaiBoMay = loaiBoMay;
  }

  if (priceMin || priceMax) {
    where.basePrice = {};
    if (priceMin) where.basePrice[Op.gte] = Number(priceMin);
    if (priceMax) where.basePrice[Op.lte] = Number(priceMax);
  }

  if (search) {
    where[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { slug: { [Op.like]: `%${search}%` } },
    ];
  }

  const offset = (Number(page) - 1) * Number(limit);

  const { count, rows } = await Product.findAndCountAll({
    where,
    limit: Number(limit),
    offset: Number(offset),
    order: [[sortBy, order.toUpperCase()]],
    distinct: true,
    include: [
      {
        model: Brand,
        as: 'brand',
        attributes: ['id', 'name', 'slug', 'country'],
      },
      {
        model: Category,
        as: 'category',
        attributes: ['id', 'name', 'slug'],
      },
      {
        model: ProductVariant,
        as: 'variants',
        attributes: ['id', 'sku', 'price', 'costPrice', 'status', 'chatLieuDayDeo', 'mauMatSo'],
        include: [
          {
            model: ProductVariantImage,
            as: 'images',
          },
        ],
      },
      {
        model: Feature,
        as: 'features',
        attributes: ['id', 'name', 'slug'],
        through: { attributes: [] },
      },
    ],
  });

  return {
    products: rows,
    pagination: {
      totalItems: count,
      totalPages: Math.ceil(count / Number(limit)),
      currentPage: Number(page),
      limit: Number(limit),
    },
  };
};

export const getProductByIdOrSlug = async (identifier) => {
  const isNumber = !isNaN(identifier);
  const where = isNumber ? { id: Number(identifier) } : { slug: identifier };

  const product = await Product.findOne({
    where,
    include: [
      {
        model: Brand,
        as: 'brand',
      },
      {
        model: Category,
        as: 'category',
      },
      {
        model: ProductVariant,
        as: 'variants',
        include: [
          {
            model: ProductVariantImage,
            as: 'images',
          },
          {
            model: SerialNumber,
            as: 'serialNumbers',
            attributes: ['id', 'serialNumber', 'status', 'itemCondition', 'location'],
          },
        ],
      },
      {
        model: Feature,
        as: 'features',
        through: { attributes: [] },
      },
    ],
  });

  return product;
};

export const createProduct = async (data) => {
  const product = await Product.create(data);
  return product;
};

export const updateProduct = async (id, data) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  await product.update(data);
  return product;
};

export const deleteProduct = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  await product.destroy();
  return true;
};

// Quản lý biến thể (Variants)
export const addVariant = async (productId, data) => {
  return await ProductVariant.create({ ...data, productId });
};

export const updateVariant = async (variantId, data) => {
  const variant = await ProductVariant.findByPk(variantId);
  if (!variant) return null;
  await variant.update(data);
  return variant;
};

export default {
  getAllProducts,
  getProductByIdOrSlug,
  createProduct,
  updateProduct,
  deleteProduct,
  addVariant,
  updateVariant,
};
