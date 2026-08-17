import type { Language } from "./travel-ben-page";
import { structuredData } from "./site-config";

export default function SeoJsonLd({ language }: { language: Language }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(language)) }} />;
}

