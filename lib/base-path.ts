const basePath = process.env.NEXT_PUBLIC_GITHUB_PAGES === "true" ? "/Portfolio" : "";

export function withBasePath(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return `${basePath}${path}`;
}
