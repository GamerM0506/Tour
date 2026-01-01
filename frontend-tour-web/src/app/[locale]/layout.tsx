import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Header } from "@/shared/components/layout/header";
import { Footer } from '@/shared/components/layout/footer';
import { Playfair_Display, Inter } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from 'next';
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

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const { locale } = await params;

    return {
        title: {
            template: '%s | Random Tailored Tours',
            default: 'Random Tailored Tours | Luxury Vietnam Experiences',
        },
        description: 'Discover the hidden gems of Vietnam through our exclusive luxury tailored boat and land tours.',
        metadataBase: new URL('http://localhost:3000'),
        alternates: {
            canonical: `/${locale}`,
            languages: {
                'vi-VN': '/vi',
                'en-US': '/en',
            },
        },
        openGraph: {
            title: 'Random Tailored Tours',
            description: 'Luxury Vietnam Experiences',
            url: `/${locale}`,
            siteName: 'Random Tailored Tours',
            locale: locale === 'vi' ? 'vi_VN' : 'en_US',
            type: 'website',
        },
        robots: {
            index: true,
            follow: true,
        }
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
        <html
            lang={locale}
            className={`${playfair.variable} ${inter.variable} scroll-smooth`}
        >
            <body className="antialiased flex min-h-screen flex-col bg-sand-light text-jet selection:bg-terracotta selection:text-sand">
                <NextIntlClientProvider messages={messages} locale={locale}>
                    <Header />
                    <main className="flex-1">
                        {children}
                    </main>
                    <Footer />
                    <SpeedInsights />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}