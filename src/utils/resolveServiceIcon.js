import { iconMap } from '../Components/Common/iconMap';

const ICON_ALIASES = {
  rocketLaunch: 'launch',
  rocketTakeoff: 'launch',
  visibility: 'eye',
  shield: 'shieldAlt',
  security: 'shieldCheck',
  chat: 'chatDots',
  headsetFill: 'headset',
  training: 'graduationCap',
  graduate: 'userGraduate',
};

function toCamelCase(value) {
  return value
    .replace(/[_-]+([a-zA-Z0-9])/g, (_, char) => char.toUpperCase())
    .replace(/^[A-Z]/, (char) => char.toLowerCase());
}

function stripIconPrefix(value) {
  if (/^Fa[A-Z]/.test(value)) {
    return value.charAt(2).toLowerCase() + value.slice(3);
  }

  if (/^Bs[A-Z]/.test(value)) {
    return value.charAt(2).toLowerCase() + value.slice(3);
  }

  if (/^Md[A-Z]/.test(value)) {
    return value.charAt(2).toLowerCase() + value.slice(3);
  }

  if (/^Hi[A-Z]/.test(value)) {
    return value.charAt(2).toLowerCase() + value.slice(3);
  }

  if (/^Io[A-Z]/.test(value)) {
    return value.charAt(2).toLowerCase() + value.slice(3);
  }

  if (/^Si[A-Z]/.test(value)) {
    return value.charAt(2).toLowerCase() + value.slice(3);
  }

  return value;
}

export function getServiceIconSource(service) {
  if (!service || typeof service !== 'object') return null;

  return (
    service.icon ??
    service.icon_path ??
    service.iconPath ??
    service.icon_url ??
    service.iconUrl ??
    null
  );
}

export function isServiceIconMedia(value) {
  if (!value || typeof value !== 'string') return false;

  const trimmed = value.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith('data:') || trimmed.startsWith('blob:')) return true;
  if (/^https?:\/\//i.test(trimmed)) return true;
  if (trimmed.startsWith('/') || trimmed.includes('storage/')) return true;

  return false;
}

export function resolveServiceIconName(value) {
  if (!value || typeof value !== 'string') return 'codeSlash';

  const trimmed = value.trim();
  if (!trimmed || isServiceIconMedia(trimmed)) return 'codeSlash';

  const candidates = new Set([
    trimmed,
    toCamelCase(trimmed),
    stripIconPrefix(trimmed),
    toCamelCase(stripIconPrefix(trimmed)),
  ]);

  if (trimmed.includes('/')) {
    const segment = trimmed.split('/').pop()?.replace(/\.[^.]+$/, '');
    if (segment) {
      candidates.add(segment);
      candidates.add(toCamelCase(segment));
      candidates.add(stripIconPrefix(segment));
      candidates.add(toCamelCase(stripIconPrefix(segment)));
    }
  }

  for (const candidate of candidates) {
    if (!candidate) continue;
    if (iconMap[candidate]) return candidate;
    if (ICON_ALIASES[candidate]) return ICON_ALIASES[candidate];
  }

  return 'codeSlash';
}
