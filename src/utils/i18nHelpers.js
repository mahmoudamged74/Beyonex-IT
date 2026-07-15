export function getLocalized(field, lang, fallbackLang = 'ar') {
  if (field == null) return ''
  if (typeof field === 'string') return field
  return field[lang] ?? field[fallbackLang] ?? ''
}

export function getLocalizedOrRaw(field, lang) {
  if (field == null) return field
  if (typeof field === 'string') return field
  return field[lang] ?? field
}
