import { Op } from 'sequelize';
import { Banner } from '../models/index.js';

export const getBanners = async (position = 'slider_home') => {
  const now = new Date();
  return await Banner.findAll({
    where: {
      position,
      status: 'active',
      [Op.and]: [
        {
          [Op.or]: [
            { startDate: null },
            { startDate: { [Op.lte]: now } },
          ],
        },
        {
          [Op.or]: [
            { endDate: null },
            { endDate: { [Op.gte]: now } },
          ],
        },
      ],
    },
    order: [['sortOrder', 'ASC']],
  });
};

export const createBanner = async (data) => {
  return await Banner.create(data);
};

export const updateBanner = async (id, data) => {
  const banner = await Banner.findByPk(id);
  if (!banner) return null;
  await banner.update(data);
  return banner;
};

export const deleteBanner = async (id) => {
  const banner = await Banner.findByPk(id);
  if (!banner) return null;
  await banner.destroy();
  return true;
};

export default {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
};
