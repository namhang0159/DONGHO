import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { WATCHES } from "@/data/watches";
import ProductDetailView from "@/components/ProductDetailView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return WATCHES.map((w) => ({
    id: w.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const watch = WATCHES.find((w) => w.id === id);

  if (!watch) {
    return {
      title: "Không Tìm Thấy Kiệt Tác | Maison Des Montres",
      description: "Mẫu đồng hồ không tồn tại trong danh mục bảo tàng.",
    };
  }

  return {
    title: `${watch.name} - ${watch.brand} | Maison Des Montres`,
    description: `${watch.description.slice(0, 160)}... Chính hãng Thụy Sĩ, bảo hành 5 năm toàn cầu.`,
  };
}

async function ProductDetailContent({ params }: PageProps) {
  const { id } = await params;
  const watch = WATCHES.find((w) => w.id === id);

  if (!watch) {
    notFound();
  }

  return <ProductDetailView watch={watch} />;
}

export default function ProductDetailPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center text-[#d4af37] font-mono text-xs">
          <span>Đang tải thông số cỗ máy kiệt tác...</span>
        </div>
      }
    >
      <ProductDetailContent params={params} />
    </Suspense>
  );
}
