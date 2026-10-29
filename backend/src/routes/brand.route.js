import express from 'express';
import {
  getBrands,
  getBrandDetail,
  createBrand,
  updateBrand,
  deleteBrand,
} from '../controllers/brand.controller.js';
import { verifyToken, authorizeRoles } from '../middlewares/auth.middleware.js';
import { requireFields } from '../middlewares/validate.middleware.js';

const router = express.Router();

router.get('/', getBrands);
router.get('/:idOrSlug', getBrandDetail);

// Protected routes (Admin only)
router.post('/', verifyToken, authorizeRoles('admin'), requireFields('name', 'slug'), createBrand);
router.put('/:id', verifyToken, authorizeRoles('admin'), updateBrand);
router.delete('/:id', verifyToken, authorizeRoles('admin'), deleteBrand);

export default router;
