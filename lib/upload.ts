export function normalizeImageUrl(value: FormDataEntryValue | null): string | undefined {
  const url = typeof value === "string" ? value.trim() : "";
  if (!url) return undefined;
  if (!/^https?:\/\//i.test(url)) return undefined;
  return url;
}
