"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Shield, Heart, UserCheck, Sparkles } from "lucide-react";

const gradientVariants = {
    terracotta: "bg-linear-to-br from-terracotta/20 to-terracotta/5",
    clay: "bg-linear-to-br from-clay/20 to-clay/5",
    olive: "bg-linear-to-br from-olive/20 to-olive/5",
    forest: "bg-linear-to-br from-forest/20 to-forest/5",
};

export const WhyChooseUs = () => {
    const t = useTranslations("Home");
    const features = [
        { icon: <Sparkles />, theme: "terracotta" as const },
        { icon: <UserCheck />, theme: "clay" as const },
        { icon: <Shield />, theme: "olive" as const },
        { icon: <Heart />, theme: "forest" as const },
    ];

    return (
        <section className="py-24 bg-jet text-sand-light">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="space-y-8"
                    >
                        <h2 className="font-serif text-4xl md:text-5xl">{t("why_title")}</h2>
                        <p className="text-sand/60">{t("why_description")}</p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`${gradientVariants[feature.theme]} border border-sand/10 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300`}
                            >
                                <div className="text-terracotta mb-4">{feature.icon}</div>
                                <h3 className="font-serif text-xl text-sand mb-3">{t("personalized_title")}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};