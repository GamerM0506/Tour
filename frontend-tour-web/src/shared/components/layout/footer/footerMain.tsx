import { FooterBrand } from "./footerBrand";
import { FooterLinks } from "./footerLinks";
import { FooterContact } from "./footerContact";
import { FooterNewsletter } from "./footerNewsletter";

interface FooterMainProps {
  quickLinks: Array<{ label: string; href: string; icon: string }>;
  t: any;
}

export const FooterMain = ({ quickLinks, t }: FooterMainProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 relative z-20">
      <FooterBrand t={t} />
      <FooterLinks quickLinks={quickLinks} t={t} />
      <FooterContact t={t} />
      <FooterNewsletter t={t} />
    </div>
  );
};