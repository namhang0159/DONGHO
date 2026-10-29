import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import watchService from '../services/watch.service.js';

export const getWatches = asyncHandler(async (req, res) => {
  const result = await watchService.getAllWatches(req.query);
  return successResponse(res, {
    message: 'Lấy danh sách đồng hồ thành công',
    data: result.watches,
    meta: result.pagination,
  });
});

export const getWatchById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const watch = await watchService.getWatchById(id);

  if (!watch) {
    return errorResponse(res, {
      statusCode: 404,
      message: `Không tìm thấy đồng hồ với ID '${id}'`,
    });
  }

  return successResponse(res, {
    message: 'Lấy chi tiết đồng hồ thành công',
    data: watch,
  });
});

export const createWatch = asyncHandler(async (req, res) => {
  const watch = await watchService.createWatch(req.body);
  return successResponse(res, {
    statusCode: 201,
    message: 'Thêm mới mẫu đồng hồ thành công',
    data: watch,
  });
});

export const updateWatch = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedWatch = await watchService.updateWatch(id, req.body);

  if (!updatedWatch) {
    return errorResponse(res, {
      statusCode: 404,
      message: `Không tìm thấy đồng hồ với ID '${id}' để cập nhật`,
    });
  }

  return successResponse(res, {
    message: 'Cập nhật thông tin đồng hồ thành công',
    data: updatedWatch,
  });
});

export const deleteWatch = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const success = await watchService.deleteWatch(id);

  if (!success) {
    return errorResponse(res, {
      statusCode: 404,
      message: `Không tìm thấy đồng hồ với ID '${id}' để xóa`,
    });
  }

  return successResponse(res, {
    message: 'Xóa đồng hồ thành công',
  });
});

export default {
  getWatches,
  getWatchById,
  createWatch,
  updateWatch,
  deleteWatch,
};
