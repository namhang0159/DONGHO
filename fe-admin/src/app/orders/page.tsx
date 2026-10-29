'use client';

import React from 'react';
import AdminShell from '@/components/layout/AdminShell';
import RecentOrdersTable from '@/components/dashboard/RecentOrdersTable';
import { MOCK_RECENT_ORDERS } from '@/data/mockAdminData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faReceipt,
  faPlus,
  faDownload,
  faFileExcel,
} from '@fortawesome/free-solid-svg-icons';

export default function OrdersPage() {
  return (
    <AdminShell
      title="Sổ Cái Quản Lý Đơn Hàng & Tiền Cọc VIP"
      subtitle="Theo dõi toàn bộ đơn hàng bán lẻ boutique, đặt cọc Rolex chờ nhập khẩu & thanh toán trực tuyến"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faReceipt} className="text-[#d4af37]" />
            <span className="text-xs text-stone-300">
              Tổng giá trị giao dịch hôm nay:{' '}
              <span className="text-[#d4af37] font-semibold font-mono">
                4.890.000.000 ₫
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] text-xs text-stone-300 border border-white/[0.08] flex items-center justify-center gap-1.5">
              <FontAwesomeIcon icon={faDownload} className="text-xs" />
              Xuất Báo Cáo
            </button>
            <button className="flex-1 sm:flex-none px-4 py-1.5 rounded-lg bg-[#00844e] hover:bg-[#009b5c] text-white text-xs font-medium flex items-center justify-center gap-2 shadow-md">
              <FontAwesomeIcon icon={faPlus} className="text-xs" />
              Lập Phiếu Đặt Cọc Mới
            </button>
          </div>
        </div>

        <RecentOrdersTable orders={MOCK_RECENT_ORDERS} />
      </div>
    </AdminShell>
  );
}
