import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import LocalStorageBackend from "i18next-localstorage-backend";
import { initReactI18next } from "react-i18next";
import deDE from "../locales/de-DE/translation.json";
import enUS from "../locales/en-US/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      "en-US": {
        translation: enUS,
      },
      "de-DE": {
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
