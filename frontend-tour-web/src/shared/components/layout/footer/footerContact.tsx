import { Mail, Phone, MapPin } from "lucide-react";

interface FooterContactProps {
    t: any;
}

export const FooterContact = ({ t }: FooterContactProps) => {
    const contactInfo = [
        {
            icon: <MapPin className="h-5 w-5" strokeWidth={1.5} />,
            text: "Old Quarter, Hanoi, Vietnam",
            subtext: "Heritage Cultural Center"
        },
        {
            icon: <Phone className="h-5 w-5" strokeWidth={1.5} />,
            text: "+84 123 456 789",
            subtext: "Mon-Sun: 8:00-20:00"
        },
        {
            icon: <Mail className="h-5 w-5" strokeWidth={1.5} />,
            text: "hello@randomtours.com",
            subtext: "Response within 24h"
        }
    ];

    return (
        <div>
            <h4 className="font-serif text-xl mb-8 relative pb-3 text-sand">
                {t("contact")}
                <div className="absolute bottom-0 left-0 w-12 h-px bg-linear-to-r from-terracotta to-transparent" />
            </h4>

            <address className="not-italic space-y-6">
                {contactInfo.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-4 text-sand/70 font-sans text-sm leading-relaxed hover:text-sand transition-all duration-300 mb-5 group"
                    >
                        <div className="text-terracotta shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                            {item.icon}
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-sand">{item.text}</span>
                            <span className="text-xs text-sand/40 mt-1">{item.subtext}</span>
                        </div>
                    </div>
                ))}
            </address>
        </div>
    );
};