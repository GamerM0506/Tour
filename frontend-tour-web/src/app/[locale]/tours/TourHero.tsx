"use client";

import { useTranslations } from "next-intl";
import { CldImage } from "next-cloudinary"; // Tối ưu ảnh Cloudinary
import { m } from "framer-motion"; // Sử dụng LazyMotion từ Layout
import { cn } from "@/shared/lib/utils";

export const TourHero = () => {
  const t = useTranslations("Tours");
  
  // Hiệu ứng xuất hiện mượt mà (Stagger children)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] as const // Thêm dòng này
    } 
  }
};

  return (
    <section className="relative h-[70vh] sm:h-[80vh] w-full flex items-center overflow-hidden bg-jet">
      <div className="absolute inset-0 z-0 transform-gpu">
        <CldImage
          src="tours/hero-bg" 
          alt="Vietnam luxury tours - Random Tailored Tours"
          fill
          fetchPriority="high" 
          crop="fill"
          gravity="auto"
          sizes="100vw"
          quality={85}
          className="object-cover object-center"
          placeholder="blur"
          blurDataURL="https://res.cloudinary.com/dcfaz2rme/image/upload/v1767260363/Du-Lich-Vinh-Ha-Long-01_zcblkv.jpg"
        />
        <div className="absolute inset-0 bg-linear-to-r from-jet/90 via-jet/50 to-transparent" />
      </div>
      
      {/* 2. CONTENT: Hiệu ứng Luxury không block UI */}
      <m.div 
        className="container mx-auto px-4 sm:px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl">
          <m.div variants={itemVariants} className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
            <span className="font-sans text-[10px] sm:text-xs text-white/90 tracking-[0.2em] uppercase font-bold">
              Exclusive Vietnam Experiences
            </span>
          </m.div>
          
          <m.h1 
            variants={itemVariants}
            className="font-serif text-5xl sm:text-7xl md:text-8xl text-white mb-6 leading-[1.1] tracking-tight"
          >
            Vietnam <br />
            <span className="italic text-sand-light font-light drop-shadow-sm">Tailored Journeys</span>
          </m.h1>
          
          <m.p 
            variants={itemVariants}
            className="font-sans text-lg sm:text-xl text-white/70 mb-10 max-w-2xl leading-relaxed"
          >
            {t("all_experiences") || "Discover handcrafted journeys through Vietnam's most captivating landscapes and cultural treasures."}
          </m.p>
        </div>
      </m.div>
      
      {/* 3. SCROLL INDICATOR: GPU Accelerated */}
      <m.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transform-gpu"
      >
        <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold rotate-90 mb-8 origin-left">Scroll</span>
        <div className="w-[1px] h-16 bg-linear-to-b from-terracotta to-transparent" />
      </m.div>

      {/* Trang trí: Thêm vệt sáng Luxury */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-white/5 to-transparent pointer-events-none" />
    </section>
  );
};