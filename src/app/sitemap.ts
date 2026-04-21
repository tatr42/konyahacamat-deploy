import type { MetadataRoute } from "next";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const BASE = "https://konyahacamat.net";

const staticPages = [
  { url: BASE, priority: 1.0, changeFrequency: "weekly" as const },
  { url: `${BASE}/hizmetler`, priority: 0.9, changeFrequency: "monthly" as const },
  { url: `${BASE}/hizmetler/hacamat`, priority: 0.9, changeFrequency: "monthly" as const },
  { url: `${BASE}/hizmetler/suluk`, priority: 0.8, changeFrequency: "monthly" as const },
  { url: `${BASE}/egitimler`, priority: 0.8, changeFrequency: "monthly" as const },
  { url: `${BASE}/takvim`, priority: 0.7, changeFrequency: "weekly" as const },
  { url: `${BASE}/blog`, priority: 0.8, changeFrequency: "weekly" as const },
  { url: `${BASE}/basin`, priority: 0.6, changeFrequency: "monthly" as const },
  { url: `${BASE}/galeri`, priority: 0.6, changeFrequency: "monthly" as const },
  { url: `${BASE}/hakkimizda`, priority: 0.7, changeFrequency: "yearly" as const },
  { url: `${BASE}/iletisim`, priority: 0.7, changeFrequency: "yearly" as const },
  { url: `${BASE}/malzemeler`, priority: 0.6, changeFrequency: "monthly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogPages: MetadataRoute.Sitemap = [];
  let pressPages: MetadataRoute.Sitemap = [];

  try {
    const [blogSnap, pressSnap] = await Promise.all([
      getDocs(query(collection(db, "posts"), where("published", "==", true))),
      getDocs(collection(db, "press"))
    ]);

    blogPages = blogSnap.docs.map(doc => {
      const data = doc.data();
      return {
        url: `${BASE}/blog/${data.slug}`,
        lastModified: data.updatedAt ? new Date(data.updatedAt.seconds * 1000) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      };
    });

    pressPages = pressSnap.docs
      .map(doc => doc.data())
      .filter(data => data.slug)
      .map(data => ({
        url: `${BASE}/basin/${data.slug}`,
        lastModified: data.createdAt ? new Date(data.createdAt.seconds * 1000) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
  } catch {
    // Firebase henüz yapılandırılmamışsa statik sayfalarla devam et
  }

  return [...staticPages, ...blogPages, ...pressPages];
}
