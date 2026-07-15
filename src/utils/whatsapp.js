export function buildWhatsAppUrl({ whatsapp, sitePhone, message, fallbackPhone = '+966559544554' }) {
  if (whatsapp) {
    if (whatsapp.includes('?text=')) return whatsapp
    return `${whatsapp}?text=${encodeURIComponent(message)}`
  }

  if (sitePhone) {
    return `https://wa.me/${sitePhone.replace(/\+/g, '').replace(/\s/g, '')}?text=${encodeURIComponent(message)}`
  }

  return `https://wa.me/${fallbackPhone}?text=${encodeURIComponent(message)}`
}

export function normalizeWhatsAppHref(value) {
  if (!value) return value
  if (value.startsWith('http')) return value
  return `https://wa.me/${value.replace(/\+/g, '')}`
}
