'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileCircleCheck,
  faCheck,
  faXmark,
  faClock,
  faUserTie,
  faCircleExclamation,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { PendingApproval } from '@/types/admin';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { hasPermission } from '@/utils/permissions';

interface PendingApprovalsCardProps {
  initialApprovals: PendingApproval[];
}

export default function PendingApprovalsCard({
  initialApprovals,
}: PendingApprovalsCardProps) {
  const { admin } = useAdminAuth();
  const canProcess = hasPermission(admin, 'APPROVALS_PROCESS');
  const [approvals, setApprovals] = useState(initialApprovals);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const handleAction = (id: string, action: 'APPROVED' | 'REJECTED') => {
    setApprovals(approvals.filter((a) => a.id !== id));
    setActionMessage(
      action === 'APPROVED'
        ? `Đã phê duyệt yêu cầu thành công`
        : `Đã từ chối yêu cầu`
    );
    setTimeout(() => setActionMessage(null), 3000);
  };

  return (
    <div className="luxury-card rounded-xl p-5 lg:p-6 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.05]">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faFileCircleCheck} className="text-[#d4af37] text-sm" />
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase">
              Phiếu Chờ Quản Lý Phê Duyệt
            </h3>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30">
            {approvals.length} phiếu
          </span>
        </div>

        {actionMessage && (
          <div className="mt-3 p-2 text-xs rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-center animate-fadeIn">
            {actionMessage}
          </div>
        )}

        {/* List of items */}
        <div className="mt-4 space-y-3">
          {approvals.length === 0 ? (
            <div className="py-8 text-center text-xs text-stone-400">
              <FontAwesomeIcon icon={faCheck} className="text-emerald-400 text-base mb-2 block" />
              Tất cả các phiếu phê duyệt và chiết khấu đã được xử lý xong!
            </div>
          ) : (
            approvals.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-lg bg-[#070e0a]/80 border border-white/[0.06] hover:border-[#d4af37]/30 transition-all space-y-2"
              >
                {/* Header of Item */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                    <span className="text-xs font-semibold text-stone-100">
                      {item.title}
                    </span>
                  </div>
                  {item.amount && (
                    <span className="text-xs font-mono font-medium text-[#d4af37] whitespace-nowrap">
                      {item.amount.toLocaleString('vi-VN')} ₫
                    </span>
                  )}
                </div>

                {/* Sub info */}
                <div className="text-[11px] text-stone-300 font-light leading-relaxed">
                  {item.reason}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/[0.04] text-[10px] text-stone-400">
                  <div className="flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faUserTie} className="text-stone-400 text-[10px]" />
                    <span>{item.requester}</span>
                    <span>•</span>
                    <span className="font-mono text-stone-400">{item.targetRef}</span>
                  </div>

                  {/* Approve / Reject buttons for Manager vs Status for Staff */}
                  {canProcess ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleAction(item.id, 'REJECTED')}
                        className="px-2 py-1 rounded text-stone-400 hover:text-red-400 hover:bg-red-500/10 border border-white/[0.06] transition-colors"
                        title="Từ chối"
                      >
                        <FontAwesomeIcon icon={faXmark} className="text-[10px] mr-1" />
                        Từ chối
                      </button>
                      <button
                        onClick={() => handleAction(item.id, 'APPROVED')}
                        className="px-2.5 py-1 rounded bg-[#00844e]/20 hover:bg-[#00844e]/40 text-emerald-300 border border-emerald-500/30 transition-colors font-medium"
                        title="Phê duyệt"
                      >
                        <FontAwesomeIcon icon={faCheck} className="text-[10px] mr-1" />
                        Duyệt
                      </button>
                    </div>
                  ) : (
                    <span className="text-[10px] font-mono text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      Chờ duyệt
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/[0.05] text-[11px] text-stone-400 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-amber-400/90">
          <FontAwesomeIcon icon={faCircleExclamation} className="text-[10px]" />
          {canProcess ? 'Quyền Manager: Duyệt trực tiếp' : 'Vị trí của bạn: Chỉ gửi đề xuất'}
        </span>
        <span className="font-mono text-[10px]">Audit Log #SEC-89</span>
      </div>
    </div>
  );
}
