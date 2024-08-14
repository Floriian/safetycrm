export const createUrlQuery = (object: Record<string, unknown>): string => {
  const entries = Object.entries(object);
  const queryString = `?${entries
    .map(([key, value]) => {
      const keyLength = key.length > 0;
      if (keyLength) return `${key}=${value}`;
    })
    .join("&")}`;
  return queryString;
};
