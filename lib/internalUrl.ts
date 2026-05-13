export type InternalDocType =
  | "page"
  | "project"
  | "service"
  | "market"
  | "article"
  | "job"
  | "location";

export function buildInternalUrl(type: InternalDocType, slug: string, pagePath?: string): string {
  switch (type) {
    case "page":
      return pagePath ?? `/${slug}`;
    case "project":
      return `/projects/${slug}`;
    case "service":
      return `/services/${slug}`;
    case "market":
      return `/markets/${slug}`;
    case "article":
      return `/insights/${slug}`;
    case "job":
      return `/careers/${slug}`;
    case "location":
      return `/locations/${slug}`;
  }
}

export function isInternalDocType(t: string): t is InternalDocType {
  return ["page", "project", "service", "market", "article", "job", "location"].includes(t);
}
