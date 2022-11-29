import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import resources from '@/locales';

const DEFAULT_LANGUAGE = 'ru';

i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LANGUAGE,
  debug: false,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
