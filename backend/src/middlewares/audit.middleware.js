import { AuditLog } from '../models/index.js';

/**
 * Helper ghi nhật ký kiểm toán vào bảng audit_logs
 */
export const recordAuditLog = async ({
  actorType = 'system',
  actorId = null,
  action,
  tableName,
  recordId = null,
  oldValues = null,
  newValues = null,
  ipAddress = null,
  note = null,
}) => {
  try {
    await AuditLog.create({
      actorType,
      idDoiTuongThucHien: actorId,
      action,
      bangBiThaoTac: tableName,
      idDongDuLieuBiThayDoi: recordId,
      oldValues,
      newValues,
      ipAddress,
      note,
    });
  } catch (error) {
    console.warn(`[AuditLog Warning] Không thể ghi audit log: ${error.message}`);
  }
};

/**
 * Middleware tạo helper log nhanh trong request
 */
export const attachAuditHelper = (req, res, next) => {
  req.audit = (action, tableName, recordId, options = {}) => {
    const actorType = req.userType === 'admin' ? 'admin' : (req.user ? 'user' : 'system');
    const actorId = req.user?.id || null;
    const ipAddress = req.ip || req.connection?.remoteAddress || null;

    return recordAuditLog({
      actorType,
      actorId,
      action,
      tableName,
      recordId,
      ipAddress,
      ...options,
    });
  };
  next();
};

export default {
  recordAuditLog,
  attachAuditHelper,
};
