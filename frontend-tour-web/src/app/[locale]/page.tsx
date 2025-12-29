import { useTranslations } from "next-intl";

export default function HomePage() {
    const t = useTranslations("HomePage");
    return (
        <div className="container mx-auto py-20 text-center">
            <h1 className="text-4xl font-bold text-orange-600">{t("title")}</h1>
            <h1 className="text-4xl font-bold text-orange-600">{t("title")}</h1>
            <h1 className="text-4xl font-bold text-orange-600">{t("title")}</h1>
            <h1 className="text-4xl font-bold text-orange-600">{t("title")}</h1>
            <h1 className="text-4xl font-bold text-orange-600">{t("title")}</h1>
            <h1 className="text-4xl font-bold text-orange-600">{t("title")}</h1>
            <h1 className="text-4xl font-bold text-orange-600">{t("title")}</h1>
            <p className="mt-4 text-slate-600">{t("description")}</p>
        </div>
    );
}