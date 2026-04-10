import type { Metadata } from "next";
import BlogList from "./BlogList";

export const metadata: Metadata = {
  title: "Hacamat Blog | Geleneksel Tıp & Sağlık Yazıları | Ebusadullah Akademi",
  description: "Hacamat, sülük terapisi ve İslam tıbbı hakkında uzman içerikler. Konya Ebusadullah Hacamat & Akademi blog sayfası — sağlıklı yaşam rehberi.",
  keywords: ["hacamat blog", "hacamat yazıları", "hacamat faydaları makale", "islamda hacamat", "geleneksel tıp blog", "sülük terapisi hakkında", "konya hacamat blog"],
  alternates: { canonical: "https://konyahacamat.net/blog" },
  openGraph: {
    title: "Hacamat Blog | Geleneksel Tıp & Sağlık Yazıları",
    description: "Hacamat, sülük terapisi ve İslam tıbbı hakkında uzman içerikler. Ebusadullah Hacamat & Akademi blog sayfası.",
    url: "https://konyahacamat.net/blog",
    type: "website",
    images: [{ url: "/logo.webp", width: 1200, height: 630, alt: "Hacamat Blog Konya" }],
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-anthracite-dark pt-20 pb-24">
      <div className="container-site">
        <div className="mb-16">
          <span className="text-[11px] font-black text-teal uppercase tracking-[0.3em]">Blog & Makaleler</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
            Hacamat Hakkında<br /><span className="text-teal italic">Her Şey</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl">
            Hacamat, sülük terapisi ve geleneksel şifa yöntemleri hakkında uzman içerikler.
          </p>
        </div>
        <BlogList />
      </div>
    </main>
  );
}
