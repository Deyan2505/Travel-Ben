import type { Metadata } from "next";
import type { Language } from "./travel-ben-page";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://travel-ben-bulgaria.netlify.app").replace(/\/$/, "");

export const languageConfig: Record<Language, { path: string; title: string; description: string; ogLocale: string }> = {
  he: {
    path: "/",
    title: "Travel Ben | בולגריה בדרך שלכם",
    description: "טיולים פרטיים והסעות בבולגריה עם בויאן אריה — מדריך דובר עברית, רכב נוח, הסעות משדה התעופה בסופיה והסעות בין־עירוניות.",
    ogLocale: "he_IL",
  },
  bg: {
    path: "/bg/",
    title: "Travel Ben | България по вашия начин",
    description: "Частни турове и трансфери из България с Боян Арие — гид на иврит, комфортен автомобил, трансфер от летище София и междуградски трансфери.",
    ogLocale: "bg_BG",
  },
  en: {
    path: "/en/",
    title: "Travel Ben | Bulgaria Your Way",
    description: "Private tours and transfers across Bulgaria with Boyan Arie — a Hebrew-speaking guide, a comfortable car, Sofia Airport transfers and intercity rides from Sofia.",
    ogLocale: "en_US",
  },
};

export const themeScript = `(function(){try{var stored=localStorage.getItem('travel-ben-theme');var theme=stored==='light'?'light':'dark';document.documentElement.dataset.theme=theme;}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export function createMetadata(language: Language): Metadata {
  const config = languageConfig[language];
  const canonical = `${siteUrl}${config.path}`;

  return {
    metadataBase: new URL(siteUrl),
    title: config.title,
    description: config.description,
    category: "travel",
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: {
        he: `${siteUrl}/`,
        bg: `${siteUrl}/bg/`,
        en: `${siteUrl}/en/`,
        "x-default": `${siteUrl}/`,
      },
    },
    icons: {
      icon: "/travel-ben-mark.svg",
      shortcut: "/travel-ben-mark.svg",
      apple: "/travel-ben-mark.svg",
    },
    openGraph: {
      title: config.title,
      description: config.description,
      type: "website",
      url: canonical,
      siteName: "Travel Ben",
      locale: config.ogLocale,
      alternateLocale: Object.values(languageConfig).filter((item) => item.ogLocale !== config.ogLocale).map((item) => item.ogLocale),
      images: [{ url: "/og-1200.jpg", width: 1200, height: 630, alt: "Travel Ben — Bulgaria your way" }],
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: ["/og-1200.jpg"],
    },
  };
}

export function structuredData(language: Language) {
  const config = languageConfig[language];
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Travel Ben",
    description: config.description,
    url: `${siteUrl}${config.path}`,
    image: `${siteUrl}/og-1200.jpg`,
    logo: `${siteUrl}/travel-ben-logo.svg`,
    telephone: "+359897932889",
    email: "boianarie91@gmail.com",
    priceRange: "€€",
    areaServed: { "@type": "Country", name: "Bulgaria" },
    address: { "@type": "PostalAddress", addressLocality: "Sofia", addressCountry: "BG" },
    availableLanguage: ["Hebrew", "Bulgarian", "English"],
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Private day tours from Sofia" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sofia Airport transfer to an address in Sofia" } },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Intercity transfers from Sofia",
          areaServed: ["Plovdiv", "Borovets", "Bansko", "Sapareva Banya"].map((name) => ({ "@type": "City", name })),
        },
        priceSpecification: { "@type": "UnitPriceSpecification", price: 1.5, priceCurrency: "EUR", unitCode: "KMT" },
      },
    ],
  };
}

