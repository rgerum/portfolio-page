export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.richardgerum.com"
).replace(/\/$/, "");

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function absoluteUrl(path) {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
