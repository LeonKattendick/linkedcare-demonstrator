import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import deAT from '../locales/de-AT/translation.json';
import enUS from '../locales/en-US/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enUS,
      },
      de: {
        translation: deAT,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
