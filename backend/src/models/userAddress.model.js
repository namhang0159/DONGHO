import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const UserAddress = sequelize.define('UserAddress', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
    comment: 'Thuộc khách hàng nào (bảng users)',
  },
  receiverName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'receiver_name',
    comment: 'Tên người nhận hàng tại địa chỉ này',
  },
  phone: {
    type: DataTypes.STRING(30),
    allowNull: false,
    comment: 'SĐT người nhận tại địa chỉ này',
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'Địa chỉ chi tiết (Số nhà, Phường/Xã, Quận/Huyện, Tỉnh/TP)',
  },
  isDefault: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'is_default',
    comment: '1 = Địa chỉ mặc định, 0 = Địa chỉ phụ',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
}, {
  tableName: 'user_addresses',
  timestamps: false,
});

export default UserAddress;
