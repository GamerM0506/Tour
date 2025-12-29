"use client";

import "./footer.css";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Separator } from "@/shared/components/ui/separator";
import { 
  Facebook, Instagram, Youtube, Mail, 
  Phone, MapPin, UtensilsCrossed, ChefHat 
} from "lucide-react";

export const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <footer className="footer-wrapper">
      {/* Decorative Elements */}
      <div className="footer-blob top-10 left-10 w-72 h-72 bg-orange-400" />
      <div className="footer-blob bottom-10 right-10 w-96 h-96 bg-amber-300" />
      
      <UtensilsCrossed className="absolute top-20 left-10 h-12 w-12 text-orange-100 animate-float" />
      <ChefHat className="absolute bottom-20 right-10 h-12 w-12 text-amber-100 animate-float-delayed" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Newsletter */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-orange-600 p-2.5 rounded-xl shadow-lg shadow-orange-200">
                <UtensilsCrossed className="h-6 w-6 text-white" />
              </div>
              <span className="font-black text-2xl logo-gradient">Hanoi Food</span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">{t("description")}</p>
            <div className="flex gap-2 group">
              <Input placeholder={t("emailPlaceholder")} className="rounded-full border-slate-200" />
              <Button className="btn-premium rounded-full">{t("subscribe")}</Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-10">
            <h4 className="font-bold text-slate-800 mb-6">{t("quickLinks")}</h4>
            <nav className="flex flex-col gap-4 text-sm">
              <Link href="/tours" className="footer-link">{t("tours")}</Link>
              <Link href="/about" className="footer-link">{t("about")}</Link>
              <Link href="/blog" className="footer-link">{t("blog")}</Link>
            </nav>
          </div>

          {/* Contact (SEO: Address) */}
          <div>
            <h4 className="font-bold text-slate-800 mb-6">{t("contact")}</h4>
            <address className="not-italic space-y-4 text-sm text-slate-500">
              <a href="tel:+84123456789" className="flex items-center gap-3 hover:text-orange-600 transition-colors">
                <Phone className="h-4 w-4 text-orange-500" /> +84 123 456 789
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-orange-500 mt-1" />
                <span>Old Quarter, Hanoi, Vietnam</span>
              </div>
            </address>
          </div>

          {/* Social & Awards */}
          <div className="flex flex-col items-center lg:items-start gap-6">
             <div className="flex gap-4">
                <a href="#" className="social-btn"><Facebook size={18} /></a>
                <a href="#" className="social-btn"><Instagram size={18} /></a>
                <a href="#" className="social-btn"><Youtube size={18} /></a>
             </div>
             <div className="text-center lg:text-left">
                <div className="text-3xl font-black text-orange-600">4.9/5</div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t("rating")}</p>
             </div>
          </div>
        </div>

        <Separator className="bg-slate-200/50" />

        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          <p>{t("copyright")}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-orange-600">{t("privacy")}</Link>
            <Link href="/terms" className="hover:text-orange-600">{t("terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};