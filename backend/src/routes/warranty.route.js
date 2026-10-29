import express from 'express';
import {
  checkWarranty,
  createWarranty,
  getClaims,
  createClaim,
  updateClaimStatus,
} from '../controllers/warranty.controller.js';
import { verifyToken, authorizeRoles, authorizePositions } from '../middlewares/auth.middleware.js';
import { requireFields } from '../middlewares/validate.middleware.js';

const router = express.Router();

// Tra cứu bảo hành là công khai (khách tra theo serial hoặc mã thẻ)
router.get('/check/:code', checkWarranty);

// Tạo thẻ bảo hành khi xuất xưởng/bán hàng (Staff / Admin)
router.post(
  '/',
  verifyToken,
  authorizeRoles('admin', 'staff'),
  requireFields('serialNumberId', 'cardCode', 'startDate', 'ngayHetBaoHanh'),
  createWarranty
);

// Quản lý yêu cầu bảo hành
router.get('/claims', verifyToken, getClaims);

router.post(
  '/claims',
  verifyToken,
  requireFields('serialNumberId', 'issueDescription'),
  createClaim
);

router.put(
  '/claims/:id/status',
  verifyToken,
  authorizeRoles('admin', 'staff'),
  authorizePositions('manager', 'technician'),
  requireFields('status'),
  updateClaimStatus
);

export default router;
