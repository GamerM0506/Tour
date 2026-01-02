"use client";

import { memo, useMemo } from "react";
import { Button } from "@/shared/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isPending?: boolean;
}

export const Pagination = memo(({
  currentPage,
  totalPages,
  onPageChange,
  isPending = false
}: PaginationProps) => {

  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  }, [currentPage, totalPages]);
  if (totalPages <= 1) return null;

  return (
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      className={cn(
        "flex items-center justify-center gap-1 sm:gap-2 py-10 transition-opacity duration-300",
        isPending ? "opacity-50 pointer-events-none" : "opacity-100"
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isPending}
        className="rounded-full hover:bg-sand/20 transition-all transform-gpu active:scale-90"
        aria-label="Go to previous page"
      >
        <ChevronLeft className="h-5 w-5 text-jet/70" />
      </Button>

      <div className="flex items-center gap-1 sm:gap-1.5 min-h-10">
        {pageNumbers.map((page, index) => (
          page === '...' ? (
            <div
              key={`ellipsis-${index}`}
              className="flex h-10 w-10 items-center justify-center text-muted-foreground/50"
            >
              <MoreHorizontal className="h-4 w-4" />
            </div>
          ) : (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "ghost"}
              size="sm"
              onClick={() => onPageChange(page as number)}
              className={cn(
                "rounded-full min-w-10 h-10 text-sm font-medium transition-all duration-300 transform-gpu active:scale-95",
                currentPage === page
                  ? "bg-linear-to-r from-terracotta to-clay text-white shadow-lg shadow-terracotta/20 scale-105"
                  : "hover:bg-sand/30 text-jet/70 hover:text-jet"
              )}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </Button>
          )
        ))}
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isPending}
        className="rounded-full hover:bg-sand/20 transition-all transform-gpu active:scale-90"
        aria-label="Go to next page"
      >
        <ChevronRight className="h-5 w-5 text-jet/70" />
      </Button>
    </nav>
  );
});

Pagination.displayName = "Pagination";