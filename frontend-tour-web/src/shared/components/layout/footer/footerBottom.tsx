"use client";

import { memo, useMemo } from "react";
import { Link } from "@/i18n/routing";

interface FooterBottomProps {
    t: any;
}

export const FooterBottom = memo(({ t }: FooterBottomProps) => {
    
    const currentYear = useMemo(() => new Date().getFullYear(), []);

    return (
        <div 
            className="flex flex-col md:flex-row justify-between items-center gap-6 font-sans py-8 border-t border-sand/10"
            style={{ contain: 'layout' }}
        >
            <p className="text-sm text-sand/50 font-light">
                © {currentYear} Random Tailored Tours. {t("copyright")}
            </p>

            <div className="flex items-center gap-8">
                <nav className="flex gap-6" aria-label="Legal">
                    <Link
                        href="/privacy"
                        className="text-xs text-sand/50 hover:text-terracotta transition-all duration-300 tracking-wider hover:-translate-y-px transform-gpu will-change-transform"
                    >
                        {t("privacy")}
                    </Link>
                    <Link
                        href="/terms"
                        className="text-xs text-sand/50 hover:text-terracotta transition-all duration-300 tracking-wider hover:-translate-y-px transform-gpu will-change-transform"
                    >
                        {t("terms")}
                    </Link>
                </nav>
                <div className="h-4 w-px bg-sand/20 hidden sm:block" aria-hidden="true" />

                <p className="text-xs text-sand/40 tracking-widest font-light hidden sm:block">
                    Crafted with passion in Vietnam
                </p>
            </div>
        </div>
    );
});

FooterBottom.displayName = "FooterBottom";