import { Link } from "@/i18n/routing";

interface DesktopNavProps {
    items: Array<{ label: string; href: string }>;
    currentPath: string;
}

export const DesktopNav = ({ items, currentPath }: DesktopNavProps) => {
    return (
        <nav className="hidden lg:flex items-center gap-8">
            {items.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`font-serif text-lg italic transition-all duration-300 relative ${
                        currentPath === item.href
                            ? "text-terracotta after:w-full"
                            : "text-jet/80 hover:text-terracotta after:w-0 hover:after:w-full"
                    } after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-terracotta after:transition-all after:duration-300`}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    );
};