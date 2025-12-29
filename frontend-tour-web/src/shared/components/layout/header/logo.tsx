import Image from "next/image";
import { Link } from "@/i18n/routing";

export const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-full bg-gradient-to-br from-terracotta/10 to-clay/10 p-2 group-hover:scale-105 transition-transform">
                <Image
                    src="/logo.jpg"
                    alt="Random Tailored Tours"
                    fill
                    className="object-contain rounded-full"
                    priority
                />
            </div>
            <div className="hidden sm:block">
                <h1 className="font-serif text-xl text-jet tracking-tight">Random Tailored Tours</h1>
                <p className="font-sans text-xs text-jet/50 tracking-widest uppercase">VIETNAM</p>
            </div>
        </Link>
    );
};