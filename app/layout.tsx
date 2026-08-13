import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://travel-ben-bulgaria.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Travel Ben | בולגריה בדרך שלכם",
  description:
    "טיולים פרטיים מסופיה עם בויאן אריה — מדריך דובר עברית, רכב נוח ומסלול אישי ברחבי בולגריה.",
  icons: {
    icon: "/travel-ben-mark.svg",
    shortcut: "/travel-ben-mark.svg",
    apple: "/travel-ben-mark.svg",
  },
  openGraph: {
    title: "Travel Ben | בולגריה בדרך שלכם",
    description: "טיולים פרטיים מבולגריה עם מדריך דובר עברית",
    type: "website",
    url: siteUrl,
    images: [
      {
        url: "/og.png",
        width: 1744,
        height: 913,
        alt: "Travel Ben — Bulgaria your way",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Ben | בולגריה בדרך שלכם",
    description: "טיולים פרטיים מבולגריה עם מדריך דובר עברית",
    images: ["/og.png"],
  },
};

const themeScript = `(function(){try{var stored=localStorage.getItem('travel-ben-theme');var theme=stored||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=theme;}catch(e){document.documentElement.dataset.theme='light';}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
