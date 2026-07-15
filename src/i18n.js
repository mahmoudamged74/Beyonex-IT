import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import arTranslation from '../public/locales/ar/translation.json';
import enTranslation from '../public/locales/en/translation.json';

const getSavedLanguage = () => {
  const savedLang = localStorage.getItem('i18nextLng');
  if (savedLang && (savedLang === 'ar' || savedLang === 'en')) {
    return savedLang;
  }
  localStorage.setItem('i18nextLng', 'ar');
  return 'ar';
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: arTranslation },
      en: { translation: enTranslation },
    },
    fallbackLng: 'ar',
    lng: getSavedLanguage(),
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng);
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
});

const initialLang = getSavedLanguage();
document.documentElement.dir = initialLang === 'ar' ? 'rtl' : 'ltr';
document.documentElement.lang = initialLang;

export default i18n;
