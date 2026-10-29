import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import { sequelize } from '../config/database.js';

export const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  staffCode: {
    type: DataTypes.STRING(20),
    allowNull: true,
    unique: true,
    field: 'staff_code',
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  passwordHash: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'password_hash',
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM('admin', 'staff'),
    allowNull: false,
    defaultValue: 'staff',
  },
  position: {
    type: DataTypes.ENUM('manager', 'sales', 'warehouse', 'technician'),
    allowNull: true,
    comment: 'sales kiêm luôn thu ngân; warehouse là nhân viên kho',
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    field: 'is_active',
  },
  refreshToken: {
    type: DataTypes.STRING(512),
    allowNull: true,
    field: 'refresh_token',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
}, {
  tableName: 'admins',
  timestamps: false,
  hooks: {
    beforeCreate: async (admin) => {
      if (admin.passwordHash) {
        const salt = await bcrypt.genSalt(10);
        admin.passwordHash = await bcrypt.hash(admin.passwordHash, salt);
      }
    },
    beforeUpdate: async (admin) => {
      if (admin.changed('passwordHash')) {
        const salt = await bcrypt.genSalt(10);
        admin.passwordHash = await bcrypt.hash(admin.passwordHash, salt);
      }
    },
  },
});

// So sánh mật khẩu
Admin.prototype.comparePassword = async function (enteredPassword) {
  if (!this.passwordHash) return false;
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};

// Loại bỏ mật khẩu và token khi chuyển sang JSON
Admin.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.passwordHash;
  delete values.refreshToken;
  return values;
};

export default Admin;
