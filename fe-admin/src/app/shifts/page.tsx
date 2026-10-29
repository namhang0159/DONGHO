'use client';

import React from 'react';
import AdminShell from '@/components/layout/AdminShell';
import LiveShiftCard from '@/components/dashboard/LiveShiftCard';
import { MOCK_ACTIVE_SHIFT } from '@/data/mockAdminData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faHistory, faVault } from '@fortawesome/free-solid-svg-icons';

export default function ShiftsPage() {
  const pastShifts = [
    {
      id: 'SHIFT-2026-1028-01',
      cashier: 'Nguyễn Văn Phúc',
      time: '08:00 - 13:00 (28/10/2026)',
      initialCash: '50.000.000 ₫',
      finalCash: '82.500.000 ₫',
      status: 'Đã chốt khớp 100%',
    },
    {
      id: 'SHIFT-2026-1027-02',
      cashier: 'Lê Hoàng Nam',
      time: '13:00 - 21:30 (27/10/2026)',
      initialCash: '50.000.000 ₫',
      finalCash: '145.200.000 ₫',
      status: 'Đã chốt khớp 100%',
    },
  ];

  return (
    <AdminShell
      title="Quản Lý Ca Thu Ngân & Két Sắt Boutique"
      subtitle="Quản trị giao ca, kiểm kê tiền mặt thực tế, đối soát thẻ và lịch sử chốt két"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <LiveShiftCard shift={MOCK_ACTIVE_SHIFT} />
        </div>

        <div className="lg:col-span-2 luxury-card rounded-xl p-5 lg:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.05]">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faHistory} className="text-[#d4af37]" />
              <h3 className="text-sm font-semibold text-white uppercase">
                Nhật Ký Các Ca Trực Đã Chốt Gần Đây
              </h3>
            </div>
            <span className="text-xs text-stone-300 font-mono">2 ca gần nhất</span>
          </div>

          <div className="space-y-3">
            {pastShifts.map((s) => (
              <div
                key={s.id}
                className="p-3.5 rounded-lg bg-[#070e0a]/80 border border-white/[0.05] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-mono font-medium text-[#d4af37]">{s.id}</div>
                  <div className="text-stone-300 text-[11px] mt-0.5">
                    {s.cashier} • {s.time}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-semibold text-white">{s.finalCash}</div>
                  <span className="inline-block mt-1 text-[10px] text-emerald-400 font-medium px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                    {s.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
