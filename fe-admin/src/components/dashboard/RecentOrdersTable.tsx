'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faPrint,
  faCircleCheck,
  faClock,
  faTruckFast,
  faFilter,
  faChevronRight,
  faCreditCard,
  faMoneyBillWave,
  faBuildingColumns,
} from '@fortawesome/free-solid-svg-icons';
import { RecentOrder } from '@/types/admin';

interface RecentOrdersTableProps {
  orders: RecentOrder[];
}

export default function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredOrders = orders.filter((ord) => {
    if (filterStatus === 'ALL') return true;
    return ord.status === filterStatus;
  });

  const getStatusBadge = (status: RecentOrder['status']) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <FontAwesomeIcon icon={faCircleCheck} className="text-[9px]" />
            Hoàn Tất Giao Nhận
          </span>
        );
      case 'PAID':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30">
            <FontAwesomeIcon icon={faCircleCheck} className="text-[9px]" />
            Đã Thanh Toán 100%
          </span>
        );
      case 'SHIPPING':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-sky-500/10 text-sky-400 border border-sky-500/30">
            <FontAwesomeIcon icon={faTruckFast} className="text-[9px]" />
            Bảo Hiểm Đang Vận Chuyển
          </span>
        );
      case 'PENDING':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <FontAwesomeIcon icon={faClock} className="text-[9px]" />
            Chờ Khách Cọc VIP
          </span>
        );
    }
  };

  const getPaymentBadge = (method: RecentOrder['paymentMethod']) => {
    switch (method) {
      case 'CHUYEN_KHOAN':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] text-stone-300">
            <FontAwesomeIcon icon={faBuildingColumns} className="text-stone-400 text-[10px]" />
            Chuyển Khoản
          </span>
        );
      case 'TIEN_MAT':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] text-[#d4af37]">
            <FontAwesomeIcon icon={faMoneyBillWave} className="text-[#d4af37]/80 text-[10px]" />
            Tiền Mặt Két
          </span>
        );
      case 'VNPAY':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] text-sky-400">
            <FontAwesomeIcon icon={faCreditCard} className="text-sky-400 text-[10px]" />
            VNPAY QR
          </span>
        );
    }
  };

  return (
    <div className="luxury-card rounded-xl overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-5 lg:p-6 border-b border-white/[0.05] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase">
              Đơn Hàng Giao Dịch Gần Nhất
            </h3>
          </div>
          <p className="text-[11px] text-stone-300 mt-1 font-light">
            Nhật ký ghi nhận giao dịch tại boutique và hệ thống đặt cọc trực tuyến
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {[
            { id: 'ALL', label: 'Tất Cả' },
            { id: 'PAID', label: 'Đã Thu Đủ' },
            { id: 'SHIPPING', label: 'Vận Chuyển' },
            { id: 'PENDING', label: 'Chờ Cọc' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                filterStatus === tab.id
                  ? 'bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/35 font-medium'
                  : 'text-stone-300 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/[0.06] bg-[#070e0a]/60 text-[11px] uppercase tracking-wider text-stone-300 font-medium">
              <th className="py-3 px-6">Mã Đơn & Thời Gian</th>
              <th className="py-3 px-4">Khách Hàng</th>
              <th className="py-3 px-4">Mẫu Đồng Hồ & Serial</th>
              <th className="py-3 px-4">Thanh Toán</th>
              <th className="py-3 px-4">Tổng Giá Trị</th>
              <th className="py-3 px-4">Trạng Thái</th>
              <th className="py-3 px-6 text-right">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04] text-xs">
            {filteredOrders.map((ord) => (
              <tr
                key={ord.id}
                className="hover:bg-white/[0.02] transition-colors group"
              >
                {/* Order Code & Time */}
                <td className="py-4 px-6">
                  <div className="font-mono font-medium text-[#d4af37] group-hover:underline cursor-pointer">
                    {ord.orderCode}
                  </div>
                  <div className="text-[10px] text-stone-400 font-light mt-0.5">
                    {ord.createdAt}
                  </div>
                </td>

                {/* Customer */}
                <td className="py-4 px-4">
                  <div className="font-medium text-stone-100">{ord.customerName}</div>
                  <div className="text-[11px] text-stone-400 font-mono mt-0.5">
                    {ord.customerPhone}
                  </div>
                </td>

                {/* Watch Model & Serial */}
                <td className="py-4 px-4 max-w-[280px]">
                  <div className="font-medium text-stone-200 truncate" title={ord.watchModel}>
                    {ord.watchModel}
                  </div>
                  <div className="text-[10px] text-emerald-400/90 font-mono mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    {ord.serialNumber}
                  </div>
                </td>

                {/* Payment Method */}
                <td className="py-4 px-4">
                  {getPaymentBadge(ord.paymentMethod)}
                </td>

                {/* Total Value */}
                <td className="py-4 px-4">
                  <div className="font-serif font-semibold text-stone-100 text-sm">
                    {ord.totalAmount.toLocaleString('vi-VN')} ₫
                  </div>
                </td>

                {/* Status Badge */}
                <td className="py-4 px-4">
                  {getStatusBadge(ord.status)}
                </td>

                {/* Actions */}
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      title="Xem phiếu chi tiết"
                      className="p-1.5 rounded-md text-stone-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                    >
                      <FontAwesomeIcon icon={faEye} className="text-xs" />
                    </button>
                    <button
                      title="In hóa đơn VAT & Chứng nhận Thụy Sĩ"
                      className="p-1.5 rounded-md text-stone-400 hover:text-[#d4af37] hover:bg-white/[0.06] transition-colors"
                    >
                      <FontAwesomeIcon icon={faPrint} className="text-xs" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="p-4 border-t border-white/[0.05] bg-[#070e0a]/40 flex items-center justify-between text-xs text-stone-400">
        <span>Hiển thị {filteredOrders.length} trên tổng số {orders.length} giao dịch gần nhất</span>
        <button className="flex items-center gap-1.5 text-stone-300 hover:text-[#d4af37] font-medium transition-colors">
          <span>Xem tất cả sổ cái đơn hàng</span>
          <FontAwesomeIcon icon={faChevronRight} className="text-[10px]" />
        </button>
      </div>
    </div>
  );
}
