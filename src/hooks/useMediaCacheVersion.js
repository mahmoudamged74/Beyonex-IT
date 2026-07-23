import { useSelector } from "react-redux";
import {
  fingerprint,
  hashString,
  normalizePayloadForCompare,
} from "../redux/utils/responseFingerprint";

function getContentVersion(queries) {
  if (!queries) return "";

  const payloads = Object.values(queries)
    .filter((query) => query?.status === "fulfilled" && query.data !== undefined)
    .map((query) => normalizePayloadForCompare(query.data));

  if (payloads.length === 0) return "";

  return hashString(fingerprint(payloads));
}

export function useMediaCacheVersion() {
  const apiVersion = useSelector((state) =>
    getContentVersion(state.api?.queries),
  );
  const projectApiVersion = useSelector((state) =>
    getContentVersion(state.projectApi?.queries),
  );

  return apiVersion || projectApiVersion;
}
