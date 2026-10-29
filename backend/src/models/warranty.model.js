import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Warranty = sequelize.define('Warranty', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  serialNumberId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'serial_number_id',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'user_id',
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'order_id',
    comment: 'Đơn hàng phát sinh phiếu bảo hành',
  },
  cardCode: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    field: 'card_code',
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'start_date',
  },
  ngayHetBaoHanh: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'Ngay_Het_Bao_Hanh',
  },
  status: {
    type: DataTypes.ENUM('active', 'expired', 'void'),
    allowNull: false,
    defaultValue: 'active',
  },
}, {
  tableName: 'warranties',
  timestamps: false,
});

export default Warranty;
