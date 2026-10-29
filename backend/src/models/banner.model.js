import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Banner = sequelize.define('Banner', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Tiêu đề banner (quản lý nội bộ)',
  },
  imageUrl: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'image_url',
    comment: 'Đường dẫn hình ảnh banner',
  },
  linkUrl: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'link_url',
    comment: 'Link liên kết khi click vào banner',
  },
  position: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'slider_home',
    comment: 'Vị trí hiển thị: slider_home, sidebar, popup...',
  },
  sortOrder: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    field: 'sort_order',
    comment: 'Thứ tự sắp xếp hiển thị',
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    allowNull: false,
    defaultValue: 'active',
    comment: 'Trạng thái: active=hiển thị, inactive=ẩn',
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'start_date',
    comment: 'Thời gian bắt đầu hiển thị',
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'end_date',
    comment: 'Thời gian kết thúc hiển thị',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
}, {
  tableName: 'banners',
  timestamps: false,
});

export default Banner;
