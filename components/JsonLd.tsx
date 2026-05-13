// Renders one or more JSON-LD blocks as <script type="application/ld+json">.
// Used in the root layout for Organization/LocalBusiness/FAQ and on detail
// pages for BreadcrumbList + per-content schemas (Project, Service, Article).

type Schema = Record<string, unknown> | null | undefined;

export function JsonLd({ data }: { data: Schema | Schema[] }) {
  const list = (Array.isArray(data) ? data : [data]).filter(Boolean) as Record<
    string,
    unknown
  >[];
  if (!list.length) return null;
  return (
    <>
      {list.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
