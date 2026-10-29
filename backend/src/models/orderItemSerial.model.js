import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const OrderItemSerial = sequelize.define('OrderItemSerial', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderItemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'order_item_id',
  },
  serialNumberId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'serial_number_id',
  },
}, {
  tableName: 'order_item_serials',
  timestamps: false,
});

export default OrderItemSerial;
