import type { ReactNode } from "react";
import "../globals.css";
import { createMetadata, themeScript } from "../site-config";

export const metadata = createMetadata("he");

export default function HebrewLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>{children}</body>
    </html>
  );
}

