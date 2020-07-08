import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationsEN from '@/locales/en/translation.json';
import translationsZH from '@/locales/zh/translation.json';
import translationsFR from '@/locales/fr/translation.json';

export const createInstance = lang => {
  const instance = i18n
    .createInstance({
      resources: {
        zh: { translation: translationsZH },
        en: { translation: translationsEN },
        fr: { translation: translationsFR },
      },
      lng: lang,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
      keySeparator: '-',
    })
    .use(initReactI18next);

  instance.init();
  return instance;
};

export default createInstance('en');
