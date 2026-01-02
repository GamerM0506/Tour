"use client";

import { useState, useMemo, memo, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Filter, X, ChevronDown, RotateCcw } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Slider } from "@/shared/components/ui/slider";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/shared/components/ui/collapsible";
import { cn } from "@/shared/lib/utils";

const MAX_PRICE = 5000;

// 1. FilterItem: Thiết kế tối giản, tập trung vào Typography
const FilterItem = memo(({ id, label, checked, onChange, color }: any) => (
  <div className="flex items-center space-x-3 group transform-gpu py-1">
    <Checkbox
      id={id}
      checked={checked}
      onCheckedChange={onChange}
      className="border-jet/20 data-[state=checked]:bg-terracotta data-[state=checked]:border-terracotta transition-all duration-300"
    />
    <label
      htmlFor={id}
      className={cn(
        "font-sans text-sm font-medium leading-none cursor-pointer transition-colors duration-300 group-hover:text-terracotta text-jet/70",
        color
      )}
    >
      <span>{label}</span>
    </label>
  </div>
));
FilterItem.displayName = "FilterItem";

export const TourFilters = memo(() => {
  const t = useTranslations("Tours");
  const [priceRange, setPriceRange] = useState([0, MAX_PRICE]);
  const [categories, setCategories] = useState<string[]>([]);
  const [durations, setDurations] = useState<string[]>([]);
  const [difficulties, setDifficulties] = useState<string[]>([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // 2. Dữ liệu Filter: Loại bỏ Icon, chuẩn hóa Label
  const filterData = useMemo(() => ({
    categories: [
      { id: "luxury", label: t("luxury") },
      { id: "adventure", label: t("adventure") },
      { id: "cultural", label: t("cultural") },
      { id: "family", label: t("family") },
      { id: "culinary", label: t("culinary") },
      { id: "beach", label: "Beach" },
      { id: "wellness", label: "Wellness" },
    ],
    durations: [
      { id: "1-3", label: "1-3 Days" },
      { id: "4-7", label: "4-7 Days" },
      { id: "8-14", label: "8-14 Days" },
      { id: "15+", label: "15+ Days" },
    ],
    difficulties: [
      { id: "easy", label: "Easy", color: "text-forest" },
      { id: "moderate", label: "Moderate", color: "text-clay" },
      { id: "challenging", label: "Challenging", color: "text-terracotta" },
    ],
  }), [t]);

  const toggleFilter = useCallback((id: string, type: 'cat' | 'dur' | 'diff') => {
    const setter = type === 'cat' ? setCategories : type === 'dur' ? setDurations : setDifficulties;
    setter(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  }, []);

  const clearAll = useCallback(() => {
    setCategories([]);
    setDurations([]);
    setDifficulties([]);
    setPriceRange([0, MAX_PRICE]);
  }, []);

  const activeCount = categories.length + durations.length + difficulties.length;

  return (
    <>
      {/* Mobile Button - Glassmorphism tối giản */}
      <div className="lg:hidden mb-6 sticky top-20 z-30 transform-gpu">
        <Button
          variant="outline"
          className="w-full justify-between bg-white/90 backdrop-blur-md border-sand/30 shadow-sm h-12 rounded-xl"
          onClick={() => setIsMobileFiltersOpen(true)}
        >
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-terracotta" />
            <span className="font-sans font-bold text-jet uppercase tracking-tight text-xs">Filters</span>
            {activeCount > 0 && <Badge count={activeCount} />}
          </div>
          <ChevronDown className="h-4 w-4 opacity-30" />
        </Button>
      </div>

      {/* Desktop Sidebar - Luxury Layout */}
      <div className="hidden lg:block sticky top-28 self-start w-full">
        <div className="bg-white/80 backdrop-blur-2xl rounded-[2rem] border border-jet/5 p-8 space-y-10 shadow-2xl shadow-sand/20 transform-gpu">

          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl text-jet flex items-center gap-2">
              <Filter className="h-5 w-5 text-terracotta/60" />
              {t("filter_by")}
            </h3>
            {activeCount > 0 && (
              <button
                onClick={clearAll}
                className="text-[10px] uppercase tracking-widest font-bold text-terracotta hover:text-clay transition-all active:scale-95 flex items-center gap-1"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </button>
            )}
          </div>

          {/* Price Slider - Terracotta Accent */}
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <h4 className="font-sans text-[11px] font-bold text-jet uppercase tracking-widest opacity-60">Price Range</h4>
              <span className="font-sans font-bold text-terracotta text-sm">
                ${priceRange[0]} — ${priceRange[1]}
              </span>
            </div>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={MAX_PRICE}
              step={50}
              className="py-2"
            />
          </div>

          {/* Categories */}
          <FilterSection title="Category" defaultOpen>
            <div className="grid grid-cols-1 gap-1">
              {filterData.categories.map((cat) => (
                <FilterItem
                  key={cat.id}
                  id={`cat-${cat.id}`}
                  label={cat.label}
                  checked={categories.includes(cat.id)}
                  onChange={() => toggleFilter(cat.id, 'cat')}
                />
              ))}
            </div>
          </FilterSection>

          {/* Difficulty */}
          <FilterSection title="Difficulty">
            <div className="grid grid-cols-1 gap-1">
              {filterData.difficulties.map((diff) => (
                <FilterItem
                  key={diff.id}
                  id={`diff-${diff.id}`}
                  label={diff.label}
                  checked={difficulties.includes(diff.id)}
                  color={diff.color}
                  onChange={() => toggleFilter(diff.id, 'diff')}
                />
              ))}
            </div>
          </FilterSection>
        </div>
      </div>

      {/* Mobile Drawer - Sand Light Theme */}
      {/* Mobile Drawer - Sand Light Theme */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden animate-in fade-in duration-300">
          {/* Overlay mờ phía sau */}
          <div
            className="absolute inset-0 bg-jet/60 backdrop-blur-sm"
            onClick={() => setIsMobileFiltersOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-sand-light shadow-2xl transform-gpu animate-in slide-in-from-right duration-500 rounded-l-[2.5rem] flex flex-col">
            <div className="p-8 h-full flex flex-col">
              {/* 1. Mobile Header */}
              <div className="flex items-center justify-between mb-10">
                <h3 className="font-serif text-3xl text-jet">Filters</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="rounded-full bg-jet/5 hover:bg-jet/10"
                >
                  <X className="h-5 w-5 text-jet" />
                </Button>
              </div>

              {/* 2. Scrollable Filter Content */}
              <div className="flex-1 overflow-y-auto space-y-10 pr-2 scrollbar-none">

                {/* Price Range Section */}
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <h4 className="font-sans text-[11px] font-bold text-jet uppercase tracking-widest opacity-60">
                      Price Range
                    </h4>
                    <span className="font-sans font-bold text-terracotta text-sm">
                      ${priceRange[0]} — ${priceRange[1]}
                    </span>
                  </div>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={MAX_PRICE}
                    step={50}
                    className="py-2"
                  />
                </div>

                {/* Categories Section */}
                <FilterSection title="Category" defaultOpen>
                  <div className="grid grid-cols-1 gap-2 pt-2">
                    {filterData.categories.map((cat) => (
                      <FilterItem
                        key={cat.id}
                        id={`mob-cat-${cat.id}`}
                        label={cat.label}
                        checked={categories.includes(cat.id)}
                        onChange={() => toggleFilter(cat.id, 'cat')}
                      />
                    ))}
                  </div>
                </FilterSection>

                {/* Duration Section (Mới thêm) */}
                <FilterSection title="Duration">
                  <div className="grid grid-cols-1 gap-2 pt-2">
                    {filterData.durations.map((dur) => (
                      <FilterItem
                        key={dur.id}
                        id={`mob-dur-${dur.id}`}
                        label={dur.label}
                        checked={durations.includes(dur.id)}
                        onChange={() => toggleFilter(dur.id, 'dur')}
                      />
                    ))}
                  </div>
                </FilterSection>

                {/* Difficulty Section */}
                <FilterSection title="Difficulty">
                  <div className="grid grid-cols-1 gap-2 pt-2">
                    {filterData.difficulties.map((diff) => (
                      <FilterItem
                        key={diff.id}
                        id={`mob-diff-${diff.id}`}
                        label={diff.label}
                        checked={difficulties.includes(diff.id)}
                        color={diff.color}
                        onChange={() => toggleFilter(diff.id, 'diff')}
                      />
                    ))}
                  </div>
                </FilterSection>
              </div>

              {/* 3. Mobile Footer - Sticky Apply Button */}
              <div className="mt-auto pt-6 border-t border-jet/5">
                <div className="flex flex-col gap-4">
                  {activeCount > 0 && (
                    <Button
                      variant="ghost"
                      onClick={clearAll}
                      className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-jet/40 hover:text-terracotta"
                    >
                      Reset All Filters
                    </Button>
                  )}
                  <Button
                    className="w-full h-14 rounded-2xl bg-terracotta hover:bg-clay text-white shadow-xl shadow-terracotta/20 transition-all active:scale-95 font-sans font-bold uppercase tracking-[0.15em] text-xs"
                    onClick={() => setIsMobileFiltersOpen(false)}
                  >
                    Show Results ({activeCount > 0 ? activeCount : 'All'})
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

const FilterSection = ({ title, children, defaultOpen = false }: any) => (
  <Collapsible defaultOpen={defaultOpen} className="group/coll">
    <CollapsibleTrigger className="flex w-full items-center justify-between hover:opacity-70 transition-opacity pb-2 border-b border-jet/5">
      <h4 className="font-sans text-[11px] font-bold text-jet uppercase tracking-widest">{title}</h4>
      <ChevronDown className="h-3 w-3 transition-transform duration-500 group-data-[state=open]/coll:rotate-180 opacity-40" />
    </CollapsibleTrigger>
    <CollapsibleContent className="pt-4 space-y-1 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-500">
      {children}
    </CollapsibleContent>
  </Collapsible>
);

const Badge = ({ count }: { count: number }) => (
  <span className="bg-terracotta text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center animate-in zoom-in ring-2 ring-white">
    {count}
  </span>
);

TourFilters.displayName = "TourFilters";