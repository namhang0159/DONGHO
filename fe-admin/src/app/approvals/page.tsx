'use client';

import React from 'react';
import AdminShell from '@/components/layout/AdminShell';
import PendingApprovalsCard from '@/components/dashboard/PendingApprovalsCard';
import { MOCK_PENDING_APPROVALS } from '@/data/mockAdminData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCircleCheck, faFileLines, faShieldHalved } from '@fortawesome/free-solid-svg-icons';

export default function ApprovalsPage() {
  const auditLogs = [
    {
      id: 'AUD-991',
      action: 'CLOSE_SHIFT',
      user: 'Lê Hoàng Nam (Thu ngân)',
      detail: 'Chốt ca SHIFT-2026-1027-02 khớp số dư 145.200.000 ₫',
      time: '21:30 - 27/10/2026',
    },
    {
      id: 'AUD-990',
      action: 'APPROVE_DISCOUNT',
      user: 'Alex Trần (Manager)',
      detail: 'Phê duyệt chiết khấu 2% mã đơn DH-2026-8802 cho khách VIP',
      time: '18:15 - 27/10/2026',
    },
    {
      id: 'AUD-989',
      action: 'UPDATE_INVENTORY',
      user: 'Kho Thủ Công',
      detail: 'Nhập kho 01 chiếc Rolex Daytona 126500LN (SN-RLX-9988210)',
      time: '11:00 - 27/10/2026',
    },
  ];

  return (
    <AdminShell
      title="Phiếu Phê Duyệt & Nhật Ký Kiểm Toán Audit Logs"
      subtitle="Quy trình kiểm soát rủi ro, phân quyền manager cấp cao và truy vết giao dịch"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <PendingApprovalsCard initialApprovals={MOCK_PENDING_APPROVALS} />
        </div>

        <div className="lg:col-span-2 luxury-card rounded-xl p-5 lg:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.05]">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faShieldHalved} className="text-[#d4af37]" />
              <h3 className="text-sm font-semibold text-white uppercase">
                Nhật Ký Kiểm Toán Hệ Thống (Audit Logs)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-emerald-400">Tự Động Ghi Nhận Real-time</span>
          </div>

          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-lg bg-[#070e0a]/80 border border-white/[0.05] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#d4af37] font-semibold">{log.id}</span>
                    <span className="text-stone-300 font-medium">[{log.action}]</span>
                    <span className="text-stone-400">• {log.user}</span>
                  </div>
                  <div className="text-stone-300 text-[11px] mt-1">{log.detail}</div>
                </div>

                <div className="text-right text-[10px] text-stone-400 font-mono shrink-0">
                  {log.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
