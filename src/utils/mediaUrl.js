const API_ORIGIN = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/api\/?$/, '');

export const resolveMediaUrl = (value, cacheVersion) => {
  if (!value || typeof value !== 'string') return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  const dataIndex = trimmed.indexOf('data:');
  if (dataIndex !== -1) return trimmed.slice(dataIndex);

  let url = trimmed;

  if (!/^https?:\/\//i.test(url)) {
    if (!API_ORIGIN) return trimmed;
    url = trimmed.startsWith('/')
      ? `${API_ORIGIN}${trimmed}`
      : `${API_ORIGIN}/${trimmed}`;
  }

  if (!cacheVersion) return url;
  if (url.startsWith('blob:')) return url;

  const bust = encodeURIComponent(String(cacheVersion));
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}_v=${bust}`;
};
