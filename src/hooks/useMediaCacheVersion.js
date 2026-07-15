import { useSelector } from "react-redux";

function getLatestFulfilledTimestamp(queries) {
  if (!queries) return 0;

  let latest = 0;

  for (const query of Object.values(queries)) {
    if (query?.status === "fulfilled" && query.fulfilledTimeStamp > latest) {
      latest = query.fulfilledTimeStamp;
    }
  }

  return latest;
}

export function useMediaCacheVersion() {
  const apiVersion = useSelector((state) =>
    getLatestFulfilledTimestamp(state.api?.queries),
  );
  const projectApiVersion = useSelector((state) =>
    getLatestFulfilledTimestamp(state.projectApi?.queries),
  );

  return Math.max(apiVersion, projectApiVersion);
}
