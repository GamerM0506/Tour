"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Button } from "@/shared/components/ui/button";

export const LanguageSwitcher = () => {
    const locale = useLocale();
    const pathname = usePathname();

    return (
        <div className="flex items-center gap-2">
            <Button
                variant={locale === "vi" ? "default" : "ghost"}
                size="sm"
                asChild
                className={locale === "vi" ? "bg-orange-600 hover:bg-orange-700" : ""}
            >
                <Link href={pathname} locale="vi">VN</Link>
            </Button>
            <Button
                variant={locale === "en" ? "default" : "ghost"}
                size="sm"
                asChild
                className={locale === "en" ? "bg-orange-600 hover:bg-orange-700" : ""}
            >
                <Link href={pathname} locale="en">EN</Link>
            </Button>
        </div>
    );
};