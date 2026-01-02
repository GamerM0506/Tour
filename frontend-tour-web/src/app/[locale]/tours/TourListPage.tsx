"use client";

import { Suspense } from "react";
import dynamic from 'next/dynamic';
import { TourHero } from "./TourHero";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { cn } from "@/shared/lib/utils";

const TourFilters = dynamic(() => import("./TourFilters").then(mod => mod.TourFilters), {
  ssr: true,
  loading: () => <div className="h-125 w-full animate-pulse bg-sand/10 rounded-2xl border border-sand/20" />
});

const TourGrid = dynamic(() => import("./TourGrid").then(mod => mod.TourGrid), {
  ssr: true,
  loading: () => <LoadingSkeleton />
});

const TourSeoContent = dynamic(() => import("./TourSeoContent").then(mod => mod.TourSeoContent), {
  ssr: true,
});
const MOCK_TOURS = [
  {
    id: "1",
    title: "Luxury Halong Bay Private Cruise",
    description: "Experience the ultimate privacy and luxury amidst the limestone karsts of Halong Bay on our boutique cruise.",
    price: 1250,
    duration: 3,
    durationUnit: "days" as const,
    difficulty: "easy" as const,
    category: "luxury",
    location: "Halong Bay",
    rating: 4.9,
    reviews: 128,
    image: "https://res.cloudinary.com/dcfaz2rme/image/upload/v1767260363/Du-Lich-Vinh-Ha-Long-01_zcblkv.jpg",
    featured: true,
    groupSize: "2-4 people",
    highlights: ["Private Chef", "Sunset Yoga", "Cave Dining"]
  },
  {
    id: "2",
    title: "Sapa Mountain Retreat & Trekking",
    description: "A journey into the heart of the northern highlands, visiting ethnic villages and staying in luxury eco-lodges.",
    price: 850,
    duration: 4,
    category: "adventure",
    location: "Sapa",
    rating: 4.8,
    reviews: 95,
    image: "https://res.cloudinary.com/dcfaz2rme/image/upload/v1767260363/Du-Lich-Vinh-Ha-Long-01_zcblkv.jpg",
    featured: false,
    durationUnit: "days" as const,
    difficulty: "easy" as const,
    groupSize: "Max 6 people",
    highlights: ["Ethic Village Visit", "Fansipan Peak", "Hot Spring"]
  }
];
export const TourListPage = () => {
  return (
    <main className="min-h-screen bg-sand-light/30 transform-gpu">
      <TourHero />

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <aside className="w-full lg:w-1/4 lg:sticky lg:top-28">
            <Suspense fallback={<div className="h-64 animate-pulse bg-sand/20 rounded-2xl" />}>
              <TourFilters />
            </Suspense>
          </aside>

          <div className="w-full lg:w-3/4">
            <Suspense fallback={<LoadingSkeleton />}>
              <TourGrid tours={MOCK_TOURS} />
            </Suspense>
          </div>
        </div>
      </div>

      <Suspense fallback={null}>
        <TourSeoContent />
      </Suspense>
    </main>
  );
};