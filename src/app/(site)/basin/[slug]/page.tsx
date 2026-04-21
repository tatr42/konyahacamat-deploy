import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Newspaper, Calendar, ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import ImageLightbox from "./ImageLightbox";

interface PressItem {
  id: string; kaynak: string; yil: string; baslik: string; img: string;
  slug: string; icerik: string; seoTitle: string; seoDescription: string;
}

async function getItem(slug: string): Promise<PressItem | null> {
  const q = query(collection(db, "press"), where("slug", "==", slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() } as PressItem;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = await getItem(slug);
  if (!item) return { title: "Haber Bulunamadı" };
  const title = item.seoTitle || `${item.baslik} | ${item.kaynak} | Konya Hacamat`;
  const description = item.seoDescription || `${item.kaynak} gazetesinde yayınlanan haber: ${item.baslik}. Ebusadullah Hacamat & Akademi Konya.`;
  return {
    title,
    description,
    alternates: { canonical: `/basin/${slug}` },
    openGraph: {
      title,
      description,
      images: item.img ? [{ url: `https://konyahacamat.net${item.img}`, width: 1200, height: 630, alt: item.baslik }] : [{ url: "/logo.webp" }],
      url: `https://konyahacamat.net/basin/${slug}`,
      type: "article",
      locale: "tr_TR",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function BasinDetayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getItem(slug);
  if (!item) notFound();

  return (
    <main className="min-h-screen bg-anthracite-dark pt-20 pb-24">
      <div className="container-site max-w-3xl">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-white/30 text-sm mb-8">
          <Link title="Konyahacamat" href="/basin" className="hover:text-teal transition-colors flex items-center gap-1">
            <ArrowLeft size={14} /> Basın Odası
          </Link>
          <span>/</span>
          <span className="text-teal truncate">{item.kaynak}</span>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[11px] font-black text-teal uppercase tracking-widest bg-teal/10 px-3 py-1 rounded-full flex items-center gap-1">
            <Newspaper size={12} /> {item.kaynak}
          </span>
          <span className="text-white/30 text-sm flex items-center gap-1">
            <Calendar size={12} /> {item.yil}
          </span>
        </div>

        {/* Başlık */}
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
          {item.baslik}
        </h1>

        {/* Gazete Görseli */}
        {item.img && <ImageLightbox src={item.img} alt={item.baslik} />}

        {/* İçerik */}
        {item.icerik && (
          <article className="prose prose-invert prose-lg max-w-none text-white/80 leading-relaxed
            prose-headings:text-white prose-headings:font-bold prose-strong:text-white
            prose-a:text-teal prose-ul:text-white/70">
            <div dangerouslySetInnerHTML={{ __html: item.icerik }} />
          </article>
        )}

        <hr className="border-white/10 my-10" />

        {/* CTA */}
        <div className="bg-teal/5 border border-teal/20 rounded-2xl p-8 text-center">
          <h3 className="text-white font-bold text-xl mb-2">Hacamat Tedavisi İçin Randevu Alın</h3>
          <p className="text-white/50 text-sm mb-6">Konya veya Almanya seansları için bize ulaşın.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a title="Konyahacamat Bağlantısı" href="https://wa.me/905544062383" target="_blank" rel="nofollow noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all">
              <MessageCircle size={16} fill="currentColor" /> WhatsApp
            </a>
            <Link title="Konyahacamat" href="/takvim"
              className="flex items-center gap-2 bg-teal text-anthracite-dark px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all">
              Randevu Al
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
