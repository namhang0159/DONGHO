FROM node:20-alpine

WORKDIR /app

# Sao chép package manifest và cài đặt dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Sao chép toàn bộ mã nguồn backend
COPY . .

# Expose cổng 5000 cho Express API
EXPOSE 5000

# Kiểm tra trạng thái sức khỏe container
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/v1/health || exit 1

# Khởi chạy Express Server
CMD ["node", "server.js"]
