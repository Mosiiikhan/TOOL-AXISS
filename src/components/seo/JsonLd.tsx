type Data = Record<string, unknown> | Record<string, unknown>[];

export default function JsonLd({ data }: { data: Data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}