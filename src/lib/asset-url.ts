// Lovable assets are hosted at /__l5e/* on lovable.app infrastructure.
// On external hosts (Vercel, custom domains) the relative path 404s, so we
// always resolve against the published lovable.app origin (CORS is open).
const ASSET_ORIGIN = "https://liquid-dreams-landing.lovable.app";

type AssetPointer = { url: string };

export function assetUrl(asset: AssetPointer | string): string {
  const raw = typeof asset === "string" ? asset : asset.url;
  if (/^https?:\/\//i.test(raw)) return raw;
  return `${ASSET_ORIGIN}${raw.startsWith("/") ? "" : "/"}${raw}`;
}
