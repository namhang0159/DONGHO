import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const ProductVariantImage = sequelize.define('ProductVariantImage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  variantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'variant_id',
    comment: 'Thuộc biến thể sản phẩm nào (bảng product_variants)',
  },
  imageUrl: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'image_url',
    comment: 'Đường dẫn/URL của ảnh chi tiết',
  },
  isDefault: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'is_default',
    comment: '1 = Ảnh đại diện của riêng variant này, 0 = Ảnh phụ trong gallery',
  },
  sortOrder: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    field: 'sort_order',
    comment: 'Thứ tự hiển thị ảnh',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
}, {
  tableName: 'product_variant_images',
  timestamps: false,
});

export default ProductVariantImage;
