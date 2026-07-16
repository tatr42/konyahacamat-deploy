/**
 * Blog otorite bileşenleri — YMYL (sağlık) içeriğinde E-E-A-T sinyalleri.
 *
 *   - TableOfContents : h2/h3'lerden sayfa içi gezinme (lib/blog/enrich ile)
 *   - MedicalDisclaimer: tıbbi sorumluluk notu — sağlık içeriğinde güven şartı
 *   - AuthorBox        : uzmanlık/deneyim kutusu (kim yazıyor?)
 *   - RelatedPosts     : aynı kategoriden yazılar — site içi gezinme + otorite
 *
 * Tümü server component; blog/[slug] zaten dinamik (ƒ) render edilir.
 */

import Link from "next/link";
import { List, ShieldAlert, Award, ArrowRight } from "lucide-react";
import type { TocItem } from "@/lib/blog/enrich";
import { getPublishedPosts, type Post } from "@/lib/posts";

// ─── İçindekiler ──────────────────────────────────────────────────────────

export function TableOfContents({ toc }: { toc: TocItem[] }) {
  if (toc.length < 2) return null;
  return (
    <nav
      aria-label="İçindekiler"
      className="mb-10 p-6 rounded-2xl bg-white/[0.03] border border-white/10"
    >
      <div className="flex items-center gap-2 text-teal font-black text-[11px] uppercase tracking-[0.25em] mb-4">
        <List size={15} />
        İçindekiler
      </div>
      <ol className="space-y-2.5 text-sm">
        {toc.map((item) => (
          <li key={item.id} className={item.level === 3 ? "pl-5" : ""}>
            <a
              href={`#${item.id}`}
              className="text-white/60 hover:text-teal transition-colors leading-snug"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

// ─── Tıbbi sorumluluk notu ────────────────────────────────────────────────

export function MedicalDisclaimer() {
  return (
    <div className="mt-12 p-6 rounded-2xl bg-gold/5 border border-gold/20 flex items-start gap-4">
      <ShieldAlert size={22} className="text-gold shrink-0 mt-0.5" />
      <p className="text-white/60 text-sm leading-relaxed">
        <strong className="text-white">Tıbbi Uyarı:</strong> Bu yazı bilgilendirme
        amaçlıdır; tıbbi teşhis veya tedavi yerine geçmez. Hacamat ve sülük
        uygulamaları geleneksel ve tamamlayıcı yöntemlerdir. Kronik hastalığınız
        veya düzenli ilaç kullanımınız varsa uygulamadan önce hekiminize danışın.
      </p>
    </div>
  );
}

// ─── Yazar / uzmanlık kutusu ──────────────────────────────────────────────

export function AuthorBox() {
  const years = new Date().getFullYear() - 1994;
  return (
    <div className="mt-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-5">
      <div className="w-14 h-14 rounded-2xl bg-teal/10 border border-teal/20 flex items-center justify-center shrink-0">
        <Award size={26} className="text-teal" />
      </div>
      <div>
        <span className="text-[10px] font-black text-teal uppercase tracking-[0.25em]">
          Bu içeriği hazırlayan
        </span>
        <h3 className="text-white font-bold text-lg mt-1">
          Ebusadullah Hacamat &amp; Akademi
        </h3>
        <p className="text-white/60 text-sm leading-relaxed mt-2">
          1994&apos;ten bu yana {years} yıllık saha tecrübesi, 1200&apos;den
          fazla sertifikalı mezun ve Konya merkezli uygulama akademisi. İçerikler,
          geleneksel uygulama birikimi ve güncel hijyen standartları (steril, CE
          sertifikalı malzeme) esas alınarak hazırlanır.
        </p>
      </div>
    </div>
  );
}

// ─── İlgili yazılar ───────────────────────────────────────────────────────

export async function RelatedPosts({
  currentSlug,
  category,
}: {
  currentSlug: string;
  category: string;
}) {
  let related: Post[] = [];
  try {
    const all = await getPublishedPosts();
    // Önce aynı kategori, doldurmak için diğerleri; mevcut yazı hariç.
    const others = all.filter((p) => p.slug !== currentSlug);
    related = [
      ...others.filter((p) => p.category === category),
      ...others.filter((p) => p.category !== category),
    ].slice(0, 3);
  } catch {
    return null; // Firestore erişilemezse bölümü sessizce gizle
  }
  if (related.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-xl font-display font-bold text-white mb-6">
        İlgili <span className="text-teal">Yazılar</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {related.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal/30 transition-all flex flex-col"
          >
            <span className="text-[9px] font-black text-teal uppercase tracking-[0.2em]">
              {p.category}
            </span>
            <h3 className="text-white font-bold text-sm leading-snug mt-2 group-hover:text-teal transition-colors flex-1">
              {p.title}
            </h3>
            <span className="flex items-center gap-1 text-white/40 text-xs mt-4 group-hover:text-teal transition-colors">
              Yazıyı Oku <ArrowRight size={12} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
