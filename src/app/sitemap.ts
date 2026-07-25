import type { MetadataRoute } from "next";
import { getPressItems } from "@/lib/press";
import { getPublishedPosts } from "@/lib/posts";
import { PROVINCES } from "@/data/tr-locations";
import { KEPT_SERVICES } from "@/data/pseo-scope";

const BASE = "https://www.konyahacamat.net";

/**
 * pSEO sitemap — Faz 0 budaması sonrası.
 *
 * SADECE: 3 hub + 81 il × 3 silo = 3 + 243 = 246 satır.
 *
 * Hariç tutulanlar:
 *   - `hacamat-nedir` / `suluk-nedir` siloları: kapatıldı, 301 alıyor
 *     (bkz. src/data/pseo-scope.ts). 301'lenen URL sitemap'e KONULMAZ.
 *   - 49 metropol ilçesi: bilinçli olarak hariç — il sayfalarındaki iç
 *     linkler üzerinden doğal taransın. Faz 1'de içerik derinleştikten
 *     sonra buraya eklenmesi değerlendirilecek.
 */
const pseoPages: MetadataRoute.Sitemap = [
  // 3 hizmet hub sayfası (il listeleyen dizinler)
  ...KEPT_SERVICES.map((service) => ({
    url: `${BASE}/${service}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  })),
  // 81 il × 3 hizmet = 243 il sayfası
  ...KEPT_SERVICES.flatMap((service) =>
    PROVINCES.map((province) => ({
      url: `${BASE}/${service}/${province.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ),
];

const staticPages = [
  { url: BASE, priority: 1.0, changeFrequency: "weekly" as const },
  { url: `${BASE}/hizmetler`, priority: 0.9, changeFrequency: "monthly" as const },
  { url: `${BASE}/hizmetler/hacamat`, priority: 0.9, changeFrequency: "monthly" as const },
  { url: `${BASE}/hizmetler/suluk`, priority: 0.8, changeFrequency: "monthly" as const },
  { url: `${BASE}/almanya-hacamat`, priority: 0.9, changeFrequency: "monthly" as const },
  { url: `${BASE}/egitimler`, priority: 0.8, changeFrequency: "monthly" as const },
  { url: `${BASE}/takvim`, priority: 0.7, changeFrequency: "weekly" as const },
  { url: `${BASE}/blog`, priority: 0.8, changeFrequency: "weekly" as const },
  { url: `${BASE}/basin`, priority: 0.6, changeFrequency: "monthly" as const },
  { url: `${BASE}/galeri`, priority: 0.6, changeFrequency: "monthly" as const },
  { url: `${BASE}/hakkimizda`, priority: 0.7, changeFrequency: "yearly" as const },
  { url: `${BASE}/iletisim`, priority: 0.7, changeFrequency: "yearly" as const },
  { url: `${BASE}/malzemeler`, priority: 0.6, changeFrequency: "monthly" as const },
  { url: `${BASE}/gizlilik`, priority: 0.3, changeFrequency: "yearly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogPages: MetadataRoute.Sitemap = [];
  let pressPages: MetadataRoute.Sitemap = [];

  try {
    const posts = await getPublishedPosts();
    blogPages = posts.map(post => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt.seconds * 1000) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    // Basın haberleri — slug'ı olanların detay sayfası var
    const pressItems = await getPressItems();
    pressPages = pressItems
      .filter(item => item.slug)
      .map(item => ({
        url: `${BASE}/basin/${item.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
  } catch {
    // İçerik dosyaları okunamazsa statik sayfalarla devam et
  }

  return [...staticPages, ...pseoPages, ...blogPages, ...pressPages];
}
