"use client";

import { memo } from "react";
import { m } from "framer-motion"; // Sử dụng phiên bản rút gọn từ LazyMotion
import { CheckCircle2, Map, ShieldCheck, Leaf } from "lucide-react";
import { cn } from "@/shared/lib/utils";

// 1. Tối ưu hóa render: Memoize nội dung tĩnh để tránh re-render
export const TourSeoContent = memo(() => {
  const fadeInUp = {
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
    <section
      className="bg-linear-to-b from-sand/5 to-white py-20 border-t border-sand/10"
      // 2. CSS Optimization: Giúp trình duyệt bỏ qua việc render nếu chưa cuộn tới
      style={{ contentVisibility: 'auto', containIntrinsicSize: '500px' }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto"
        >
          {/* Header Section */}
          <m.div variants={fadeInUp} className="text-center mb-16 space-y-4">
            <h2 className="font-serif text-3xl md:text-5xl text-jet leading-tight">
              Discover Vietnam with <br />
              <span className="text-terracotta italic">Random Tailored Tours</span>
            </h2>
            <div className="w-24 h-1 bg-terracotta/20 mx-auto rounded-full" />
            <p className="text-jet/70 text-lg max-w-3xl mx-auto leading-relaxed">
              At Random Tailored Tours, we believe that travel should be transformative,
              not transactional. Each journey is meticulously crafted to showcase the
              authentic beauty and rich cultural heritage of Vietnam.
            </p>
          </m.div>

          {/* Info Grid - Tối ưu GPU cho các card */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <m.div variants={fadeInUp} className="space-y-6 bg-white p-8 rounded-3xl shadow-xs border border-sand/20 transform-gpu">
              <h3 className="font-serif text-2xl text-terracotta flex items-center gap-3">
                <ShieldCheck className="h-6 w-6" /> Why Choose Our Tours
              </h3>
              <ul className="space-y-4">
                <FeatureItem text="100% personalized itineraries tailored to your preferences" />
                <FeatureItem text="Expert local guides with deep cultural knowledge" />
                <FeatureItem text="Premium accommodations and transportation" />
              </ul>
            </m.div>

            <m.div variants={fadeInUp} className="space-y-6 bg-white p-8 rounded-3xl shadow-xs border border-sand/20 transform-gpu">
              <h3 className="font-serif text-2xl text-terracotta flex items-center gap-3">
                <Map className="h-6 w-6" /> Popular Destinations
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <DestinationItem title="Halong Bay" desc="UNESCO World Heritage cruise experience" />
                <DestinationItem title="Sapa" desc="Mountain trekking & hill tribe culture" />
                <DestinationItem title="Hoi An" desc="Ancient town & culinary adventures" />
              </div>
            </m.div>
          </div>

          {/* Bottom CTA Box - Luxury Shadow */}
          <m.div
            variants={fadeInUp}
            className="bg-jet text-white p-10 rounded-[2.5rem] shadow-2xl shadow-jet/20 relative overflow-hidden group"
          >
            <div className="relative z-10">
              <h3 className="font-serif text-3xl mb-4">Ready for Your Vietnamese Adventure?</h3>
              <p className="text-white/70 mb-8 max-w-2xl text-lg">
                Contact our travel specialists to create the perfect itinerary
                that matches your interests, pace, and budget.
              </p>

              <div className="flex flex-wrap gap-3">
                <BadgeItem icon="🏆" text="Best Price Guarantee" />
                <BadgeItem icon="🤝" text="24/7 Local Support" />
                <BadgeItem icon={<Leaf className="h-3 w-3" />} text="Sustainable Tourism" />
              </div>
            </div>
            {/* Trang trí vệt sáng luxury */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          </m.div>
        </m.div>
      </div>
    </section>
  );
});

const FeatureItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-3 text-jet/70 group">
    <CheckCircle2 className="h-5 w-5 text-terracotta mt-0.5 shrink-0 transition-transform group-hover:scale-110" />
    <span className="text-sm sm:text-base leading-relaxed">{text}</span>
  </li>
);

const DestinationItem = ({ title, desc }: { title: string; desc: string }) => (
  <div className="border-b border-sand/10 pb-3 last:border-0 group">
    <h4 className="font-bold text-jet group-hover:text-terracotta transition-colors">{title}</h4>
    <p className="text-sm text-jet/60">{desc}</p>
  </div>
);

const BadgeItem = ({ icon, text }: { icon: any; text: string }) => (
  <div className="px-5 py-2.5 bg-white/10 backdrop-blur-md text-white/90 rounded-full text-xs sm:text-sm flex items-center gap-2 border border-white/10 hover:bg-white/20 transition-all cursor-default">
    {typeof icon === 'string' ? <span>{icon}</span> : icon}
    <span className="font-medium tracking-wide">{text}</span>
  </div>
);

TourSeoContent.displayName = "TourSeoContent";