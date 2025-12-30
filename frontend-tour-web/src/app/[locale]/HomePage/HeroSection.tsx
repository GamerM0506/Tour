"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/shared/components/ui/button";
import { ArrowRight, Compass, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import cloudinaryLoader from "@/core/utils/cloudinary-loader";

export const HeroSection = () => {
  const t = useTranslations("Home");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <Image
          loader={cloudinaryLoader}
          src="508238823_750133594204746_4543110537008459001_n_uxwl8t.jpg"
          alt="Vietnam Luxury Travel - Random Tailored Tours"
          fill
          priority // Ưu tiên tải ngay lập tức
          fetchPriority="high" // Ép trình duyệt tải ảnh này trước tất cả
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-jet/70 via-jet/50 to-jet/30" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Container chính: Bỏ opacity: 0 để text hiện ngay, tránh trễ LCP */}
        <motion.div
          initial={{ y: 20 }} 
          animate={{ y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-sand/10 backdrop-blur-sm border border-sand/20 rounded-full px-6 py-3 mb-8"
          >
            <Sparkles className="h-4 w-4 text-terracotta" />
            <span className="font-sans text-sm text-sand tracking-widest uppercase">
              {t("hero_tagline")}
            </span>
          </motion.div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-sand-light mb-6 leading-tight">
            <span className="block">Random</span>
            <motion.span
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="block italic text-terracotta"
            >
              Tailored Tours
            </motion.span>
          </h1>

          <p className="font-sans text-xl text-sand/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t("hero_description")}
          </p>

          {/* Nút bấm & Stats: Giảm delay để Speed Index đạt mức xanh */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button size="lg" className="bg-linear-to-r from-terracotta to-clay text-white px-10 py-7 rounded-full text-lg" asChild>
              <Link href="/tours">
                <span>{t("explore_tours")}</span>
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }} // Giảm delay từ 0.6 xuống 0.3
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-sand/20"
          >
            {/* Stats items... */}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};