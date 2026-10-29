-- Khởi tạo Database dongho_shop với UTF-8 đa ngôn ngữ
CREATE DATABASE IF NOT EXISTS `dongho_shop` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Cấp quyền truy cập cho user
GRANT ALL PRIVILEGES ON `dongho_shop`.* TO 'root'@'%';
FLUSH PRIVILEGES;
