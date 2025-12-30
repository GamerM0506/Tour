"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export const Testimonials = () => {
    const t = useTranslations("Home");

    const testimonials = [
        {
            id: 1,
            name: "Sarah & James",
            location: "New York, USA",
            text: "Our Vietnam tour was perfectly tailored to our interests. The local experiences were unforgettable.",
            rating: 5,
            image: "/testimonials/couple1.jpg",
            tour: "Halong Luxury Cruise"
        },
        {
            id: 2,
            name: "Michael Chen",
            location: "Singapore",
            text: "Professional service and attention to detail. Every moment felt special and well-planned.",
            rating: 5,
            image: "/testimonials/solo1.jpg",
            tour: "Sapa Adventure"
        },
        {
            id: 3,
            name: "The Wilson Family",
            location: "London, UK",
            text: "Perfect family vacation! The kids loved the cultural activities and the food was incredible.",
            rating: 5,
            image: "/testimonials/family1.jpg",
            tour: "Vietnam Family Journey"
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
                        {t("testimonials") || "Traveler Stories"}
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl text-jet mb-6">
                        {t("testimonials_title") || "What Our Travelers Say"}
                    </h2>
                    <p className="font-sans text-xl text-jet/60">
                        {t("testimonials_desc") || "Join thousands of satisfied travelers who've experienced Vietnam with us."}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                        >
                            <div className="absolute -top-4 -left-4 z-10">
                                <Quote className="h-8 w-8 text-terracotta/30" />
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 h-full relative z-0">
                                <div className="flex mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-5 w-5 fill-terracotta text-terracotta"
                                        />
                                    ))}
                                </div>

                                <p className="font-serif text-lg text-jet mb-8 italic">
                                    "{testimonial.text}"
                                </p>

                                <div className="h-px bg-jet/10 mb-6"></div>

                                <div className="flex items-center gap-4">
                                    <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-terracotta/20">
                                        <Image
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            fill
                                            className="object-cover"
                                            sizes="56px"
                                        />
                                    </div>
                                    <div>
                                        <div className="font-sans font-semibold text-jet">{testimonial.name}</div>
                                        <div className="font-sans text-sm text-jet/60">{testimonial.location}</div>
                                        <div className="font-sans text-xs text-terracotta mt-1">{testimonial.tour}</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};