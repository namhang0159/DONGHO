import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import apiRoutes from './routes/index.js';
import { notFoundHandler, globalErrorHandler } from './middlewares/error.middleware.js';

import { attachAuditHelper } from './middlewares/audit.middleware.js';

dotenv.config();

const app = express();

// Middlewares bảo mật & tiện ích
app.use(helmet());

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    return callback(new Error('CORS Not Allowed'));
  },
  credentials: true,
}));

app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(attachAuditHelper);

// Root welcome endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Luxury Watch Backend API',
    version: '1.0.0',
    documentation: '/api/v1/health',
  });
});

// Gắn toàn bộ API Router vào tiền tố /api/v1 và /api
app.use('/api/v1', apiRoutes);
app.use('/api', apiRoutes);

// Bắt lỗi 404
app.use(notFoundHandler);

// Xử lý lỗi toàn cục
app.use(globalErrorHandler);

export default app;
