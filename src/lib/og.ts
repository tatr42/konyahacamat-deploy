/**
 * OG GÖRSELİ YARDIMCISI — statik sayfaların metadata `images` dizisini
 * markalı dinamik karta (`/og`) bağlar.
 *
 * `metadataBase` göreli yolları mutlaklaştırdığı için `/og?...` yeterlidir.
 * Twitter kartı da aynı görseli kullanır (summary_large_image).
 *
 * pSEO il/ilçe sayfaları BU YARDIMCIYI KULLANMAZ — onlar gerçek ürün
 * fotoğrafını OG görseli yapar (bkz. lib/pseo/page-kit `metaFor`).
 */

import type { Metadata } from "next";

export interface OgCardInput {
  /** Kartın büyük başlığı. */
  title: string;
  /** Üstteki küçük teal etiket (opsiyonel). */
  eyebrow?: string;
  /** OG/twitter `alt` — verilmezse başlık kullanılır. */
  alt?: string;
}

/** `/og` dinamik kart URL'i (göreli — metadataBase mutlaklaştırır). */
export function ogCardUrl({ title, eyebrow }: OgCardInput): string {
  const params = new URLSearchParams({ title });
  if (eyebrow) params.set("eyebrow", eyebrow);
  return `/og?${params.toString()}`;
}

/** `metadata.openGraph.images` için tek elemanlı dizi. */
export function ogImages(input: OgCardInput): NonNullable<
  NonNullable<Metadata["openGraph"]>["images"]
> {
  return [
    {
      url: ogCardUrl(input),
      width: 1200,
      height: 630,
      alt: input.alt ?? input.title,
    },
  ];
}

/**
 * openGraph + twitter görsellerini tek çağrıda üretir — sayfa metadata'sına
 * `...ogCard({ title, eyebrow })` biçiminde yayılır.
 */
export function ogCard(input: OgCardInput): {
  openGraph: { images: ReturnType<typeof ogImages> };
  twitter: { card: "summary_large_image"; images: string[] };
} {
  return {
    openGraph: { images: ogImages(input) },
    twitter: { card: "summary_large_image", images: [ogCardUrl(input)] },
  };
}
