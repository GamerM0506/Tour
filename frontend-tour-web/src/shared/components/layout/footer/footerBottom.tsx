import { Link } from "@/i18n/routing";

interface FooterBottomProps {
    t: any;
}

export const FooterBottom = ({ t }: FooterBottomProps) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 font-sans">
            <p className="text-sm text-sand/50 font-light">
                © {new Date().getFullYear()} Random Tailored Tours. {t("copyright")}
            </p>

            <div className="flex items-center gap-8">
                <div className="flex gap-6">
                    <Link
                        href="/privacy"
                        className="text-xs text-sand/50 hover:text-terracotta transition-colors duration-300 tracking-wider"
                    >
                        {t("privacy")}
                    </Link>
                    <Link
                        href="/terms"
                        className="text-xs text-sand/50 hover:text-terracotta transition-colors duration-300 tracking-wider"
                    >
                        {t("terms")}
                    </Link>
                </div>

                <div className="h-4 w-px bg-sand/20"></div>

                <p className="text-xs text-sand/40 tracking-widest font-light">
                    Crafted with passion in Vietnam
                </p>
            </div>
        </div>
    );
};