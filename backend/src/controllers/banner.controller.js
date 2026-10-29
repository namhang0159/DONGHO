import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import bannerService from '../services/banner.service.js';

export const getBanners = asyncHandler(async (req, res) => {
  const { position = 'slider_home' } = req.query;
  const banners = await bannerService.getBanners(position);

  return successResponse(res, {
    message: 'Lấy danh sách banners thành công',
    data: banners,
  });
});

export const createBanner = asyncHandler(async (req, res) => {
  const banner = await bannerService.createBanner(req.body);
  return successResponse(res, {
    statusCode: 201,
    message: 'Tạo banner mới thành công',
    data: banner,
  });
});

export const updateBanner = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedBanner = await bannerService.updateBanner(id, req.body);

  if (!updatedBanner) {
    return errorResponse(res, {
      statusCode: 404,
      message: `Không tìm thấy banner ID '${id}'`,
    });
  }

  return successResponse(res, {
    message: 'Cập nhật banner thành công',
    data: updatedBanner,
  });
});

export const deleteBanner = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const success = await bannerService.deleteBanner(id);

  if (!success) {
    return errorResponse(res, {
      statusCode: 404,
      message: `Không tìm thấy banner ID '${id}'`,
    });
  }

  return successResponse(res, {
    message: 'Xóa banner thành công',
  });
});

export default {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
};
