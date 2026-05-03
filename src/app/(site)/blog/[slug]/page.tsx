import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Clock, Tag, Eye, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ViewCounter from "./ViewCounter";

// Veri tipi tanımı (Interface)
interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  seoTitle: string;
  seoDescription: string;
  published: boolean;
  views: number;
  createdAt?: { seconds: number };
}

/**
 * Blog verisini getiren fonksiyon. 
 * React.cache sayesinde aynı sayfa yüklemesinde mükerrer sorgu atmaz.
 */
const getPost = cache(async (slug: string): Promise<Post | null> => {
  if (!db) return null; // Firebase Guard

  const q = query(
    collection(db, "posts"), 
    where("slug", "==", slug), 
    where("published", "==", true)
  );

  const snap = await getDocs(q);

  if (snap.empty) return null;

  const doc = snap.docs[0];
  return { id: doc.id, ...doc.data() } as Post;
});

/**
 * Dinamik SEO Metadata Üretimi
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: "Yazı Bulunamadı" };

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title,
      description,
      url: `/blog/${slug}`,
      siteName: "Konya Hacamat - Ebusadullah Akademi",
      locale: "tr_TR",
      type: "article",
      images: [{ url: "/logo.webp", width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/logo.webp"] },
  };
}

/**
 * Blog Yazısı Detay Sayfası
 */
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const tarih = post.createdAt
    ? new Date(post.createdAt.seconds * 1000).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })
    : "";

  // Arama Motorları İçin Yapılandırılmış Veri (JSON-LD)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: "Ebusadullah Hacamat & Akademi", url: "https://www.konyahacamat.net" },
    publisher: { "@type": "Organization", name: "Ebusadullah Hacamat & Akademi", logo: { "@type": "ImageObject", url: "https://www.konyahacamat.net/logo.webp" } },
    url: `https://www.konyahacamat.net/blog/${post.slug}`,
    datePublished: post.createdAt ? new Date(post.createdAt.seconds * 1000).toISOString() : undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://www.konyahacamat.net/blog/${post.slug}` },
  };

  return (
    <main className="min-h-screen bg-anthracite-dark pt-20 pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <div className="container-site max-w-3xl">

        {/* Geri Dönüş ve Kategori (Breadcrumb) */}
        <div className="flex items-center gap-2 text-white/30 text-sm mb-8">
          <Link href="/blog" className="hover:text-teal transition-colors flex items-center gap-1" title="Blog listesine dön">
            <ArrowLeft size={14} /> Blog
          </Link>
          <span>/</span>
          <span className="text-teal">{post.category}</span>
        </div>

        {/* Yazı Künyesi */}
        <div className="mb-10">
          <span className="text-[11px] font-black text-teal uppercase tracking-[0.3em] bg-teal/10 px-3 py-1 rounded-full">
            {post.category}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-4 leading-tight">
            {post.title}
          </h1>
          {post.excerpt && <p className="text-white/60 text-lg leading-relaxed">{post.excerpt}</p>}
          <div className="flex items-center gap-6 mt-6 text-white/30 text-sm">
            {tarih && <span className="flex items-center gap-1"><Clock size={14} /> {tarih}</span>}
            <span className="flex items-center gap-1"><Tag size={14} /> {post.category}</span>
            <span className="flex items-center gap-1">
              <Eye size={14} /> 
              <ViewCounter slug={post.slug} initialCount={post.views || 0} />
            </span>
          </div>
        </div>

        <hr className="border-white/10 mb-10" />

        {/* Ana İçerik */}
        <article
          className="prose prose-invert prose-lg max-w-none text-white/80 leading-relaxed
            prose-headings:text-white prose-headings:font-bold
            prose-strong:text-white prose-a:text-teal prose-a:no-underline hover:prose-a:underline
            prose-ul:text-white/70 prose-ol:text-white/70"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <hr className="border-white/10 mt-12 mb-8" />

        {/* CTA (Randevu Alanı) */}
        <div className="bg-teal/5 border border-teal/20 rounded-2xl p-8 text-center">
          <h3 className="text-white font-bold text-xl mb-2">Hacamat Tedavisi İçin Randevu Alın</h3>
          <p className="text-white/50 text-sm mb-6">Konya veya Almanya seansları için profesyonel destek alın.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a 
              href="https://wa.me/905544062383" 
              target="_blank" 
              rel="noopener noreferrer nofollow"
              className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all"
              title="WhatsApp üzerinden bilgi alın"
            >
              WhatsApp
            </a>
            <Link 
              href="/takvim"
              className="flex items-center gap-2 bg-teal text-anthracite-dark px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all"
              title="Randevu sayfasına git"
            >
              Randevu Al
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}