"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGem } from "@fortawesome/free-solid-svg-icons";

export default function LuxuryToast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-24 right-6 z-60 max-w-sm pointer-events-none animate-slideLeft">
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#0b1611]/95 backdrop-blur-2xl border border-[#d4af37]/30 shadow-2xl text-white text-xs font-mono">
        <div className="w-8 h-8 rounded-full bg-[#006039]/30 text-[#d4af37] flex items-center justify-center shrink-0 border border-[#006039]/50">
          <FontAwesomeIcon icon={faGem} className="w-3.5 h-3.5" />
        </div>
        <div className="flex-1 font-medium leading-snug">
          {toastMessage}
        </div>
      </div>
    </div>
  );
}
