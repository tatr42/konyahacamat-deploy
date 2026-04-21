import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Basın Odası | Medyada Hacamat & Ebusadullah Akademi | Konya",
  description: "Ebusadullah Hacamat & Akademi hakkında ulusal ve yerel gazetelerde çıkan haberler. 50+ gazete ve dergide yer alan Konya'nın en köklü hacamat merkezi.",
  keywords: [
    "konya hacamat haber", "hacamat gazete haberi", "ebusadullah hacamat basın",
    "konya hacamat medya", "hacamat röportaj", "geleneksel tıp haber",
    "hacamat akademi haber", "konya hacamat basın odası",
    "yenigun hacamat", "konya postası hacamat", "merhaba gazetesi hacamat",
    "hacamat tedavisi haber", "ebusadullah akademi medya",
  ],
  alternates: { canonical: "/basin" },
  openGraph: {
    title: "Basın Odası | Medyada Ebusadullah Hacamat Konya",
    description: "50+ ulusal ve yerel gazetede yer alan hacamat haberleri. Ebusadullah Hacamat & Akademi Konya basın odası.",
    url: "https://konyahacamat.net/basin",
    type: "website",
    images: [{ url: "/logo.webp", width: 1200, height: 630, alt: "Konya Hacamat Basın Haberleri" }],
  },
};

export default function BasinLayout({ children }: { children: React.ReactNode }) {
  return children;
}
