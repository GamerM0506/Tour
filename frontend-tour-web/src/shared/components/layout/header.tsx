"use client";

import "./header.css";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { UtensilsCrossed, Menu } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { LanguageSwitcher } from "./language-switcher";
import { Sheet, SheetContent, SheetTrigger } from "@/shared/components/ui/sheet";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/shared/components/ui/navigation-menu";

export const Header = () => {
    const t = useTranslations("Navigation");
    const navItems = [
        { label: t("home"), href: "/" },
        { label: t("tours"), href: "/tours" },
        { label: t("about"), href: "/about" },
        { label: t("blog"), href: "/blog" },
    ];

    return (
        <header className="glass-header animate-header">
            <div className="container mx-auto h-20 flex items-center justify-between px-6">

                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="bg-orange-500 p-2 rounded-xl shadow-orange-200 shadow-lg group-hover:rotate-12 transition-transform">
                        <UtensilsCrossed className="text-white h-5 w-5" />
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="font-extrabold text-xl logo-gradient">Hanoi Food Tour</span>
                        <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Premium Experience</span>
                    </div>
                </Link>

                <nav className="hidden lg:block">
                    <NavigationMenu>
                        <NavigationMenuList className="gap-2">
                            {navItems.map((item) => (
                                <NavigationMenuItem key={item.href}>
                                    <Link href={item.href} passHref>
                                        <NavigationMenuLink className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-orange-600 transition-colors">
                                            {item.label}
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </nav>

                <div className="flex items-center gap-3">
                    <div className="hidden sm:block">
                        <LanguageSwitcher />
                    </div>
                    <Button className="btn-premium hidden md:flex rounded-full px-6">
                        {t("book_now") || "Book Now"}
                    </Button>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden text-slate-600">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-75">
                            <nav className="flex flex-col gap-6 mt-12 text-center font-bold text-lg">
                                {navItems.map((item) => (
                                    <Link key={item.href} href={item.href} className="hover:text-orange-600">
                                        {item.label}
                                    </Link>
                                ))}
                                <div className="pt-6 border-t flex flex-col gap-4">
                                    <LanguageSwitcher />
                                    <Button className="btn-premium w-full">Book Now</Button>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};