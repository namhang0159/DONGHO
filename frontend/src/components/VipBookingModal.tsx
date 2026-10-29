"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { watchAudio } from "@/utils/audio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faGem,
  faWineGlass,
  faShieldHalved,
  faCalendarCheck,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function VipBookingModal() {
  const { isVipModalOpen, setIsVipModalOpen } = useCart();
  const [salon, setSalon] = useState("hanoi");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("14:00");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isVipModalOpen) return null;

  const handleClose = () => {
    watchAudio.click();
    setIsVipModalOpen(false);
    setIsSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    watchAudio.chime();
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#0d1217] rounded-3xl border border-[#d4af37]/30 shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/[0.05] hover:bg-[#d4af37]/20 border border-white/[0.08] flex items-center justify-center text-zinc-300 hover:text-[#d4af37] transition-all"
          aria-label="Đóng cửa sổ đặt lịch"
        >
          <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#d4af37] mb-2">
              <FontAwesomeIcon icon={faGem} className="w-3.5 h-3.5" />
              Đặc Quyền Thượng Khách
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Tiếp Đón Riêng Tư Tại VIP Salon
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
              Trải nghiệm thử trên tay các kiệt tác đồng hồ độc bản trong phòng khánh tiết bảo mật với champagne hảo hạng và chuyên gia giám định Thụy Sĩ.
            </p>

            {/* Perks */}
            <div className="grid grid-cols-3 gap-2.5 my-6">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] text-center">
                <FontAwesomeIcon icon={faWineGlass} className="w-4 h-4 text-[#d4af37] mx-auto mb-1.5 block" />
                <span className="text-[11px] font-mono text-zinc-300 block">
                  Champagne & Cigar
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] text-center">
                <FontAwesomeIcon icon={faShieldHalved} className="w-4 h-4 text-emerald-400 mx-auto mb-1.5 block" />
                <span className="text-[11px] font-mono text-zinc-300 block">
                  Phòng Kính Bảo Mật
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] text-center">
                <FontAwesomeIcon icon={faGem} className="w-4 h-4 text-[#d4af37] mx-auto mb-1.5 block" />
                <span className="text-[11px] font-mono text-zinc-300 block">
                  Nghệ Nhân Tư Vấn
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-mono uppercase text-[#d4af37]/80 text-[11px] mb-1.5">
                  Chọn Địa Điểm Boutique VIP
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
                  {[
                    { id: "hanoi", name: "Hà Nội Metropole" },
                    { id: "hcm", name: "Sài Gòn Opera House" },
                    { id: "geneva", name: "Genève Rue du Rhône" },
                  ].map((loc) => (
                    <button
                      type="button"
                      key={loc.id}
                      onClick={() => {
                        watchAudio.tick();
                        setSalon(loc.id);
                      }}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        salon === loc.id
                          ? "bg-gradient-to-r from-[#d4af37] to-[#b38f28] text-black border-[#d4af37] font-bold shadow-md shadow-[#d4af37]/20"
                          : "bg-white/[0.03] border-white/[0.08] text-zinc-400 hover:text-white"
                      }`}
                    >
                      {loc.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-zinc-400 text-[11px] mb-1">
                    Ngày Hẹn
                  </label>
                  <input
                    required
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-[#d4af37]/25 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block font-mono uppercase text-zinc-400 text-[11px] mb-1">
                    Khung Giờ VIP
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0d1217] border border-[#d4af37]/25 text-white cursor-pointer focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="10:00">10:00 Sáng - Buổi Sáng</option>
                    <option value="14:00">14:00 Chiều - Trà Chiều</option>
                    <option value="16:30">16:30 Chiều - Hoàng Hôn</option>
                    <option value="19:00">19:00 Tối - Private Lounge</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-zinc-400 text-[11px] mb-1">
                    Danh Xưng & Họ Tên
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Nguyễn Văn A"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-[#d4af37]/25 text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block font-mono uppercase text-zinc-400 text-[11px] mb-1">
                    Số Điện Thoại Trực Tiếp
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+84 988 888 888"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-[#d4af37]/25 text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#b38f28] to-[#92711d] hover:from-[#e5c158] hover:to-[#a88224] text-black font-serif font-bold text-sm shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faCalendarCheck} className="w-4 h-4" />
                Xác Nhận Giữ Chỗ Khánh Tiết VIP
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37] mx-auto mb-4">
              <FontAwesomeIcon icon={faCircleCheck} className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Đã Xác Nhận Cuộc Hẹn VIP
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-md mx-auto font-light">
              Trân trọng cảm ơn Quý khách <strong className="text-white font-medium">{name}</strong>. Giám đốc Boutique sẽ chuẩn bị phòng khánh tiết riêng cùng bộ sưu tập kiệt tác vào lúc <strong>{time}</strong> ngày <strong>{date || "đã chọn"}</strong>.
            </p>
            <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-[#d4af37]/30 text-xs font-mono text-[#d4af37]">
              Mã xác nhận khách VIP: #SALON-VIP-8899
            </div>
            <button
              onClick={handleClose}
              className="mt-6 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38f28] text-black text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              Đóng Cửa Sổ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

