"use client";

import { memo } from "react";
import { FooterBrand } from "./footerBrand";
import { FooterLinks } from "./footerLinks";
import { FooterContact } from "./footerContact";
import { FooterNewsletter } from "./footerNewsletter";

interface FooterMainProps {
  quickLinks: Array<{ label: string; href: string; icon: string }>;
  t: any;
}

export const FooterMain = memo(({ quickLinks, t }: FooterMainProps) => {
  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20 relative z-20 transform-gpu"
      style={{ contain: 'layout' }}
    >
      <FooterBrand t={t} />
      <FooterLinks quickLinks={quickLinks} t={t} />
      <FooterContact t={t} />
      <FooterNewsletter t={t} />
    </div>
  );
});

FooterMain.displayName = "FooterMain";