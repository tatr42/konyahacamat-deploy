import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const playfairDisplay = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const BASE = "https://www.konyahacamat.net";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "Konya Hacamat | Ebusadullah Hacamat & Akademi",
    template: "%s | Konyahacamat.net",
  },
  description:
    "Konya'da uzman hacamat ve sülük terapisi. Ebusadullah Hacamat & Akademi — 32+ yıl deneyim, steril CE sertifikalı malzeme, 384+ rahatsızlıkta şifa. Almanya seansları. Randevu: +90 554 406 23 83",
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
    description: "Konya'da profesyonel hacamat ve sülük terapisi. 32+ yıl deneyim. Randevu: +90 554 406 23 83",
    images: ["/logo.webp"],
  },
  verification: {
    google: "204ADYzUeUBHfuGRAFRrBFUrOvWq1WCJtsUvI-mIi6c",
    other: {
      "msvalidate.01": "695FE9ADEE26720B3B83DE58ABB8D52D",
    },
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
    streetAddress: "Sahibiata Mh. Taşcami Uzunharmanlar Cd. No: 16-4",
    addressLocality: "Meram",
    addressRegion: "Konya",
    postalCode: "42040",
    addressCountry: "TR",
  },
  // TODO(adres): Yeni Meram adresinin KESİN koordinatlarını Google İşletme
  // Profili pin'inden alıp aşağıdaki bloğu güncelleyip yorumdan çıkarın.
  // Eski Selçuklu koordinatları kaldırıldı — yanlış konum yerel SEO'ya zarar verir.
  // geo: {
  //   "@type": "GeoCoordinates",
  //   latitude: 0,
  //   longitude: 0,
  // },
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
    <html lang="tr" className={`${playfairDisplay.variable} ${dmSans.variable}`}>
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
