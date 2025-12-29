"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";
import { useState } from "react";
import { Logo } from "./logo";
import { DesktopNav } from "./desktopNav";
import { MobileMenu } from "./mobileMenu";
import { HeaderActions } from "./headerActions";

export const Header = () => {
    const t = useTranslations("Navigation");
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    const navItems = [
        { label: t("home"), href: "/" },
        { label: t("tours"), href: "/tours" },
        { label: t("about"), href: "/about" },
        { label: t("journal"), href: "/blog" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-sand/95 backdrop-blur-sm border-b border-jet/10 transition-all duration-300">
            <div className="container mx-auto h-20 flex items-center justify-between px-6">
                <Logo />

                <DesktopNav items={navItems} currentPath={pathname} />

                <HeaderActions
                    mobileOpen={mobileOpen}
                    setMobileOpen={setMobileOpen}
                    bookNowText={t("book_now") || "Book Experience"}
                />
            </div>

            <MobileMenu
                items={navItems}
                currentPath={pathname}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
                bookNowText={t("book_now") || "Book Experience"}
            />
        </header>
    );
};