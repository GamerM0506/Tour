"use client";

import { useState, useMemo, memo, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Grid, List, Compass } from "lucide-react";
import { Pagination } from "./Pagination";
import { TourCard } from "./TourCard";
import { cn } from "@/shared/lib/utils";
import { m, AnimatePresence } from "framer-motion"; // Sử dụng LazyMotion từ layout

interface Tour {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  durationUnit: "days" | "nights";
  category: string;
  location: string;
  rating: number;
  reviews: number;
  image: string;
  featured: boolean;
  difficulty: "easy" | "moderate" | "challenging";
  groupSize: string;
  highlights: string[];
}

interface TourGridProps {
  tours: Tour[];
}

export const TourGrid = memo(({ tours }: TourGridProps) => {
  const t = useTranslations("Common");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [isPending, startTransition] = useTransition(); // Tối ưu React 19: Chuyển trang không block UI
  
  const toursPerPage = 9;

  // 1. Tối ưu hóa tính toán: Chỉ tính lại khi tours hoặc trang thay đổi
  const { currentTours, totalPages } = useMemo(() => {
    const start = (currentPage - 1) * toursPerPage;
    return {
      currentTours: tours.slice(start, start + toursPerPage),
      totalPages: Math.ceil(tours.length / toursPerPage)
    };
  }, [tours, currentPage]);

  const handlePageChange = (page: number) => {
    startTransition(() => {
      setCurrentPage(page);
      // Cuộn lên đầu danh sách mượt mà khi đổi trang
      window.scrollTo({ top: 400, behavior: 'smooth' });
    });
  };

  if (tours.length === 0) {
    return (
      <m.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="text-center py-20 bg-sand/10 rounded-3xl border border-dashed border-sand/30"
      >
        <Compass className="h-16 w-16 mx-auto mb-4 text-sand-dark animate-pulse" />
        <h3 className="font-serif text-2xl text-jet mb-2">No tours found</h3>
        <p className="text-jet/60">Try adjusting your filters or search terms</p>
      </m.div>
    );
  }

  return (
    <div className="w-full">
      {/* 2. Toolbar: Tối ưu tương tác với transform-gpu */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 transform-gpu">
        <p className="font-sans text-jet/70 text-sm">
          Showing <span className="font-bold text-jet text-base">{tours.length}</span> luxury experiences
        </p>
        
        <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm border border-sand/20 rounded-full p-1.5 shadow-sm">
          <ViewButton 
            active={viewMode === "grid"} 
            onClick={() => setViewMode("grid")} 
            icon={<Grid className="h-4 w-4" />} 
          />
          <ViewButton 
            active={viewMode === "list"} 
            onClick={() => setViewMode("list")} 
            icon={<List className="h-4 w-4" />} 
          />
        </div>
      </div>

      {/* 3. Grid Body: Lazy loading hiệu ứng xuất hiện */}
      <div className={cn(
        "transition-all duration-500",
        isPending ? "opacity-40 grayscale-[0.5]" : "opacity-100"
      )}>
        <div className={cn(
          "grid gap-6 sm:gap-8 mb-12 transform-gpu",
          viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        )}>
          <AnimatePresence mode="popLayout">
            {currentTours.map((tour, index) => (
              <m.div
                key={tour.id}
                layout // Tối ưu chuyển đổi Grid sang List cực mượt
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.05, // Stagger effect luxury
                  ease: "easeOut" 
                }}
              >
                <TourCard tour={tour} viewMode={viewMode} />
              </m.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* 4. Pagination: Tối ưu hóa điều hướng */}
      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isPending={isPending}
        />
      )}
    </div>
  );
});

// Helper component cho nút chuyển View
const ViewButton = ({ active, onClick, icon }: { active: boolean, onClick: () => void, icon: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={cn(
      "p-2 rounded-full transition-all duration-300 transform-gpu active:scale-90",
      active ? "bg-terracotta text-white shadow-md shadow-terracotta/20" : "text-jet/50 hover:text-terracotta hover:bg-sand/20"
    )}
  >
    {icon}
  </button>
);

TourGrid.displayName = "TourGrid";