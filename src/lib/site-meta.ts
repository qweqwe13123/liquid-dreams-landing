const DEFAULT_ORIGIN = "https://www.solverwebsite.com";

export const SITE_TITLE = "Solver — Digital Systems That Help Businesses Scale";

export const SITE_DESCRIPTION =
  "From premium websites and mobile applications to automation, customer acquisition, and business infrastructure.";

export function getSiteOrigin(): string {
  const fromEnv = import.meta.env.VITE_SITE_ORIGIN as string | undefined;
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  const vercel = import.meta.env.VERCEL_URL as string | undefined;
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return DEFAULT_ORIGIN;
}

export function buildSiteMeta() {
  const origin = getSiteOrigin();
  const ogImage = `${origin}/og-image.png`;

  return {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    ogImage,
    ogUrl: origin,
  };
}

export function siteMetaTags(overrides?: { title?: string; description?: string }) {
  const meta = buildSiteMeta();
  const title = overrides?.title ?? meta.title;
  const description = overrides?.description ?? meta.description;

  return [
    { title },
    { name: "description", content: description },
    { name: "author", content: "Solver" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: meta.ogUrl },
    { property: "og:image", content: meta.ogImage },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: meta.ogImage },
  ];
}
