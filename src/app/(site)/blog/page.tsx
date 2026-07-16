import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import BlogList from "./BlogList";
import { getPublishedPosts } from "@/lib/posts";
import { Feather, BookOpen, Users, Stethoscope, MapPin } from "lucide-react";

// ISR: yazı listesi sunucuda render edilir (SEO), 5 dakikada bir yenilenir.
export const revalidate = 300;

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Hacamat Blog ${currentYear} | Hacamat Faydaları, Nasıl Yapılır & Sülük Terapisi`,
  description: "Hacamat nedir, nasıl yapılır, kimlere yapılmaz? Sülük terapisi faydaları, İslam tıbbı ve doğal şifa yöntemleri. Ebusadullah Akademi Konya uzman blog içerikleri.",
  alternates: { canonical: '/blog' },
  openGraph: {
    title: `Hacamat Blog ${currentYear} | Hacamat Faydaları & Sülük Terapisi`,
    description: "Hacamat nedir, nasıl yapılır, faydaları nelerdir? Uzman içeriklerle geleneksel tıp rehberi. Ebusadullah Akademi Konya.",
    url: '/blog',
    type: "website",
    images: [{ url: "/logo.webp", width: 1200, height: 630, alt: "Hacamat Blog Konya Ebusadullah" }],
  },
};

const topics = [
  { icon: Stethoscope, label: "Hacamat Nedir?" },
  { icon: Users,       label: "Sülük Terapisi" },
  { icon: BookOpen,    label: "İslam Tıbbı" },
  { icon: Feather,     label: "Doğal Şifa" },
];

// Türkiye geneli hizmet dizinleri (pSEO hub sayfaları)
const hubLinks = [
  { label: "Hacamat Kursu",       href: "/hacamat-kursu",   title: "İl İl Hacamat Kursu — Tüm Türkiye" },
  { label: "Sülük Satışı",        href: "/suluk-satisi",    title: "İl İl Sülük Satışı — Tüm Türkiye" },
  { label: "Hacamat Malzemeleri", href: "/kupa-malzemeleri", title: "İl İl Hacamat Malzemeleri — Tüm Türkiye" },
];

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  return (
    <main className="min-h-screen bg-anthracite-dark pt-20 pb-24">
      <div className="container-site">

        {/* ── Hero ── */}
        <div className="mb-16">
          <span className="text-[11px] font-black text-teal uppercase tracking-[0.3em]">Blog & Makaleler</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mt-4 mb-5">
            Hacamat Hakkında<br /><span className="text-teal italic">Her Şey</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed mb-8">
            32 yılı aşkın deneyimimizin birikimi: hacamat, sülük terapisi, İslam tıbbı ve doğal
            şifa yöntemleri hakkında uzman içerikler. Doğru bilgi, sağlıklı yaşam.
          </p>

          {/* Konu etiketleri — tıklanınca kategori filtresi uygulanır */}
          <div className="flex flex-wrap gap-3">
            {topics.map(({ icon: Icon, label }) => (
              <Link
                key={label}
                href={`/blog?kategori=${encodeURIComponent(label)}`}
                title={`${label} yazılarını filtrele`}
                className="flex items-center gap-2 bg-white/5 border border-white/10 text-white/60 text-[12px] font-semibold px-4 py-2 rounded-full hover:border-teal/40 hover:text-teal transition-all"
              >
                <Icon size={13} className="text-teal" />
                {label}
              </Link>
            ))}
          </div>

          {/* Türkiye geneli hizmet dizinleri */}
          <div className="flex flex-wrap items-center gap-3 mt-5">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gold">
              Türkiye Geneli
            </span>
            {hubLinks.map(({ label, href, title }) => (
              <Link
                key={href}
                href={href}
                title={title}
                className="flex items-center gap-2 bg-gold/5 border border-gold/20 text-white/70 text-[12px] font-semibold px-4 py-2 rounded-full hover:border-gold/50 hover:text-gold transition-all"
              >
                <MapPin size={13} className="text-gold" />
                {label}
                <span className="text-gold/70 text-[9px] font-black uppercase tracking-widest">81 İl</span>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Yazı listesi ── */}
        <Suspense>
          <BlogList initialPosts={posts} />
        </Suspense>

      </div>
    </main>
  );
}
