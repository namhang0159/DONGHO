"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useCart } from "@/context/CartContext";
import { watchAudio } from "@/utils/audio";
import { WATCHES } from "@/data/watches";
import RolexCrown from "./RolexCrown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faChevronDown,
  faArrowRight,
  faFilm,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";

const TOTAL_FRAMES = 120;

export default function WatchScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [viewMode, setViewMode] = useState<"scrolly" | "video">("scrolly");

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const lastRenderedFrameRef = useRef<number>(-1);

  const { setSelectedWatchModal } = useCart();
  const datejustWatch =
    WATCHES.find((w) => w.id === "rolex-datejust-41-olive") || WATCHES[0];

  // Draw frame on canvas
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const img = imagesRef.current[frameIdx];
    if (img && img.complete && img.naturalWidth > 0) {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      lastRenderedFrameRef.current = frameIdx;
      setCurrentFrame(frameIdx);
    }
  }, []);

  // Preload all 120 frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, "0");
      img.src = `/frames/frame_${numStr}.webp`;

      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (i === 1) {
          drawFrame(0);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      images.forEach((img) => {
        img.onload = null;
      });
    };
  }, [drawFrame]);

  // Scroll listener
  const handleScroll = useCallback(() => {
    if (isAutoPlaying) return;
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const scrollDistance = -rect.top;
    const maxScroll = containerRef.current.offsetHeight - window.innerHeight;

    if (maxScroll <= 0) return;

    const rawProgress = Math.max(0, Math.min(1, scrollDistance / maxScroll));
    targetProgressRef.current = rawProgress;
  }, [isAutoPlaying]);

  // Smooth 60fps RAF loop
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    let autoProgress = 0;

    const updateLoop = () => {
      if (isAutoPlaying) {
        autoProgress = (autoProgress + 0.0028) % 1;
        targetProgressRef.current = autoProgress;
        currentProgressRef.current = autoProgress;
        const targetFrame = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.floor(autoProgress * TOTAL_FRAMES))
        );
        if (targetFrame !== lastRenderedFrameRef.current) {
          drawFrame(targetFrame);
        }
        setProgress(autoProgress);
      } else {
        const diff = targetProgressRef.current - currentProgressRef.current;
        if (Math.abs(diff) > 0.0002) {
          currentProgressRef.current += diff * 0.2;
          const p = currentProgressRef.current;
          const targetFrame = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.floor(p * TOTAL_FRAMES))
          );

          if (targetFrame !== lastRenderedFrameRef.current) {
            drawFrame(targetFrame);
          }
          setProgress(p);
        }
      }

      rafIdRef.current = requestAnimationFrame(updateLoop);
    };

    rafIdRef.current = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [handleScroll, isAutoPlaying, drawFrame]);

  const toggleAutoPlay = () => {
    watchAudio.click();
    setIsAutoPlaying((prev) => !prev);
  };

  const scrollToCollection = () => {
    watchAudio.click();
    const catalog = document.getElementById("rolex-models");
    if (catalog) {
      catalog.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToConfigurator = () => {
    watchAudio.click();
    const config = document.getElementById("rolex-configurator");
    if (config) {
      config.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentPhase =
    progress < 0.26 ? 1 : progress < 0.52 ? 2 : progress < 0.8 ? 3 : 4;

  return (
    <div
      ref={containerRef}
      id="hero-scrollytelling"
      className="relative w-full h-[360vh] bg-[#00140c]"
    >
      {/* Sticky Fullscreen Rolex Showcase Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none">
        {/* Subtle Rolex Green Vignette & Lighting */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#006039]/20 rounded-full blur-[180px]" />
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black/80 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#00140c] to-transparent" />
        </div>

        {/* ================= TOP ROLEX BRAND HEADER ================= */}
        <div className="relative z-20 pt-28 px-6 sm:px-12 max-w-7xl mx-auto w-full text-center flex flex-col items-center">
          <div className="text-[#a37e2c] mb-2 transform hover:scale-105 transition-transform duration-500">
            <RolexCrown className="w-9 h-7 text-[#a37e2c]" />
          </div>
          <span className="text-[11px] font-mono tracking-[0.35em] text-[#a37e2c] uppercase font-bold">
            OYSTER PERPETUAL
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-normal mt-2">
            DATEJUST 41
          </h1>
          <p className="text-xs sm:text-sm text-white/65 tracking-wider font-light mt-2 max-w-xl">
            Oyster, 41 mm, Oystersteel và vàng kim Rolesor. Mặt số xanh ô-liu cọc số La Mã.
          </p>

          {/* Rolex Signature Live Exploded Component Indicator */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#d4af37]/25 text-white text-xs font-mono tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#00844e] animate-ping" />
            <span className="text-[#d4af37] font-semibold">
              {currentPhase === 1 && "BỘ VỎ OYSTERSTEEL & VÀNH KHÍA FLUTED 18 CT"}
              {currentPhase === 2 && "KÍNH SAPPHIRE CHỐNG TRẦY & THẤU KÍNH CYCLOPS"}
              {currentPhase === 3 && "MẶT SỐ XANH Ô-LIU SUNBURST & CỖ MÁY CALIBRE 3235"}
              {currentPhase === 4 && "DÂY ĐEO JUBILEE 5 MẮT NỐI ROLESOR VÀNG KIM"}
            </span>
          </div>
        </div>

        {/* ================= CENTERPIECE: 100% FULL-BLEED VIEWPORT FIT ================= */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none overflow-hidden">
          {/* Full-bleed Video Mode (animation.mp4 fits 100% screen with object-cover) */}
          <video
            ref={videoRef}
            src="/animation.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              viewMode === "video" ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />

          {/* 60FPS Interactive Exploded Canvas (fits screen dynamically) */}
          <div
            className={`w-full h-full flex items-center justify-center transition-opacity duration-700 ${
              viewMode === "scrolly" ? "opacity-100" : "opacity-0"
            }`}
          >
            <canvas
              ref={canvasRef}
              width={1280}
              height={720}
              className="w-full h-full max-w-[100vw] max-h-[100vh] object-contain sm:object-cover md:object-contain scale-110 sm:scale-115 md:scale-125 transition-transform duration-500 pointer-events-none"
            />
          </div>
        </div>

        {/* ================= BOTTOM ROLEX ACTION CONTROLS ================= */}
        <div className="relative z-20 pb-10 px-6 sm:px-12 max-w-7xl mx-auto w-full flex flex-col gap-5 text-white">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left: Model Price and Actions */}
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/50">
                  GIÁ NIÊM YẾT CHÍNH HÃNG
                </span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#d4af37]">
                  428.000.000 ₫
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    watchAudio.click();
                    setSelectedWatchModal(datejustWatch);
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#006039] hover:bg-[#00844e] text-white font-medium text-xs tracking-wider uppercase transition-all shadow-lg active:scale-95"
                >
                  Tìm Hiểu Mẫu Này
                </button>
                <button
                  onClick={scrollToConfigurator}
                  className="px-4 py-2.5 rounded-full border border-white/20 hover:border-[#a37e2c] text-white/90 hover:text-white font-medium text-xs tracking-wider uppercase transition-all backdrop-blur-md"
                >
                  Cấu Hình Đồng Hồ
                </button>
              </div>
            </div>

            {/* Right: ViewMode, Autoplay & Scroll Prompt */}
            <div className="flex items-center gap-3 flex-wrap justify-end">
              {/* Cinema Video / 3D Canvas Switcher */}
              <button
                onClick={() => {
                  watchAudio.click();
                  setViewMode((prev) => (prev === "scrolly" ? "video" : "scrolly"));
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono transition-all cursor-pointer ${
                  viewMode === "video"
                    ? "bg-[#006039] border-[#d4af37] text-white shadow-lg shadow-[#006039]/50"
                    : "bg-black/60 hover:bg-black/90 border-white/[0.1] text-white/80"
                }`}
                title="Chuyển đổi video tràn màn hình hoặc mô hình 3D"
              >
                {viewMode === "video" ? (
                  <>
                    <FontAwesomeIcon icon={faCompass} className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Mô Hình 3D Cuộn</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faFilm} className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Video Tràn Màn Hình</span>
                  </>
                )}
              </button>

              {viewMode === "scrolly" && (
                <button
                  onClick={toggleAutoPlay}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 hover:bg-black/90 border border-white/[0.1] text-xs font-mono text-white/80 transition-all cursor-pointer"
                >
                  {isAutoPlaying ? (
                    <>
                      <FontAwesomeIcon icon={faPause} className="w-3 h-3 text-[#d4af37]" />
                      <span>Dừng xoay 360°</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPlay} className="w-3 h-3 text-[#d4af37]" />
                      <span>Tự động xoay 360°</span>
                    </>
                  )}
                </button>
              )}

              <button
                onClick={scrollToCollection}
                className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/70 hover:text-white transition-colors cursor-pointer group"
              >
                <span>Bộ Sưu Tập Đồng Hồ</span>
                <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3 text-[#d4af37] group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Rolex Gold Timeline Track */}
          <div className="relative w-full flex items-center gap-3">
            <span className="text-[10px] font-mono text-white/40">01 / LẮP RÁP</span>
            <div className="relative flex-1 h-1 bg-white/[0.08] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#a37e2c] to-[#d4af37] transition-all duration-75"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-[#d4af37] font-bold">
              {Math.round(progress * 100)}% PHÂN RÃ CƠ HỌC
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
