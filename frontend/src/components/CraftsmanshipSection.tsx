"use client";

import React, { useState } from "react";
import Image from "next/image";
import { watchAudio } from "@/utils/audio";
import RolexCrown from "./RolexCrown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAward,
  faShieldHalved,
  faCircleCheck,
  faCompactDisc,
  faGem,
} from "@fortawesome/free-solid-svg-icons";

interface Hotspot {
  id: number;
  title: string;
  subtitle: string;
  x: number;
  y: number;
  desc: string;
  metric: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 1,
    title: "Dây Tóc Parachrom Xanh Độc Quyền",
    subtitle: "Kháng Từ Tính & Chống Sốc Gấp 10 Lần",
    x: 48,
    y: 54,
    desc: "Được làm từ hợp kim niobi và zirconi siêu tinh khiết. Dây tóc Parachrom xanh hoàn toàn miễn nhiễm với từ trường và duy trì độ ổn định gấp 10 lần trước những va chạm thường nhật.",
    metric: "Độ chuẩn: ±2 giây / ngày (Superlative Chronometer)",
  },
  {
    id: 2,
    title: "Bộ Thoát Chronergy Tối Ưu Năng Lượng",
    subtitle: "Hiệu Suất Cơ Học Đột Phá",
    x: 62,
    y: 46,
    desc: "Sáng chế độc quyền của Rolex kết hợp bánh thoát dạng khung xương từ hợp kim niken-phốt pho, giảm thiểu năng lượng hao phí và nâng thời gian trữ cót lên 70 giờ.",
    metric: "Dự trữ năng lượng: 70 Giờ",
  },
  {
    id: 3,
    title: "Rotor Bán Nguyệt Perpetual Hai Chiều",
    subtitle: "Cơ Chế Lên Dây Tự Động Vĩnh Cửu",
    x: 35,
    y: 65,
    desc: "Phát minh năm 1931 của Rolex đã định hình toàn bộ ngành chế tác đồng hồ thế giới. Bánh đà chuyển động tự do theo cả hai chiều theo từng cử động nhỏ nhất của cổ tay.",
    metric: "Cơ chế: Lên dây 2 chiều Perpetual",
  },
  {
    id: 4,
    title: "31 Chân Kính Hồng Ngọc Thiên Nhiên",
    subtitle: "Độ Bền Vượt Qua Nhiều Thế Hệ",
    x: 55,
    y: 32,
    desc: "Từng trục bánh răng quay trên các viên đá hồng ngọc tự nhiên được mài nhẵn quang học, giảm thiểu tối đa ma sát và sự mài mòn cơ khí trong suốt hàng thập kỷ.",
    metric: "Độ cứng: 9 Mohs (Chỉ sau kim cương)",
  },
];

export default function CraftsmanshipSection() {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot>(HOTSPOTS[0]);

  const selectHotspot = (h: Hotspot) => {
    watchAudio.tick();
    setActiveHotspot(h);
  };

  return (
    <section id="craftsmanship" className="py-28 bg-[#f5f1e8] dark:bg-[#070e0a] relative overflow-hidden transition-colors duration-400">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-1.5 text-[#9a741e] dark:text-[#d4af37] mb-2">
            <RolexCrown className="w-6 h-5 text-[#9a741e] dark:text-[#d4af37]" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#006039] dark:text-[#a7f3d0] font-semibold">
            KỸ NGHỆ CHẾ TÁC ROLEX & THỤY SĨ
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground dark:text-white mt-1.5 leading-tight">
            Nghệ Thuật Của Sự <span className="italic text-[#9a741e] dark:text-[#f3e3be]">Chính Xác Tuyệt Đối</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-muted-foreground dark:text-white/60 leading-relaxed font-sans font-light">
            Mỗi cỗ máy cơ học đều được tạo nên từ xưởng luyện kim độc lập và trải qua quy trình kiểm định nghiêm ngặt vượt xa mọi tiêu chuẩn thông thường của ngành đồng hồ Thụy Sĩ.
          </p>
        </div>

        {/* Master Artisan Editorial Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-[#d4af37]/25 shadow-2xl mb-16">
          <div className="relative h-80 sm:h-96 md:h-[500px] w-full">
            <Image
              src="/images/craftsman-swiss.jpg"
              alt="Nghệ nhân Thụy Sĩ lắp ráp đồng hồ"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </div>

          <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-auto md:max-w-xl backdrop-blur-2xl bg-black/75 p-8 rounded-3xl border border-[#d4af37]/30 text-white shadow-2xl">
            <div className="text-[10px] font-mono text-[#d4af37] uppercase tracking-[0.25em] font-semibold flex items-center gap-2 mb-2">
              <FontAwesomeIcon icon={faAward} className="w-3.5 h-3.5 text-[#d4af37]" />
              CHỨNG NHẬN SUPERLATIVE CHRONOMETER
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-white leading-snug">
              Bảo Chứng Độ Chuẩn Xác ±2 Giây Mỗi Ngày
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed font-sans font-light">
              &quot;Tại các xưởng chế tác Geneva, sự chuẩn xác không đơn thuần là một phép đo kỹ thuật, mà là lời cam kết danh dự trường tồn cùng chủ nhân qua mọi thử thách của thời gian.&quot;
            </p>
            <div className="mt-5 flex items-center gap-6 text-xs text-white/90">
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCircleCheck} className="w-3.5 h-3.5 text-[#00844e]" />
                Lắp ráp thủ công 100% tại Geneva
              </span>
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faShieldHalved} className="w-3.5 h-3.5 text-[#d4af37]" />
                Bảo hành toàn cầu 5 năm
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Calibre 3235 Hotspot Anatomy */}
        <div className="luxury-card rounded-3xl p-6 sm:p-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-black/[0.06] dark:border-white/[0.06] gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#006039] dark:text-[#a7f3d0] font-semibold">
                GIẢI PHẪU VI CƠ HỌC
              </span>
              <h3 className="font-serif text-2xl font-normal text-foreground dark:text-white mt-1">
                Trái Tim Cỗ Máy In-House Calibre 3235
              </h3>
            </div>
            <div className="text-xs font-mono text-muted-foreground dark:text-white/50 flex items-center gap-2">
              <FontAwesomeIcon icon={faCompactDisc} className="w-3.5 h-3.5 text-[#9a741e] dark:text-[#d4af37] animate-spin" />
              Chạm vào từng vị trí để xem chi tiết
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-8">
            {/* Visual Movement with Hotspot Buttons */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] group">
              <Image
                src="/images/tourbillon-emerald.jpg"
                alt="Bộ máy Calibre 3235"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" />

              {/* Hotspot Markers */}
              {HOTSPOTS.map((h) => {
                const isActive = activeHotspot.id === h.id;
                return (
                  <button
                    key={h.id}
                    onClick={() => selectHotspot(h)}
                    style={{ left: `${h.x}%`, top: `${h.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-transform ${
                      isActive ? "scale-125" : "hover:scale-110"
                    }`}
                  >
                    <span className="relative flex h-6 w-6">
                      <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          isActive ? "bg-[#d4af37]" : "bg-[#00844e]"
                        }`}
                      />
                      <span
                        className={`relative inline-flex rounded-full h-6 w-6 items-center justify-center text-[10px] font-bold text-white shadow-lg ${
                          isActive ? "bg-[#d4af37] text-black" : "bg-[#006039]"
                        }`}
                      >
                        {h.id}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Hotspot Detailed Insight */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#9a741e] dark:text-[#d4af37] font-semibold">
                  CHI TIẾT VỊ TRÍ #{activeHotspot.id}
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-normal text-foreground dark:text-white mt-1">
                  {activeHotspot.title}
                </h4>
                <div className="text-xs font-mono text-[#006039] dark:text-[#a7f3d0] mt-1 font-semibold">
                  {activeHotspot.subtitle}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground dark:text-white/60 mt-3 leading-relaxed font-sans font-light">
                  {activeHotspot.desc}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06]">
                <div className="text-[10px] font-mono text-muted-foreground dark:text-white/40 uppercase">
                  Thông Số Kỹ Thuật
                </div>
                <div className="text-xs font-mono font-semibold text-foreground dark:text-white mt-0.5">
                  {activeHotspot.metric}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
