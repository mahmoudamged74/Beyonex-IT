import { useTranslation } from 'react-i18next'
import { useGetAboutQuery } from '../redux/api/aboutApi'
import { LIVE_QUERY_OPTIONS } from '../redux/liveQueryOptions'
import {
  getActiveTeamMembers,
  getTeamMembersSignature,
} from '../utils/teamMembersSnapshot'

export function useAboutData() {
  const { i18n } = useTranslation()
  const query = useGetAboutQuery(i18n.language, LIVE_QUERY_OPTIONS)
  const aboutData = query.data?.data
  const teamMembers = aboutData?.team_members ?? []
  const activeTeamMembers = getActiveTeamMembers(teamMembers)
  const teamMembersSignature = getTeamMembersSignature(teamMembers)
  const activeAchievements = (aboutData?.achievements || []).filter((item) => {
    const status = item?.status
    if (status == null) return true
    if (status === false || status === 0 || status === '0') return false
    return Boolean(status)
  })

  return {
    ...query,
    aboutData,
    aboutPage: aboutData?.about_page,
    activeTeamMembers,
    teamMembersSignature,
    showTeamSection: !query.isLoading && activeTeamMembers.length > 0,
    showAchievementsSection: !query.isLoading && activeAchievements.length > 0,
    lang: i18n.language,
  }
}
