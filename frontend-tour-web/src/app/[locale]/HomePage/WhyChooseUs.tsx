"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Shield, Heart, Globe, Award, UserCheck, Sparkles } from "lucide-react";

export const WhyChooseUs = () => {
    const t = useTranslations("Home");

    const features = [
        {
            icon: <Sparkles className="h-8 w-8" />,
            title: t("personalized_title") || "Fully Personalized",
            description: t("personalized_desc") || "Every itinerary is custom-designed to match your preferences and travel style.",
            color: "from-terracotta/20 to-terracotta/5"
        },
        {
            icon: <UserCheck className="h-8 w-8" />,
            title: t("local_title") || "Local Expertise",
            description: t("local_desc") || "Our local guides provide authentic insights and access to hidden locations.",
            color: "from-clay/20 to-clay/5"
        },
        {
            icon: <Shield className="h-8 w-8" />,
            title: t("safety_title") || "Premium Safety",
            description: t("safety_desc") || "Highest safety standards with 24/7 support throughout your journey.",
            color: "from-olive/20 to-olive/5"
        },
        {
            icon: <Heart className="h-8 w-8" />,
            title: t("sustainable_title") || "Sustainable Travel",
            description: t("sustainable_desc") || "We prioritize eco-friendly practices and support local communities.",
            color: "from-forest/20 to-forest/5"
        },
    ];

    return (
        <section className="py-24 bg-jet text-sand-light">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <span className="inline-block px-4 py-2 bg-sand/10 text-sand rounded-full text-sm font-medium mb-4">
                                {t("why_us") || "Why Choose Us"}
                            </span>
                            <h2 className="font-serif text-4xl md:text-5xl mb-6">
                                {t("why_title") || "Beyond Ordinary Tourism"}
                            </h2>
                            <p className="font-sans text-xl text-sand/60 mb-8">
                                {t("why_description") || "We craft immersive journeys that connect you with Vietnam's authentic culture and breathtaking landscapes."}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { value: "10+", label: t("years_exp") || "Years Experience" },
                                { value: "5,000+", label: t("happy_clients") || "Happy Travelers" },
                                { value: "100%", label: t("custom") || "Custom Tours" },
                                { value: "50+", label: t("awards") || "Awards & Recognition" },
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm"
                                >
                                    <div className="font-serif text-3xl text-terracotta mb-2">{stat.value}</div>
                                    <div className="font-sans text-sm text-sand/60">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`bg-linear-to-br ${feature.color} border border-sand/10 rounded-2xl p-6 backdrop-blur-sm hover:-translate-y-1 transition-all duration-300`}
                            >
                                <div className="inline-flex p-3 rounded-xl bg-white/10 mb-4">
                                    <div className="text-terracotta">{feature.icon}</div>
                                </div>
                                <h3 className="font-serif text-xl text-sand mb-3">{feature.title}</h3>
                                <p className="font-sans text-sand/60">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};