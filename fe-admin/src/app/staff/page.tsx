'use client';

import React from 'react';
import AdminShell from '@/components/layout/AdminShell';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserTie,
  faPlus,
  faCircleCheck,
  faShieldHalved,
  faEnvelope,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';

export default function StaffPage() {
  const staffMembers = [
    {
      id: 'ST-0001',
      name: 'Alex Trần',
      position: 'Tổng Quản Lý Boutique (Store Director)',
      role: 'ADMIN / MANAGER',
      email: 'alex.tran@chronoluxe.vn',
      phone: '0901 888 999',
      status: 'ACTIVE',
    },
    {
      id: 'ST-0042',
      name: 'Lê Hoàng Nam',
      position: 'Chuyên Viên Tư Vấn & Thu Ngân Trực Ca',
      role: 'STAFF',
      email: 'nam.le@chronoluxe.vn',
      phone: '0938 123 456',
      status: 'ACTIVE',
    },
    {
      id: 'ST-0019',
      name: 'Nguyễn Văn Minh',
      position: 'Kỹ Thuật Viên Trưởng (Master Watchmaker)',
      role: 'STAFF',
      email: 'minh.nguyen@chronoluxe.vn',
      phone: '0912 345 678',
      status: 'ACTIVE',
    },
  ];

  return (
    <AdminShell
      title="Nhân Sự & Phân Quyền Bảo Mật"
      subtitle="Quản lý hồ sơ nhân viên, mã nhân sự và quyền truy cập API kiểm toán"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-xs text-stone-300">
            Tổng cộng: <span className="text-[#d4af37] font-semibold">{staffMembers.length} nhân sự</span> chính thức
          </div>
          <button className="px-4 py-2 rounded-lg bg-[#00844e] hover:bg-[#009b5c] text-white text-xs font-medium flex items-center gap-2 shadow-md">
            <FontAwesomeIcon icon={faPlus} className="text-xs" />
            Thêm Nhân Sự Mới
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {staffMembers.map((staff) => (
            <div key={staff.id} className="luxury-card rounded-xl p-5 space-y-4">
              <div className="flex items-start justify-between pb-3 border-b border-white/[0.05]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#00844e] p-[1.5px]">
                    <div className="w-full h-full rounded-full bg-[#070e0a] flex items-center justify-center text-xs font-semibold text-[#d4af37]">
                      {staff.name.substring(0, 2).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{staff.name}</h4>
                    <span className="text-[10px] text-[#d4af37] font-mono">{staff.id}</span>
                  </div>
                </div>

                <span className="text-[9px] uppercase px-2 py-0.5 rounded font-mono font-medium bg-[#00844e]/15 text-emerald-400 border border-emerald-500/30">
                  {staff.role}
                </span>
              </div>

              <div className="space-y-2 text-xs text-stone-300">
                <div className="text-stone-200 font-medium">{staff.position}</div>
                <div className="flex items-center gap-2 text-[11px] text-stone-300">
                  <FontAwesomeIcon icon={faEnvelope} className="text-stone-400 text-[10px]" />
                  <span>{staff.email}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-stone-300">
                  <FontAwesomeIcon icon={faPhone} className="text-stone-400 text-[10px]" />
                  <span>{staff.phone}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between text-[11px]">
                <span className="text-emerald-400 flex items-center gap-1">
                  <FontAwesomeIcon icon={faCircleCheck} className="text-[10px]" />
                  Đang hoạt động
                </span>
                <button className="text-stone-300 hover:text-[#d4af37]">Phân quyền</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
