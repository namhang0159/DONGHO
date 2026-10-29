import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderCode: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    field: 'order_code',
  },
  banOnlineHoacOffline: {
    type: DataTypes.ENUM('online', 'offline'),
    allowNull: false,
    defaultValue: 'online',
    field: 'Ban_Online_Hoac_Offline',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'user_id',
  },
  userAddressId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'user_address_id',
  },
  saleStaffId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'sale_staff_id',
  },
  shiftId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'shift_id',
  },
  tongTienBanDau: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0.00,
    field: 'Tong_Tien_Ban_Dau',
  },
  tongTienDonHang: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0.00,
    field: 'Tong_Tien_Don_Hang',
  },
  paymentMethod: {
    type: DataTypes.ENUM('cod', 'cash', 'card', 'bank_transfer', 'vnpay', 'momo'),
    allowNull: false,
    defaultValue: 'cod',
    field: 'payment_method',
  },
  paymentStatus: {
    type: DataTypes.ENUM('unpaid', 'paid', 'refunded'),
    allowNull: false,
    defaultValue: 'unpaid',
    field: 'payment_status',
  },
  orderStatus: {
    type: DataTypes.ENUM('pending', 'confirmed', 'packing', 'shipping', 'completed', 'cancelled', 'returned'),
    allowNull: false,
    defaultValue: 'pending',
    field: 'order_status',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
}, {
  tableName: 'orders',
  timestamps: false,
});

export default Order;
