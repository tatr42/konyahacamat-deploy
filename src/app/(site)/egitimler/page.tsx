import type { Metadata } from "next";
import { ogImages } from "@/lib/og";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, CheckCircle, Clock, Users, Award, MessageCircle, Phone, Globe, ChevronRight, Sparkles, Star } from "lucide-react";
import CertificateShowcase from "@/components/CertificateShowcase";
import PhotoMarquee from "@/components/promo/PhotoMarquee";
import PromoGrid from "@/components/promo/PromoGrid";
import StatsBand, { type Stat } from "@/components/promo/StatsBand";
import { ACCENT_CLASSES, pickPromos, type PromoAccent } from "@/data/promos";
import { getYearsExpStr } from "@/lib/experience";

export const metadata: Metadata = {
  title: "Hacamat Kursu Konya | Sertifikalı Hacamat Eğitimi | Ebusadullah Akademi",
  description: "Konya Ebusadullah Akademi'de hacamat ve sülük terapisi uzmanlık kursları. Küçük gruplar, birebir uygulama, program sonunda kurum sertifikası. Almanya'da da eğitim verilmektedir.",

  alternates: { canonical: '/egitimler' },
  openGraph: {
    title: "Hacamat Kursu Konya | Sertifikalı Eğitim | Ebusadullah Akademi",
    description: "Sertifikalı hacamat ve sülük terapisi uzmanlık kursları. Küçük gruplar, birebir uygulama. 1200+ mezun. Konya ve Almanya'da eğitim.",
    url: '/egitimler',
    images: ogImages({ title: "Hacamat & Sülük Uzmanlık Kursu", eyebrow: "Sertifikalı Eğitim", alt: "Hacamat Kursu Ebusadullah Akademi Konya" }),
  },
};

/**
 * Kurs kartları. `renk` ve `gorsel` GÖRSEL AYRIM içindir: üç kurs yan yana
 * dizildiğinde aynı teal tonunda üç kutu olarak okunuyordu; artık her program
 * kendi rengini ve kapak fotoğrafını taşıyor.
 * Renk anlam taşımaz (zorluk/fiyat kodu değildir) — yalnızca ayırt eder.
 */
const kurslar: {
  rozet: string;
  baslik: string;
  seviye: string;
  sure: string;
  kisi: string;
  aciklama: string;
  konular: string[];
  ozellik: boolean;
  renk: PromoAccent;
  gorsel: string;
  gorselAlt: string;
}[] = [
  {
    rozet: "En Popüler",
    baslik: "Temel Hacamat Uzmanlık Kursu",
    seviye: "Başlangıç → Orta",
    sure: "3 Gün · 24 Saat",
    kisi: "Maks. 8 Kişi",
    aciklama:
      "Kuru ve yaş hacamat tekniklerini doğru noktalarda uygulamayı, hijyen protokollerini ve birey odaklı tedavi planlamasını öğrenirsiniz.",
    konular: [
      "Hacamatın tarihçesi ve İslami temeli",
      "Anatomi ve güvenli uygulama noktaları",
      "Kuru hacamat tekniği ve malzeme kullanımı",
      "Yaş hacamat: kesim, negatif basınç, antisepsi",
      "Kontrendikasyonlar ve risk değerlendirmesi",
      "Pratik uygulama ve süpervizyon",
      "Sertifika sınavı ve belgelendirme",
    ],
    ozellik: true,
    renk: "gold",
    gorsel: "/4.webp",
    gorselAlt: "Temel hacamat uzmanlık kursunda eğitmen gözetiminde uygulama",
  },
  {
    rozet: "İleri Seviye",
    baslik: "Sülük Terapisi Uzmanlık Kursu",
    seviye: "Orta → İleri",
    sure: "2 Gün · 16 Saat",
    kisi: "Maks. 6 Kişi",
    aciklama:
      "Tıbbi sülüğün biyolojisi, taşıma ve saklama protokolleri, uygulama noktaları ve seans yönetimi konularında derinlemesine eğitim.",
    konular: [
      "Hirudo medicinalis biyolojisi ve türleri",
      "Güvenli taşıma, saklama ve hazırlık",
      "Uygulama bölgeleri ve endikasyonlar",
      "Reaksiyon takibi ve seansın sonlandırılması",
      "Yasal çerçeve ve hasta bilgilendirme",
      "Pratik uygulama ve belgelendirme",
    ],
    ozellik: false,
    renk: "coral",
    gorsel: "/6.webp",
    gorselAlt: "Sülük terapisi uzmanlık kursunda tıbbi sülük uygulaması",
  },
  {
    rozet: "Paket",
    baslik: "Kombine Uzmanlık Paketi",
    seviye: "Başlangıç → İleri",
    sure: "5 Gün · 40 Saat",
    kisi: "Maks. 6 Kişi",
    aciklama:
      "Hacamat ve hirudoterapi kurslarını bir arada alarak iki alanda da sertifikalı uzman olun. İndirimli paket fiyatı için iletişime geçin.",
    konular: [
      "Temel Hacamat Uzmanlık Kursu içeriğinin tamamı",
      "Sülük Terapisi Uzmanlık Kursu içeriğinin tamamı",
      "Kombine seans planlaması",
      "Danışmanlık desteği (1 ay)",
      "İki ayrı sertifika",
    ],
    ozellik: false,
    renk: "indigo",
    gorsel: "/5.webp",
    gorselAlt: "Kombine hacamat ve sülük uzmanlık paketi eğitim uygulaması",
  },
];

/** Avantaj kartları — her biri kendi rengiyle, tek tip teal yerine. */
const avantajlar: {
  icon: typeof Award;
  baslik: string;
  aciklama: string;
  renk: PromoAccent;
}[] = [
  { icon: Award, baslik: "Kurum Sertifikası", aciklama: "Program sonunda Akademi'nin kendi kurum sertifikası düzenlenir; kapsamı belgede açıkça yazar.", renk: "gold" },
  { icon: Users, baslik: "Küçük Gruplar", aciklama: "Maks. 6–8 kişilik gruplarla birebir pratik fırsatı.", renk: "coral" },
  { icon: BookOpen, baslik: "Materyal Dahil", aciklama: "Eğitim el kitabı, uygulama seti ve dijital kaynaklar dahildir.", renk: "lime" },
  { icon: Globe, baslik: "TR & Almanya", aciklama: "Konya'da ve yılın belirli dönemlerinde Almanya'da eğitim.", renk: "indigo" },
];

/** Sayaç bandı. Rakamlar ana sayfadaki AcademySection ile aynı kaynaktan. */
const istatistikler: Stat[] = [
  { num: "1200+", label: "Mezun", accent: "gold" },
  { num: getYearsExpStr(), label: "Yıl Deneyim", accent: "coral" },
  { num: "5", label: "Kurs Programı", accent: "indigo" },
  { num: "6+", label: "Şehir", accent: "lime" },
];

/** Hero'daki fotoğraf kolajı. */
const heroKareler: { src: string; alt: string }[] = [
  { src: "/4.webp", alt: "Ebusadullah Akademi kurs sınıfında uygulamalı hacamat eğitimi" },
  { src: "/5.webp", alt: "Eğitmen gözetiminde kupa uygulaması pratiği" },
  { src: "/6.webp", alt: "Sülük terapisi eğitim modülünde uygulama hazırlığı" },
  { src: "/2.webp", alt: "Eğitim öncesi steril alan ve malzeme hazırlığı" },
];

/** Sayfa altındaki duyuru kuşağı — sayfanın kendi konusu (kurs) dışlandı. */
const akademiPromolari = pickPromos("randevu", "suluk-satis", "malzeme");

/** SSS kartlarının sırayla dolaştığı renkler. */
const SSS_RENKLERI: PromoAccent[] = ["gold", "coral", "indigo", "lime", "sky", "rose"];

/** İlgili sayfalar kartları — emoji + kendi rengi. */
const ilgiliSayfalar: {
  href: string;
  baslik: string;
  aciklama: string;
  emoji: string;
  renk: PromoAccent;
}[] = [
  { href: "/hizmetler/hacamat", baslik: "Hacamat Tedavisi", aciklama: "Tedavi hakkında detaylı bilgi alın", emoji: "🩸", renk: "coral" },
  { href: "/hizmetler/suluk", baslik: "Sülük Terapisi", aciklama: "Hirudoterapi tedavisi ve süreci", emoji: "🐛", renk: "lime" },
  { href: "/malzemeler", baslik: "Malzemeler", aciklama: "Sertifikalı hacamat ekipmanları", emoji: "🛒", renk: "sky" },
  { href: "/hakkimizda", baslik: "Hakkımızda", aciklama: "Akademi ve kurucu hakkında", emoji: "🏛️", renk: "gold" },
];

export default function EgitimlerPage() {
  return (
    <div className="min-h-screen bg-anthracite-dark">

      {/* HERO */}
      <section className="pt-20 pb-20 relative overflow-hidden">
        {/* Çok renkli fon parıltıları — sayfa daha girişte "canlı" açılsın. */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-1/3 -left-32 w-[420px] h-[420px] bg-indigo/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 w-[380px] h-[380px] bg-coral/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="container-site relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Sol: metin */}
          <div>
            {/* Renkli rozet üçlüsü */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { icon: Sparkles, text: "Kayıtlar Açık", renk: "gold" as PromoAccent },
                { icon: Users, text: "1200+ Mezun", renk: "coral" as PromoAccent },
                { icon: Globe, text: "TR & Almanya", renk: "indigo" as PromoAccent },
              ].map((r) => {
                const c = ACCENT_CLASSES[r.renk];
                return (
                  <span key={r.text}
                    className={`inline-flex items-center gap-2 rounded-full border ${c.border} ${c.bgSoft} px-4 py-2`}>
                    <r.icon size={12} className={`${c.text} shrink-0`} />
                    <span className={`text-[10px] font-black uppercase tracking-[0.18em] ${c.text}`}>{r.text}</span>
                  </span>
                );
              })}
            </div>

            <span className="text-gold text-[11px] font-black uppercase tracking-[0.3em]">Ebusadullah Akademi</span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
              Hacamat &amp; Sülük<br />
              <span className="relative inline-block">
                <span className="text-gold italic">Uzmanlık Eğitimleri</span>
                <span className="absolute bottom-1 left-0 w-full h-1.5 bg-gold/20 -z-10 rounded-full" />
              </span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl leading-relaxed mb-10">
              1200'den fazla mezunuyla Türkiye'nin köklü hacamat akademisi. Sertifikalı eğitimlerimizle
              hem kendi sağlığınıza hem de çevrenize katkı sağlayın.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://wa.me/905544062383?text=Merhaba%2C%20e%C4%9Fitim%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." title="Türkiye Hacamat İletişim"
                target="_blank" rel="noopener noreferrer nofollow"
                className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all">
                <MessageCircle size={18} fill="currentColor" /> WhatsApp
              </a>
            </div>
          </div>

          {/* Sağ: fotoğraf kolajı.
              Sayfada hiç fotoğraf yoktu; eğitim sayfasının en ikna edici
              unsuru sınıf ortamının kendisi. Kareler hafif döndürülüp
              kaydırılarak "duvara asılı" hissi veriliyor. İlk kare
              `priority` alır — masaüstünde LCP adayı odur. */}
          <div className="relative hidden lg:grid grid-cols-2 gap-4">
            {heroKareler.map((kare, i) => (
              <div key={kare.src}
                className={`relative aspect-4/3 overflow-hidden rounded-3xl border border-white/10 shadow-2xl transition-transform duration-500 hover:scale-105 hover:z-10 ${
                  i === 0 ? "-rotate-2" : i === 1 ? "rotate-2 mt-8" : i === 2 ? "rotate-1 -mt-4" : "-rotate-1 mt-4"
                }`}>
                <Image
                  src={kare.src}
                  alt={kare.alt}
                  fill
                  sizes="(max-width: 1024px) 0px, 260px"
                  priority={i === 0}
                  className="object-cover"
                />
                {/* Her kare farklı renk tintiyle — kolaj tek düze görünmesin. */}
                <div className={`pointer-events-none absolute inset-0 mix-blend-overlay opacity-25 ${
                  ["bg-gold", "bg-coral", "bg-indigo", "bg-lime"][i]
                }`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAYAÇ BANDI */}
      <StatsBand stats={istatistikler} className="bg-anthracite-light border-y border-white/5" />

      {/* AVANTAJLAR */}
      <section className="py-14 bg-white/3 border-y border-white/5">
        <div className="container-site grid grid-cols-2 md:grid-cols-4 gap-5">
          {avantajlar.map(a => {
            const c = ACCENT_CLASSES[a.renk];
            return (
              <div key={a.baslik}
                className={`group flex flex-col items-center text-center gap-3 rounded-2xl border ${c.border} ${c.bgSoft} p-5 transition-transform duration-500 hover:-translate-y-1`}>
                <div className={`w-11 h-11 rounded-xl ${c.bg} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  <a.icon size={20} className={c.onAccent} />
                </div>
                <div className="text-white font-bold text-sm">{a.baslik}</div>
                <div className="text-white/70 text-xs leading-relaxed">{a.aciklama}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* KURSLAR */}
      <section className="py-24">
        <div className="container-site">
          <div className="mb-12">
            <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Kurslarımız</span>
            <h2 className="font-display text-4xl font-bold text-white mt-3">Eğitim Programları</h2>
            <p className="text-white/70 mt-3 max-w-xl">Tüm eğitimler küçük gruplarla, birebir süpervizyon altında gerçekleştirilir.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            {kurslar.map(k => {
              const c = ACCENT_CLASSES[k.renk];
              return (
              <div key={k.baslik}
                className={`group rounded-3xl flex flex-col overflow-hidden border transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${c.glowHover} ${
                  k.ozellik
                    ? `bg-white/8 ${c.border} shadow-2xl`
                    : `bg-white/5 ${c.border}`
                }`}>

                {/* Kapak fotoğrafı — kurslar artık metin bloğu değil,
                    tanınabilir birer kart. */}
                <div className="relative h-40 shrink-0 overflow-hidden">
                  <Image
                    src={k.gorsel}
                    alt={k.gorselAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 380px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`pointer-events-none absolute inset-0 ${c.bg} opacity-25 mix-blend-overlay`} />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-anthracite-light via-anthracite-light/30 to-transparent" />

                  <span className={`absolute left-5 top-5 inline-block text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg ${c.bg} ${c.onAccent}`}>
                    {k.rozet}
                  </span>

                  {/* Öne çıkan programda ek yıldız işareti */}
                  {k.ozellik && (
                    <span className="absolute right-5 top-5 flex items-center gap-1 rounded-full border border-white/20 bg-anthracite-dark/70 px-2.5 py-1 backdrop-blur-sm">
                      <Star size={10} className={`${c.text} fill-current`} />
                      <span className="text-[9px] font-black uppercase tracking-wider text-white/80">Öne Çıkan</span>
                    </span>
                  )}
                </div>

                <div className="p-6 flex flex-col gap-5 flex-1">
                  <h3 className={`text-white font-bold text-xl leading-snug transition-colors ${c.textGroupHover}`}>{k.baslik}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{k.aciklama}</p>

                  <div className="flex flex-wrap gap-2">
                    {[
                      { icon: Clock, text: k.sure },
                      { icon: Users, text: k.kisi },
                    ].map(m => (
                      <span key={m.text}
                        className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border ${c.border} ${c.bgSoft} text-white/70`}>
                        <m.icon size={11} className={c.text} /> {m.text}
                      </span>
                    ))}
                  </div>

                  <ul className="space-y-2 flex-1">
                    {k.konular.map(konu => (
                      <li key={konu} className="flex items-start gap-2 text-xs text-white/60">
                        <CheckCircle size={12} className={`${c.text} shrink-0 mt-0.5`} /> {konu}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-white/10">
                    <a
                      href={`https://wa.me/905544062383?text=${encodeURIComponent(`Merhaba, "${k.baslik}" eğitimi hakkında bilgi almak istiyorum.`)}`}
                      target="_blank" rel="noopener noreferrer nofollow"
                      className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all hover:scale-105 ${
                        k.ozellik
                          ? `${c.bg} ${c.onAccent} hover:opacity-90`
                          : "bg-[#25D366] hover:bg-[#1da851] text-white"
                      }`}>
                      <MessageCircle size={13} fill="currentColor" /> Kayıt &amp; Bilgi Al
                    </a>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sınıf ve uygulama kareleri */}
      <PhotoMarquee className="bg-anthracite-dark" durationSeconds={65} />

      {/* EĞİTMEN BELGESİ */}
      <CertificateShowcase />

      {/* YORUM */}
      <section className="py-20 bg-white/3 border-y border-white/5">
        <div className="container-site max-w-3xl text-center flex flex-col items-center gap-6">
          <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold font-black text-lg">A</div>
          <p className="font-display text-2xl md:text-3xl text-white font-bold leading-relaxed italic">
            &ldquo;Bu eğitim benim için bir kapı araladı. Artık kendi danışanlarıma profesyonel hacamat uygulayabiliyorum.&rdquo;
          </p>
          <div>
            <p className="text-white font-bold text-sm">Ahmed K.</p>
            <p className="text-white/40 text-xs">Mezun Öğrenci · 2024</p>
          </div>
        </div>
      </section>

      {/* ALMANYA — fotoğraflı, indigo kimlikli panel */}
      <section className="py-20">
        <div className="container-site">
          <div className="group relative overflow-hidden rounded-3xl border border-indigo/30 bg-indigo/5">
            <div className="grid grid-cols-1 md:grid-cols-[280px_minmax(0,1fr)]">

              <div className="relative h-52 md:h-auto overflow-hidden">
                <Image
                  src="/8.webp"
                  alt="Almanya'da düzenlenen hacamat eğitim programı uygulaması"
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 280px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-indigo opacity-30 mix-blend-overlay" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-anthracite-dark/70 to-transparent md:bg-gradient-to-r md:from-transparent md:to-anthracite-dark/60" />
                <span className="absolute left-5 top-5 text-5xl drop-shadow-lg">🇩🇪</span>
              </div>

              <div className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:p-10">
                <div className="flex-1">
                  <span className="text-indigo text-[11px] font-black uppercase tracking-[0.25em]">Yurt Dışı Programı</span>
                  <h2 className="font-display text-3xl font-bold text-white mt-3 mb-3">Almanya Eğitimleri</h2>
                  <p className="text-white/60 leading-relaxed max-w-xl">
                    Yılın belirli dönemlerinde Almanya'da da eğitim programları düzenliyoruz.
                    Avrupa'daki katılımcılar için özel tarihler hakkında WhatsApp'tan bilgi alabilirsiniz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SSS */}
      <section className="py-20 bg-white/3 border-y border-white/5">
        <div className="container-site max-w-3xl">
          <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Merak Edilenler</span>
          <h2 className="font-display text-3xl font-bold text-white mt-3 mb-10">Eğitim Hakkında SSS</h2>
          <div className="space-y-4">
            {[
              { s: "Eğitime katılmak için ön koşul var mı?", c: "Hayır. Temel kursumuz herhangi bir tıp veya sağlık bilgisi gerektirmez. Meraklı ve öğrenmeye istekli olan herkes katılabilir." },
              { s: "Verilen sertifikanın kapsamı nedir?", c: "Düzenlenen belge Ebusadullah Akademi'nin kendi kurum sertifikasıdır; programa katılımı ve içerikte gösterilen yeterliği belgeler. Herhangi bir resmî yetki, akreditasyon veya sağlık mesleği icra hakkı ifade etmez. Geleneksel ve tamamlayıcı uygulamaların yasal çerçevesini resmî kaynaklardan doğrulamanızı öneririz." },
              { s: "Kurs sonrası destek var mı?", c: "Evet. Kombine pakette 1 aylık danışmanlık desteği dahildir. Tüm mezunlarımız WhatsApp destek grubuna üye olur ve soru sorabilir." },
              { s: "Online eğitim seçeneği mevcut mu?", c: "Teorik modüller online olarak da sunulabilmektedir. Ancak pratik uygulama bölümü zorunlu olarak yüz yüze gerçekleştirilir." },
              { s: "Almanya'da da kurs verilmekte midir?", c: "Evet. Yılda 1–2 kez Almanya'da da eğitim programı düzenlenmektedir. Tarihler için WhatsApp üzerinden bilgi alabilirsiniz." },
              { s: "Kurs ücretleri nedir?", c: "Fiyatlar kurs dönemine ve kontenjan durumuna göre değişmektedir. Güncel fiyat bilgisi için WhatsApp veya telefon üzerinden bize ulaşın." },
            ].map((q, i) => {
              // Soru numarasına göre renk döner — altı gri kutu yerine
              // ritmi olan renkli bir liste.
              const c = ACCENT_CLASSES[SSS_RENKLERI[i % SSS_RENKLERI.length]];
              return (
                <div key={i} className={`rounded-2xl border ${c.border} ${c.bgSoft} p-6 transition-transform duration-500 hover:translate-x-1`}>
                  <div className="flex items-start gap-4">
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${c.bg} ${c.onAccent} font-black text-sm`}>
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-white font-bold mb-2">{q.s}</p>
                      <p className="text-white/60 text-sm leading-relaxed">{q.c}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* İLGİLİ SAYFALAR */}
      <section className="py-16">
        <div className="container-site">
          <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Daha Fazlası</span>
          <h2 className="font-display text-2xl font-bold text-white mt-3 mb-8">İlgili Sayfalar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ilgiliSayfalar.map(l => {
              const c = ACCENT_CLASSES[l.renk];
              return (
                <Link key={l.href} href={l.href} title={l.baslik}
                  className={`group rounded-2xl border ${c.border} ${c.bgSoft} p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${c.glowHover}`}>
                  <div className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110">{l.emoji}</div>
                  <div className={`text-white font-bold text-sm mb-1 transition-colors ${c.textGroupHover}`}>{l.baslik}</div>
                  <div className="text-white/70 text-xs leading-relaxed">{l.aciklama}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Duyuru kuşağı — kurs sayfasının kendi konusu dışındaki başlıklar */}
      <PromoGrid
        promos={akademiPromolari}
        compact
        title="Randevu & Siparişler"
        className="bg-anthracite-light"
      />

      {/* ALT CTA */}
      <section className="py-16 bg-teal/5 border-t border-teal/10">
        <div className="container-site flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="bg-white rounded-2xl p-4 shrink-0 shadow-lg">
              <Image src="/logo.webp" alt="Konya Hacamat Ebusadullah" width={200} height={56} className="h-14 w-auto" />
            </div>
            <div>
              <h2 className="font-display text-3xl font-bold text-white mb-2">Kayıt &amp; Bilgi</h2>
              <p className="text-white/70">Kurs tarihleri ve ücretler için bize yazın.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="https://wa.me/905544062383?text=Merhaba%2C%20e%C4%9Fitim%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." title="Türkiye Hacamat İletişim"
              target="_blank" rel="noopener noreferrer nofollow"
              className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all">
              <MessageCircle size={18} fill="currentColor" /> WhatsApp
            </a>
            <a href="tel:+905544062383" title="Türkiye Hacamat İletişim"
              className="flex items-center gap-2 bg-white/5 text-white/60 border border-white/10 px-6 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
              <Phone size={16} /> +90 554 406 23 83
            </a>
            <Link href="/iletisim" title="İletişim"
              className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/15 transition-all">
              İletişim <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
