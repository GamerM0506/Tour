import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Playfair_Display, Inter } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { LazyMotion, domMax } from "framer-motion";
import "../globals.css";

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-serif',
    display: 'swap',
});

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
});

const Header = dynamic(() => import("@/shared/components/layout/header").then(mod => mod.Header), {
    ssr: true,
});
const Footer = dynamic(() => import("@/shared/components/layout/footer").then(mod => mod.Footer), {
    ssr: true,
});

export function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'vi' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: {
            template: '%s | Random Tailored Tours',
            default: 'Random Tailored Tours | Luxury Vietnam Experiences',
        },
        metadataBase: new URL('https://randomtailoredtours.com'),
    };
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const messages = await getMessages();

    return (
        <html lang={locale} className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
            <head>
                <link rel="preconnect" href="https://res.cloudinary.com" />
                <link
                    rel="preload"
                    as="image"
                    fetchPriority="high"
                    href="https://res.cloudinary.com/dcfaz2rme/image/upload/f_auto,q_auto,w_1080/508238823_750133594204746_4543110537008459001_n_uxwl8t"
                />
            </head>
            <body className="antialiased flex min-h-screen flex-col bg-sand-light text-jet">
                <LazyMotion features={domMax}>
                    <NextIntlClientProvider messages={messages} locale={locale}>
                        <Header />
                        <main className="flex-1">
                            {children}
                        </main>
                        <Footer />
                        <SpeedInsights />
                    </NextIntlClientProvider>
                </LazyMotion>
            </body>
        </html>
    );
}