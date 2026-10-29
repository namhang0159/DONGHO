import express from 'express';
import {
  getCategories,
  getCategoryDetail,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller.js';
import { verifyToken, authorizeRoles } from '../middlewares/auth.middleware.js';
import { requireFields } from '../middlewares/validate.middleware.js';

const router = express.Router();

router.get('/', getCategories);
router.get('/:idOrSlug', getCategoryDetail);

// Protected routes (Admin only)
router.post('/', verifyToken, authorizeRoles('admin'), requireFields('name', 'slug'), createCategory);
router.put('/:id', verifyToken, authorizeRoles('admin'), updateCategory);
router.delete('/:id', verifyToken, authorizeRoles('admin'), deleteCategory);

export default router;
