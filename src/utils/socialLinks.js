import { socialPlatformColors } from '../Styles/colors'
import { normalizeWhatsAppHref } from './whatsapp'

const SOCIAL_PLATFORMS = [
  { key: 'facebook', icon: 'facebook', label: 'Facebook' },
  { key: 'linkedin', icon: 'linkedin', label: 'LinkedIn' },
  { key: 'snapchat', icon: 'snapchat', label: 'SnapChat' },
  { key: 'instagram', icon: 'instagram', label: 'Instagram' },
  { key: 'twitter', icon: 'twitter', label: 'X (Twitter)' },
  { key: 'whatsapp', icon: 'whatsapp', label: 'WhatsApp' },
  { key: 'telegram', icon: 'paperPlane', label: 'Telegram' },
  { key: 'tiktok', icon: 'tiktok', label: 'TikTok' },
]

export function buildFooterSocialLinks(settings) {
  if (!settings) return []

  return SOCIAL_PLATFORMS
    .filter((platform) => settings[platform.key])
    .map((platform) => ({
      ...platform,
      color: socialPlatformColors[platform.key],
      href:
        platform.key === 'whatsapp' && !settings[platform.key].startsWith('http')
          ? normalizeWhatsAppHref(settings[platform.key])
          : settings[platform.key],
    }))
}

export function buildContactSocialLinks(settings) {
  if (!settings) return []

  const contactLabels = {
    twitter: 'X',
  }

  return SOCIAL_PLATFORMS
    .filter((platform) => settings[platform.key])
    .map((platform) => ({
      ...platform,
      label: contactLabels[platform.key] ?? platform.label,
      link: settings[platform.key],
    }))
}
