import { useTranslation } from 'react-i18next'
import { useGetHomeDataQuery } from '../redux/api/homeApi'

export function useHomeData() {
  const { i18n } = useTranslation()
  const query = useGetHomeDataQuery(i18n.language)
  const homeData = query.data?.data

  return {
    ...query,
    hero: homeData?.hero_section,
    services: homeData?.services ?? [],
    whyUs: homeData?.why_us ?? [],
    about: homeData?.about,
    lang: i18n.language,
  }
}
