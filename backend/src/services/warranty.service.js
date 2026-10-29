import { Op } from 'sequelize';
import {
  Warranty,
  WarrantyClaim,
  SerialNumber,
  ProductVariant,
  Product,
  User,
  Admin,
} from '../models/index.js';

export const checkWarranty = async (identifier) => {
  // Tìm kiếm theo mã thẻ bảo hành hoặc số serial máy
  const warranty = await Warranty.findOne({
    where: {
      [Op.or]: [
        { cardCode: identifier },
        { '$serialNumber.serial_number$': identifier },
      ],
    },
    include: [
      {
        model: SerialNumber,
        as: 'serialNumber',
        include: [
          {
            model: ProductVariant,
            as: 'variant',
            include: [
              {
                model: Product,
                as: 'product',
                attributes: ['id', 'name', 'slug', 'imageUrl', 'warrantyMonths'],
              },
            ],
          },
        ],
      },
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'phone'],
      },
    ],
  });

  return warranty;
};

export const createWarranty = async (data) => {
  return await Warranty.create(data);
};

export const createWarrantyClaim = async (data) => {
  return await WarrantyClaim.create(data);
};

export const getWarrantyClaims = async (query = {}, reqUser = null) => {
  const where = {};
  if (query.status) where.status = query.status;
  if (reqUser && reqUser.role === 'customer') {
    where.customerId = reqUser.id;
  }

  return await WarrantyClaim.findAll({
    where,
    order: [['id', 'DESC']],
    include: [
      {
        model: SerialNumber,
        as: 'serialNumber',
      },
      {
        model: Warranty,
        as: 'warranty',
      },
      {
        model: User,
        as: 'customer',
        attributes: ['id', 'name', 'phone'],
      },
      {
        model: Admin,
        as: 'staff',
        attributes: ['id', 'staffCode', 'name'],
      },
    ],
  });
};

export const updateClaimStatus = async (id, { status, returnedDate, note }) => {
  const claim = await WarrantyClaim.findByPk(id);
  if (!claim) return null;

  if (status) claim.status = status;
  if (returnedDate) claim.returnedDate = returnedDate;
  if (note) claim.note = note;

  await claim.save();
  return claim;
};

export default {
  checkWarranty,
  createWarranty,
  createWarrantyClaim,
  getWarrantyClaims,
  updateClaimStatus,
};
