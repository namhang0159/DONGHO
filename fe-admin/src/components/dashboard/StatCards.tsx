'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faReceipt,
  faClock,
  faCashRegister,
  faShieldHalved,
  faArrowTrendUp,
  faArrowTrendDown,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { KPIStat } from '@/types/admin';

interface StatCardsProps {
  stats: KPIStat[];
}

export default function StatCards({ stats }: StatCardsProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'receipt':
        return faReceipt;
      case 'clock':
        return faClock;
      case 'cash-register':
        return faCashRegister;
      case 'shield':
      default:
        return faShieldHalved;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat) => {
        const icon = getIcon(stat.iconName);

        return (
          <div
            key={stat.id}
            className="luxury-card rounded-xl p-5 flex flex-col justify-between"
          >
            {/* Top row: Title and Icon */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-normal text-stone-300 tracking-wider">
                {stat.title}
              </span>
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-white/[0.06] to-transparent border border-[#d4af37]/20 flex items-center justify-center text-[#d4af37]">
                <FontAwesomeIcon icon={icon} className="text-sm" />
              </div>
            </div>

            {/* Middle: Value & Gold Glow */}
            <div className="mt-3">
              <div className="text-xl lg:text-2xl font-serif font-semibold tracking-tight text-white">
                {stat.value}
              </div>
              {stat.subValue && (
                <div className="text-[11px] text-stone-300 font-light mt-0.5">
                  {stat.subValue}
                </div>
              )}
            </div>

            {/* Bottom: Trend and Timeframe */}
            <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between text-[11px]">
              <div
                className={`flex items-center gap-1.5 font-medium ${
                  stat.isPositive
                    ? 'text-emerald-400'
                    : 'text-amber-400'
                }`}
              >
                <FontAwesomeIcon
                  icon={
                    stat.isPositive
                      ? faArrowTrendUp
                      : stat.change.includes('%')
                      ? faArrowTrendDown
                      : faCircleExclamation
                  }
                  className="text-[10px]"
                />
                <span>{stat.change}</span>
              </div>
              <span className="text-stone-300 font-light truncate max-w-[140px]">
                {stat.timeframe}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
