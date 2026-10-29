"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { watchAudio } from "@/utils/audio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faScaleBalanced,
  faXmark,
  faBagShopping,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

export default function WatchCompareModal() {
  const {
    compareList,
    isCompareOpen,
    setIsCompareOpen,
    removeFromCompare,
    clearCompare,
    formatPrice,
    addToCart,
  } = useCart();

  if (compareList.length === 0) return null;

  const handleClose = () => {
    watchAudio.click();
    setIsCompareOpen(false);
  };

  return (
    <>
      {/* Floating Bottom Bar when items are selected */}
      {!isCompareOpen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#0d1217]/95 backdrop-blur-xl border border-[#d4af37]/30 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-4 animate-slideUp">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faScaleBalanced} className="w-4 h-4 text-[#d4af37]" />
            <span className="text-xs font-mono font-semibold text-white">
              So Sánh ({compareList.length}/3):
            </span>
          </div>

          <div className="flex items-center gap-2">
            {compareList.map((w) => (
              <div
                key={w.id}
                className="relative w-9 h-9 rounded-lg bg-white/[0.04] border border-[#d4af37]/20 overflow-hidden group"
              >
                <Image
                  src={w.image}
                  alt={w.name}
                  fill
                  className="object-contain p-0.5"
                />
                <button
                  onClick={() => removeFromCompare(w.id)}
                  className="absolute inset-0 bg-red-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Bỏ chọn so sánh"
                >
                  <FontAwesomeIcon icon={faXmark} className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                watchAudio.click();
                setIsCompareOpen(true);
              }}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38f28] hover:from-[#e5c158] hover:to-[#c49f32] text-black text-xs font-semibold shadow-md transition-all"
            >
              Xem Bảng So Sánh
            </button>
            <button
              onClick={clearCompare}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 transition-colors"
              title="Xóa tất cả"
              aria-label="Xóa tất cả so sánh"
            >
              <FontAwesomeIcon icon={faTrashCan} className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Full Compare Modal Table */}
      {isCompareOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl bg-[#0d1217] rounded-3xl border border-[#d4af37]/30 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-[#d4af37]/15">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#d4af37] flex items-center justify-center">
                  <FontAwesomeIcon icon={faScaleBalanced} className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    Bảng Đối Chiếu Thông Số Kỹ Thuật
                  </h3>
                  <span className="text-xs font-mono text-zinc-400">
                    Phân tích chi tiết độ hoàn thiện & cỗ máy cơ khí
                  </span>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-9 h-9 rounded-full bg-white/[0.05] hover:bg-[#d4af37]/20 border border-white/[0.08] flex items-center justify-center text-zinc-300 hover:text-[#d4af37] transition-all"
                aria-label="Đóng bảng so sánh"
              >
                <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
              </button>
            </div>

            {/* Comparison Grid Table */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#d4af37]/15">
                    <th className="p-3 font-mono text-[#d4af37]/70 uppercase text-[11px] w-1/4">
                      Mẫu Đồng Hồ
                    </th>
                    {compareList.map((w) => (
                      <th key={w.id} className="p-3 text-center align-top">
                        <div className="relative w-28 h-28 mx-auto mb-2 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-2">
                          <Image
                            src={w.image}
                            alt={w.name}
                            fill
                            className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                          />
                        </div>
                        <div className="text-[10px] font-mono text-[#d4af37] uppercase">
                          {w.brand}
                        </div>
                        <div className="font-serif font-bold text-sm text-white line-clamp-1">
                          {w.name}
                        </div>
                        <div className="font-mono font-bold text-[#d4af37] mt-1">
                          {formatPrice(w.priceUSD, w.priceVND)}
                        </div>
                        <button
                          onClick={() => {
                            addToCart(w);
                            handleClose();
                          }}
                          className="mt-3 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b38f28] hover:from-[#e5c158] hover:to-[#c49f32] text-black text-xs font-semibold flex items-center justify-center gap-1.5 mx-auto shadow-sm"
                        >
                          <FontAwesomeIcon icon={faBagShopping} className="w-3 h-3" />
                          Chọn Mua
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05] font-mono text-xs">
                  <tr>
                    <td className="p-3 font-semibold text-zinc-400">Đường Kính</td>
                    {compareList.map((w) => (
                      <td key={w.id} className="p-3 text-center font-bold text-white">
                        {w.specs.diameter}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-zinc-400">Độ Dày Thân Vỏ</td>
                    {compareList.map((w) => (
                      <td key={w.id} className="p-3 text-center text-zinc-200">
                        {w.specs.thickness}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-zinc-400">Cỗ Máy Calibre</td>
                    {compareList.map((w) => (
                      <td key={w.id} className="p-3 text-center font-bold text-[#d4af37]">
                        {w.specs.calibre}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-zinc-400">Số Chân Kính Ruby</td>
                    {compareList.map((w) => (
                      <td key={w.id} className="p-3 text-center text-zinc-200">
                        {w.specs.jewels}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-zinc-400">Thời Gian Trữ Cót</td>
                    {compareList.map((w) => (
                      <td key={w.id} className="p-3 text-center font-bold text-white">
                        {w.specs.powerReserve}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-zinc-400">Độ Chịu Nước</td>
                    {compareList.map((w) => (
                      <td key={w.id} className="p-3 text-center text-zinc-200">
                        {w.specs.waterResistance}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-zinc-400">Chất Liệu Thân Vỏ</td>
                    {compareList.map((w) => (
                      <td key={w.id} className="p-3 text-center text-zinc-300">
                        {w.specs.caseMaterial}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-zinc-400">Vành Bezel</td>
                    {compareList.map((w) => (
                      <td key={w.id} className="p-3 text-center text-zinc-300">
                        {w.specs.bezel}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleClose}
                className="px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-xs font-mono font-semibold text-zinc-300 transition-colors"
              >
                Đóng Bảng Đối Chiếu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
