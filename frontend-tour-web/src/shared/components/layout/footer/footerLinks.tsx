"use client";

import { memo } from "react";
import { Link } from "@/i18n/routing";
import { Sparkles } from "lucide-react";

interface FooterLinksProps {
    quickLinks: Array<{ label: string; href: string; icon: string }>;
    t: any;
}

export const FooterLinks = memo(({ quickLinks, t }: FooterLinksProps) => {
    return (
        <div
            className="w-full"
            style={{ contain: 'content' }}
        >
            <h4 className="font-serif text-xl mb-8 relative pb-3 text-sand flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-terracotta transform-gpu animate-pulse" />
                {t("explore")}
                <div className="absolute bottom-0 left-0 w-12 h-px bg-linear-to-r from-terracotta to-transparent" />
            </h4>

            <nav className="flex flex-col gap-1">
                {quickLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="relative font-sans text-sm text-sand/70 hover:text-terracotta 
                                 transition-colors duration-300 flex items-center gap-3 py-2 
                                 group overflow-hidden transform-gpu"
                    >
                        <div className="absolute left-0 w-0.5 h-4 bg-terracotta 
                                      transition-transform duration-300 origin-center
                                      scale-y-0 group-hover:scale-y-100 will-change-transform" />

                        <span className="text-terracotta/60 text-xs transition-transform duration-300 group-hover:scale-110">
                            {link.icon}
                        </span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1 will-change-transform">
                            {link.label}
                        </span>
                    </Link>
                ))}
            </nav>
        </div>
    );
});

FooterLinks.displayName = "FooterLinks";