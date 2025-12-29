import { Link } from "@/i18n/routing";
import { Button } from "@/shared/components/ui/button";
import { LanguageSwitcher } from "./language-switcher";

interface MobileMenuProps {
    items: Array<{ label: string; href: string }>;
    currentPath: string;
    mobileOpen: boolean;
    setMobileOpen: (open: boolean) => void;
    bookNowText: string;
}

export const MobileMenu = ({
    items,
    currentPath,
    mobileOpen,
    setMobileOpen,
    bookNowText
}: MobileMenuProps) => {
    if (!mobileOpen) return null;

    return (
        <div className="lg:hidden absolute top-full left-0 w-full bg-sand border-t border-jet/10 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col items-center py-10 gap-6 px-6">
                {items.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`font-serif text-2xl italic transition-colors ${currentPath === item.href ? "text-terracotta" : "text-jet hover:text-terracotta"
                            }`}
                    >
                        {item.label}
                    </Link>
                ))}

                <div className="pt-8 flex flex-col items-center gap-6 w-full max-w-xs">
                    <LanguageSwitcher />
                    <Button className="w-full bg-jet text-sand py-5 rounded-full font-sans font-medium">
                        {bookNowText}
                    </Button>
                </div>
            </div>
        </div>
    );
};