const SITE_URL = "https://www.hp-outils.com";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  imagePath?: string;
  type?: "website" | "product" | "article";
  noindex?: boolean;
};

export function createSeoHead({
  title,
  description,
  path,
  imagePath,
  type = "website",
  noindex = false,
}: SeoInput) {
  const url = new URL(path, SITE_URL).toString();
  const image = new URL(imagePath ?? "/images/share-hp.jpg", SITE_URL).toString();
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { property: "og:image", content: image },
      { name: "twitter:image", content: image },
      ...(noindex ? [{ name: "robots", content: "noindex" }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
  };
}