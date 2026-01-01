"use client";

import { memo } from "react";
import { Link } from "@/i18n/routing";

interface DesktopNavProps {
    items: Array<{ label: string; href: string }>;
    currentPath: string;
}

export const DesktopNav = memo(({ items, currentPath }: DesktopNavProps) => {
    return (
        <nav className="hidden lg:flex items-center gap-8">
            {items.map((item) => {
                const isActive = currentPath === item.href;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`
                            font-serif text-lg italic relative group transition-colors duration-300
                            ${isActive ? "text-terracotta" : "text-jet/80 hover:text-terracotta"}
                        `}
                    >
                        {item.label}

                        <span
                            className={`
                                absolute -bottom-1 left-0 h-px bg-terracotta
                                transition-transform duration-300 ease-out origin-left
                                ${isActive ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100"}
                                will-change-transform
                            `}
                        />
                    </Link>
                );
            })}
        </nav>
    );
});

DesktopNav.displayName = "DesktopNav";