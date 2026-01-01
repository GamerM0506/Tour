"use client";

import { useEffect, memo } from "react";
import dynamic from "next/dynamic";
import { Link } from "@/i18n/routing";
import { Button } from "@/shared/components/ui/button";

const LazyLanguageSwitcher = dynamic(
    () => import("./language-switcher").then(mod => mod.LanguageSwitcher),
    { ssr: false }
);

interface MobileMenuProps {
    items: Array<{ label: string; href: string }>;
    currentPath: string;
    mobileOpen: boolean;
    setMobileOpen: (open: boolean) => void;
    bookNowText: string;
}
export const MobileMenu = memo(({
    items,
    currentPath,
    mobileOpen,
    setMobileOpen,
    bookNowText
}: MobileMenuProps) => {
    
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
            document.body.style.touchAction = "none"; 
        } else {
            document.body.style.overflow = "";
            document.body.style.touchAction = "";
        }
        return () => { 
            document.body.style.overflow = "";
            document.body.style.touchAction = "";
        };
    }, [mobileOpen]);

    if (!mobileOpen) return null;

    return (
        <>
            <div 
                className="fixed inset-0 bg-jet/30 z-40 lg:hidden animate-in fade-in duration-200"
                onClick={() => setMobileOpen(false)}
            />

            <div className="lg:hidden absolute top-full left-0 w-full bg-sand border-t border-jet/10 z-50 
                            transform-gpu will-change-transform shadow-2xl
                            animate-in slide-in-from-top-2 duration-300 ease-out">
                
                <div className="flex flex-col items-center py-12 gap-8 px-6">
                    {items.map((item, index) => {
                        const isActive = currentPath === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={`font-serif text-3xl italic transition-all duration-300 transform-gpu
                                    animate-in fade-in slide-in-from-bottom-2
                                    ${isActive ? "text-terracotta translate-x-1" : "text-jet hover:text-terracotta"}
                                `}
                                style={{ 
                                    animationDelay: `${index * 50}ms`,
                                    animationFillMode: 'both'
                                }}
                            >
                                {item.label}
                            </Link>
                        );
                    })}

                    <div className="pt-8 flex flex-col items-center gap-8 w-full max-w-70 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="w-full h-px bg-jet/10" />
                        <LazyLanguageSwitcher />
                        
                        <Button className="w-full bg-jet text-sand py-7 rounded-full font-sans font-medium text-lg 
                                         active:scale-95 transition-transform transform-gpu shadow-xl">
                            {bookNowText}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
});

MobileMenu.displayName = "MobileMenu";