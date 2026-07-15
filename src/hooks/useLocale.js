import { useTranslation } from 'react-i18next'

export function useLocale() {
  const { i18n } = useTranslation()
  const lang = i18n.language

  return {
    lang,
    isRTL: lang === 'ar',
    normalizedLang: lang === 'ar' ? 'ar' : 'en',
  }
}
