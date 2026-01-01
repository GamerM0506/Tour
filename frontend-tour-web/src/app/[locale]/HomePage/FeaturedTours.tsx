"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { memo, useMemo } from "react";
import Image from "next/image";
import { Button } from "@/shared/components/ui/button";
import { ArrowRight, Star, MapPin, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";
import cloudinaryLoader from "@/core/utils/cloudinary-loader";
import { CldImage } from "next-cloudinary";

const TOURS_DATA = (t: any) => [
  {
    id: 1,
    title: "Halong Bay Luxury Cruise",
    description: "3-day luxury cruise through UNESCO World Heritage site",
    price: "$1,200",
    duration: "3 Days",
    location: "Quang Ninh",
    rating: 4.9,
    image: "Du-Lich-Vinh-Ha-Long-01_zcblkv",
    category: "Luxury"
  },
  {
    id: 2,
    title: "Sapa Trekking Adventure",
    description: "Authentic hill tribe villages and rice terraces",
    price: "$850",
    duration: "4 Days",
    location: "Sapa",
    rating: 4.8,
    image: "Du-Lich-Vinh-Ha-Long-01_zcblkv",
    category: "Adventure"
  },
  {
    id: 3,
    title: "Hoi An Cultural Immersion",
    description: "Ancient town exploration and cooking classes",
    price: "$950",
    duration: "5 Days",
    location: "Hoi An",
    rating: 4.9,
    image: "Du-Lich-Vinh-Ha-Long-01_zcblkv",
    category: "Cultural"
  },
];

export const FeaturedTours = memo(() => {
  const t = useTranslations("Home");
  const tours = useMemo(() => TOURS_DATA(t), [t]);

  return (
    <section
      className="py-24 bg-sand-light transform-gpu"
      style={{ contain: 'content' }}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 transform-gpu"
        >
          <span className="inline-block px-4 py-2 bg-terracotta/10 text-terracotta rounded-full text-sm font-medium mb-4">
            {t("featured_tours") || "Featured Experiences"}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-jet mb-6 tracking-tight">
            {t("discover_vietnam") || "Discover Vietnam's Hidden Gems"}
          </h2>
          <p className="font-sans text-xl text-jet/60 leading-relaxed">
            {t("tours_description") || "Curated journeys designed for the discerning traveler seeking authentic experiences."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {tours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group transform-gpu will-change-transform"
            >
              <Link href={`/tours/${tour.id}`} className="block h-full">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col border border-jet/5">
                  <div className="relative h-64 overflow-hidden transform-gpu">
                  <CldImage
  src={tour.image}
  alt={tour.title}
  width={480}
  height={320}
  crop="fill"
  gravity="auto"
  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
  quality="auto"
  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
/>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full z-10">
                      <span className="text-xs font-bold tracking-widest text-jet uppercase">{tour.category}</span>
                    </div>
                  </div>

                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-4 gap-2">
                      <h3 className="font-serif text-2xl text-jet group-hover:text-terracotta transition-colors line-clamp-1">
                        {tour.title}
                      </h3>
                      <div className="flex items-center gap-1 shrink-0 bg-sand/20 px-2 py-1 rounded-lg">
                        <Star className="h-3.5 w-3.5 fill-terracotta text-terracotta" />
                        <span className="font-bold text-sm text-jet">{tour.rating}</span>
                      </div>
                    </div>

                    <p className="font-sans text-jet/60 mb-8 line-clamp-2 text-sm leading-relaxed">
                      {tour.description}
                    </p>

                    <div className="grid grid-cols-3 gap-2 mb-8 border-y border-jet/5 py-4">
                      <div className="flex flex-col items-center gap-1">
                        <MapPin className="h-4 w-4 text-terracotta" />
                        <span className="text-[10px] uppercase tracking-tighter font-bold text-jet/40">{tour.location}</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 border-x border-jet/5">
                        <Clock className="h-4 w-4 text-terracotta" />
                        <span className="text-[10px] uppercase tracking-tighter font-bold text-jet/40">{tour.duration}</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Users className="h-4 w-4 text-terracotta" />
                        <span className="text-[10px] uppercase tracking-tighter font-bold text-jet/40">Small Group</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4">
                      <div>
                        <div className="text-2xl font-bold text-terracotta">{tour.price}</div>
                        <div className="text-[10px] uppercase tracking-widest text-jet/40">per person</div>
                      </div>
                      <div className="flex items-center gap-2 text-jet font-bold text-sm group-hover:text-terracotta transition-colors">
                        <span>Details</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-jet text-sand px-12 py-7 rounded-full text-lg hover:bg-terracotta transition-all duration-300 transform-gpu active:scale-95 shadow-xl"
            asChild
          >
            <Link href="/tours">
              <span>{t("view_all_tours") || "View All Experiences"}</span>
              <ArrowRight className="ml-3 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
});

FeaturedTours.displayName = "FeaturedTours";