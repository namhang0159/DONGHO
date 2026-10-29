import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Watch = sequelize.define('Watch', {
  id: {
    type: DataTypes.STRING(100),
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  series: {
    type: DataTypes.STRING(150),
    allowNull: true,
  },
  categoryId: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'category_id',
  },
  categorySlug: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'category_slug',
  },
  priceUSD: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    defaultValue: 0,
    field: 'price_usd',
  },
  priceVND: {
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: 0,
    field: 'price_vnd',
  },
  image: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  gallery: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  tag: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  isNew: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_new',
  },
  isLimited: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_limited',
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 5.0,
  },
  reviewsCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'reviews_count',
  },
  specs: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {},
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  highlights: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
}, {
  tableName: 'watches',
  timestamps: true,
});

export default Watch;
