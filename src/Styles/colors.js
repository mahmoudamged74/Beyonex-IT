/**
 * JS color tokens — kept in sync with src/Styles/_variables.css
 * Only values needed by JS call sites.
 */
export const colors = {
  brand900: '#1E3347',
  brand800: '#2A4560',
  brand700: '#355570',
  brand600: '#4A7A9B',
  brand400: '#2180A6',
  brand200: '#32C8D9',
  brand100: '#7DD9E6',
  brand50: '#EAF3F8',

  primary: '#32C8D9',

  serviceCyan: '#32C8D9',
  serviceTeal: '#2EC4B6',
  serviceBlue: '#45B7D1',
  serviceSteel: '#5B9BD5',
  serviceMint: '#3DBEA7',
  serviceIndigo: '#4A6FA5',
  serviceOcean: '#28B4C8',

  whatsapp: '#25D366',
  socialFacebook: '#1877F2',
  socialLinkedin: '#0A66C2',
  socialSnapchat: '#FFFC00',
  socialInstagram: '#E4405F',
  socialTwitter: '#000000',
  socialTelegram: '#0088cc',
};

export const COLOR_PALETTE = [
  colors.serviceCyan,
  colors.serviceTeal,
  colors.serviceBlue,
  colors.primary,
  colors.serviceMint,
  colors.serviceOcean,
  colors.serviceSteel,
  colors.serviceIndigo,
];

export const socialPlatformColors = {
  facebook: colors.socialFacebook,
  linkedin: colors.socialLinkedin,
  snapchat: colors.socialSnapchat,
  instagram: colors.socialInstagram,
  twitter: colors.socialTwitter,
  whatsapp: colors.whatsapp,
  telegram: colors.socialTelegram,
  tiktok: colors.socialTwitter,
};
