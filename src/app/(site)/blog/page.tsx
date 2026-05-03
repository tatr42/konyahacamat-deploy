import type { Metadata } from "next";
import BlogList from "./BlogList";
import { Feather, BookOpen, Users, Stethoscope } from "lucide-react";

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

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-anthracite-dark pt-20 pb-24">
      <div className="container-site">

        {/* ── Hero ── */}
        <div className="mb-16">
          <span className="text-[11px] font-black text-teal uppercase tracking-[0.3em]">Blog & Makaleler</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mt-4 mb-5">
            Hacamat Hakkında<br /><span className="text-teal italic">Her Şey</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl leading-relaxed mb-8">
            32 yılı aşkın deneyimimizin birikimi: hacamat, sülük terapisi, İslam tıbbı ve doğal
            şifa yöntemleri hakkında uzman içerikler. Doğru bilgi, sağlıklı yaşam.
          </p>

          {/* Konu etiketleri */}
          <div className="flex flex-wrap gap-3">
            {topics.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-2 bg-white/5 border border-white/10 text-white/60 text-[12px] font-semibold px-4 py-2 rounded-full"
              >
                <Icon size={13} className="text-teal" />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Yazı listesi ── */}
        <BlogList />

      </div>
    </main>
  );
}
