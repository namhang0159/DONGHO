'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faCrown,
  faEllipsisVertical,
  faArrowTrendUp,
} from '@fortawesome/free-solid-svg-icons';

export default function SalesOverviewChart() {
  const [activeTab, setActiveTab] = useState<'7days' | '30days' | 'quarter'>('7days');

  // 7 days data (values in millions VND)
  const chartDays = [
    { day: 'T2', amount: 520, orders: 4, height: '45%' },
    { day: 'T3', amount: 680, orders: 7, height: '58%' },
    { day: 'T4', amount: 410, orders: 3, height: '35%' },
    { day: 'T5', amount: 950, orders: 9, height: '82%' },
    { day: 'T6', amount: 820, orders: 6, height: '70%' },
    { day: 'T7', amount: 1150, orders: 11, height: '98%', highlight: true },
    { day: 'CN (Hôm nay)', amount: 845, orders: 14, height: '74%' },
  ];

  const brandShares = [
    { brand: 'ROLEX', share: 52, revenue: '2.540.000.000 ₫', color: '#00844e' },
    { brand: 'PATEK PHILIPPE', share: 28, revenue: '1.369.000.000 ₫', color: '#d4af37' },
    { brand: 'AUDEMARS PIGUET', share: 14, revenue: '684.000.000 ₫', color: '#38bdf8' },
    { brand: 'OMEGA & CARTIER', share: 6, revenue: '293.000.000 ₫', color: '#a855f7' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chart Section - 2 Columns */}
      <div className="lg:col-span-2 luxury-card rounded-xl p-6 flex flex-col justify-between">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.05]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
              <h3 className="text-sm font-semibold text-white tracking-wide uppercase">
                Biểu Đồ Doanh Thu & Lưu Lượng Giao Dịch
              </h3>
            </div>
            <p className="text-[11px] text-stone-300 mt-1 font-light">
              Doanh thu bình quân giao dịch tuần này đạt{' '}
              <span className="text-[#d4af37] font-medium font-mono">592.000.000 ₫</span>
            </p>
          </div>

          {/* Timeframe Selectors */}
          <div className="flex items-center gap-1 p-1 bg-[#070e0a] rounded-lg border border-white/[0.06]">
            {(
              [
                { id: '7days', label: '7 Ngày' },
                { id: '30days', label: 'Tháng Này' },
                { id: 'quarter', label: 'Quý 4' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1 rounded text-xs transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30 font-medium'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="pt-8 pb-4">
          <div className="h-56 flex items-end justify-between gap-2 sm:gap-4 px-2">
            {chartDays.map((item, idx) => (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center gap-2 group cursor-pointer relative"
              >
                {/* Tooltip on hover */}
                <div className="absolute -top-12 z-20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-[#09110d] border border-[#d4af37]/40 px-2.5 py-1 rounded shadow-xl text-center whitespace-nowrap">
                  <span className="text-[10px] text-stone-300 block">{item.day}</span>
                  <span className="text-xs font-mono font-semibold text-[#d4af37]">
                    {item.amount}M ₫
                  </span>
                </div>

                {/* Bar */}
                <div className="w-full flex justify-center items-end h-44">
                  <div
                    style={{ height: item.height }}
                    className={`w-full max-w-[42px] rounded-t-md transition-all duration-300 group-hover:scale-y-105 ${
                      item.highlight
                        ? 'bg-gradient-to-t from-[#00844e] to-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                        : 'bg-gradient-to-t from-[#0d1e15] to-[#1a3828] group-hover:from-[#00844e]/50 group-hover:to-[#d4af37]/70'
                    }`}
                  />
                </div>

                {/* Day label */}
                <span
                  className={`text-[10px] font-medium transition-colors ${
                    item.highlight ? 'text-[#d4af37]' : 'text-stone-300 group-hover:text-white'
                  }`}
                >
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Summary note */}
        <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between text-xs text-stone-300">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faArrowTrendUp} className="text-emerald-400 text-xs" />
            <span>
              Tăng trưởng doanh thu tuần này:{' '}
              <span className="text-emerald-400 font-medium">+24.6%</span>
            </span>
          </div>
          <span className="text-[11px] text-stone-300">Cập nhật thời gian thực</span>
        </div>
      </div>

      {/* Brand Share Breakdown - 1 Column */}
      <div className="luxury-card rounded-xl p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.05]">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCrown} className="text-[#d4af37] text-xs" />
              <h3 className="text-sm font-semibold text-white tracking-wide uppercase">
                Tỷ Trọng Doanh Thu Hãng
              </h3>
            </div>
            <button className="text-stone-300 hover:text-white text-xs">
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
          </div>

          <div className="mt-5 space-y-4">
            {brandShares.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-stone-200 tracking-wider">
                    {item.brand}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-stone-300 font-mono text-[11px]">
                      {item.revenue}
                    </span>
                    <span className="font-semibold text-white font-mono">
                      {item.share}%
                    </span>
                  </div>
                </div>

                {/* Hairline Progress bar */}
                <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    style={{ width: `${item.share}%`, backgroundColor: item.color }}
                    className="h-full rounded-full transition-all duration-500 shadow-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 p-3 rounded-lg bg-[#070e0a]/80 border border-white/[0.05] text-[11px] text-stone-300">
          <div className="flex items-center justify-between text-stone-200 mb-1">
            <span className="font-medium">Chỉ số thanh khoản đồng hồ</span>
            <span className="text-[#d4af37] font-semibold font-mono">98.2 / 100</span>
          </div>
          <span>Dòng Rolex Professional & Patek Nautilus duy trì vòng quay vốn nhanh nhất hệ thống.</span>
        </div>
      </div>
    </div>
  );
}
