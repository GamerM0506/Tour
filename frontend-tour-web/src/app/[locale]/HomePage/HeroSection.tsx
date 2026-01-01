"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { memo } from "react";
import { Button } from "@/shared/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { CldImage } from 'next-cloudinary';
export const HeroSection = memo(() => {
  const t = useTranslations("Home");

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 transform-gpu"
      style={{ contain: 'layout' }}
    >
      <div className="absolute inset-0 z-0">
        <CldImage
          src="508238823_750133594204746_4543110537008459001_n_uxwl8t"
          alt="Vietnam Luxury Travel - Random Tailored Tours"
          fill
          sizes="100vw"
          quality="auto"
          format="auto"
          className="object-cover scale-105 transform-gpu"
          dpr="auto"
        />
        <div className="absolute inset-0 bg-linear-to-b from-jet/70 via-jet/50 to-jet/30 backdrop-grayscale-[0.2]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-sand/10 backdrop-blur-md border border-sand/20 rounded-full px-6 py-3 mb-8 transform-gpu"
          >
            <Sparkles className="h-4 w-4 text-terracotta" />
            <span className="font-sans text-xs md:text-sm text-sand tracking-[0.3em] uppercase font-bold">
              {t("hero_tagline")}
            </span>
          </motion.div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl text-sand-light mb-6 leading-[0.9] tracking-tighter">
            <span className="block animate-in fade-in slide-in-from-bottom-4 duration-700">Random</span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="block italic text-terracotta transform-gpu will-change-transform"
            >
              Tailored Tours
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-sans text-lg md:text-xl text-sand/80 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {t("hero_description")}
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center transform-gpu">
            <Button
              size="lg"
              className="bg-linear-to-r from-terracotta to-clay text-white px-10 py-8 rounded-full text-lg 
                           hover:shadow-[0_0_30px_rgba(196,106,74,0.4)] transition-all duration-500 
                           group active:scale-95 will-change-transform"
              asChild
            >
              <Link href="/tours">
                <span>{t("explore_tours")}</span>
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </Button>

            <Link href="/about" className="text-sand border-b border-sand/30 pb-1 hover:border-terracotta transition-colors text-sm tracking-widest uppercase font-bold">
              {t("our_story") || "Our Story"}
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-sand-light to-transparent z-20" />
    </section>
  );
});

HeroSection.displayName = "HeroSection";