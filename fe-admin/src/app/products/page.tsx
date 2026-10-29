'use client';

import React from 'react';
import AdminShell from '@/components/layout/AdminShell';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faPlus,
  faMagnifyingGlass,
  faFilter,
  faBoxesStacked,
  faShieldHalved,
  faPenToSquare,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { MOCK_TOP_WATCHES } from '@/data/mockAdminData';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { hasPermission } from '@/utils/permissions';

export default function ProductsPage() {
  const { admin } = useAdminAuth();
  const canManageProducts = hasPermission(admin, 'PRODUCTS_MANAGE');
  return (
    <AdminShell
      title="Kho Đồng Hồ & Mẫu Mã Haute Horlogerie"
      subtitle="Quản lý danh mục sản phẩm, biến thể, số serial và chứng nhận bảo hiểm"
    >
      <div className="space-y-6">
        {/* Top Control Bar */}
        <div className="luxury-card rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-72">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-300 text-xs"
              />
              <input
                type="text"
                placeholder="Tìm theo tên mẫu, mã ref, serial..."
                className="w-full pl-9 pr-3 py-1.5 bg-[#070e0a] rounded-lg border border-white/[0.08] text-xs text-stone-200 placeholder-stone-400 focus:outline-none focus:border-[#d4af37]"
              />
            </div>
            <button className="px-3 py-1.5 rounded-lg bg-white/[0.05] text-stone-300 hover:text-white border border-white/[0.06] text-xs flex items-center gap-1.5">
              <FontAwesomeIcon icon={faFilter} className="text-[10px]" />
              Lọc Hãng
            </button>
          </div>

          {canManageProducts && (
            <button className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#00844e] hover:bg-[#009b5c] text-white text-xs font-medium flex items-center justify-center gap-2 shadow-md">
              <FontAwesomeIcon icon={faPlus} className="text-xs" />
              Nhập Mẫu Đồng Hồ Mới
            </button>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {MOCK_TOP_WATCHES.map((watch) => (
            <div key={watch.id} className="luxury-card rounded-xl p-5 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.05]">
                  <span className="text-[10px] tracking-wider uppercase font-semibold text-[#d4af37] font-mono">
                    REF: {watch.referenceNo}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                    Còn {watch.stock} chiếc
                  </span>
                </div>

                <div className="my-4 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-[#070e0a] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0">
                    <FontAwesomeIcon icon={faClock} className="text-2xl" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-[#d4af37] transition-colors">
                      {watch.name}
                    </h4>
                    <p className="text-xs text-stone-300 mt-1">{watch.brand} • Thụy Sĩ</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between">
                  <span className="text-xs text-stone-300">Giá niêm yết:</span>
                  <span className="text-base font-serif font-bold text-stone-100">
                    {watch.price.toLocaleString('vi-VN')} ₫
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between text-xs">
                <span className="text-stone-300 text-[11px]">Đã bán: {watch.soldCount} chiếc</span>
                {canManageProducts ? (
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded text-stone-400 hover:text-white hover:bg-white/[0.06]">
                      <FontAwesomeIcon icon={faPenToSquare} className="text-xs" />
                    </button>
                    <button className="p-1.5 rounded text-stone-400 hover:text-red-400 hover:bg-red-500/10">
                      <FontAwesomeIcon icon={faTrashCan} className="text-xs" />
                    </button>
                  </div>
                ) : (
                  <span className="text-[10px] text-stone-500 font-mono">Chỉ xem thông số</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
