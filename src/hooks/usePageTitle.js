import { useEffect } from 'react'
import { useSettings } from './useSettings'
import { useLocale } from './useLocale'
import { getLocalizedOrRaw } from '../utils/i18nHelpers'

export function usePageTitle(pageTitle) {
  const { settings } = useSettings()
  const { normalizedLang } = useLocale()

  useEffect(() => {
    const siteName =
      getLocalizedOrRaw(settings?.site_name, normalizedLang) || 'Beyonex IT'
    document.title = pageTitle ? `${pageTitle} | ${siteName}` : siteName
  }, [pageTitle, settings?.site_name, normalizedLang])
}
