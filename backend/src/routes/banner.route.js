import express from 'express';
import {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} from '../controllers/banner.controller.js';
import { verifyToken, authorizeRoles } from '../middlewares/auth.middleware.js';
import { requireFields } from '../middlewares/validate.middleware.js';

const router = express.Router();

router.get('/', getBanners);

// Protected routes (Admin only)
router.post('/', verifyToken, authorizeRoles('admin'), requireFields('title', 'imageUrl'), createBanner);
router.put('/:id', verifyToken, authorizeRoles('admin'), updateBanner);
router.delete('/:id', verifyToken, authorizeRoles('admin'), deleteBanner);

export default router;
