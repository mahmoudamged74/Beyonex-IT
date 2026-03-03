import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetSettingsQuery } from '../../redux/api/settingsApi';

const SEOManager = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'ar';
  const { data: settingsData } = useGetSettingsQuery(currentLang);

  useEffect(() => {
    if (settingsData?.data) {
      const settings = settingsData.data;
      const lang = i18n.language === 'ar' ? 'ar' : 'en';

      // 1. Update Document Title
      const siteName = settings.site_name?.[lang] || 'Beyonex IT';
      document.title = siteName;

      // 2. Update Meta Description
      const metaDesc = settings.meta_desc?.[lang] || settings.site_desc?.[lang];
      if (metaDesc) {
        let descriptionTag = document.querySelector('meta[name="description"]');
        if (!descriptionTag) {
          descriptionTag = document.createElement('meta');
          descriptionTag.setAttribute('name', 'description');
          document.head.appendChild(descriptionTag);
        }
        descriptionTag.setAttribute('content', metaDesc);
      }

      // 3. Update Favicon
      if (settings.favicon) {
        let faviconTag = document.querySelector('link[rel="icon"]');
        if (!faviconTag) {
          faviconTag = document.createElement('link');
          faviconTag.setAttribute('rel', 'icon');
          document.head.appendChild(faviconTag);
        }
        faviconTag.setAttribute('href', settings.favicon);
        faviconTag.setAttribute('type', 'image/png');
      }

      // 4. Update Open Graph Tags
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
      if (settings.logo) updateMetaProperty('og:image', settings.logo);
      updateMetaProperty('og:url', window.location.href);
      updateMetaProperty('og:type', 'website');

      // 5. Update Twitter Card Tags
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
      if (settings.logo) updateMetaName('twitter:image', settings.logo);
    }
  }, [settingsData, i18n.language]);

  return null;
};

export default SEOManager;
