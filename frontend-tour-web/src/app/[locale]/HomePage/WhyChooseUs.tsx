"use client";

import { memo, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Shield, Heart, UserCheck, Sparkles } from "lucide-react";

const GRADIENT_VARIANTS = {
    terracotta: "bg-linear-to-br from-terracotta/20 to-terracotta/5",
    clay: "bg-linear-to-br from-clay/20 to-clay/5",
    olive: "bg-linear-to-br from-olive/20 to-olive/5",
    forest: "bg-linear-to-br from-forest/20 to-forest/5",
};

const GET_FEATURES = (t: any) => [
    {
        icon: <Sparkles className="h-6 w-6" />,
        theme: "terracotta" as const,
        title: t("personalized_title") || "Tailored Experiences",
        desc: t("personalized_desc") || "Unique journeys designed just for you."
    },
    {
        icon: <UserCheck className="h-6 w-6" />,
        theme: "clay" as const,
        title: t("expert_title") || "Local Experts",
        desc: t("expert_desc") || "Deep knowledge of Vietnam's hidden gems."
    },
    {
        icon: <Shield className="h-6 w-6" />,
        theme: "olive" as const,
        title: t("safety_title") || "Safe & Secure",
        desc: t("safety_desc") || "Your safety is our top priority."
    },
    {
        icon: <Heart className="h-6 w-6" />,
        theme: "forest" as const,
        title: t("passion_title") || "Passion Driven",
        desc: t("passion_desc") || "We love what we do and it shows."
    },
];

export const WhyChooseUs = memo(() => {
    const t = useTranslations("Home");
    const features = useMemo(() => GET_FEATURES(t), [t]);

    return (
        <section
            className="py-24 bg-jet text-sand-light transform-gpu overflow-hidden"
            style={{ contain: 'content' }}
        >
            <div className="container mx-auto px-6 lg:px-12 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-terracotta/5 rounded-full blur-[120px] pointer-events-none transform-gpu" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8 transform-gpu will-change-transform"
                    >
                        <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                            {t("why_title")}
                        </h2>
                        <p className="text-sand/60 text-lg leading-relaxed max-w-xl">
                            {t("why_description")}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className={`${GRADIENT_VARIANTS[feature.theme]} border border-sand/10 rounded-2xl p-8 
                                           backdrop-blur-sm transition-all duration-500 group hover:border-terracotta/30 
                                           transform-gpu will-change-transform active:scale-[0.98]`}
                            >
                                <div className="text-terracotta mb-6 p-3 bg-white/5 rounded-xl inline-block group-hover:scale-110 transition-transform duration-500 transform-gpu">
                                    {feature.icon}
                                </div>
                                <h3 className="font-serif text-xl text-sand mb-3 group-hover:text-terracotta transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-sand/40 text-sm leading-relaxed">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
});

WhyChooseUs.displayName = "WhyChooseUs";