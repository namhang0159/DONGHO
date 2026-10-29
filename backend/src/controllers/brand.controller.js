import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import brandService from '../services/brand.service.js';

export const getBrands = asyncHandler(async (req, res) => {
  const brands = await brandService.getAllBrands();
  return successResponse(res, {
    message: 'Lấy danh sách thương hiệu thành công',
    data: brands,
  });
});

export const getBrandDetail = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const brand = await brandService.getBrandByIdOrSlug(idOrSlug);

  if (!brand) {
    return errorResponse(res, {
      statusCode: 404,
      message: `Không tìm thấy thương hiệu '${idOrSlug}'`,
    });
  }

  return successResponse(res, {
    message: 'Lấy thông tin thương hiệu thành công',
    data: brand,
  });
});

export const createBrand = asyncHandler(async (req, res) => {
  const brand = await brandService.createBrand(req.body);
  return successResponse(res, {
    statusCode: 201,
    message: 'Thêm mới thương hiệu thành công',
    data: brand,
  });
});

export const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedBrand = await brandService.updateBrand(id, req.body);

  if (!updatedBrand) {
    return errorResponse(res, {
      statusCode: 404,
      message: `Không tìm thấy thương hiệu ID '${id}' để cập nhật`,
    });
  }

  return successResponse(res, {
    message: 'Cập nhật thương hiệu thành công',
    data: updatedBrand,
  });
});

export const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const success = await brandService.deleteBrand(id);

  if (!success) {
    return errorResponse(res, {
      statusCode: 404,
      message: `Không tìm thấy thương hiệu ID '${id}' để xóa`,
    });
  }

  return successResponse(res, {
    message: 'Xóa thương hiệu thành công',
  });
});

export default {
  getBrands,
  getBrandDetail,
  createBrand,
  updateBrand,
  deleteBrand,
};
