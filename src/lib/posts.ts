import { cache } from "react";
import { queryCollection } from "@/lib/firestore-rest";

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  views?: number;
  seoTitle?: string;
  seoDescription?: string;
  published?: boolean;
  createdAt?: { seconds: number };
  updatedAt?: { seconds: number };
}

function toPost(row: Record<string, unknown> & { id: string }): Post {
  return {
    id: row.id,
    slug: (row.slug as string) ?? "",
    title: (row.title as string) ?? "",
    excerpt: (row.excerpt as string) ?? "",
    content: (row.content as string) || undefined,
    category: (row.category as string) ?? "",
    views: (row.views as number) ?? 0,
    seoTitle: (row.seoTitle as string) || undefined,
    seoDescription: (row.seoDescription as string) || undefined,
    published: (row.published as boolean) ?? false,
    createdAt: (row.createdAt as { seconds: number }) || undefined,
    updatedAt: (row.updatedAt as { seconds: number }) || undefined,
  };
}

/**
 * Yayınlanmış blog yazılarını REST üzerinden getirir (yeniden eskiye).
 * Sıralama JS'te yapılır: where + orderBy birleşimi Firestore composite
 * index gerektirirdi.
 */
export const getPublishedPosts = cache(async (): Promise<Post[]> => {
  try {
    const rows = await queryCollection("posts", {
      where: { field: "published", value: true },
    });
    return rows
      .map(toPost)
      .sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));
  } catch (err) {
    console.error("Firestore getPublishedPosts hatası:", err instanceof Error ? err.message : err);
    return [];
  }
});

/** Slug ile tek yayınlanmış yazı getirir; bulunamazsa null. */
export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  try {
    const rows = await queryCollection("posts", {
      where: { field: "slug", value: slug },
    });
    const post = rows.map(toPost).find(p => p.published);
    return post ?? null;
  } catch (err) {
    console.error("Firestore getPostBySlug hatası:", err instanceof Error ? err.message : err);
    return null;
  }
});
