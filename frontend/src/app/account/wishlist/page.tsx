"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import AccountNav from "@/components/AccountNav";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { WATCHES } from "@/data/watches";
import { watchAudio } from "@/utils/audio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faBagShopping,
  faArrowRight,
  faTrashCan,
  faScaleBalanced,
  faEye,
  faGem,
} from "@fortawesome/free-solid-svg-icons";

export default function AccountWishlistPage() {
  const { user } = useAuth();
  const {
    wishlist,
    toggleWishlist,
    addToCart,
    toggleCompare,
    formatPrice,
    setSelectedWatchModal,
  } = useCart();

  if (!user) {
    return (
      <div className="min-h-screen pt-28 pb-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <AccountNav />
      </div>
    );
  }

  const wishlistWatches = WATCHES.filter((w) => wishlist.includes(w.id));

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <AccountNav />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
              Bộ Sưu Tập Kiệt Tác Ước Nguyện
            </h3>
            <p className="text-xs text-muted-foreground font-light mt-0.5">
              Những cỗ máy thời gian đỉnh cao được Quý khách lưu giữ và theo dõi tiến độ phân bổ.
            </p>
          </div>
          <span className="text-xs font-mono text-rose-400 bg-rose-500/10 px-3 py-1.5 rounded-full border border-rose-500/25">
            {wishlistWatches.length} Kiệt Tác
          </span>
        </div>

        {wishlistWatches.length === 0 ? (
          <div className="py-24 text-center luxury-card p-8 flex flex-col items-center relative overflow-hidden">
            <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4 shadow-inner">
              <FontAwesomeIcon icon={faHeart} className="w-7 h-7" />
            </div>
            <h4 className="font-serif text-lg font-normal text-foreground">
              Danh Sách Ước Nguyện Đang Trống
            </h4>
            <p className="text-xs text-muted-foreground max-w-sm mt-1.5 font-light">
              Hãy đánh dấu trái tim tại các kiệt tác đồng hồ cơ khí yêu thích để lưu vào bộ sưu tập cá nhân.
            </p>
            <Link
              href="/products"
              className="mt-6 px-7 py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8952b] hover:from-[#e5c66b] hover:to-[#997926] text-black font-semibold text-xs font-mono uppercase tracking-wider transition-all shadow-lg shadow-[#d4af37]/20"
            >
              Khám Phá Toàn Bộ Kiệt Tác
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistWatches.map((watch) => (
              <div
                key={watch.id}
                className="luxury-card rounded-3xl p-5 flex flex-col justify-between group transition-all duration-300 hover:shadow-2xl hover:shadow-[#d4af37]/10 hover:-translate-y-1"
              >
                <div>
                  {/* Image & Quick Action Header */}
                  <div className="relative w-full aspect-square rounded-2xl luxury-card-inset overflow-hidden mb-4 p-2">
                    <Image
                      src={watch.image}
                      alt={watch.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Remove Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(watch.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md hover:bg-rose-500 text-rose-400 hover:text-white border border-[#d4af37]/20 flex items-center justify-center transition-all cursor-pointer shadow-sm"
                      title="Xóa khỏi danh sách"
                    >
                      <FontAwesomeIcon icon={faTrashCan} className="w-3.5 h-3.5" />
                    </button>

                    {/* Quick View Button */}
                    <button
                      onClick={() => setSelectedWatchModal(watch)}
                      className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md hover:bg-[#d4af37] text-white hover:text-black border border-[#d4af37]/20 flex items-center justify-center transition-all cursor-pointer shadow-sm"
                      title="Xem nhanh"
                    >
                      <FontAwesomeIcon icon={faEye} className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Brand & Name */}
                  <div className="text-[10px] font-mono uppercase text-[#d4af37] tracking-wider font-semibold">
                    {watch.brand}
                  </div>
                  <h4 className="font-serif text-base font-normal text-foreground mt-0.5 line-clamp-1">
                    {watch.name}
                  </h4>

                  {/* Specs Pill */}
                  <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground mt-2 px-2.5 py-1 rounded-lg luxury-card-inset w-fit">
                    <span>{watch.specs.diameter}</span>
                    <span>•</span>
                    <span className="truncate">{watch.specs.caseMaterial}</span>
                  </div>

                  {/* Price */}
                  <div className="font-serif text-lg font-bold text-[#d4af37] mt-3 tracking-tight">
                    {formatPrice(watch.priceUSD, watch.priceVND)}
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="pt-4 mt-4 border-t border-[#d4af37]/15 flex items-center gap-2.5">
                  <button
                    onClick={() => addToCart(watch)}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b8952b] hover:from-[#e5c66b] hover:to-[#997926] text-black font-mono text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#d4af37]/15 cursor-pointer transition-all active:scale-95"
                  >
                    <FontAwesomeIcon icon={faBagShopping} className="w-3 h-3" />
                    <span>Thêm Giỏ Hàng</span>
                  </button>

                  <Link
                    href={`/products/${watch.id}`}
                    className="w-11 h-11 rounded-xl border border-[#d4af37]/25 hover:border-[#d4af37] bg-black/5 dark:bg-black/20 hover:bg-[#d4af37]/10 flex items-center justify-center text-foreground hover:text-[#d4af37] transition-all shrink-0 shadow-xs"
                    title="Chi tiết kiệt tác"
                  >
                    <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
