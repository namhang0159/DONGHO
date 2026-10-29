import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const AuditLog = sequelize.define('AuditLog', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  actorType: {
    type: DataTypes.ENUM('admin', 'user', 'system'),
    allowNull: false,
    defaultValue: 'system',
    field: 'actor_type',
  },
  idDoiTuongThucHien: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'Id_Doi_Tuong_Thuc_Hien',
  },
  action: {
    type: DataTypes.ENUM('insert', 'update', 'delete', 'other'),
    allowNull: false,
  },
  bangBiThaoTac: {
    type: DataTypes.STRING(64),
    allowNull: false,
    field: 'Bang_Bi_Thao_Tac',
  },
  idDongDuLieuBiThayDoi: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'Id_Dong_Du_Lieu_Bi_Thay_Doi',
  },
  oldValues: {
    type: DataTypes.JSON,
    allowNull: true,
    field: 'old_values',
  },
  newValues: {
    type: DataTypes.JSON,
    allowNull: true,
    field: 'new_values',
  },
  ipAddress: {
    type: DataTypes.STRING(45),
    allowNull: true,
    field: 'ip_address',
  },
  note: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE(3),
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
}, {
  tableName: 'audit_logs',
  timestamps: false,
});

export default AuditLog;
