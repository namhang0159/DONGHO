import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const ProductFeature = sequelize.define('ProductFeature', {
  productId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'product_id',
  },
  featureId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'feature_id',
  },
}, {
  tableName: 'product_features',
  timestamps: false,
});

export default ProductFeature;
