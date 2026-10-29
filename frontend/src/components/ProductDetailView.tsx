"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { WATCHES, WatchItem } from "@/data/watches";
import { useCart } from "@/context/CartContext";
import { watchAudio } from "@/utils/audio";
import RolexCrown from "@/components/RolexCrown";
import ProductCard from "@/components/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faHeart,
  faScaleBalanced,
  faBagShopping,
  faCalendarCheck,
  faShieldHalved,
  faTruck,
  faAward,
  faGem,
  faMinus,
  faPlus,
  faCheck,
  faCrown,
  faClock,
  faCircleCheck,
  faShareNodes,
  faMagnifyingGlassPlus,
  faWandMagicSparkles,
  faBoxOpen,
  faFingerprint,
  faHandSparkles,
  faWineGlass,
  faCompass,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

interface ProductDetailViewProps {
  watch: WatchItem;
}

export default function ProductDetailView({ watch }: ProductDetailViewProps) {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    compareList,
    setIsVipModalOpen,
  } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(watch.image);
  const [isCopied, setIsCopied] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Gallery array
  const gallery = useMemo(() => {
    return watch.gallery && watch.gallery.length > 0
      ? watch.gallery
      : [watch.image];
  }, [watch]);

  const isFavorited = isInWishlist(watch.id);
  const isCompared = compareList.some((w) => w.id === watch.id);

  // Related watches from other models
  const relatedWatches = useMemo(() => {
    return WATCHES.filter((w) => w.id !== watch.id).slice(0, 3);
  }, [watch]);

  // Handle sticky action bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 550);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = () => {
    addToCart(watch, quantity);
  };

  const handleShare = () => {
    watchAudio.click();
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="w-full bg-background text-foreground transition-colors duration-400 selection:bg-[#d4af37] selection:text-black">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 pt-28 pb-4">
        <nav className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Link href="/" className="hover:text-[#d4af37] transition-colors">
            Trang Chủ
          </Link>
          <FontAwesomeIcon icon={faChevronRight} className="w-2.5 h-2.5 text-muted-foreground/60" />
          <Link href="/products" className="hover:text-[#d4af37] transition-colors">
            Bộ Sưu Tập
          </Link>
          <FontAwesomeIcon icon={faChevronRight} className="w-2.5 h-2.5 text-muted-foreground/60" />
          <Link
            href={`/products?brand=${encodeURIComponent(watch.brand)}`}
            className="hover:text-[#d4af37] transition-colors"
          >
            {watch.brand}
          </Link>
          <FontAwesomeIcon icon={faChevronRight} className="w-2.5 h-2.5 text-muted-foreground/60" />
          <span className="text-[#d4af37] truncate max-w-xs">{watch.name}</span>
        </nav>
      </div>

      {/* Hero Showcase Section: Imagery & Purchase Controls */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 mt-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Product Imagery, Macro Inspection & Gallery (6 Cols) */}
          <div className="lg:col-span-6 space-y-5">
            {/* Main Stage with Interactive Macro Zoom */}
            <div
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
              className="relative aspect-square rounded-3xl bg-card border border-[#d4af37]/30 overflow-hidden flex items-center justify-center p-8 sm:p-12 shadow-2xl group cursor-crosshair"
            >
              {/* Luxury Ambient Halo Glow */}
              <div className="absolute inset-0 bg-radial-[circle_at_center,_rgba(0,96,57,0.15)_0%,_transparent_75%] pointer-events-none" />

              {/* Shimmer Light Reflection Sweep */}
              <div className="absolute inset-0 animate-shimmer pointer-events-none" />

              {/* Regular Image */}
              <div
                className={`relative w-full h-full transition-transform duration-300 ${
                  isZooming ? "opacity-0" : "opacity-100"
                }`}
              >
                <Image
                  src={activeImage}
                  alt={watch.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)]"
                />
              </div>

              {/* Macro Zoom View (2x Magnification) */}
              {isZooming && (
                <div
                  className="absolute inset-0 bg-no-repeat transition-opacity duration-200 pointer-events-none"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                    backgroundSize: "220%",
                  }}
                />
              )}

              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2 z-10 pointer-events-none">
                <span className="px-3.5 py-1 text-xs font-mono font-bold rounded-full bg-[#006039] text-white shadow-md border border-emerald-400/30">
                  {watch.tag}
                </span>
                {watch.isLimited && (
                  <span className="px-3.5 py-1 text-xs font-mono font-bold rounded-full bg-gradient-to-r from-[#d4af37] to-[#b38f28] text-black shadow-md flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faGem} className="w-3 h-3" /> Phiên Bản Giới Hạn Toàn Cầu
                  </span>
                )}
              </div>

              {/* Zoom Instruction Hint & Share Button */}
              <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between z-10 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-[#d4af37] border border-[#d4af37]/30 flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faMagnifyingGlassPlus} className="w-3 h-3" />
                  Rê chuột để soi kính lúp vi cơ khí 2x
                </span>

                <button
                  onClick={handleShare}
                  className="w-10 h-10 rounded-full bg-black/70 hover:bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-zinc-300 hover:text-[#d4af37] transition-all pointer-events-auto cursor-pointer"
                  title="Sao chép liên kết kiệt tác"
                  aria-label="Chia sẻ liên kết"
                >
                  <FontAwesomeIcon icon={isCopied ? faCheck : faShareNodes} className="w-4 h-4 text-[#d4af37]" />
                </button>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      watchAudio.tick();
                      setActiveImage(img);
                    }}
                    className={`relative w-22 h-22 rounded-2xl bg-card overflow-hidden border p-1 transition-all cursor-pointer shrink-0 ${
                      activeImage === img
                        ? "border-[#d4af37] ring-2 ring-[#d4af37]/40 scale-105"
                        : "border-border hover:border-[#d4af37]/50 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${watch.name} góc ${idx + 1}`}
                      fill
                      className="object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Specifications & Purchasing Controls (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Brand and Series */}
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.25em] text-[#d4af37]">
              <span className="flex items-center gap-2">
                {watch.brand.toLowerCase().includes("rolex") ? (
                  <RolexCrown className="w-4 h-3.5 text-[#d4af37]" />
                ) : (
                  <FontAwesomeIcon icon={faCrown} className="w-3.5 h-3 text-[#d4af37]" />
                )}
                {watch.brand}
              </span>
              <span className="text-muted-foreground font-light">{watch.series}</span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground leading-tight">
              {watch.name}
            </h1>

            {/* Price Box */}
            <div className="p-6 rounded-3xl bg-card border border-[#d4af37]/30 shadow-xl flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-muted-foreground block tracking-wider mb-1">
                  GIÁ NIÊM YẾT CHÍNH THỨC TOÀN CẦU
                </span>
                <div className="font-serif text-3xl sm:text-4xl font-normal text-[#d4af37]">
                  {formatPrice(watch.priceUSD, watch.priceVND)}
                </div>
              </div>
              <div className="text-right text-xs font-mono text-muted-foreground">
                <span className="text-emerald-500 dark:text-emerald-400 flex items-center sm:justify-end gap-1 font-semibold">
                  <FontAwesomeIcon icon={faCircleCheck} className="w-3.5 h-3.5" /> Sẵn Sàng Bàn Giao Ngay
                </span>
                <span className="text-[11px] block mt-0.5">
                  Đã bao gồm thuế hải quan & bảo hiểm chuyên dụng
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed font-sans">
              {watch.description}
            </p>

            {/* Key Highlights */}
            <div className="space-y-2.5 py-1">
              {watch.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-foreground/90">
                  <FontAwesomeIcon icon={faCheck} className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* Actions & Quantity */}
            <div className="pt-4 border-t border-border space-y-3.5">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-[#d4af37]/30 rounded-2xl p-1 bg-black/[0.03] dark:bg-white/[0.03]">
                  <button
                    onClick={() => {
                      watchAudio.tick();
                      setQuantity(Math.max(1, quantity - 1));
                    }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 text-foreground transition-colors cursor-pointer"
                    aria-label="Giảm số lượng"
                  >
                    <FontAwesomeIcon icon={faMinus} className="w-3 h-3" />
                  </button>
                  <span className="w-12 text-center font-mono font-bold text-sm text-foreground">
                    {quantity}
                  </span>
                  <button
                    onClick={() => {
                      watchAudio.tick();
                      setQuantity(quantity + 1);
                    }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 text-foreground transition-colors cursor-pointer"
                    aria-label="Tăng số lượng"
                  >
                    <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#c69f2e] to-[#b38f28] hover:from-[#e5c158] hover:to-[#c49f32] text-black font-semibold text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#d4af37]/25 active:scale-98 transition-all cursor-pointer"
                >
                  <FontAwesomeIcon icon={faBagShopping} className="w-4 h-4" />
                  <span>Thêm Vào Giỏ Hàng & Đặt Mua</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(watch.id)}
                  className="w-12 h-12 rounded-2xl border border-[#d4af37]/30 flex items-center justify-center hover:bg-rose-500/10 text-foreground transition-all cursor-pointer shrink-0"
                  title="Lưu vào danh sách yêu thích"
                  aria-label="Thêm vào yêu thích"
                >
                  <FontAwesomeIcon
                    icon={isFavorited ? faHeart : faHeartRegular}
                    className={`w-4 h-4 ${
                      isFavorited ? "text-rose-500" : "text-muted-foreground"
                    }`}
                  />
                </button>

                {/* Compare Button */}
                <button
                  onClick={() => toggleCompare(watch)}
                  className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                    isCompared
                      ? "bg-[#d4af37] text-black border-[#d4af37]"
                      : "border-[#d4af37]/30 text-muted-foreground hover:text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
                  }`}
                  title="So sánh kỹ thuật"
                  aria-label="So sánh"
                >
                  <FontAwesomeIcon icon={faScaleBalanced} className="w-4 h-4" />
                </button>
              </div>

              {/* VIP Salon Booking Appointment */}
              <button
                onClick={() => {
                  watchAudio.click();
                  setIsVipModalOpen(true);
                }}
                className="w-full py-3.5 rounded-2xl border border-[#d4af37]/40 hover:bg-[#d4af37]/10 text-[#d4af37] font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <FontAwesomeIcon icon={faCalendarCheck} className="w-4 h-4" />
                <span>Đặt Lịch Tiếp Đón Riêng Tư Tại VIP Salon (Hà Nội, Sài Gòn & Geneva)</span>
              </button>
            </div>

            {/* Guarantees & Security Privileges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border text-center text-xs font-mono text-muted-foreground">
              <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-border">
                <FontAwesomeIcon icon={faShieldHalved} className="w-4 h-4 text-emerald-500 mx-auto mb-1.5 block" />
                <span className="text-[11px] block text-foreground font-medium">Bảo Hành 5 Năm</span>
                <span className="text-[9px] text-muted-foreground">Chứng chỉ quốc tế</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-border">
                <FontAwesomeIcon icon={faTruck} className="w-4 h-4 text-[#d4af37] mx-auto mb-1.5 block" />
                <span className="text-[11px] block text-foreground font-medium">Xe Bọc Thép</span>
                <span className="text-[9px] text-muted-foreground">Giao tận tư gia</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-border">
                <FontAwesomeIcon icon={faAward} className="w-4 h-4 text-emerald-500 mx-auto mb-1.5 block" />
                <span className="text-[11px] block text-foreground font-medium">Chuẩn Thụy Sĩ</span>
                <span className="text-[9px] text-muted-foreground">Giám định COSC</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: The Horological Engine Anatomy */}
      <section className="py-20 bg-secondary/50 border-t border-b border-[#d4af37]/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.03] border border-[#d4af37]/35 text-[#d4af37] text-xs font-mono uppercase tracking-[0.2em] mb-4">
              <FontAwesomeIcon icon={faClock} className="w-3.5 h-3.5" />
              <span>Trái Tim Vi Cơ Khí In-House</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-foreground">
              Giải Phẫu Cỗ Máy Calibre <span className="text-[#d4af37] italic">{watch.specs.calibre}</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed font-sans max-w-2xl mx-auto">
              Được chế tác hoàn toàn in-house tại các xưởng đồng hồ bí truyền Thụy Sĩ. Mỗi cỗ máy mất hơn 9 tháng lắp ráp thủ công với sai số đo lường vượt xa các tiêu chuẩn khắt khe nhất của viện kiểm định COSC.
            </p>
          </div>

          {/* Specs Matrix */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-5 rounded-3xl bg-card border border-[#d4af37]/25 shadow-sm">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">
                Đường Kính Thân Vỏ
              </span>
              <span className="text-base font-bold text-foreground">{watch.specs.diameter}</span>
            </div>

            <div className="p-5 rounded-3xl bg-card border border-[#d4af37]/25 shadow-sm">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">
                Độ Dày Cỗ Máy
              </span>
              <span className="text-base font-bold text-foreground">{watch.specs.thickness}</span>
            </div>

            <div className="p-5 rounded-3xl bg-card border border-[#d4af37]/25 shadow-sm">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">
                Thời Lượng Trữ Cót
              </span>
              <span className="text-base font-bold text-[#d4af37]">{watch.specs.powerReserve}</span>
            </div>

            <div className="p-5 rounded-3xl bg-card border border-[#d4af37]/25 shadow-sm">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">
                Tần Số Dao Động
              </span>
              <span className="text-base font-bold text-foreground">{watch.specs.frequency}</span>
            </div>

            <div className="p-5 rounded-3xl bg-card border border-[#d4af37]/25 shadow-sm">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">
                Số Chân Kính Ruby
              </span>
              <span className="text-base font-bold text-foreground">{watch.specs.jewels}</span>
            </div>

            <div className="p-5 rounded-3xl bg-card border border-[#d4af37]/25 shadow-sm">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">
                Độ Chịu Nước
              </span>
              <span className="text-base font-bold text-foreground">{watch.specs.waterResistance}</span>
            </div>

            <div className="p-5 rounded-3xl bg-card border border-[#d4af37]/25 shadow-sm md:col-span-2">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">
                Mặt Kính & Vành Bezel
              </span>
              <span className="text-xs font-semibold text-foreground block">{watch.specs.crystal} • {watch.specs.bezel}</span>
            </div>

            <div className="p-5 rounded-3xl bg-card border border-[#d4af37]/25 shadow-sm md:col-span-2 lg:col-span-2">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">
                Chất Liệu Thân Vỏ Kim Loại Quý
              </span>
              <span className="text-xs font-semibold text-foreground block">{watch.specs.caseMaterial}</span>
            </div>

            <div className="p-5 rounded-3xl bg-card border border-[#d4af37]/25 shadow-sm md:col-span-2 lg:col-span-2">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">
                Dây Đeo & Khóa An Toàn
              </span>
              <span className="text-xs font-semibold text-foreground block">{watch.specs.strap} — {watch.specs.clasp}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Haute Horlogerie 4 Pillar Craftsmanship */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-12">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.03] border border-[#d4af37]/35 text-[#d4af37] text-xs font-mono uppercase tracking-[0.2em] mb-4">
            <FontAwesomeIcon icon={faHandSparkles} className="w-3.5 h-3.5" />
            <span>Nghệ Thuật Thủ Công Độc Bản</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-foreground">
            Bốn Chuẩn Mực Hoàn Thiện <span className="italic text-[#d4af37]">Bất Hủ</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed font-sans">
            Tại đẳng cấp Haute Horlogerie, mỗi chi tiết dù bị che khuất dưới đáy máy cũng đều được nghệ nhân vát mép và đánh bóng bằng phương pháp truyền thống từ thế kỷ 18.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-7 rounded-3xl bg-card border border-[#d4af37]/25 shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] text-lg mb-5">
                <FontAwesomeIcon icon={faGem} />
              </div>
              <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                Vát Mép Anglage 45°
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-light font-sans">
                Các mép kim loại được gọt vát chính xác 45 độ và đánh bóng gương bằng thanh gỗ gentian wood tạo độ tương phản ánh sáng tuyệt hảo.
              </p>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] mt-6 block">
              100% Thủ Công Bằng Tay
            </span>
          </div>

          <div className="p-7 rounded-3xl bg-card border border-[#d4af37]/25 shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] text-lg mb-5">
                <FontAwesomeIcon icon={faFingerprint} />
              </div>
              <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                Côtes de Genève
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-light font-sans">
                Họa tiết vân sóng lượn song song đặc trưng của ngành chế tác đồng hồ Geneva, phản chiếu ánh quang phổ đa chiều theo góc nghiêng.
              </p>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] mt-6 block">
              Dấu Ấn Thụy Sĩ 1755
            </span>
          </div>

          <div className="p-7 rounded-3xl bg-card border border-[#d4af37]/25 shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] text-lg mb-5">
                <FontAwesomeIcon icon={faBolt} />
              </div>
              <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                Kim Xanh Nung Nhiệt 290°C
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-light font-sans">
                Kim đồng hồ bằng thép được gia nhiệt thủ công tại nhiệt độ chính xác 290°C để tạo lớp oxit xanh coban bảo vệ chống ăn mòn vĩnh cửu.
              </p>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] mt-6 block">
              Màu Xanh Coban Tự Nhiên
            </span>
          </div>

          <div className="p-7 rounded-3xl bg-card border border-[#d4af37]/25 shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] text-lg mb-5">
                <FontAwesomeIcon icon={faAward} />
              </div>
              <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                Chứng Chỉ Geneva Seal
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-light font-sans">
                Triện kiểm định cao quý nhất của bang Geneva, đảm bảo 12 tiêu chuẩn kỹ nghệ khắt khe về độ chính xác và tính mỹ thuật hoàn hảo.
              </p>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] mt-6 block">
              Poinçon de Genève
            </span>
          </div>
        </div>
      </section>

      {/* Section 3: The Royal Presentation Box & VIP Heritage Experience */}
      <section className="py-20 bg-secondary/40 border-t border-[#d4af37]/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.03] border border-[#d4af37]/35 text-[#d4af37] text-xs font-mono uppercase tracking-[0.2em]">
                <FontAwesomeIcon icon={faBoxOpen} className="w-3.5 h-3.5" />
                <span>Nghi Thức Bàn Giao Hoàng Gia</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-foreground leading-tight">
                Hộp Trưng Bày Khánh Tiết & <br className="hidden sm:inline" />
                Bộ Đặc Quyền Toàn Cầu
              </h2>

              <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed font-sans">
                Khi sở hữu cỗ máy thời gian tại Maison Des Montres, quý khách không chỉ nhận được một kiệt tác đồng hồ mà còn là trọn bộ di sản độc quyền dành riêng cho giới thượng lưu.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-card border border-border">
                  <FontAwesomeIcon icon={faCheck} className="w-4 h-4 text-[#d4af37] mt-1 shrink-0" />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-foreground">Hộp Gỗ Sơn Mài Quý Hiếm</h4>
                    <p className="text-xs text-muted-foreground font-light font-sans mt-0.5">
                      Gia công từ gỗ óc chó Thụy Sĩ nguyên khối, lót da cừu xanh lục bảo êm ái chống tĩnh điện.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-card border border-border">
                  <FontAwesomeIcon icon={faCheck} className="w-4 h-4 text-[#d4af37] mt-1 shrink-0" />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-foreground">Kính Lúp Phóng Đại 10x Của Thợ Đồng Hồ</h4>
                    <p className="text-xs text-muted-foreground font-light font-sans mt-0.5">
                      Trang bị kính lúp Bergeon Geneva mạ vàng để chiêm ngưỡng độ tinh xảo của cỗ máy tại tư gia.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-card border border-border">
                  <FontAwesomeIcon icon={faCheck} className="w-4 h-4 text-[#d4af37] mt-1 shrink-0" />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-foreground">Thẻ Bảo Hành Điện Tử NFC & Thư Xác Thực</h4>
                    <p className="text-xs text-muted-foreground font-light font-sans mt-0.5">
                      Thẻ chip NFC mã hóa blockchain Thụy Sĩ kèm thư chúc mừng có chữ ký tay của Giám đốc Showroom.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* VIP Salon Private Invitation Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0c1611] to-[#050a07] text-white border border-[#d4af37]/40 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-[90px] pointer-events-none" />

              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d4af37]">
                  ĐẶC QUYỀN THƯỢNG KHÁCH
                </span>
                <FontAwesomeIcon icon={faWineGlass} className="w-4 h-4 text-[#d4af37]" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mb-3">
                Tiếp Đón Riêng Tư Tại VIP Salon
              </h3>

              <p className="text-xs text-zinc-300 font-light leading-relaxed font-sans mb-8">
                Thưởng thức Champagne Dom Pérignon và lắng nghe chuyên gia đồng hồ Geneva trực tiếp diễn giải lịch sử cỗ máy trong không gian bảo mật tuyệt đối tại Tràng Tiền Plaza hoặc Rex Hotel.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8 text-xs font-mono">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                  <span className="text-zinc-400 block text-[10px]">Hà Nội</span>
                  <span className="font-bold text-white">Metropole Salon</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                  <span className="text-zinc-400 block text-[10px]">TP. Hồ Chí Minh</span>
                  <span className="font-bold text-white">Rex Presidential</span>
                </div>
              </div>

              <button
                onClick={() => {
                  watchAudio.click();
                  setIsVipModalOpen(true);
                }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#b38f28] hover:from-[#e5c158] hover:to-[#c49f32] text-black font-semibold text-xs font-mono uppercase tracking-widest shadow-xl cursor-pointer transition-all"
              >
                Đặt Lịch Hẹn Khánh Tiết VIP Ngay
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Watches Recommendations */}
      {relatedWatches.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 sm:px-12 py-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#d4af37] block mb-2">
                TUYỂN CHỌN TƯƠNG ĐỒNG
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-foreground">
                Những Kiệt Tác Cùng Phân Khúc
              </h3>
            </div>
            <Link
              href="/products"
              className="text-xs font-mono uppercase text-[#d4af37] hover:underline flex items-center gap-1.5"
            >
              <span>Xem Tất Cả Bộ Sưu Tập</span>
              <FontAwesomeIcon icon={faChevronRight} className="w-2.5 h-2.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
            {relatedWatches.map((w) => (
              <ProductCard key={w.id} watch={w} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky Bottom Floating Action Bar on Scroll */}
      {showStickyBar && (
        <aside aria-label="Thanh mua hàng nhanh" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-4xl bg-card/95 backdrop-blur-2xl border border-[#d4af37]/35 px-5 sm:px-8 py-3.5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between gap-4 animate-slideUp">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="relative w-11 h-11 rounded-xl bg-black/40 border border-border p-1 shrink-0 hidden sm:block">
              <Image src={watch.image} alt={watch.name} fill className="object-contain" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-wider block">
                {watch.brand}
              </span>
              <h4 className="font-serif text-sm font-semibold text-foreground truncate max-w-[180px] sm:max-w-xs">
                {watch.name}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right hidden md:block">
              <span className="text-[9px] font-mono uppercase text-muted-foreground block">Giá Niêm Yết</span>
              <span className="font-serif text-base font-bold text-[#d4af37]">
                {formatPrice(watch.priceUSD, watch.priceVND)}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b38f28] hover:from-[#e5c158] hover:to-[#c49f32] text-black font-semibold text-xs font-mono uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer transition-all"
            >
              <FontAwesomeIcon icon={faBagShopping} className="w-3.5 h-3.5" />
              <span>Mua Ngay</span>
            </button>

            <button
              onClick={() => {
                watchAudio.click();
                setIsVipModalOpen(true);
              }}
              className="hidden sm:flex px-4 py-2.5 rounded-full border border-[#d4af37]/40 hover:bg-[#d4af37]/10 text-[#d4af37] text-xs font-mono font-semibold items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FontAwesomeIcon icon={faCalendarCheck} className="w-3 h-3" />
              <span>Đặt VIP Salon</span>
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}
