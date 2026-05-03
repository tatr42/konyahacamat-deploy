import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

const BASE = "https://www.konyahacamat.net";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "Konya Hacamat | Ebusadullah Hacamat & Akademi",
    template: "%s | Konyahacamat.net",
  },
  description:
    "Konya'da uzman hacamat ve sülük terapisi. Ebusadullah Hacamat & Akademi — 32+ yıl deneyim, steril CE sertifikalı malzeme, 384+ rahatsızlıkta şifa. Almanya seansları. Randevu: 0554 406 23 83",
  authors: [{ name: "Ebusadullah Hacamat & Akademi", url: '/' }],
  creator: "Ebusadullah Hacamat & Akademi",
  publisher: "Ebusadullah Hacamat & Akademi",
  category: "Sağlık & Tıp",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: '/' },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: '/',
    siteName: "Konya Hacamat Ebusadullah",
    title: "Konya Hacamat | Ebusadullah Hacamat & Akademi",
    description:
      "Konya'da profesyonel hacamat ve sülük terapisi. 32+ yıl deneyim, steril uygulama, Almanya seansları. Hicri takvime göre faziletli günlerde randevu alın.",
    images: [{ url: "/logo.webp", width: 1200, height: 630, alt: "Konya Hacamat Ebusadullah Akademi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Konya Hacamat | Ebusadullah Hacamat & Akademi",
    description: "Konya'da profesyonel hacamat ve sülük terapisi. 32+ yıl deneyim. Randevu: 0554 406 23 83",
    images: ["/logo.webp"],
  },
  verification: {
    google: "204ADYzUeUBHfuGRAFRrBFUrOvWq1WCJtsUvI-mIi6c",
  },
  icons: {
    icon: "/fav.webp",
    shortcut: "/fav.webp",
    apple: "/fav.webp",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BASE}/#localbusiness`,
  name: "Ebusadullah Hacamat & Akademi",
  alternateName: "Konya Hacamat Ebusadullah",
  description:
    "Konya'da 32+ yıldır hizmet veren profesyonel hacamat ve sülük terapisi merkezi. Uluslararası geçerli hacamat uzmanlık eğitimleri.",
  url: "/",
  telephone: "+905544062383",
  email: "info@konyahacamat.net",
  image: "/logo.webp",
  logo: "/fav.webp",
  priceRange: "₺₺",
  currenciesAccepted: "TRY",
  paymentAccepted: "Nakit, Havale",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Nişantaş Mh. Dr. Hulusi Baybal Cd.",
    addressLocality: "Selçuklu",
    addressRegion: "Konya",
    postalCode: "42060",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.8746,
    longitude: 32.4984,
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], opens: "09:00", closes: "18:00" },
  ],
  sameAs: [
    "https://www.instagram.com/konyahacamat",
    "https://www.facebook.com/konyahacamat",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Hacamat Hizmetleri",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kuru Hacamat", url: "/hizmetler/hacamat" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Yaş Hacamat", url: "/hizmetler/hacamat" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sülük Terapisi", url: "/hizmetler/suluk" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hacamat Uzmanlık Kursu", url: "/egitimler" } },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="bg-anthracite-dark antialiased">
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-HY8VE2CQS1`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HY8VE2CQS1', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  );
}
