import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGetAboutQuery } from '../redux/api/aboutApi'
import { LIVE_QUERY_OPTIONS } from '../redux/liveQueryOptions'
import {
  getActiveTeamMembers,
  getTeamMembersSignature,
} from '../utils/teamMembersSnapshot'

const EMPTY_TEAM_STATE = {
  signature: '',
  activeTeamMembers: [],
  showTeamSection: false,
}

export function useAboutTeam() {
  const { i18n } = useTranslation()
  const query = useGetAboutQuery(i18n.language, LIVE_QUERY_OPTIONS)
  const [teamState, setTeamState] = useState(EMPTY_TEAM_STATE)

  useEffect(() => {
    if (query.isFetching && !query.data) return

    const teamMembers = query.data?.data?.team_members ?? []
    const signature = getTeamMembersSignature(teamMembers)
    const activeTeamMembers = getActiveTeamMembers(teamMembers)
    const showTeamSection = !query.isLoading && activeTeamMembers.length > 0

    setTeamState((prev) => {
      if (prev.signature === signature && prev.showTeamSection === showTeamSection) {
        return prev
      }

      return {
        signature,
        activeTeamMembers,
        showTeamSection,
      }
    })
  }, [query.data, query.isLoading, query.isFetching])

  return {
    lang: i18n.language,
    isLoading: query.isLoading,
    activeTeamMembers: teamState.activeTeamMembers,
    teamMembersSignature: teamState.signature,
    showTeamSection: teamState.showTeamSection,
  }
}
