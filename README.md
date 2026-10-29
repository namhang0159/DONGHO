# ⚜️ DONGHO - MAISON DES MONTRES | HAUTE HORLOGERIE PLATFORM

> **Hệ Thống Thương Mại Điện Tử & Quản Trị Chuỗi Boutique Đồng Hồ Xa Xỉ Thụy Sĩ Đạt Chuẩn Haute Horlogerie**

[![Next.js](https://img.shields.io/badge/Next.js-16.4.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql)](https://www.mysql.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Font Awesome](https://img.shields.io/badge/Font_Awesome-6-528DD7?style=for-the-badge&logo=font-awesome)](https://fontawesome.com/)
[![OAuth 2.0](https://img.shields.io/badge/Google-OAuth_2.0-EA4335?style=for-the-badge&logo=google)](https://developers.google.com/identity)

---

## 🏛️ Tổng Quan Kiến Trúc (Architecture Overview)

Dự án được cấu trúc theo mô hình **Monorepo** bao gồm 3 phân hệ độc lập và tích hợp hoàn chỉnh:

```
c:/hoc/dongho/
├── backend/        # RESTful API Gateway (Node.js, Express, Sequelize ORM, MySQL)
├── frontend/       # Client Boutique Storefront (Next.js 16, App Router, Haute Horlogerie UX)
├── fe-admin/       # Quản Trị Nội Bộ & Vận Hành Boutique (Next.js 16, ERP & POS Portal)
├── .gitignore      # Cấu hình bỏ qua dependencies, cache build, file nhạy cảm
└── README.md       # Tài liệu dự án
```

### 1. Phân Hệ Client Boutique (`frontend/` - Port `3000`)
- **Trải Nghiệm Đỉnh Cao (Haute Horlogerie)**: Thiết kế chuẩn thẩm mỹ Thụy Sĩ với bảng màu Noir & Or (`#d4af37`), hairline gold borders tinh tế, video Showcase 100% full-bleed cinema responsive.
- **Tương Tác 3D & Animation**: Trình diễn mô phỏng cơ khí xoay 120 frames tương tác mượt mà theo thao tác cuộn chuột.
- **Xác Thực Người Dùng Toàn Diện**: 
  - Đăng ký / Đăng nhập tài khoản lưu trữ trực tiếp tại MySQL (mã hóa mật khẩu `bcrypt`).
  - Tích hợp **Google OAuth 2.0 Popup** mở trực tiếp từ `accounts.google.com` với cơ chế lắng nghe phản hồi an toàn (`postMessage`), tự động nhận diện VIP và đồng bộ phiên đăng nhập.
- **Hệ Thống Phân Hạng Hội Viên VIP**: Tự động cấp thẻ đặc quyền (Emerald VIP, Platinum Elite, Diamond Solitaire).
- **Giỏ Hàng & Thanh Toán Cao Cấp**: Tính năng chọn vận chuyển bọc thép bảo an chuyên dụng, mã QR ngân hàng hoặc thanh toán thẻ tín dụng quốc tế.
- **Chuẩn Icon Toàn Dự Án**: 100% chuẩn biểu tượng từ **Font Awesome** (`@fortawesome/react-fontawesome`).

### 2. Phân Hệ Quản Trị & Vận Hành (`fe-admin/` - Port `3001`)
- **Phân Quyền Vai Trò Nghiệp Vụ Chuyên Sâu**:
  - **Quản Lý (Manager / Super Admin)**: Toàn quyền phê duyệt, xem báo cáo doanh thu, quản trị nhân sự và kiểm soát audit log.
  - **Nhân Viên Kinh Doanh (Sales Staff)**: Quản lý ca thu ngân (Mở ca / Đóng ca / Bàn giao két), tạo đơn tại quầy, tra cứu thông tin khách hàng VIP.
  - **Thủ Kho (Warehouse Staff)**: Quản lý nhập/xuất kho, theo dõi số Serial của từng cỗ máy đồng hồ, điều phối vận chuyển bọc thép.
  - **Kỹ Thuật Viên (Technician Staff)**: Quản lý phiếu tiếp nhận bảo dưỡng, kiểm định cơ khí, lau dầu và đánh bóng đồng hồ.

### 3. Phân Hệ Máy Chủ & Cơ Sở Dữ Liệu (`backend/` - Port `5000`)
- **Node.js & Express**: Kiến trúc phân tầng Controller - Service - Model chuẩn mực.
- **Cơ Sở Dữ Liệu MySQL & Sequelize ORM**: Hệ thống quan hệ dữ liệu đầy đủ (Users, Admins, Products, Variants, SerialNumbers, Orders, OrderItems, Shipments, RepairTickets, CashierShifts, Warranties).
- **Cơ Chế Bảo Mật Kép**: JWT Access Token (ngắn hạn) kết hợp Refresh Token (dài hạn), cơ chế mã hóa `bcrypt` an toàn.

---

## 👥 Danh Sách Tài Khoản Mẫu Trực Tiếp Trên MySQL

Hệ thống đã được nạp sẵn dữ liệu tài khoản thật trong database để phục vụ việc kiểm thử ngay:

### 👑 Tài Khoản Cổng Quản Trị (`http://localhost:3001`)

| Vị Trí / Chức Vụ | Họ Và Tên | Email Đăng Nhập | Mật Khẩu | Quyền Hạn |
| :--- | :--- | :--- | :--- | :--- |
| **Quản Lý (Manager)** | Mai Phương Thúy | `manager.mai@watchshop.vn` | `manager123` | Quản trị chi nhánh, duyệt đơn |
| **Tổng Quản Trị** | Tổng Quản Lý Maison | `admin@watchshop.vn` | `admin123456` | Toàn quyền hệ thống |
| **Bán Hàng (Sales)** | Trang Hoàng Yến | `sales.trang@watchshop.vn` | `sales123` | POS, thu ngân, mở/đóng ca |
| **Bán Hàng (Sales)** | Nguyễn Văn Sáu | `staff6@watchshop.local` | `staff123` | Ca trực bán hàng |
| **Kho Vận (Warehouse)**| Đặng Hữu Phước | `kho.phuoc@watchshop.vn` | `kho123` | Xuất/nhập kho, kiểm định serial |
| **Kho Vận (Warehouse)**| Trần Thị Tám | `staff8@watchshop.local` | `staff123` | Quản lý tồn kho |
| **Kỹ Thuật (Technician)**| Lê Quang Trọng | `tech.trong@watchshop.vn` | `tech123` | Phiếu sửa chữa, bảo hành |
| **Kỹ Thuật (Technician)**| Thợ Đồng Hồ Master | `tech@watchshop.local` | `tech123` | Thẩm định và chế tác cơ khí |

### 💎 Tài Khoản Cổng Khách Hàng (`http://localhost:3000`)
- **Email**: `nammhang0159@gmail.com`
- **Mật khẩu**: `123456`
- **Hoặc**: Đăng ký tài khoản mới trực tiếp hoặc Đăng nhập qua nút **Tiếp Tục Với Tài Khoản Google**.

---

## 🚀 Hướng Dẫn Cài Đặt & Khởi Chạy (Getting Started)

### 1. Yêu Cầu Hệ Thống
- **Node.js**: Phiên bản 18.x hoặc cao hơn.
- **MySQL Database**: Phiên bản 8.0 trở lên (XAMPP / Laragon / MySQL Server).

### 2. Thiết Lập Cơ Sở Dữ Liệu
1. Mở MySQL và tạo một database mới:
   ```sql
   CREATE DATABASE dongho_shop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
2. Cấu hình file `backend/.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_NAME=dongho_shop
   DB_USER=root
   DB_PASSWORD=
   DB_DIALECT=mysql
   
   JWT_SECRET=super_luxury_watch_secret_key_2026
   JWT_EXPIRES_IN=1h
   JWT_REFRESH_SECRET=super_luxury_watch_refresh_secret_key_2026
   JWT_REFRESH_EXPIRES_IN=7d
   ```

### 3. Cài Đặt & Chạy Từng Phân Hệ

#### A. Khởi Chạy Backend API (Port 5000)
```bash
cd backend
npm install
# Khởi chạy server và tự động đồng bộ models
npm run dev
```

#### B. Khởi Chạy Admin Portal (Port 3001)
```bash
cd fe-admin
npm install
npm run dev
# Truy cập: http://localhost:3001
```

#### C. Khởi Chạy Client Boutique (Port 3000)
```bash
cd frontend
npm install
# Cấu hình file frontend/.env.local (đã có mẫu trong .env.example)
npm run dev
# Truy cập: http://localhost:3000
```

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

- **Frontend & Admin**: [Next.js](https://nextjs.org/) (App Router, Turbopack), [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [Font Awesome 6](https://fontawesome.com/).
- **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), [Sequelize ORM](https://sequelize.org/), [Bcryptjs](https://github.com/dcodeIO/bcrypt.js), [JsonWebToken](https://github.com/auth0/node-jsonwebtoken).
- **Authentication**: JWT Auth, Session Refresh Tokens, Google OAuth 2.0 API.
- **Database**: MySQL 8.0.

---

## 📜 Giấy Phép & Bản Quyền
Dự án được xây dựng và phát triển bởi **[namhang0159](https://github.com/namhang0159)**. Mọi quyền được bảo lưu.
