import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const CartItem = sequelize.define('CartItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'cart_id',
    comment: 'Thuộc giỏ hàng nào (bảng carts)',
  },
  variantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'variant_id',
    comment: 'Mã biến thể sản phẩm khách chọn (bảng product_variants)',
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: 'Số lượng sản phẩm trong giỏ',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
}, {
  tableName: 'cart_items',
  timestamps: false,
});

export default CartItem;
