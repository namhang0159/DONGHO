import React from 'react';
import AdminShell from '@/components/layout/AdminShell';
import StatCards from '@/components/dashboard/StatCards';
import SalesOverviewChart from '@/components/dashboard/SalesOverviewChart';
import RecentOrdersTable from '@/components/dashboard/RecentOrdersTable';
import PendingApprovalsCard from '@/components/dashboard/PendingApprovalsCard';
import LiveShiftCard from '@/components/dashboard/LiveShiftCard';
import TopWatchesList from '@/components/dashboard/TopWatchesList';
import {
  MOCK_KPIS,
  MOCK_RECENT_ORDERS,
  MOCK_PENDING_APPROVALS,
  MOCK_ACTIVE_SHIFT,
  MOCK_TOP_WATCHES,
} from '@/data/mockAdminData';

export default function AdminDashboardPage() {
  return (
    <AdminShell
      title="Bảng Điều Khiển Tổng Quan"
      subtitle="Vận hành chuỗi kinh doanh đồng hồ Thụy Sĩ & quản trị kho quỹ"
    >
      <div className="space-y-8">
        {/* Row 1: KPI Stats */}
        <section aria-label="Chỉ số hoạt động chính">
          <StatCards stats={MOCK_KPIS} />
        </section>

        {/* Row 2: Sales Chart & Brand Distribution */}
        <section aria-label="Biểu đồ doanh thu và thị phần thương hiệu">
          <SalesOverviewChart />
        </section>

        {/* Row 3: Main Split Section */}
        <section
          aria-label="Đơn hàng gần đây và bảng tác vụ ca trực"
          className="grid grid-cols-1 xl:grid-cols-3 gap-6"
        >
          {/* Left Column: Recent Orders (2 cols) */}
          <div className="xl:col-span-2 space-y-6">
            <RecentOrdersTable orders={MOCK_RECENT_ORDERS} />
            <TopWatchesList watches={MOCK_TOP_WATCHES} />
          </div>

          {/* Right Column: Approvals & Live Cashier Shift (1 col) */}
          <div className="space-y-6">
            <LiveShiftCard shift={MOCK_ACTIVE_SHIFT} />
            <PendingApprovalsCard initialApprovals={MOCK_PENDING_APPROVALS} />
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
