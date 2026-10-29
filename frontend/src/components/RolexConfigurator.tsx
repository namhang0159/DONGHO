"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { watchAudio } from "@/utils/audio";
import RolexCrown from "./RolexCrown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGem,
  faCheck,
  faBagShopping,
  faCalendarCheck,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";

export default function RolexConfigurator() {
  const { formatPrice, addToCart, setIsVipModalOpen, showToast } = useCart();

  const [dial, setDial] = useState("olive");
  const [bezel, setBezel] = useState("fluted");
  const [bracelet, setBracelet] = useState("jubilee");

  const dials = [
    {
      id: "olive",
      name: "Xanh Ô-liu Sunburst La Mã",
      desc: "Mặt số xanh ô-liu chải tia mặt trời với cọc số La Mã vàng 18 ct",
      color: "#3a533d",
      priceExtra: 0,
    },
    {
      id: "emerald",
      name: "Xanh Lục Bảo Tia Ngọc",
      desc: "Mặt số xanh ngọc lục bảo sâu thẳm nạm cọc giờ kim cương",
      color: "#006039",
      priceExtra: 15000000,
    },
    {
      id: "champagne",
      name: "Vàng Champagne Cổ Điển",
      desc: "Màu vàng hoàng gia lấp lánh phản chiếu ánh sáng ấm áp",
      color: "#d4af37",
      priceExtra: 8000000,
    },
    {
      id: "silver",
      name: "Bạc Rhodium Nguyên Khối",
      desc: "Mặt số xám bạc thanh lịch tối giản vượt thời gian",
      color: "#8a9a95",
      priceExtra: 0,
    },
  ];

  const bezels = [
    {
      id: "fluted",
      name: "Vành Khía Rãnh Fluted Vàng 18K",
      desc: "Chi tiết nhận diện mang tính biểu tượng nhất của Datejust",
      priceExtra: 0,
    },
    {
      id: "smooth",
      name: "Vành Trơn Đánh Bóng Gương Smooth",
      desc: "Thiết kế hiện đại thanh lịch hoàn thiện thủ công",
      priceExtra: -12000000,
    },
    {
      id: "diamond",
      name: "Vành Nạm Kim Cương Brilliant-Cut",
      desc: "Nạm 52 viên kim cương thiên nhiên tuyển chọn gắt gao",
      priceExtra: 65000000,
    },
  ];

  const bracelets = [
    {
      id: "jubilee",
      name: "Dây Đeo Jubilee 5 Mắt Nối Rolesor",
      desc: "Dây đeo kim loại linh hoạt 5 mối nối hoàn thiện bóng và xước",
      priceExtra: 0,
    },
    {
      id: "oyster",
      name: "Dây Đeo Oyster 3 Mắt Nối Thể Thao",
      desc: "Dây đeo mạnh mẽ đúc khối chắc chắn kèm khóa Oysterclasp",
      priceExtra: -5000000,
    },
  ];

  const basePriceVND = 428000000;
  const basePriceUSD = 16900;

  const currentDial = dials.find((d) => d.id === dial)!;
  const currentBezel = bezels.find((b) => b.id === bezel)!;
  const currentBracelet = bracelets.find((b) => b.id === bracelet)!;

  const totalPriceVND =
    basePriceVND +
    currentDial.priceExtra +
    currentBezel.priceExtra +
    currentBracelet.priceExtra;
  const totalPriceUSD = Math.round(totalPriceVND / 25300);

  const handleSelectDial = (id: string) => {
    watchAudio.tick();
    setDial(id);
  };

  const handleSelectBezel = (id: string) => {
    watchAudio.tick();
    setBezel(id);
  };

  const handleSelectBracelet = (id: string) => {
    watchAudio.tick();
    setBracelet(id);
  };

  return (
    <section id="rolex-configurator" className="py-28 bg-[#f5f1e8] dark:bg-[#050a07] relative overflow-hidden transition-colors duration-400">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-1.5 text-[#9a741e] dark:text-[#d4af37] mb-2">
            <RolexCrown className="w-6 h-5 text-[#9a741e] dark:text-[#d4af37]" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#006039] dark:text-[#a7f3d0] font-semibold">
            ĐẶC QUYỀN ĐỘC BẢN TẠI BOUTIQUE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground dark:text-white mt-1.5 leading-tight">
            Định Cấu Hình <span className="italic text-[#9a741e] dark:text-[#f3e3be]">Rolex Datejust 41</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-muted-foreground dark:text-white/60 leading-relaxed font-sans font-light">
            Chọn lựa mặt số, vành bezel và dây đeo để tạo nên phiên bản độc bản mang đậm dấu ấn cá nhân của Quý khách.
          </p>
        </div>

        {/* Configurator Workbench Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Dynamic Watch Preview Display */}
          <div className="lg:col-span-6 relative aspect-square luxury-card rounded-3xl p-8 flex flex-col items-center justify-center overflow-hidden">
            <div className="relative w-full h-80 sm:h-96">
              <Image
                src="/images/submariner-emerald.jpg"
                alt="Rolex Configured Watch"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Current Configuration Badges */}
            <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs font-mono">
              <span className="px-3 py-1 rounded-full bg-[#006039] text-white font-medium border border-emerald-500/50">
                {currentDial.name}
              </span>
              <span className="px-3 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-[#9a741e] dark:text-[#d4af37] font-medium border border-[#d4af37]/25">
                {currentBezel.name}
              </span>
              <span className="px-3 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-foreground/80 dark:text-white/80 font-medium border border-black/[0.08] dark:border-white/[0.08]">
                {currentBracelet.name}
              </span>
            </div>
          </div>

          {/* Right: Customization Controls */}
          <div className="lg:col-span-6 space-y-7 text-foreground dark:text-white">
            {/* 1. DIAL SELECTION */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground dark:text-white/40 font-semibold">
                  01 / MẶT SỐ (DIAL)
                </span>
                <span className="text-xs font-semibold text-[#9a741e] dark:text-[#d4af37]">
                  {currentDial.name}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {dials.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => handleSelectDial(d.id)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                      dial === d.id
                        ? "border-[#d4af37] bg-[#006039]/15 dark:bg-[#006039]/25 shadow-md"
                        : "border-black/[0.06] dark:border-white/[0.06] hover:border-[#d4af37]/40 bg-white/70 dark:bg-[#0a140f]/80"
                    }`}
                  >
                    <span
                      className="w-6 h-6 rounded-full border border-black/20 shrink-0 shadow-xs"
                      style={{ backgroundColor: d.color }}
                    />
                    <div className="overflow-hidden">
                      <div className="text-xs font-medium text-foreground dark:text-white truncate">
                        {d.name.split(" ")[0]} {d.name.split(" ")[1]}
                      </div>
                      <div className="text-[10px] text-muted-foreground dark:text-white/40 truncate">
                        {d.priceExtra > 0
                          ? `+${formatPrice(d.priceExtra / 25400, d.priceExtra)}`
                          : "Tiêu chuẩn"}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. BEZEL SELECTION */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground dark:text-white/40 font-semibold">
                  02 / VÀNH BEZEL
                </span>
                <span className="text-xs font-semibold text-[#9a741e] dark:text-[#d4af37]">
                  {currentBezel.name}
                </span>
              </div>
              <div className="space-y-2">
                {bezels.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => handleSelectBezel(b.id)}
                    className={`w-full p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      bezel === b.id
                        ? "border-[#d4af37] bg-[#006039]/15 dark:bg-[#006039]/25 shadow-md"
                        : "border-black/[0.06] dark:border-white/[0.06] hover:border-[#d4af37]/40 bg-white/70 dark:bg-[#0a140f]/80"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-medium text-foreground dark:text-white">
                        {b.name}
                      </div>
                      <div className="text-[11px] text-muted-foreground dark:text-white/50">{b.desc}</div>
                    </div>
                    {bezel === b.id && (
                      <FontAwesomeIcon icon={faCheck} className="w-3.5 h-3.5 text-[#9a741e] dark:text-[#d4af37] shrink-0 ml-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. BRACELET SELECTION */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground dark:text-white/40 font-semibold">
                  03 / DÂY ĐEO (BRACELET)
                </span>
                <span className="text-xs font-semibold text-[#9a741e] dark:text-[#d4af37]">
                  {currentBracelet.name}
                </span>
              </div>
              <div className="space-y-2">
                {bracelets.map((br) => (
                  <button
                    key={br.id}
                    onClick={() => handleSelectBracelet(br.id)}
                    className={`w-full p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      bracelet === br.id
                        ? "border-[#d4af37] bg-[#006039]/15 dark:bg-[#006039]/25 shadow-md"
                        : "border-black/[0.06] dark:border-white/[0.06] hover:border-[#d4af37]/40 bg-white/70 dark:bg-[#0a140f]/80"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-medium text-foreground dark:text-white">
                        {br.name}
                      </div>
                      <div className="text-[11px] text-muted-foreground dark:text-white/50">{br.desc}</div>
                    </div>
                    {bracelet === br.id && (
                      <FontAwesomeIcon icon={faCheck} className="w-3.5 h-3.5 text-[#9a741e] dark:text-[#d4af37] shrink-0 ml-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Total Configured Price & Actions */}
            <div className="pt-6 border-t border-black/[0.06] dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground dark:text-white/40 block">
                  TỔNG GIÁ TRỊ CẤU HÌNH
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-normal text-[#9a741e] dark:text-[#d4af37]">
                  {formatPrice(totalPriceUSD, totalPriceVND)}
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    watchAudio.click();
                    showToast("Đã lưu bản thiết kế cấu hình Rolex Datejust của Quý khách.");
                  }}
                  className="flex-1 sm:flex-none px-4 py-3 rounded-full border border-black/[0.12] dark:border-white/[0.12] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] text-xs font-semibold uppercase tracking-wider text-foreground dark:text-white cursor-pointer"
                >
                  Lưu Cấu Hình
                </button>
                <button
                  onClick={() => {
                    watchAudio.click();
                    setIsVipModalOpen(true);
                  }}
                  className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37] via-[#c69f2e] to-[#b38f28] hover:brightness-105 text-black text-xs font-bold uppercase tracking-wider shadow-lg active:scale-95 cursor-pointer"
                >
                  Đặt Hẹn Với Chuyên Gia
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
