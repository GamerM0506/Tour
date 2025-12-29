import { Button } from "@/shared/components/ui/button";
import { LanguageSwitcher } from "./language-switcher";
import { Compass } from "lucide-react";

interface HeaderActionsProps {
    mobileOpen: boolean;
    setMobileOpen: (open: boolean) => void;
    bookNowText: string;
}

export const HeaderActions = ({ mobileOpen, setMobileOpen, bookNowText }: HeaderActionsProps) => {
    const MobileMenuButton = () => (
        <button
            className="lg:hidden p-2 rounded-full bg-jet/5 hover:bg-jet/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
        >
            {mobileOpen ? (
                <svg className="h-6 w-6 text-jet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            ) : (
                <svg className="h-6 w-6 text-jet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            )}
        </button>
    );

    return (
        <div className="flex items-center gap-6">
            <div className="hidden sm:block">
                <LanguageSwitcher />
            </div>

            <Button className="hidden md:flex bg-jet text-sand hover:bg-soft-black px-8 py-5 rounded-full font-sans font-medium tracking-wide hover:scale-105 transition-all duration-300 group">
                <span>{bookNowText}</span>
                <Compass className="ml-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
            </Button>

            <MobileMenuButton />
        </div>
    );
};