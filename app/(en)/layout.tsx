import type { ReactNode } from "react";
import "../globals.css";
import { createMetadata, themeScript } from "../site-config";

export const metadata = createMetadata("en");

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>{children}</body>
    </html>
  );
}

