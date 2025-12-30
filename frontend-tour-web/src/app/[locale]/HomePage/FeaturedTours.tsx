"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/shared/components/ui/button";
import { ArrowRight, Star, MapPin, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";

export const FeaturedTours = () => {
  const t = useTranslations("Home");

  const tours = [
    {
      id: 1,
      title: "Halong Bay Luxury Cruise",
      description: "3-day luxury cruise through UNESCO World Heritage site",
      price: "$1,200",
      duration: "3 Days",
      location: "Quang Ninh",
      rating: 4.9,
      image: "/halong.jpg",
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
      image: "/halong.jpg",
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
      image: "/halong.jpg",
      category: "Cultural"
    },
  ];

  return (
    <section className="py-24 bg-sand-light">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 bg-terracotta/10 text-terracotta rounded-full text-sm font-medium mb-4">
            {t("featured_tours") || "Featured Experiences"}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-jet mb-6">
            {t("discover_vietnam") || "Discover Vietnam's Hidden Gems"}
          </h2>
          <p className="font-sans text-xl text-jet/60">
            {t("tours_description") || "Curated journeys designed for the discerning traveler seeking authentic experiences."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {tours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/tours/${tour.id}`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                      <span className="text-sm font-medium text-jet">{tour.category}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-serif text-2xl text-jet group-hover:text-terracotta transition-colors">
                        {tour.title}
                      </h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-terracotta text-terracotta" />
                        <span className="font-semibold text-jet">{tour.rating}</span>
                      </div>
                    </div>

                    <p className="font-sans text-jet/60 mb-6 line-clamp-2">
                      {tour.description}
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-terracotta" />
                        <span className="text-sm text-jet/70">{tour.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-terracotta" />
                        <span className="text-sm text-jet/70">{tour.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-terracotta" />
                        <span className="text-sm text-jet/70">Small Group</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-jet/10">
                      <div>
                        <div className="text-2xl font-bold text-terracotta">{tour.price}</div>
                        <div className="text-sm text-jet/50">per person</div>
                      </div>
                      <Button variant="ghost" className="group/btn">
                        <span className="group-hover/btn:text-terracotta">Details</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-2 transition-transform" />
                      </Button>
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
            className="bg-linear-to-r from-terracotta to-clay text-white px-10 py-6 rounded-full text-lg hover:shadow-xl hover:shadow-terracotta/20 transition-all duration-300 group"
            asChild
          >
            <Link href="/tours">
              <span>{t("view_all_tours") || "View All Experiences"}</span>
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};