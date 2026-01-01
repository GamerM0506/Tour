"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import cloudinaryLoader from "@/core/utils/cloudinary-loader";

export const LanguageSwitcher = () => {
    const locale = useLocale();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const languages = [
        {
            code: "vi",
            label: "Tiếng Việt",
            flag: "vietnam_hp4tle"
        },
        {
            code: "en",
            label: "English",
            flag: "union-jack-flag-background_1048-6002_kibdp6"
        },
    ];

    const currentLang = languages.find(lang => lang.code === locale);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 px-4 py-2 rounded-full bg-sand/50 hover:bg-sand transition-all duration-300 border border-jet/10 shadow-sm group"
            >
                <div className="relative h-5 w-5 overflow-hidden rounded-full border border-jet/5 shadow-inner">
                    <Image
                        loader={cloudinaryLoader}
                        src={currentLang?.flag || ""}
                        alt={currentLang?.label || ""}
                        fill
                        sizes="20px"
                        className="object-cover"
                        priority
                    />
                </div>

                <span className="text-[10px] font-bold tracking-[0.2em] text-jet uppercase">
                    {currentLang?.code}
                </span>

                <ChevronDown className={`h-3 w-3 text-jet/40 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <div className={`
                absolute top-full right-0 mt-3 min-w-40 bg-sand-light/90 border border-jet/10 rounded-2xl shadow-2xl 
                backdrop-blur-xl overflow-hidden z-50 transition-all duration-500 origin-top-right
                ${isOpen ? "opacity-100 visible translate-y-0 scale-100" : "opacity-0 invisible -translate-y-2 scale-95"}
            `}>
                <div className="p-1.5">
                    {languages.map((lang) => (
                        <Link
                            key={lang.code}
                            href={pathname}
                            locale={lang.code}
                            onClick={() => setIsOpen(false)}
                            className={`
                                flex items-center gap-3 px-3 py-2.5 rounded-xl text-[11px] tracking-wider transition-all duration-300
                                ${locale === lang.code
                                    ? "bg-terracotta text-sand font-bold"
                                    : "text-jet/60 hover:text-terracotta hover:bg-sand"
                                }
                            `}
                        >
                            <div className="relative h-5 w-5 overflow-hidden rounded-full border border-white/20">
                                <Image
                                    loader={cloudinaryLoader}
                                    src={lang.flag}
                                    alt={lang.label}
                                    fill
                                    sizes="20px"
                                    className="object-cover"
                                />
                            </div>
                            <span className="flex-1 uppercase font-medium">{lang.label}</span>

                            {locale === lang.code && (
                                <div className="w-1.5 h-1.5 rounded-full bg-sand animate-pulse" />
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};