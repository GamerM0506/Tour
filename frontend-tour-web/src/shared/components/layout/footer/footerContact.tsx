"use client";

import { memo } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

interface FooterContactProps {
    t: any;
}

const CONTACT_DATA = (t: any) => [
    {
        icon: <MapPin className="h-5 w-5" strokeWidth={1.5} />,
        text: "Old Quarter, Hanoi, Vietnam",
        subtext: "Heritage Cultural Center",
        href: "https://maps.google.com/?q=Old+Quarter+Hanoi",
    },
    {
        icon: <Phone className="h-5 w-5" strokeWidth={1.5} />,
        text: "+84 123 456 789",
        subtext: "Mon-Sun: 8:00-20:00",
        href: "tel:+84123456789", 
    },
    {
        icon: <Mail className="h-5 w-5" strokeWidth={1.5} />,
        text: "hello@randomtours.com",
        subtext: "Response within 24h",
        href: "mailto:hello@randomtours.com", 
    }
];

export const FooterContact = memo(({ t }: FooterContactProps) => {
    const info = CONTACT_DATA(t);

    return (
        <div 
            className="w-full"
            style={{ contain: 'content' }}
        >
            <h4 className="font-serif text-xl mb-8 relative pb-3 text-sand">
                {t("contact")}
                <div className="absolute bottom-0 left-0 w-12 h-px bg-linear-to-r from-terracotta to-transparent" />
            </h4>

            <address className="not-italic space-y-6">
                {info.map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        target={item.href.startsWith('http') ? "_blank" : undefined}
                        rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                        className="flex items-start gap-4 text-sand/70 font-sans text-sm leading-relaxed 
                                 hover:text-sand transition-all duration-300 mb-5 group transform-gpu"
                    >
                        <div className="text-terracotta shrink-0 mt-0.5 group-hover:scale-110 
                                      transition-transform duration-300 will-change-transform transform-gpu">
                            {item.icon}
                        </div>
                        
                        <div className="flex flex-col">
                            <span className="font-medium text-sand transition-colors duration-300 group-hover:text-terracotta">
                                {item.text}
                            </span>
                            <span className="text-xs text-sand/40 mt-1">{item.subtext}</span>
                        </div>
                    </a>
                ))}
            </address>
        </div>
    );
});

FooterContact.displayName = "FooterContact";