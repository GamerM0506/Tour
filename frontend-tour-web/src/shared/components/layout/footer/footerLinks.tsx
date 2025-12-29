import { Link } from "@/i18n/routing";
import { Sparkles } from "lucide-react";

interface FooterLinksProps {
    quickLinks: Array<{ label: string; href: string; icon: string }>;
    t: any;
}

export const FooterLinks = ({ quickLinks, t }: FooterLinksProps) => {
    return (
        <div>
            <h4 className="font-serif text-xl mb-8 relative pb-3 text-sand flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-terracotta" />
                {t("explore")}
                <div className="absolute bottom-0 left-0 w-12 h-px bg-gradient-to-r from-terracotta to-transparent" />
            </h4>

            <nav className="flex flex-col gap-1">
                {quickLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="relative font-sans text-sm text-sand/70 hover:text-terracotta transition-all duration-300 flex items-center gap-3 py-2 group overflow-hidden"
                    >
                        <div className="absolute -left-4 w-1 h-0 bg-terracotta transition-all duration-300 group-hover:h-4" />
                        <span className="text-terracotta/60 text-xs">{link.icon}</span>
                        <span className="group-hover:pl-1 transition-all duration-300">
                            {link.label}
                        </span>
                    </Link>
                ))}
            </nav>
        </div>
    );
};