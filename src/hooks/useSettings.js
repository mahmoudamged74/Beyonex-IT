import { useTranslation } from 'react-i18next'
import { useGetSettingsQuery } from '../redux/api/settingsApi'

export function useSettings() {
  const { i18n } = useTranslation()
  const query = useGetSettingsQuery(i18n.language)

  return {
    ...query,
    settings: query.data?.data,
    lang: i18n.language,
  }
}
