import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import resources from '@/locales';

const DEFAULT_LOCALE = 'en';

i18next.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LOCALE,
  debug: false,
  fallbackLng: DEFAULT_LOCALE,
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
