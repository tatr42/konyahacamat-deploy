import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import {
  BASE_URL,
  BUSINESS,
  BUSINESS_ID,
  abs,
  geoSchema,
  mapPlaceHref,
  openingHoursSchema,
  postalAddressSchema,
} from "@/lib/business";
import { ogCardUrl } from "@/lib/og";

/** Marka geneli varsayılan OG kartı — sayfalar kendi başlıklarıyla ezebilir. */
const DEFAULT_OG = ogCardUrl({
  title: "Konya Sülük Terapisi & Hacamat",
  eyebrow: "Ebusadullah Hacamat & Akademi",
});

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

const BASE = BASE_URL;

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
    images: [{ url: DEFAULT_OG, width: 1200, height: 630, alt: "Konya Hacamat Ebusadullah Akademi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Konya Sülük Terapisi & Hacamat | Ebusadullah Hacamat & Akademi",
    description: "Konya'da profesyonel sülük terapisi (hirudoterapi) ve hacamat. 32+ yıl deneyim. Randevu: +90 554 406 23 83",
    images: [DEFAULT_OG],
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

/**
 * İŞLETME ŞEMASI — sitedeki TEK işletme varlığı.
 *
 * Daha önce iki ayrı şema basılıyordu: burada `LocalBusiness` (@id'li) ve ana
 * sayfada ayrıca `MedicalBusiness` (@id'siz). İkisi birbirine bağlı olmadığı
 * için Google bunları İKİ FARKLI İŞLETME olarak görüyordu. Artık tek varlık
 * var: `MedicalBusiness` (LocalBusiness'ın alt tipi) + kanonik `@id`.
 * Ana sayfadaki tedavi listesi buraya `availableService` olarak taşındı.
 *
 * URL'ler MUTLAK — `metadataBase` yalnızca Next metadata'sına uygulanır,
 * ham JSON-LD'ye uygulanmaz; göreli yollar Google tarafından geçersiz sayılır.
 */
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": BUSINESS_ID,
  name: BUSINESS.name,
  alternateName: BUSINESS.alternateName,
  description:
    "Konya'da 32+ yıldır hizmet veren profesyonel sülük terapisi (hirudoterapi) ve hacamat merkezi. Tıbbi sülük & kupa satışı, kurum sertifikalı uzmanlık eğitimleri.",
  url: BASE,
  telephone: `+${BUSINESS.phone.tr.raw}`,
  email: BUSINESS.email,
  image: abs("/logo.webp"),
  logo: abs("/fav.webp"),
  priceRange: "₺₺",
  currenciesAccepted: "TRY",
  paymentAccepted: "Nakit, Havale",
  medicalSpecialty: "Geleneksel Tıp",
  address: postalAddressSchema(),
  // Koordinat doğrulanana kadar `undefined` döner ve JSON.stringify alanı atar.
  // Yanlış konum, eksik konumdan daha çok zarar verir (bkz. lib/business.ts).
  geo: geoSchema(),
  // Şemadaki varlığı Google İşletme Profili kaydına bağlar — sayfadaki
  // gömülü harita ile aynı CID'yi işaret eder.
  hasMap: mapPlaceHref(),
  openingHoursSpecification: openingHoursSchema(),
  sameAs: [BUSINESS.social.instagram, BUSINESS.social.facebook],
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
  // Ana sayfadaki mükerrer `MedicalBusiness` şemasından devralındı.
  availableService: [
    { "@type": "MedicalTherapy", name: "Sülük Terapisi (Hirudoterapi)", url: abs("/hizmetler/suluk") },
    { "@type": "MedicalTherapy", name: "Kuru Hacamat", url: abs("/hizmetler/hacamat") },
    { "@type": "MedicalTherapy", name: "Yaş Hacamat", url: abs("/hizmetler/hacamat") },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Sülük & Hacamat Hizmetleri",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sülük Terapisi (Hirudoterapi)", url: abs("/hizmetler/suluk") } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kuru Hacamat", url: abs("/hizmetler/hacamat") } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Yaş Hacamat", url: abs("/hizmetler/hacamat") } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hacamat & Sülük Uzmanlık Kursu", url: abs("/egitimler") } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Tıbbi Sülük (Hirudo verbana)", url: abs("/suluk-satisi") } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Hacamat Kupası & Malzeme Setleri", url: abs("/kupa-malzemeleri") } },
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
        <Analytics />
      </body>
    </html>
  );
}
