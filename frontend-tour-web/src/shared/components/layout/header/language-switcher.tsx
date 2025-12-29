"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image"; // Import component Image

export const LanguageSwitcher = () => {
    const locale = useLocale();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const languages = [
        { code: "vi", label: "Tiếng Việt", flag: "https://flagcdn.com/w40/vn.png" },
        { code: "en", label: "English", flag: "https://flagcdn.com/w40/gb.png" },
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
                className="flex items-center gap-3 px-4 py-2 rounded-full bg-sand/50 hover:bg-sand transition-all duration-300 border border-jet/10 shadow-sm"
            >
                <div className="relative h-5 w-5 overflow-hidden rounded-full border border-jet/5">
                    <Image 
                        src={currentLang?.flag || ""} 
                        alt={currentLang?.label || ""}
                        fill
                        className="object-cover"
                    />
                </div>
                <span className="text-xs font-bold tracking-widest text-jet uppercase">
                    {currentLang?.code}
                </span>
                <ChevronDown className={`h-3 w-3 text-jet/40 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <div className={`
                absolute top-full right-0 mt-2 min-w-40 bg-sand-light border border-jet/10 rounded-xl shadow-xl 
                backdrop-blur-md overflow-hidden z-50 transition-all duration-500
                ${isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}
            `}>
                {languages.map((lang) => (
                    <Link
                        key={lang.code}
                        href={pathname}
                        locale={lang.code}
                        onClick={() => setIsOpen(false)}
                        className={`
                            flex items-center gap-3 px-4 py-3 text-xs tracking-wider transition-all duration-300
                            ${locale === lang.code 
                                ? "bg-terracotta/10 text-terracotta font-bold" 
                                : "text-jet/60 hover:text-terracotta hover:bg-sand"
                            }
                        `}
                    >
                        <div className="relative h-5 w-5 overflow-hidden rounded-full border border-jet/5">
                            <Image 
                                src={lang.flag} 
                                alt={lang.label}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <span className="flex-1 uppercase">{lang.label}</span>
                        {locale === lang.code && (
                            <div className="w-1.5 h-1.5 rounded-full bg-terracotta animate-pulse" />
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
};