import en from "@/locales/en.json"
import fr from "@/locales/fr.json"

type Locales = 'en' | 'fr';

const translation: Record<Locales, Record<string, string>> = {
    en,
    fr
};

export const getTranslation = (locale: Locales, key: string): string => {
    const langTranslations = translation[locale];
    return langTranslations[key] || key;
};