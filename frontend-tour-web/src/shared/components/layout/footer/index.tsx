"use client";

import { useTranslations } from "next-intl";
import { FooterMain } from "./footerMain";
import { FooterBottom } from "./footerBottom";
import { FooterBackground } from "./footerBackground";
import { Divider } from "./divider";

export const Footer = () => {
    const t = useTranslations("Footer");
    const nav = useTranslations("Navigation");

    const quickLinks = [
        { label: nav("home"), href: "/", icon: "→" },
        { label: nav("tours"), href: "/tours", icon: "→" },
        { label: nav("about"), href: "/about", icon: "→" },
        { label: nav("journal"), href: "/blog", icon: "→" },
    ];

    return (
        <footer className="relative bg-linear-to-b from-jet via-[#0F1A0F] to-[#0A120A] text-sand-light overflow-hidden pt-20 pb-12">
            <FooterBackground />
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <FooterMain
                    quickLinks={quickLinks}
                    t={t}
                />
                <Divider />
                <FooterBottom t={t} />
            </div>
        </footer>
    );
};