"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/shared/components/ui/button";
import { ArrowRight, Compass, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const t = useTranslations("Home");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/dcfaz2rme/image/upload/f_auto,q_auto/v1767089103/508238823_750133594204746_4543110537008459001_n_uxwl8t.jpg"
          alt="Vietnam Luxury Travel"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-jet/70 via-jet/50 to-jet/30" />
      </div>

      <div className="absolute top-1/4 left-10 w-32 h-32 bg-terracotta/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-olive/10 rounded-full blur-3xl animate-pulse" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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
              {t("hero_tagline") || "Premium Tailored Experiences"}
            </span>
          </motion.div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-sand-light mb-6 leading-tight">
            <span className="block">Random</span>
            <span className="block italic">Tailored Tours</span>
          </h1>

          <p className="font-sans text-xl text-sand/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t("hero_description") || "Crafting unique, personalized journeys through Vietnam's hidden gems and cultural treasures."}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button
              size="lg"
              className="bg-linear-to-r from-terracotta to-clay text-white px-10 py-7 rounded-full text-lg hover:shadow-2xl hover:shadow-terracotta/30 transition-all duration-300 group"
              asChild
            >
              <Link href="/tours">
                <span>{t("explore_tours") || "Explore Tours"}</span>
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-sand/30 text-sand px-10 py-7 rounded-full text-lg hover:bg-sand/10 hover:border-sand/50 transition-all duration-300"
              asChild
            >
              <Link href="/about">
                <Compass className="mr-3 h-5 w-5" />
                <span>{t("learn_more") || "Our Story"}</span>
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-sand/20"
          >
            {[
              { value: "500+", label: t("stats_tours") || "Tailored Tours" },
              { value: "98%", label: t("stats_satisfaction") || "Client Satisfaction" },
              { value: "50+", label: t("stats_destinations") || "Destinations" },
              { value: "24/7", label: t("stats_support") || "Premium Support" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-serif text-3xl md:text-4xl text-terracotta mb-2">{stat.value}</div>
                <div className="font-sans text-sm text-sand/60 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-sand/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-sand/50 rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};