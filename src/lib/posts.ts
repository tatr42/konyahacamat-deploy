import { BLOG_POSTS } from "@/data/blog-posts";

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

/**
 * Yayınlanmış blog yazılarını döndürür (yeniden eskiye).
 * İçerik src/data/blog-posts.ts dosyasından elle yönetilir.
 */
export async function getPublishedPosts(): Promise<Post[]> {
  return BLOG_POSTS
    .filter(p => p.published)
    .sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));
}

/** Slug ile tek yayınlanmış yazı getirir; bulunamazsa null. */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  return BLOG_POSTS.find(p => p.slug === slug && p.published) ?? null;
}
