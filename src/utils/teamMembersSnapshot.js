export function normalizeTeamMemberStatus(status) {
  if (status == null) return null
  if (status === false || status === 0 || status === '0') return false
  return Boolean(status)
}

export function isActiveTeamMember(member) {
  const status = normalizeTeamMemberStatus(member?.status)
  if (status == null) return true
  return status
}

export function getTeamMemberSnapshot(member) {
  if (!member) return null

  return {
    id: member.id,
    status: normalizeTeamMemberStatus(member.status),
    name: member.name ?? null,
    title: member.title ?? null,
    email: member.email ?? '',
    linkedin: member.linkedin ?? '',
    image_path: member.image_path ?? '',
    display_order: member.display_order ?? 0,
    updated_at: member.updated_at ?? '',
  }
}

export function getTeamMembersSignature(members = []) {
  return JSON.stringify(
    members
      .map(getTeamMemberSnapshot)
      .filter(Boolean)
      .sort((a, b) => String(a.id).localeCompare(String(b.id))),
  )
}

export function getActiveTeamMembers(members = []) {
  return members.filter(isActiveTeamMember)
}
