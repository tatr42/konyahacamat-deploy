import { cache } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  views?: number;
  createdAt?: { seconds: number };
}

/**
 * Yayınlanmış blog yazılarını sunucuda getirir (yeniden eskiye sıralı).
 * Sıralama JS'te yapılır: where + orderBy birleşimi Firestore composite
 * index gerektirirdi. Timestamp, client props'una geçebilmesi için
 * { seconds } düz objesine çevrilir.
 */
export const getPublishedPosts = cache(async (): Promise<Post[]> => {
  try {
    if (!db) return [];
    const q = query(collection(db, "posts"), where("published", "==", true));
    const snap = await getDocs(q);
    return snap.docs
      .map(d => {
        const data = d.data();
        return {
          id: d.id,
          slug: data.slug ?? "",
          title: data.title ?? "",
          excerpt: data.excerpt ?? "",
          content: data.content || undefined,
          category: data.category ?? "",
          views: data.views ?? 0,
          createdAt: data.createdAt ? { seconds: data.createdAt.seconds } : undefined,
        };
      })
      .sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));
  } catch (err) {
    console.error("Firestore getPublishedPosts hatası:", err instanceof Error ? err.message : err);
    return [];
  }
});
