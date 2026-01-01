"use client";

import dynamic from "next/dynamic";
import { Compass, Menu, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

const LanguageSwitcher = dynamic(
    () => import("./language-switcher").then((mod) => mod.LanguageSwitcher),
    {
        ssr: true,
        loading: () => <div className="h-10 w-24 bg-sand/20 animate-pulse rounded-full" />
    }
);

interface HeaderActionsProps {
    mobileOpen: boolean;
    setMobileOpen: (open: boolean) => void;
    bookNowText: string;
}

const MobileMenuButton = ({ open, onClick }: { open: boolean; onClick: () => void }) => (
    <button
        className="lg:hidden p-2.5 rounded-full bg-jet/5 hover:bg-jet/10 active:scale-95 transition-all duration-200"
        onClick={onClick}
        aria-label={open ? "Close menu" : "Open menu"}
    >
        {open ? (
            <X className="h-6 w-6 text-jet animate-in fade-in zoom-in duration-300" />
        ) : (
            <Menu className="h-6 w-6 text-jet animate-in fade-in zoom-in duration-300" />
        )}
    </button>
);

export const HeaderActions = ({ mobileOpen, setMobileOpen, bookNowText }: HeaderActionsProps) => {
    return (
        <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden sm:block">
                <LanguageSwitcher />
            </div>

            <Button
                className="hidden md:flex bg-jet text-sand hover:bg-soft-black px-8 py-5 rounded-full 
                           font-sans font-medium tracking-wide hover:scale-105 active:scale-95
                           transition-all duration-300 group will-change-transform"
            >
                <span>{bookNowText}</span>
                <Compass className="ml-2 h-4 w-4 group-hover:rotate-90 transition-transform duration-500" />
            </Button>

            <MobileMenuButton
                open={mobileOpen}
                onClick={() => setMobileOpen(!mobileOpen)}
            />
        </div>
    );
};