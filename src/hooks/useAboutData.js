import { useTranslation } from 'react-i18next'
import { useGetAboutQuery } from '../redux/api/aboutApi'

export function useAboutData() {
  const { i18n } = useTranslation()
  const query = useGetAboutQuery(i18n.language)
  const aboutData = query.data?.data

  return {
    ...query,
    aboutData,
    aboutPage: aboutData?.about_page,
    lang: i18n.language,
  }
}
