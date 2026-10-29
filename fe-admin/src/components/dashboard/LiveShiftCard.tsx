'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCashRegister,
  faMoneyBills,
  faCircleCheck,
  faArrowRightFromBracket,
  faCalculator,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { CashierShiftSummary } from '@/types/admin';

interface LiveShiftCardProps {
  shift: CashierShiftSummary;
}

export default function LiveShiftCard({ shift }: LiveShiftCardProps) {
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [reconciledCash, setReconciledCash] = useState<string>('');
  const [isClosed, setIsClosed] = useState(false);

  const handleCloseShift = (e: React.FormEvent) => {
    e.preventDefault();
    setIsClosed(true);
    setShowCloseModal(false);
  };

  return (
    <div className="luxury-card rounded-xl p-5 lg:p-6 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.05]">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCashRegister} className="text-emerald-400 text-sm" />
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase">
              Ca Trực Két Thu Ngân Hiện Tại
            </h3>
          </div>
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            {isClosed ? 'Đã Chốt Ca' : 'Đang Hoạt Động'}
          </span>
        </div>

        {/* Shift Details */}
        <div className="mt-4 space-y-3.5">
          <div className="p-3 rounded-lg bg-[#070e0a]/80 border border-white/[0.05]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-300">Mã ca trực</span>
              <span className="font-mono font-medium text-stone-200">{shift.shiftId}</span>
            </div>
            <div className="flex items-center justify-between text-xs mt-1.5">
              <span className="text-stone-300">Thu ngân phụ trách</span>
              <span className="font-medium text-stone-200">
                {shift.cashierName}{' '}
                <span className="text-[10px] text-stone-400 font-mono">({shift.staffCode})</span>
              </span>
            </div>
            <div className="flex items-center justify-between text-xs mt-1.5">
              <span className="text-stone-300">Giờ mở ca</span>
              <span className="text-stone-300 font-mono text-[11px]">{shift.openedAt}</span>
            </div>
          </div>

          {/* Cash breakdown grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-lg bg-[#070e0a]/60 border border-white/[0.04]">
              <span className="text-[10px] uppercase text-stone-300 block tracking-wider">
                Tiền Nhận Bàn Giao
              </span>
              <span className="text-xs font-mono font-semibold text-stone-300 mt-1 block">
                {shift.initialCash.toLocaleString('vi-VN')} ₫
              </span>
            </div>
            <div className="p-3 rounded-lg bg-[#070e0a]/60 border border-emerald-500/20">
              <span className="text-[10px] uppercase text-emerald-400 block tracking-wider">
                Tiền Mặt Hiện Có
              </span>
              <span className="text-sm font-mono font-bold text-[#d4af37] mt-1 block">
                {shift.currentCash.toLocaleString('vi-VN')} ₫
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs px-1 text-stone-300">
            <span>Số đơn hoàn tất trong ca:</span>
            <span className="font-mono font-medium text-stone-200">{shift.ordersCount} đơn</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 pt-3 border-t border-white/[0.05] flex items-center gap-2">
        <button
          onClick={() => setShowCloseModal(true)}
          disabled={isClosed}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs text-stone-200 border border-white/[0.08] transition-all disabled:opacity-50"
        >
          <FontAwesomeIcon icon={faCalculator} className="text-stone-400 text-xs" />
          <span>Kiểm Kê Két</span>
        </button>

        <button
          onClick={() => setShowCloseModal(true)}
          disabled={isClosed}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#d4af37]/15 hover:bg-[#d4af37]/25 text-xs text-[#d4af37] border border-[#d4af37]/30 transition-all font-medium disabled:opacity-50"
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} className="text-xs" />
          <span>{isClosed ? 'Đã Bàn Giao' : 'Chốt Ca Trực'}</span>
        </button>
      </div>

      {/* Modal Chốt Ca */}
      {showCloseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md luxury-card rounded-xl p-6 border border-[#d4af37]/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faLock} className="text-[#d4af37] text-sm" />
                <h4 className="text-sm font-semibold text-white uppercase">
                  Biên Bản Chốt & Bàn Giao Ca Két
                </h4>
              </div>
              <button
                onClick={() => setShowCloseModal(false)}
                className="text-stone-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCloseShift} className="space-y-4">
              <div className="text-xs text-stone-300 leading-relaxed">
                Hệ thống ghi nhận tổng tiền mặt lý thuyết trong ca là:{' '}
                <span className="font-mono text-[#d4af37] font-semibold">
                  {shift.currentCash.toLocaleString('vi-VN')} ₫
                </span>
                . Vui lòng nhập số tiền thực tế đếm được trong két:
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-stone-300 block mb-1">
                  Số tiền thực tế kiểm đếm (VND)
                </label>
                <input
                  type="number"
                  required
                  placeholder="Ví dụ: 162400000"
                  value={reconciledCash}
                  onChange={(e) => setReconciledCash(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#070e0a] border border-white/[0.1] text-white text-sm font-mono focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCloseModal(false)}
                  className="px-4 py-2 rounded-lg text-xs text-stone-300 hover:bg-white/[0.05]"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs bg-[#00844e] hover:bg-[#009b5c] text-white font-medium shadow-lg"
                >
                  Xác Nhận Chốt Ca & Ký Số
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
