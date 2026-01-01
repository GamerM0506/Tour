"use client";

import { memo } from "react";
import { ArrowRight } from "lucide-react";

interface FooterNewsletterProps {
    t: any;
}

export const FooterNewsletter = memo(({ t }: FooterNewsletterProps) => {
    return (
        <div
            className="w-full"
            style={{ contain: 'content' }}
        >
            <div className="mb-6">
                <span className="inline-block px-3 py-1 rounded-full bg-linear-to-r from-terracotta/20 to-clay/20 text-[10px] tracking-widest uppercase font-semibold text-terracotta mb-3">
                    {t("exclusive") || "Exclusive Offers"}
                </span>
                <h4 className="font-serif text-xl mb-4 relative pb-3 text-sand">
                    {t("newsletter")}
                    <div className="absolute bottom-0 left-0 w-12 h-px bg-linear-to-r from-terracotta to-transparent" />
                </h4>
                <p className="text-xs text-sand/50 font-sans mb-6 leading-relaxed">
                    {t("newsletter_desc")}
                </p>
            </div>

            <form
                className="relative"
                onSubmit={(e) => e.preventDefault()}
                autoComplete="off"
            >
                <div className="relative group">
                    <input
                        type="email"
                        id="footer-email"
                        name="email"
                        placeholder={t("emailPlaceholder")}
                        className="w-full bg-forest/30 backdrop-blur-sm border border-sand/10 text-sand-light 
                                 placeholder:text-sand/40 px-5 py-4 rounded-lg outline-none 
                                 focus:border-terracotta/50 focus:ring-1 focus:ring-terracotta/30 
                                 transition-all duration-300 text-sm pr-14 transform-gpu"
                        required
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-linear-to-r from-terracotta to-clay 
                                 text-sand-light p-2 rounded-md transition-all duration-300 
                                 hover:scale-105 active:scale-95 transform-gpu will-change-transform
                                 hover:shadow-[0_0_20px_rgba(196,106,74,0.4)]"
                        aria-label="Subscribe"
                    >
                        <ArrowRight size={20} strokeWidth={1.5} />
                    </button>
                </div>
                <p className="text-[10px] text-sand/30 mt-3 tracking-wider">
                    {t("privacy_note") || "We respect your privacy. Unsubscribe anytime."}
                </p>
            </form>
        </div>
    );
});

FooterNewsletter.displayName = "FooterNewsletter";