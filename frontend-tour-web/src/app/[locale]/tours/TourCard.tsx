"use client";

import { memo } from "react";
import { CldImage } from "next-cloudinary"; 
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Star, MapPin, Clock, Users, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/lib/utils";

interface TourCardProps {
  tour: {
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
  };
  viewMode: "grid" | "list";
}

const CATEGORY_COLORS: Record<string, string> = {
  luxury: "bg-amber-50 text-amber-700 border-amber-200",
  adventure: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cultural: "bg-blue-50 text-blue-700 border-blue-200",
  family: "bg-pink-50 text-pink-700 border-pink-200",
  culinary: "bg-orange-50 text-orange-700 border-orange-200",
  beach: "bg-cyan-50 text-cyan-700 border-cyan-200",
  wellness: "bg-purple-50 text-purple-700 border-purple-200",
};

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "bg-green-100 text-green-800/80 border-green-200",
  moderate: "bg-yellow-100 text-yellow-800/80 border-yellow-200",
  challenging: "bg-red-100 text-red-800/80 border-red-200",
};

export const TourCard = memo(({ tour, viewMode }: TourCardProps) => {
  const t = useTranslations("Common");
  const isListView = viewMode === "list";

  const blurDataURL = `https://res.cloudinary.com/dcfaz2rme/image/upload/v1767260363/Du-Lich-Vinh-Ha-Long-01_zcblkv.jpg`;

  const CardWrapper = ({ children }: { children: React.ReactNode }) => (
    <Card className={cn(
      "overflow-hidden group transition-all duration-300 hover:shadow-lg transform-gpu",
      isListView ? "flex flex-col lg:flex-row" : "h-full flex flex-col"
    )}>
      {children}
    </Card>
  );

  const ImageSection = () => (
    <div className={cn(
      "relative overflow-hidden bg-sand/10", 
      isListView ? "lg:w-1/3 h-64 lg:h-auto aspect-4/3 lg:aspect-auto" : "aspect-4/3 w-full"
    )}>
      <CldImage
        src={tour.image}
        alt={`${tour.title} - Luxury Vietnam Tour`}
        fill
        crop="fill"
        gravity="auto"
        sizes={isListView 
          ? "(max-width: 1024px) 100vw, 33vw" 
          : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
        className="object-cover transition-transform duration-700 group-hover:scale-105 transform-gpu"
        placeholder="blur"
        blurDataURL={blurDataURL}
      />
    
      <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
        {tour.featured && (
          <Badge className="bg-linear-to-r from-terracotta to-clay text-white border-0 shadow-sm">
            <Sparkles className="h-3 w-3 mr-1" /> Featured
          </Badge>
        )}
        {!isListView && (
           <Badge variant="outline" className="bg-white/90 backdrop-blur-sm border-white/50">
             {tour.category}
           </Badge>
        )}
      </div>

       {!isListView && (
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 shadow-sm z-10">
          <Star className="h-3 w-3 fill-terracotta text-terracotta" />
          <span className="font-semibold text-sm">{tour.rating}</span>
        </div>
       )}
    </div>
  );

  const ContentSection = () => (
    <CardContent className={cn(
      "p-4 sm:p-6 flex flex-col flex-1",
      isListView && "lg:w-2/3"
    )}>
      <div className="space-y-3 flex-1">
        {/* Header Info (List View only) */}
        {isListView && (
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={CATEGORY_COLORS[tour.category]}>
              {tour.category}
            </Badge>
            <Badge variant="outline" className={DIFFICULTY_COLORS[tour.difficulty]}>
              {tour.difficulty}
            </Badge>
          </div>
          <div className="flex items-center gap-1 bg-sand/30 px-2 py-1 rounded-full text-sm">
            <Star className="h-3.5 w-3.5 fill-terracotta text-terracotta" />
            <span className="font-semibold">{tour.rating}</span>
            <span className="text-muted-foreground">({tour.reviews})</span>
          </div>
        </div>
        )}

        {/* Title */}
        <Link href={`/tours/${tour.id}`} className="group/title block">
          <h3 className={cn(
            "font-serif text-foreground group-hover/title:text-terracotta transition-colors line-clamp-2 leading-tight",
            isListView ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
          )}>
            {tour.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {tour.description}
        </p>

        {/* Info Icons */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground pt-1">
          <div className="flex items-center gap-1.5 min-w-fit">
            <MapPin className="h-4 w-4 text-terracotta/80" />
            <span className="truncate">{tour.location}</span>
          </div>
          <div className="flex items-center gap-1.5 min-w-fit">
            <Clock className="h-4 w-4 text-terracotta/80" />
            <span>{tour.duration} {tour.durationUnit === 'days' ? t('days') : t('nights')}</span>
          </div>
          {isListView && (
          <div className="flex items-center gap-1.5 min-w-fit">
             <Users className="h-4 w-4 text-terracotta/80" />
             <span>{tour.groupSize}</span>
          </div>
          )}
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {tour.highlights.slice(0, isListView ? 3 : 2).map((highlight, index) => (
            <span key={index} className="text-[11px] font-medium text-muted-foreground/80 bg-sand/30 border border-sand/20 px-2 py-0.5 rounded-full">
              {highlight}
            </span>
          ))}
        </div>
      </div>

      {/* Footer - Price & CTA */}
      <div className="pt-4 mt-4 border-t border-sand/20 flex items-end justify-between gap-4">
        <div>
          <div className={cn(
            "font-bold text-terracotta leading-none",
            isListView ? "text-2xl" : "text-xl"
          )}>
            ${tour.price.toLocaleString()}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mt-1">
            {t("per_person")}
          </div>
        </div>
        
        <Button asChild variant={isListView ? "default" : "outline"} size="sm" className="group/btn rounded-full transform-gpu active:scale-95 transition-all">
          <Link href={`/tours/${tour.id}`}>
            <span className={cn(!isListView && "hidden sm:inline")}>
              {isListView ? "View Details" : "Details"}
            </span>
            <ArrowRight className={cn("h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1", isListView ? "ml-2" : "sm:ml-1.5")} />
          </Link>
        </Button>
      </div>
    </CardContent>
  );

  return (
    <CardWrapper>
      <ImageSection />
      <ContentSection />
    </CardWrapper>
  );
});

TourCard.displayName = "TourCard";