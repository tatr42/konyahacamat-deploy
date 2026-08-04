import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

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
    default: "Konya Sülük Terapisi & Hacamat | Ebusadullah Hacamat & Akademi",
    template: "%s | Konyahacamat.net",
  },
  description:
    "Konya'da uzman sülük terapisi (hirudoterapi) ve hacamat. Ebusadullah Hacamat & Akademi — 32+ yıl deneyim, steril CE sertifikalı malzeme, tıbbi sülük & kupa satışı, sertifikalı kurslar. Almanya seansları. Randevu: +90 554 406 23 83",
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
    title: "Konya Sülük Terapisi & Hacamat | Ebusadullah Hacamat & Akademi",
    description:
      "Konya'da profesyonel sülük terapisi (hirudoterapi) ve hacamat. 32+ yıl deneyim, tek kullanımlık steril uygulama, Almanya seansları. Faziletli günlerde randevu alın.",
    images: [{ url: "/logo.webp", width: 1200, height: 630, alt: "Konya Hacamat Ebusadullah Akademi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Konya Sülük Terapisi & Hacamat | Ebusadullah Hacamat & Akademi",
    description: "Konya'da profesyonel sülük terapisi (hirudoterapi) ve hacamat. 32+ yıl deneyim. Randevu: +90 554 406 23 83",
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
    "Konya'da 32+ yıldır hizmet veren profesyonel sülük terapisi (hirudoterapi) ve hacamat merkezi. Tıbbi sülük & kupa satışı, kurum sertifikalı uzmanlık eğitimleri.",
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
  // Hizmet alanı: yüz yüze uygulama Konya'da, ürün satışı kargoyla tüm
  // Türkiye'ye. İki kapsamı ayrı ayrı bildirmek, adresli LocalBusiness'ı
  // ServiceAreaBusiness'a çevirmeden ülke çapı e-ticareti anlatır.
  areaServed: [
    {
      "@type": "City",
      name: "Konya",
      description: "Yüz yüze sülük terapisi, hacamat uygulaması ve uygulamalı eğitim",
    },
    {
      "@type": "Country",
      name: "Türkiye",
      description: "Tıbbi sülük, kupa ve hacamat malzemelerinde kargo ile satış",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Sülük & Hacamat Hizmetleri",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sülük Terapisi (Hirudoterapi)", url: `${BASE}/hizmetler/suluk` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kuru Hacamat", url: `${BASE}/hizmetler/hacamat` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Yaş Hacamat", url: `${BASE}/hizmetler/hacamat` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hacamat & Sülük Uzmanlık Kursu", url: `${BASE}/egitimler` } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Tıbbi Sülük (Hirudo verbana)", url: `${BASE}/suluk-satisi` } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Hacamat Kupası & Malzeme Setleri", url: `${BASE}/kupa-malzemeleri` } },
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
      </body>
    </html>
  );
}
