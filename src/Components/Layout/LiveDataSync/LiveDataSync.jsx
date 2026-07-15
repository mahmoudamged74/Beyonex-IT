import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useGetSettingsQuery } from "../../../redux/api/settingsApi";
import { useGetHomeDataQuery } from "../../../redux/api/homeApi";
import { useGetAboutQuery } from "../../../redux/api/aboutApi";
import { useGetServicesQuery } from "../../../redux/api/servicesApi";
import { LIVE_QUERY_OPTIONS } from "../../../redux/liveQueryOptions";
import { useVisibilityRefetch } from "../../../hooks/useVisibilityRefetch";
import SyncIndicator from "../SyncIndicator/SyncIndicator";

function isBackgroundSync(query) {
  return Boolean(query.isFetching && query.data && !query.isLoading);
}

export default function LiveDataSync() {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const settingsQuery = useGetSettingsQuery(lang, LIVE_QUERY_OPTIONS);
  const homeQuery = useGetHomeDataQuery(lang, LIVE_QUERY_OPTIONS);
  const aboutQuery = useGetAboutQuery(lang, LIVE_QUERY_OPTIONS);
  const servicesQuery = useGetServicesQuery(lang, LIVE_QUERY_OPTIONS);

  useVisibilityRefetch([
    settingsQuery.refetch,
    homeQuery.refetch,
    aboutQuery.refetch,
    servicesQuery.refetch,
  ]);

  const isSyncing = useMemo(
    () =>
      [settingsQuery, homeQuery, aboutQuery, servicesQuery].some(isBackgroundSync),
    [settingsQuery, homeQuery, aboutQuery, servicesQuery],
  );

  return <SyncIndicator active={isSyncing} />;
}
