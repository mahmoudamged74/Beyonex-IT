import { useEffect } from 'react';
import { useSettings } from '../../../hooks/useSettings';
import { useLocale } from '../../../hooks/useLocale';
import { getLocalizedOrRaw } from '../../../utils/i18nHelpers';
import { resolveMediaUrl } from '../../../utils/mediaUrl';
import { applyDocumentFavicon } from '../../../utils/siteFavicon';
import { useMediaCacheVersion } from '../../../hooks/useMediaCacheVersion';

const SEOManager = () => {
  const { normalizedLang } = useLocale();
  const { settings, data: settingsData } = useSettings();
  const mediaCacheVersion = useMediaCacheVersion();

  useEffect(() => {
    if (settingsData) {
      const siteName = getLocalizedOrRaw(settings?.site_name, normalizedLang) || 'Beyonex IT';
      document.title = siteName;

      const metaDesc = getLocalizedOrRaw(settings?.meta_desc, normalizedLang)
        || getLocalizedOrRaw(settings?.site_desc, normalizedLang);
      if (metaDesc) {
        let descriptionTag = document.querySelector('meta[name="description"]');
        if (!descriptionTag) {
          descriptionTag = document.createElement('meta');
          descriptionTag.setAttribute('name', 'description');
          document.head.appendChild(descriptionTag);
        }
        descriptionTag.setAttribute('content', metaDesc);
      }

      const faviconHref = resolveMediaUrl(settings?.favicon, mediaCacheVersion);
      if (faviconHref) {
        applyDocumentFavicon(faviconHref);
      }

      const updateMetaProperty = (property, content) => {
        let tag = document.querySelector(`meta[property="${property}"]`);
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute('property', property);
          document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
      };

      updateMetaProperty('og:title', siteName);
      if (metaDesc) updateMetaProperty('og:description', metaDesc);
      const logoUrl = resolveMediaUrl(settings.logo, mediaCacheVersion);
      if (logoUrl && !logoUrl.startsWith('data:')) updateMetaProperty('og:image', logoUrl);
      updateMetaProperty('og:url', window.location.href);
      updateMetaProperty('og:type', 'website');

      const updateMetaName = (name, content) => {
        let tag = document.querySelector(`meta[name="${name}"]`);
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute('name', name);
          document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
      };

      updateMetaName('twitter:card', 'summary_large_image');
      updateMetaName('twitter:title', siteName);
      if (metaDesc) updateMetaName('twitter:description', metaDesc);
      if (logoUrl && !logoUrl.startsWith('data:')) updateMetaName('twitter:image', logoUrl);
    }
  }, [settingsData, normalizedLang, settings, mediaCacheVersion]);

  return null;
};

export default SEOManager;
