// Remote assets are served from the published app origin when needed (CORS is open).
const ASSET_ORIGIN = "https://www.solverwebsite.com";

type AssetPointer = { url: string };

export function assetUrl(asset: AssetPointer | string): string {
  const raw = typeof asset === "string" ? asset : asset.url;
  if (/^https?:\/\//i.test(raw)) return raw;
  return `${ASSET_ORIGIN}${raw.startsWith("/") ? "" : "/"}${raw}`;
}
