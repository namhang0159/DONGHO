"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { watchAudio } from "@/utils/audio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faBagShopping,
  faCalendarCheck,
  faShieldHalved,
  faTruck,
  faAward,
  faGem,
  faHeart,
  faMinus,
  faPlus,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

export default function ProductDetailModal() {
  const {
    selectedWatchModal,
    setSelectedWatchModal,
    addToCart,
    formatPrice,
    toggleWishlist,
    isInWishlist,
    setIsVipModalOpen,
  } = useCart();

  const [quantity, setQuantity] = useState(1);

  if (!selectedWatchModal) return null;

  const watch = selectedWatchModal;
  const isFavorited = isInWishlist(watch.id);

  const handleClose = () => {
    watchAudio.click();
    setSelectedWatchModal(null);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    addToCart(watch, quantity);
    handleClose();
  };

  const handleVipBooking = () => {
    watchAudio.click();
    setSelectedWatchModal(null);
    setIsVipModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#0d1217] rounded-3xl border border-[#d4af37]/25 shadow-2xl overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-[#d4af37]/20 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] transition-all hover:scale-105"
          aria-label="Đóng chi tiết"
        >
          <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Imagery */}
          <div className="relative aspect-square md:aspect-auto md:h-full bg-gradient-to-b from-white/[0.02] to-transparent p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#d4af37]/15">
            <div className="relative w-full h-80 md:h-[420px]">
              <Image
                src={watch.image}
                alt={watch.name}
                fill
                className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                priority
              />
            </div>

            {/* Badges */}
            <div className="absolute top-6 left-6 flex flex-col gap-2">
              <span className="px-3 py-1 text-xs font-mono font-bold rounded-full bg-[#1b3d2f] text-emerald-300 border border-emerald-500/30 shadow-md">
                {watch.tag}
              </span>
              {watch.isLimited && (
                <span className="px-3 py-1 text-xs font-mono font-bold rounded-full bg-[#d4af37] text-black shadow-md flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faGem} className="w-3 h-3" /> Giới Hạn Toàn Cầu
                </span>
              )}
            </div>
          </div>

          {/* Right: Specifications & Purchasing Controls */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Brand and Series */}
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#d4af37]">
                <span>{watch.brand}</span>
                <span>{watch.series}</span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                {watch.name}
              </h2>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#d4af37]">
                  {formatPrice(watch.priceUSD, watch.priceVND)}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  (Bảo hiểm vận chuyển & thuế nhập khẩu)
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                {watch.description}
              </p>

              {/* Highlights */}
              <div className="mt-4 space-y-1.5">
                {watch.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-zinc-200">
                    <FontAwesomeIcon icon={faCheck} className="w-3 h-3 text-[#d4af37] shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Specs Table */}
              <div className="mt-6 border-t border-[#d4af37]/15 pt-4">
                <h4 className="font-mono text-xs uppercase tracking-wider text-[#d4af37]/70 mb-3">
                  Bảng Thông Số Cỗ Máy
                </h4>
                <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                    <span className="text-zinc-400 block text-[10px]">Đường kính</span>
                    <span className="font-semibold text-white">{watch.specs.diameter}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                    <span className="text-zinc-400 block text-[10px]">Độ chịu nước</span>
                    <span className="font-semibold text-white">{watch.specs.waterResistance}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                    <span className="text-zinc-400 block text-[10px]">Cỗ máy Calibre</span>
                    <span className="font-semibold text-white">{watch.specs.calibre}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                    <span className="text-zinc-400 block text-[10px]">Thời gian trữ cót</span>
                    <span className="font-semibold text-white">{watch.specs.powerReserve}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05] col-span-2">
                    <span className="text-zinc-400 block text-[10px]">Chất liệu thân vỏ</span>
                    <span className="font-semibold text-white">{watch.specs.caseMaterial}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-4 border-t border-[#d4af37]/15 flex flex-col gap-3">
              {/* Quantity and Actions */}
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#d4af37]/20 rounded-xl p-1 bg-white/[0.03]">
                  <button
                    onClick={() => {
                      watchAudio.tick();
                      setQuantity(Math.max(1, quantity - 1));
                    }}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 text-white"
                  >
                    <FontAwesomeIcon icon={faMinus} className="w-3 h-3" />
                  </button>
                  <span className="w-10 text-center font-mono font-bold text-sm text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => {
                      watchAudio.tick();
                      setQuantity(quantity + 1);
                    }}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 text-white"
                  >
                    <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38f28] hover:from-[#e5c158] hover:to-[#c49f32] text-black font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#d4af37]/20 active:scale-98 transition-all"
                >
                  <FontAwesomeIcon icon={faBagShopping} className="w-4 h-4" />
                  Thêm Vào Giỏ Hàng
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(watch.id)}
                  className="w-12 h-12 rounded-xl border border-[#d4af37]/20 flex items-center justify-center hover:bg-rose-500/10 text-white transition-all"
                  title="Yêu thích"
                >
                  <FontAwesomeIcon
                    icon={isFavorited ? faHeart : faHeartRegular}
                    className={`w-4 h-4 ${
                      isFavorited ? "text-rose-500" : "text-zinc-400"
                    }`}
                  />
                </button>
              </div>

              {/* VIP Salon appointment */}
              <button
                onClick={handleVipBooking}
                className="w-full py-2.5 rounded-xl border border-[#d4af37]/30 hover:bg-[#d4af37]/10 text-[#d4af37] font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <FontAwesomeIcon icon={faCalendarCheck} className="w-3.5 h-3.5" />
                Đặt Lịch Thử Đồng Hồ Trực Tiếp Tại VIP Salon
              </button>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-zinc-400 pt-2">
                <div className="flex flex-col items-center">
                  <FontAwesomeIcon icon={faShieldHalved} className="w-4 h-4 text-emerald-400 mb-1" />
                  <span>Bảo hành 5 năm</span>
                </div>
                <div className="flex flex-col items-center">
                  <FontAwesomeIcon icon={faTruck} className="w-4 h-4 text-[#d4af37] mb-1" />
                  <span>Xe bọc thép miễn phí</span>
                </div>
                <div className="flex flex-col items-center">
                  <FontAwesomeIcon icon={faAward} className="w-4 h-4 text-emerald-400 mb-1" />
                  <span>Chứng nhận Thụy Sĩ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

