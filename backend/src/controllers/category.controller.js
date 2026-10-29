import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import categoryService from '../services/category.service.js';

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.getAllCategories();
  return successResponse(res, {
    message: 'Lấy cây danh mục sản phẩm thành công',
    data: categories,
  });
});

export const getCategoryDetail = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const category = await categoryService.getCategoryByIdOrSlug(idOrSlug);

  if (!category) {
    return errorResponse(res, {
      statusCode: 404,
      message: `Không tìm thấy danh mục '${idOrSlug}'`,
    });
  }

  return successResponse(res, {
    message: 'Lấy chi tiết danh mục thành công',
    data: category,
  });
});

export const createCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  return successResponse(res, {
    statusCode: 201,
    message: 'Thêm mới danh mục thành công',
    data: category,
  });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedCategory = await categoryService.updateCategory(id, req.body);

  if (!updatedCategory) {
    return errorResponse(res, {
      statusCode: 404,
      message: `Không tìm thấy danh mục ID '${id}' để cập nhật`,
    });
  }

  return successResponse(res, {
    message: 'Cập nhật danh mục thành công',
    data: updatedCategory,
  });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const success = await categoryService.deleteCategory(id);

  if (!success) {
    return errorResponse(res, {
      statusCode: 404,
      message: `Không tìm thấy danh mục ID '${id}' để xóa`,
    });
  }

  return successResponse(res, {
    message: 'Xóa danh mục thành công',
  });
});

export default {
  getCategories,
  getCategoryDetail,
  createCategory,
  updateCategory,
  deleteCategory,
};
