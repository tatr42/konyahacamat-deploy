"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Clock, Eye, ArrowRight, Loader2, ChevronRight } from "lucide-react";

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  views?: number;
  createdAt?: { seconds: number };
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

export default function BlogList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [aktifKategori, setAktifKategori] = useState("Tümü");

  useEffect(() => {
    fetch("/api/blog")
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data))
          setPosts(data.filter((p: Post & { published?: boolean }) => p.published));
      })
      .finally(() => setYukleniyor(false));
  }, []);

  if (yukleniyor) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 size={32} className="text-teal animate-spin" />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-24 text-white/70">
        <BookOpen size={40} className="mx-auto mb-4 opacity-30" />
        <p className="text-lg">Henüz blog yazısı yayınlanmamış.</p>
        <p className="text-sm mt-2">Admin panelinden yazı ekleyebilirsiniz.</p>
      </div>
    );
  }

  /* Kategoriler */
  const kategoriler = ["Tümü", ...Array.from(new Set(posts.map(p => p.category).filter(Boolean)))];

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
            <button
              key={k}
              onClick={() => setAktifKategori(k)}
              className={`text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${
                aktifKategori === k
                  ? "bg-teal text-black border-teal"
                  : "bg-white/5 text-white/70 border-white/10 hover:border-teal/40 hover:text-white"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      )}

      {/* ── Öne çıkan yazı ── */}
      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group block bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 hover:border-teal/30 hover:bg-white/[0.08] transition-all duration-300 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex-1">
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
            </div>
            <div className="flex items-center gap-2 text-teal text-[12px] font-black uppercase tracking-widest shrink-0 md:self-center">
              Devamını Oku
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
              className="group bg-white/5 border border-white/10 rounded-3xl p-7 hover:border-teal/30 hover:bg-white/[0.08] transition-all duration-300 flex flex-col gap-4"
            >
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
