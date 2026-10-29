import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import userAddressService from '../services/userAddress.service.js';

export const getAddresses = asyncHandler(async (req, res) => {
  const addresses = await userAddressService.getAddressesByUser(req.user.id);
  return successResponse(res, {
    message: 'Lấy danh sách địa chỉ thành công',
    data: addresses,
  });
});

export const createAddress = asyncHandler(async (req, res) => {
  const address = await userAddressService.createAddress(req.user.id, req.body);
  return successResponse(res, {
    statusCode: 201,
    message: 'Thêm địa chỉ giao hàng thành công',
    data: address,
  });
});

export const updateAddress = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const address = await userAddressService.updateAddress(id, req.user.id, req.body);

  if (!address) {
    return errorResponse(res, {
      statusCode: 404,
      message: 'Không tìm thấy địa chỉ hoặc bạn không có quyền sửa',
    });
  }

  return successResponse(res, {
    message: 'Cập nhật địa chỉ thành công',
    data: address,
  });
});

export const deleteAddress = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const success = await userAddressService.deleteAddress(id, req.user.id);

  if (!success) {
    return errorResponse(res, {
      statusCode: 404,
      message: 'Không tìm thấy địa chỉ để xóa',
    });
  }

  return successResponse(res, {
    message: 'Xóa địa chỉ thành công',
  });
});

export default {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
};
