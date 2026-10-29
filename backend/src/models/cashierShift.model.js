import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const CashierShift = sequelize.define('CashierShift', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cashierId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'cashier_id',
  },
  openedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'opened_at',
  },
  closedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'closed_at',
  },
  tienPhaiCoKhiChotCa: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
    field: 'Tien_Phai_Co_Khi_Chot_Ca',
  },
  status: {
    type: DataTypes.ENUM('open', 'closed'),
    allowNull: false,
    defaultValue: 'open',
  },
  openedByAdminId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'opened_by_admin_id',
    comment: 'ID Admin giao tiền quỹ đầu ca',
  },
  openingCashStatus: {
    type: DataTypes.ENUM('pending', 'confirmed', 'discrepancy'),
    defaultValue: 'pending',
    field: 'opening_cash_status',
    comment: 'Trạng thái xác nhận tiền đầu ca: pending=chờ nhận, confirmed=khớp, discrepancy=sai lệch',
  },
  tienMatDemDuocKhiNhanCa: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
    field: 'Tien_Mat_Dem_Duoc_Khi_Nhan_Ca',
    comment: 'Tiền mặt thực tế nhân viên đếm được khi nhận ca',
  },
  previousShiftId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'previous_shift_id',
    comment: 'ID ca làm việc trước đó',
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Ghi chú lý do sai lệch tiền quỹ hoặc lưu ý trong ca',
  },
}, {
  tableName: 'cashier_shifts',
  timestamps: false,
});

export default CashierShift;
