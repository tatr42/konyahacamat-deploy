/**
 * Blog yazı listesi — SUNUCU bileşeni.
 *
 * NEDEN CLIENT DEĞİL (2026-07-26 düzeltmesi):
 *   Bu bileşen önce `"use client"` + `useSearchParams()` kullanıyordu.
 *   Next.js, statik render edilen bir route'ta `useSearchParams()` gören en
 *   yakın Suspense sınırını TAMAMEN client-side render'a düşürür. Sonuç:
 *   sunucudan gelen HTML'de tek bir yazı linki bile bulunmuyordu — yazı
 *   slug'ları yalnızca RSC payload'ında veri olarak yer alıyordu.
 *
 *   Blog listesi sitenin en önemli iç linkleme merkezidir; JS çalıştırmayan
 *   bir istemcinin burada 12 yazıdan hiçbirini görememesi kabul edilemez.
 *
 *   Çözüm: kategori filtresi artık URL üzerinden (`/blog?kategori=...`)
 *   çalışır ve sunucuda uygulanır. Filtre düğmeleri gerçek <a> etiketidir;
 *   hem taranabilir hem paylaşılabilir hem de JS'siz çalışır.
 */
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Clock, Eye, ArrowRight, ChevronRight } from "lucide-react";
import type { Post } from "@/lib/posts";
import { pickImageByKey, themeForCategory } from "@/lib/pseo/images";

/** Kategori filtresi için URL üretir; "Tümü" filtresizdir. */
function kategoriHref(kategori: string): string {
  return kategori === "Tümü"
    ? "/blog"
    : `/blog?kategori=${encodeURIComponent(kategori)}`;
}

function readingTime(content = "", excerpt = "") {
  const text = content.replace(/<[^>]+>/g, "") + " " + excerpt;
  const words = text.trim().split(/\s+/).length;
  return Math.max(2, Math.ceil(words / 200));
}

function formatDate(seconds: number) {
  return new Date(seconds * 1000).toLocaleDateString("tr-TR", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default function BlogList({
  initialPosts,
  aktifKategori = "Tümü",
}: {
  initialPosts: Post[];
  /** Sunucuda `searchParams.kategori`'den okunur. */
  aktifKategori?: string;
}) {
  const posts = initialPosts;

  if (posts.length === 0) {
    return (
      <div className="text-center py-24 text-white/70">
        <BookOpen size={40} className="mx-auto mb-4 opacity-30" />
        <p className="text-lg">Henüz blog yazısı yayınlanmamış.</p>
        <p className="text-sm mt-2">Yakında yeni içeriklerle buradayız.</p>
      </div>
    );
  }

  /* Kategoriler — URL'den gelen kategori yazılarda yoksa da satırda göster */
  const kategoriler = ["Tümü", ...Array.from(new Set([
    ...posts.map(p => p.category).filter(Boolean),
    ...(aktifKategori !== "Tümü" ? [aktifKategori] : []),
  ]))];

  const filtreli = aktifKategori === "Tümü"
    ? posts
    : posts.filter(p => p.category === aktifKategori);

  const [featured, ...rest] = filtreli;

  return (
    <>
      {/* ── Kategori filtresi ── */}
      {kategoriler.length > 2 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {kategoriler.map(k => (
            <Link
              key={k}
              href={kategoriHref(k)}
              scroll={false}
              aria-current={aktifKategori === k ? "page" : undefined}
              className={`text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${
                aktifKategori === k
                  ? "bg-teal text-black border-teal"
                  : "bg-white/5 text-white/70 border-white/10 hover:border-teal/40 hover:text-white"
              }`}
            >
              {k}
            </Link>
          ))}
        </div>
      )}

      {/* ── Filtre sonucu boşsa bilgilendir ── */}
      {filtreli.length === 0 && (
        <div className="text-center py-16 text-white/70">
          <BookOpen size={36} className="mx-auto mb-4 opacity-30" />
          <p className="text-base">
            &ldquo;{aktifKategori}&rdquo; kategorisinde henüz yazı yok.
          </p>
          <Link
            href="/blog"
            className="inline-block mt-4 text-[11px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full bg-teal text-black hover:scale-105 transition-all"
          >
            Tüm Yazıları Göster
          </Link>
        </div>
      )}

      {/* ── Öne çıkan yazı ── */}
      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group block bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-teal/30 hover:bg-white/[0.08] transition-all duration-300 mb-8"
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 relative shrink-0">
              <Image
                src={pickImageByKey(featured.slug, themeForCategory(featured.category)).src}
                width={1200}
                height={800}
                alt={`${featured.title} — Ebusadullah Hacamat & Akademi`}
                sizes="(min-width: 768px) 40vw, 100vw"
                className="w-full h-56 md:h-full object-cover"
              />
            </div>
            <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-black text-teal uppercase tracking-widest bg-teal/10 px-3 py-1 rounded-full">
                  {featured.category}
                </span>
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full">
                  Öne Çıkan
                </span>
              </div>
              <h2 className="text-white font-bold text-2xl md:text-3xl group-hover:text-teal transition-colors leading-snug mb-3">
                {featured.title}
              </h2>
              <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
                {featured.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-5 text-white/70 text-[12px]">
                {featured.createdAt && (
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} /> {formatDate(featured.createdAt.seconds)}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <BookOpen size={13} /> {readingTime(featured.content, featured.excerpt)} dk okuma
                </span>
                {(featured.views ?? 0) > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Eye size={13} /> {featured.views?.toLocaleString("tr-TR")} görüntüleme
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-teal text-[12px] font-black uppercase tracking-widest mt-6">
                Devamını Oku
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* ── Kalan yazılar ── */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map(post => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-teal/30 hover:bg-white/[0.08] transition-all duration-300 flex flex-col"
            >
              {/* Kapak görseli */}
              <div className="relative h-44 shrink-0">
                <Image
                  src={pickImageByKey(post.slug, themeForCategory(post.category)).src}
                  width={1200}
                  height={800}
                  alt={`${post.title} — Ebusadullah Hacamat & Akademi`}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-7 flex flex-col gap-4 flex-1">
              {/* Üst satır */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-teal uppercase tracking-widest bg-teal/10 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                {post.createdAt && (
                  <span className="flex items-center gap-1 text-white/70 text-[11px]">
                    <Clock size={11} />
                    {new Date(post.createdAt.seconds * 1000).toLocaleDateString("tr-TR", { day: "numeric", month: "short" })}
                  </span>
                )}
              </div>

              {/* Başlık */}
              <h2 className="text-white font-bold text-lg group-hover:text-teal transition-colors leading-snug">
                {post.title}
              </h2>

              {/* Özet */}
              <p className="text-white/70 text-sm leading-relaxed flex-1 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Alt bilgi */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div className="flex items-center gap-3 text-white/25 text-[11px]">
                  <span className="flex items-center gap-1">
                    <BookOpen size={11} /> {readingTime(post.content, post.excerpt)} dk
                  </span>
                  {(post.views ?? 0) > 0 && (
                    <span className="flex items-center gap-1">
                      <Eye size={11} /> {post.views?.toLocaleString("tr-TR")}
                    </span>
                  )}
                </div>
                <span className="flex items-center gap-1 text-teal text-[11px] font-black uppercase tracking-widest">
                  Oku <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* ── Alt bilgi ── */}
      <p className="text-center text-white/20 text-[12px] mt-12">
        Toplam {posts.length} yazı · Ebusadullah Hacamat & Akademi
      </p>
    </>
  );
}
