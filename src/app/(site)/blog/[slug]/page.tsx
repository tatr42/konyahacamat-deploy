import type { Metadata } from "next";
import { ogImages, ogCardUrl } from "@/lib/og";
import { notFound } from "next/navigation";
import { getPostBySlug, getPublishedPosts } from "@/lib/posts";

/**
 * Derleme anında (Build-time) tüm blog slug'larını üreterek statik pre-rendering sağlar (SSG).
 */
export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
import { Clock, Tag, Eye, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ViewCounter from "./ViewCounter";
import { pickImageByKey, themeForCategory } from "@/lib/pseo/images";
import { enrichContent } from "@/lib/blog/enrich";
import {
  TableOfContents,
  MedicalDisclaimer,
  AuthorBox,
  RelatedPosts,
} from "@/components/blog/BlogEnrichment";
import PromoRail from "@/components/promo/PromoRail";
import PromoCard from "@/components/promo/PromoCard";
import { pickPromos, getPromo } from "@/data/promos";

/** Blog yazılarının kenar rayında sabit duran promolar. */
const railPromos = pickPromos("kurs-kayit", "randevu", "suluk-satis", "almanya");

/** Yazı sonundaki geniş promo. */
const kursPromo = getPromo("kurs-kayit");

const getPost = getPostBySlug;

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
      images: ogImages({ title: post.title, eyebrow: post.category, alt: title }),
    },
    twitter: { card: "summary_large_image", title, description, images: [ogCardUrl({ title: post.title, eyebrow: post.category })] },
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

  const BASE = "https://www.konyahacamat.net";

  // İçerik zenginleştirme: h2/h3'lere id enjekte et + İçindekiler listesi çıkar
  const { html: contentHtml, toc } = enrichContent(post.content ?? "");

  // Kategoriye göre deterministik kapak (slug sabit → görsel hep aynı)
  const cover = pickImageByKey(post.slug, themeForCategory(post.category));

  // Arama Motorları İçin Yapılandırılmış Veri (JSON-LD)

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,

    author: { "@type": "Organization", name: "Ebusadullah Hacamat & Akademi", url: BASE },
    publisher: { "@type": "Organization", name: "Ebusadullah Hacamat & Akademi", logo: { "@type": "ImageObject", url: `${BASE}/logo.webp` } },
    url: `${BASE}/blog/${post.slug}`,
    datePublished: post.createdAt ? new Date(post.createdAt.seconds * 1000).toISOString() : undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}/blog/${post.slug}` },

  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: BASE },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${BASE}/blog/${post.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-anthracite-dark pt-20 pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Yazı gövdesi + sağda promo rayı.
          Gövde `minmax(0,1fr)` alır: `min-width:auto` varsayılanı, içerikteki
          geniş tablo/kod bloklarının ızgarayı esnetip rayı ekrandan taşırmasına
          yol açıyordu. Ray masaüstünde sabit 320px, altında tamamen akışa
          girer (PromoRail kendi içinde yatay şeride dönüşür). */}
      <div className="container-site max-w-6xl grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">

        <div className="min-w-0 max-w-3xl">

        {/* Geri Dönüş ve Kategori (Breadcrumb) */}
        <div className="flex items-center gap-2 text-white/70 text-sm mb-8">
          <Link 
            href="/blog" 
            className="hover:text-teal transition-colors flex items-center gap-1" 
            title="Blog listesine dön"
          >
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
          <div className="flex items-center gap-6 mt-6 text-white/70 text-sm">
            {tarih && <span className="flex items-center gap-1"><Clock size={14} /> {tarih}</span>}
            <span className="flex items-center gap-1"><Tag size={14} /> {post.category}</span>
            <span className="flex items-center gap-1">
              <Eye size={14} /> 
              <ViewCounter slug={post.slug} initialCount={post.views || 0} />
            </span>
          </div>
        </div>

        {/* Kapak görseli */}
        <div className="relative mb-10 rounded-3xl overflow-hidden border border-white/10">
          <Image
            src={cover.src}
            width={cover.width}
            height={cover.height}
            alt={`${post.title} — Ebusadullah Hacamat & Akademi`}
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-anthracite-dark/70 to-transparent" />
        </div>

        {/* İçindekiler (h2/h3'lerden — 2+ başlık varsa görünür) */}
        <TableOfContents toc={toc} />

        {/* Ana İçerik */}
        {/* Tipografi `.blog-article` ile globals.css'te tanımlı.
            Önceki `prose prose-invert ...` sınıfları HİÇBİR ŞEY yapmıyordu:
            @tailwindcss/typography kurulu değil ve base katmanı tüm margin'leri
            sıfırladığı için gövde boşluksuz tek blok metin olarak çıkıyordu. */}
        <article
          className="blog-article"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* Yazı sonu geniş promo — mobilde kenar rayı yatay şeride
            döndüğü için gözden kaçabiliyor; bu kart her ekranda görünür. */}
        {kursPromo && <PromoCard promo={kursPromo} variant="wide" className="mt-12" sizes="(max-width: 640px) 92vw, 256px" />}

        {/* Otorite & güven blokları (YMYL) */}
        <MedicalDisclaimer />
        <AuthorBox />

        <hr className="border-white/10 mt-12 mb-8" />

        {/* CTA (Randevu Alanı) */}
        <div className="bg-teal/5 border border-teal/20 rounded-2xl p-8 text-center">
          <h3 className="text-white font-bold text-xl mb-2">Hacamat Tedavisi İçin Randevu Alın</h3>
          <p className="text-white/70 text-sm mb-6">Konya veya Almanya seansları için profesyonel destek alın.</p>
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

        {/* Aynı kategoriden yazılar */}
        <RelatedPosts currentSlug={post.slug} category={post.category} />

        </div>

        {/* Kenar rayı — okuma boyunca ekranda kalır.
            `self-start` olmadan grid öğesi tam yüksekliğe uzar ve
            `sticky` hiç tetiklenmez. `top-28` sabit navbar payıdır. */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <PromoRail promos={railPromos} title="Kurs & Randevu" />
        </div>

      </div>
    </div>
  );
}