import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Facebook, Instagram, Youtube } from "lucide-react";

interface FooterBrandProps {
    t: any;
}

export const FooterBrand = ({ t }: FooterBrandProps) => {
    const socialIcons = [
        {
            Icon: Facebook,
            label: "Facebook",
            brandColor: "hover:border-[#1877F2]",
            textColor: "group-hover:text-[#1877F2]",
            bgColor: "group-hover:bg-[#1877F2]/10"
        },
        {
            Icon: Instagram,
            label: "Instagram",
            brandColor: "hover:border-[#E4405F]",
            textColor: "group-hover:text-[#E4405F]",
            bgColor: "group-hover:bg-[#E4405F]/10"
        },
        {
            Icon: Youtube,
            label: "Youtube",
            brandColor: "hover:border-[#FF0000]",
            textColor: "group-hover:text-[#FF0000]",
            bgColor: "group-hover:bg-[#FF0000]/10"
        }
    ];

    return (
        <div className="space-y-8">
            <div className="relative overflow-hidden rounded-xl p-2 bg-linear-to-br from-sand/5 to-sand/10 border border-sand/10">
                <Link
                    href="/"
                    className="relative h-16 w-48 block mx-auto transition-transform hover:scale-[1.02] duration-500"
                >
                    <Image
                        src="/logo.jpg"
                        alt="Random Tailored Tours"
                        fill
                        className="object-contain brightness-110"
                        priority
                    />
                </Link>
            </div>

            <p className="font-sans text-sm text-sand/60 leading-relaxed max-w-xs italic pl-2 border-l-2 border-terracotta/30 mx-auto md:mx-0">
                {t("mission")}
            </p>

            <div className="flex gap-3 pt-4 justify-center md:justify-start">
                {socialIcons.map((social) => (
                    <a
                        key={social.label}
                        href="#"
                        className={`relative w-10 h-10 rounded-full flex items-center justify-center bg-linear-to-br from-sand/5 to-sand/10 border border-sand/20 transition-all duration-300 group backdrop-blur-sm ${social.brandColor} ${social.bgColor}`}
                        aria-label={social.label}
                    >
                        <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${social.bgColor}`} />

                        <social.Icon
                            size={18}
                            strokeWidth={1.2}
                            className={`text-sand/60 transition-colors duration-300 relative z-10 ${social.textColor}`}
                        />
                    </a>
                ))}
            </div>
        </div>
    );
};