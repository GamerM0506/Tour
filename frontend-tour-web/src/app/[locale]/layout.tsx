import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Header } from "@/shared/components/layout/header";
import { Footer } from '@/shared/components/layout/footer';
import "../globals.css";

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
        <html lang={locale}>
            <body className="antialiased flex min-h-screen flex-col">
                <NextIntlClientProvider messages={messages} locale={locale}>
                    <Header />
                    <main className="flex-1">
                        {children}
                    </main>
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}