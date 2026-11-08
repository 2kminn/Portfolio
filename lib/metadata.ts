import { withBasePath } from "@/lib/base-path";

function parseHttpUrl(value: string | undefined): URL | undefined {
  if (!value || !/^https?:\/\//i.test(value.trim())) return undefined;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url : undefined;
  } catch {
    return undefined;
  }
}

export const metadataBase = parseHttpUrl(process.env.NEXT_PUBLIC_SITE_URL);

export function resolveSocialImageUrl(source: string | undefined, base = metadataBase): string | undefined {
  if (!source?.trim()) return undefined;

  const absolute = parseHttpUrl(source);
  if (absolute) return absolute.href;
  if (!base) return undefined;

  try {
    return parseHttpUrl(new URL(withBasePath(source), base).href)?.href;
  } catch {
    return undefined;
  }
}
