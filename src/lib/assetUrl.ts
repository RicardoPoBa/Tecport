/**
 * Prefixes an absolute public-asset path (e.g. "/images/logo.png") with
 * Vite's configured base ("/Tecport/" on GitHub Pages, "/" locally), so
 * images resolved from JSON data or hardcoded paths still load once the
 * app is served from a subpath.
 */
export function withBase(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}
