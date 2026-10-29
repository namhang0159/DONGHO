import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const ApprovalRequest = sequelize.define('ApprovalRequest', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  requestType: {
    type: DataTypes.ENUM('cancel_order', 'excess_discount', 'refund_exchange', 'inventory_discrepancy', 'import_serial'),
    allowNull: false,
    field: 'request_type',
  },
  idBangLienQuan: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'Id_Bang_Lien_Quan',
  },
  nguoiYeuCau: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'Nguoi_Yeu_Cau',
  },
  nguoiPheDuyet: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'Nguoi_Phe_Duyet',
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  thoiDiemTao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'Thoi_Diem_Tao',
  },
  thoiDiemPheDuyet: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'Thoi_Diem_Phe_Duyet',
  },
}, {
  tableName: 'approval_requests',
  timestamps: false,
});

export default ApprovalRequest;
