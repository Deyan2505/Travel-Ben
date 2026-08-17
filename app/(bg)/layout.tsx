import type { ReactNode } from "react";
import "../globals.css";
import { createMetadata, themeScript } from "../site-config";

export const metadata = createMetadata("bg");

export default function BulgarianLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="bg" dir="ltr" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>{children}</body>
    </html>
  );
}

