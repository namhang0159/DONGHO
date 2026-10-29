import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Shipment = sequelize.define('Shipment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'order_id',
  },
  tenHangGiao: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'Ten_Hang_Giao',
    comment: 'Tên đơn vị: GHN, GHTK, ViettelPost...',
  },
  trackingCode: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    field: 'tracking_code',
    comment: 'Mã vận đơn do hãng vận chuyển cấp',
  },
  shippingFee: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0.00,
    field: 'shipping_fee',
    comment: 'Phí vận chuyển thực tế hãng thu',
  },
  codAmount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0.00,
    field: 'cod_amount',
    comment: 'Số tiền thu hộ (COD)',
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'ready_to_pick',
    comment: 'Trạng thái từ API: ready_to_pick, delivering, delivered, cancel...',
  },
  shippingAddressJson: {
    type: DataTypes.JSON,
    allowNull: true,
    field: 'shipping_address_json',
    comment: 'Địa chỉ giao hàng chi tiết gửi sang hãng',
  },
  note: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'updated_at',
  },
}, {
  tableName: 'shipments',
  timestamps: false,
});

export default Shipment;
