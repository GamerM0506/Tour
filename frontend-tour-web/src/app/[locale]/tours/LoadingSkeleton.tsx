"use client";

const TourCardSkeleton = () => (
  <div className="group bg-white rounded-2xl shadow-sm overflow-hidden border border-jet/5 transform-gpu">
    <div className="relative aspect-3/2 bg-sand/20 animate-pulse" />
    <div className="p-5 space-y-4">
      <div className="flex justify-between items-start gap-4">
        <div className="h-5 bg-sand/20 rounded-md w-2/3 animate-pulse" />
        <div className="h-5 bg-sand/20 rounded-full w-12 animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="h-3.5 bg-sand/10 rounded w-full animate-pulse" />
        <div className="h-3.5 bg-sand/10 rounded w-4/5 animate-pulse" />
      </div>
      <div className="flex justify-between items-end pt-4 border-t border-sand/10">
        <div className="space-y-2">
          <div className="h-3 bg-sand/10 rounded w-12 animate-pulse" />
          <div className="h-6 bg-sand/20 rounded w-20 animate-pulse" />
        </div>
        <div className="h-10 bg-sand/30 rounded-full w-28 animate-pulse" />
      </div>
    </div>
  </div>
);

export const LoadingSkeleton = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-sand/20 rounded-lg animate-pulse" />
          <div className="h-4 w-40 bg-sand/10 rounded-md animate-pulse" />
        </div>
        <div className="h-10 w-32 bg-sand/20 rounded-full animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <TourCardSkeleton key={i} />
        ))}
      </div>
      <div className="flex justify-center items-center gap-3 pt-8">
        <div className="h-10 w-10 bg-sand/10 rounded-full animate-pulse hidden sm:block" />
        <div className="flex gap-2 p-1.5 bg-sand/5 rounded-full border border-sand/10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-9 w-9 bg-sand/20 rounded-full animate-pulse" />
          ))}
        </div>
        <div className="h-10 w-10 bg-sand/10 rounded-full animate-pulse hidden sm:block" />
      </div>
    </div>
  );
};