import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import language resources
import en from "./locales/en.json";
import yo from "./locales/yo.json";
import ig from "./locales/ig.json";
import ha from "./locales/ha.json";
import fr from "./locales/fr.json";
import ar from "./locales/ar.json";
import sw from "./locales/sw.json";

const resources = {
  en: { translation: en },
  yo: { translation: yo },
  ig: { translation: ig },
  ha: { translation: ha },
  fr: { translation: fr },
  ar: { translation: ar },
  sw: { translation: sw },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development",

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
