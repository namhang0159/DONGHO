import express from 'express';
import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} from '../controllers/userAddress.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { requireFields } from '../middlewares/validate.middleware.js';

const router = express.Router();

// Tất cả route địa chỉ đều yêu cầu đăng nhập
router.use(verifyToken);

router.get('/', getAddresses);
router.post('/', requireFields('receiverName', 'phone', 'address'), createAddress);
router.put('/:id', updateAddress);
router.delete('/:id', deleteAddress);

export default router;
