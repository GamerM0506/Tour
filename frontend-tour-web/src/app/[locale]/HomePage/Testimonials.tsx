"use client";

import { memo, useMemo } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import cloudinaryLoader from "@/core/utils/cloudinary-loader";
import { CldImage } from "next-cloudinary";

interface Testimonial {
    id: number;
    name: string;
    location: string;
    text: string;
    rating: number;
    image: string; // Cloudinary Public ID
    tour: string;
}

const TESTIMONIALS_DATA = (t: any): Testimonial[] => [
    {
        id: 1,
        name: "Sarah & James",
        location: "New York, USA",
        text: t("testimonial1_text") || "Our Vietnam tour was perfectly tailored to our interests. The local experiences were unforgettable.",
        rating: 5,
        image: "268f7145b90916291841afdb3816406d_duhbuz", 
        tour: "Halong Luxury Cruise"
    },
    {
        id: 2,
        name: "Michael Chen",
        location: "Singapore",
        text: t("testimonial2_text") || "Professional service and attention to detail. Every moment felt special and well-planned.",
        rating: 5,
        image: "268f7145b90916291841afdb3816406d_duhbuz",
        tour: "Sapa Adventure"
    },
    {
        id: 3,
        name: "The Wilson Family",
        location: "London, UK",
        text: t("testimonial3_text") || "Perfect family vacation! The kids loved the cultural activities and the food was incredible.",
        rating: 5,
        image: "268f7145b90916291841afdb3816406d_duhbuz",
        tour: "Vietnam Family Journey"
    },
];

export const Testimonials = memo(() => {
    const t = useTranslations("Home");
    const testimonials = useMemo(() => TESTIMONIALS_DATA(t), [t]);

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
                    <span className="inline-block px-4 py-2 bg-terracotta/10 text-terracotta rounded-full text-sm font-medium mb-4 uppercase tracking-widest">
                        {t("testimonials") || "Traveler Stories"}
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl text-jet mb-6">
                        {t("testimonials_title") || "What Our Travelers Say"}
                    </h2>
                    <p className="font-sans text-xl text-jet/60">
                        {t("testimonials_desc") || "Join thousands of satisfied travelers who've experienced Vietnam with us."}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="relative group transform-gpu will-change-transform"
                        >
                            <div className="absolute -top-4 -left-4 z-10 opacity-30 group-hover:scale-110 transition-transform duration-500 transform-gpu">
                                <Quote className="h-10 w-10 text-terracotta" aria-hidden="true" />
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 h-full relative z-0 flex flex-col border border-jet/5">
                                <div className="flex mb-6 gap-1">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-4 w-4 fill-terracotta text-terracotta"
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>

                                <p className="font-serif text-lg text-jet mb-8 italic leading-relaxed flex-1">
                                    "{testimonial.text}"
                                </p>

                                <div className="h-px bg-jet/5 mb-8 w-full" />

                                <div className="flex items-center gap-4">
                                    <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-terracotta/10 shrink-0 transform-gpu">
                                        <CldImage
    src={testimonial.image} // Public ID của ảnh testimonial
    alt={testimonial.name}
    fill
    loading="lazy"
    // 1. Tối ưu kích thước: Đảm bảo chỉ tải đúng 56px cho avatar
    sizes="56px"
    // 2. Tự động nhận diện khuôn mặt và cắt tròn (Luxury UI)
    crop="thumb"
    gravity="face"
    // 3. Tối ưu nén: Tự động dùng AVIF và q_auto
    quality="auto"
    className="object-cover"
  />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="font-sans font-bold text-jet truncate">{testimonial.name}</div>
                                        <div className="font-sans text-xs text-jet/50 uppercase tracking-tighter">{testimonial.location}</div>
                                        <div className="font-sans text-[10px] font-bold text-terracotta mt-1 uppercase tracking-widest">{testimonial.tour}</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
});

Testimonials.displayName = "Testimonials";