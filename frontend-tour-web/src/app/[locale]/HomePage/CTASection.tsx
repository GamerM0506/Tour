"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/shared/components/ui/button";
import { ArrowRight, MessageSquare, Calendar, Phone } from "lucide-react";
import { motion } from "framer-motion";

export const CTASection = () => {
    const t = useTranslations("Home");

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-terracotta/5 via-sand/5 to-clay/5" />
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-terracotta/20 to-transparent" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <span className="inline-block px-6 py-3 bg-linear-to-r from-terracotta/10 to-clay/10 text-terracotta rounded-full text-sm font-medium mb-6">
                        {t("ready_to_travel") || "Ready for Your Journey?"}
                    </span>

                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-jet mb-8">
                        {t("cta_title") || "Start Your Vietnamese Adventure"}
                    </h2>

                    <p className="font-sans text-xl text-jet/60 mb-12 max-w-2xl mx-auto">
                        {t("cta_description") || "Contact us to begin planning your personalized Vietnam experience."}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                        <Button
                            size="lg"
                            className="bg-linear-to-r from-terracotta to-clay text-white px-10 py-7 rounded-full text-lg hover:shadow-2xl hover:shadow-terracotta/30 transition-all duration-300 group"
                            asChild
                        >
                            <Link href="/contact">
                                <MessageSquare className="mr-3 h-5 w-5" />
                                <span>{t("plan_tour") || "Plan Your Tour"}</span>
                                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="border-2 border-jet text-jet px-10 py-7 rounded-full text-lg hover:bg-jet hover:text-sand transition-all duration-300"
                            asChild
                        >
                            <a href="tel:+84123456789">
                                <Phone className="mr-3 h-5 w-5" />
                                <span>+84 123 456 789</span>
                            </a>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-jet/10">
                        {[
                            {
                                icon: <Calendar className="h-8 w-8" />,
                                title: t("feature1_title") || "Flexible Planning",
                                description: t("feature1_desc") || "Custom dates and itineraries"
                            },
                            {
                                icon: <MessageSquare className="h-8 w-8" />,
                                title: t("feature2_title") || "24/7 Support",
                                description: t("feature2_desc") || "Dedicated travel consultant"
                            },
                            {
                                icon: <ArrowRight className="h-8 w-8" />,
                                title: t("feature3_title") || "Easy Booking",
                                description: t("feature3_desc") || "Simple and secure process"
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center p-6 hover:bg-white/50 rounded-2xl transition-all duration-300"
                            >
                                <div className="inline-flex p-4 bg-linear-to-br from-terracotta/10 to-clay/10 rounded-2xl mb-4">
                                    <div className="text-terracotta">{feature.icon}</div>
                                </div>
                                <h3 className="font-serif text-xl text-jet mb-2">{feature.title}</h3>
                                <p className="font-sans text-jet/60">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};