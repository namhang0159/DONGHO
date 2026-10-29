import { errorResponse } from '../utils/apiResponse.js';

/**
 * Middleware kiểm tra các trường bắt buộc trong req.body
 */
export const requireFields = (...fields) => {
  return (req, res, next) => {
    const missing = [];
    for (const field of fields) {
      if (req.body[field] === undefined || req.body[field] === null || req.body[field] === '') {
        missing.push(field);
      }
    }

    if (missing.length > 0) {
      return errorResponse(res, {
        statusCode: 400,
        message: `Thiếu các trường bắt buộc: ${missing.join(', ')}`,
        errors: missing.map((f) => ({ field: f, message: `Trường '${f}' là bắt buộc.` })),
      });
    }

    next();
  };
};

export default {
  requireFields,
};
