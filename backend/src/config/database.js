import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const {
  DB_HOST = '127.0.0.1',
  DB_PORT = 3306,
  DB_NAME = 'dongho_shop',
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_DIALECT = 'mysql',
  NODE_ENV = 'development',
} = process.env;

/**
 * Tự động tạo database nếu chưa tồn tại trên MySQL Server
 */
export const ensureDatabaseExists = async () => {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      port: Number(DB_PORT),
      user: DB_USER,
      password: DB_PASSWORD,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await connection.end();
    console.log(`[Database] Database '${DB_NAME}' đã sẵn sàng.`);
  } catch (error) {
    console.warn(`[Database Warning] Chưa thể tự động tạo DB: ${error.message}`);
  }
};

/**
 * Khởi tạo Sequelize Instance
 */
export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: DB_DIALECT,
  logging: NODE_ENV === 'development' ? (msg) => console.log(`[Sequelize] ${msg}`) : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: true,
    underscored: true,
  },
});

/**
 * Hàm kiểm tra kết nối CSDL
 */
export const connectDB = async () => {
  try {
    await ensureDatabaseExists();
    await sequelize.authenticate();
    console.log('[Database] Kết nối MySQL thành công qua Sequelize ORM.');

    // Đồng bộ model với database (ở môi trường dev)
    await sequelize.sync({ alter: false });
    console.log('[Database] Đồng bộ các Model thành công.');
  } catch (error) {
    console.error('[Database Error] Không thể kết nối tới MySQL:', error.message);
    console.log('[Database Advice] Vui lòng kiểm tra lại dịch vụ MySQL (XAMPP / Laragon / Docker / MySQL Service) và thông số trong file .env');
  }
};

export default sequelize;
