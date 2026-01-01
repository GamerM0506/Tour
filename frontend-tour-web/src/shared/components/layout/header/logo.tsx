"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import cloudinaryLoader from "@/core/utils/cloudinary-loader";

export const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden bg-linear-to-br from-terracotta/10 to-clay/10 p-2">
                <Image
                    loader={cloudinaryLoader}
                    src="logo_ytiuzt"
                    alt="Random Tailored Tours"
                    fill
                    sizes="(max-width: 768px) 64px, 80px"
                    priority
                    className="object-contain rounded-full transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <div className="hidden sm:block">
                <h1 className="font-serif text-xl text-jet tracking-tight">
                    Random Tailored Tours
                </h1>
                <p className="font-sans text-xs text-jet/50 tracking-widest uppercase">
                    VIETNAM
                </p>
            </div>
        </Link>
    );
};