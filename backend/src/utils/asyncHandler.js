/**
 * Wrapper bọc các Async Controller function để tự động chuyển error tới Error Middleware
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
