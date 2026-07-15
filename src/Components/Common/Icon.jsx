import { iconMap } from './iconMap'

export default function Icon({ name, fallback, className, ...props }) {
  const IconComponent = iconMap[name] || (fallback ? iconMap[fallback] : null)

  if (!IconComponent) return null

  return <IconComponent className={className} {...props} />
}
