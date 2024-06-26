import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import LocalStorageBackend from "i18next-localstorage-backend";
import { initReactI18next } from "react-i18next";
import deDE from "../locales/de-DE/translation.json";
import enUS from "../locales/en-US/translation.json";

export const isGerman = (l: string) => {
  return ["de", "de-DE", "de-AT"].includes(l);
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enUS,
      },
      "en-US": {
        translation: enUS,
      },
      "en-GB": {
        translation: enUS,
      },
      de: {
        translation: deDE,
      },
      "de-DE": {
        translation: deDE,
      },
      "de-AT": {
        translation: deDE,
      },
    },
    lng: "de-DE",
    fallbackLng: "en-US",
    backend: {
      backends: [LocalStorageBackend],
    },
    interpolation: {
      escapeValue: false,
    },
  });
