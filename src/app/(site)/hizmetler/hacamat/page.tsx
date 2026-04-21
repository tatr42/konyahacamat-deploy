import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Clock, Shield, AlertTriangle, Phone, MessageCircle, ChevronRight } from "lucide-react";
import { getYearsExpStr } from "@/lib/experience";

export const metadata: Metadata = {
  title: "Hacamat Tedavisi Konya | Kuru & Yaş Hacamat | Ebusadullah Akademi",
  description: "Konya'da profesyonel kuru ve yaş hacamat tedavisi. CE sertifikalı steril malzeme, 32+ yıl deneyim, Almanya seansları. Ebusadullah Hacamat & Akademi — Randevu: 0554 406 23 83",
  keywords: ["hacamat tedavisi konya", "kuru hacamat", "yaş hacamat konya", "hacamat fiyat", "hacamat randevu konya", "ebusadullah hacamat", "islamda hacamat", "hacamat faydaları", "hacamat noktaları"],
  alternates: { canonical: "/hizmetler/hacamat" },
  openGraph: {
    title: "Hacamat Tedavisi Konya | Kuru & Yaş Hacamat | Ebusadullah Akademi",
    description: "Konya'da profesyonel kuru ve yaş hacamat tedavisi. 32+ yıl deneyim, steril uygulama, Almanya seansları. Randevu için WhatsApp'tan yazın.",
    url: "https://konyahacamat.net/hizmetler/hacamat",
    images: [{ url: "/logo.webp", width: 1200, height: 630, alt: "Hacamat Tedavisi Konya Ebusadullah" }],
  },
};

const noktalar = [
  { isim: "Kâhil Noktası", yer: "İki kürek kemiği arası", etki: "Genel detoks, bağışıklık" },
  { isim: "Üst Sırt", yer: "Boyun altı, trapez bölgesi", etki: "Baş ağrısı, migren, boyun tutulması" },
  { isim: "Bel Noktaları", yer: "Lomber omurga yanları", etki: "Bel ağrısı, sinir sıkışması" },
  { isim: "Baldır Noktaları", yer: "Baldırın iç yüzü", etki: "Bacak ağrısı, varis, ödem" },
  { isim: "Alın / Şakak", yer: "Alın ortası veya şakak", etki: "Migren, sinüzit, göz yorgunluğu" },
  { isim: "Karın Bölgesi", yer: "Göbek çevresi", etki: "Sindirim sistemi, kolit, hazımsızlık" },
];

const endikasyonlar = [
  "Kronik bel ve boyun ağrıları", "Migren ve baş ağrıları", "Yüksek tansiyon",
  "Diyabet desteği", "Romatizmal hastalıklar", "Fibromiyalji",
  "Uyku bozuklukları", "Kronik yorgunluk sendromu", "Sinüzit",
  "Cilt hastalıkları (sedef, egzama)", "Bağışıklık sistemi zayıflığı", "Detoks ve arınma",
];

export default function HacamatPage() {
  return (
    <main className="min-h-screen bg-anthracite-dark">

      {/* HERO */}
      <section className="pt-20 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[120px]" />
        <div className="container-site relative z-10">
          <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Geleneksel Tıp</span>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mt-4 mb-6 leading-tight">
            Hacamat<br /><span className="text-teal italic">Tedavisi</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl leading-relaxed mb-10">
            Hz. Muhammed (SAV)'in sünneti olan hacamat; binlerce yıllık birikimle günümüzde bilimsel araştırmalarla da
            desteklenen en etkili geleneksel tedavi yöntemlerinden biridir. Konya merkezli kliniğimizde ve
            <strong className="text-white"> Almanya'daki periyodik seanslarımızda</strong> steril protokollerle uyguluyoruz.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://wa.me/905544062383?text=Hacamat%20tedavisi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." target="_blank" rel="noopener noreferrer nofollow"
              className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all">
              <MessageCircle size={18} fill="currentColor" /> WhatsApp
            </a>
            <a href="tel:05544062383"
              className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/15 transition-all">
              🇹🇷 <Phone size={18} /> 0554 406 23 83
            </a>
            <a href="tel:+491634492870"
              className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/15 transition-all">
              🇩🇪 <Phone size={18} /> +49 163 449 28 70
            </a>
          </div>
        </div>
      </section>

      {/* TÜRLER */}
      <section className="py-20 bg-white/3">
        <div className="container-site">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-12">
            <span className="w-4 h-[3px] bg-teal inline-block mr-3 mb-1" />
            Uygulama Türleri
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Kuru Hacamat",
                desc: "Deri yüzeyine negatif basınç uygulanan, kesi yapılmayan yöntemdir. Kas ağrıları, lenf sistemi aktivasyonu ve dolaşım bozukluklarında tercih edilir. Çocuklar ve hassas ciltler için uygundur.",
                sure: "30–45 dk",
                ozellikler: ["Kesi yapılmaz", "Ağrısız uygulama", "Her yaşa uygun", "Hızlı iyileşme"],
              },
              {
                title: "Yaş Hacamat",
                desc: "Sünnet noktalarına küçük yüzeysel kesiler açılarak metabolik atıkların vücuttan uzaklaştırıldığı klasik hacamat yöntemidir. Peygamber tıbbının temel uygulaması olup detoks etkisi en yüksek yöntemdir.",
                sure: "45–60 dk",
                ozellikler: ["Derin detoks", "Kan temizleme", "Kronik rahatsızlıklara etkili", "Bağışıklık güçlendirme"],
              },
            ].map(t => (
              <div key={t.title} className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-teal/30 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-bold text-2xl">{t.title}</h3>
                  <div className="flex items-center gap-1 text-teal text-[11px] font-black bg-teal/10 px-3 py-1 rounded-full">
                    <Clock size={12} /> {t.sure}
                  </div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-6">{t.desc}</p>
                <ul className="space-y-2">
                  {t.ozellikler.map(o => (
                    <li key={o} className="flex items-center gap-2 text-sm text-white/70">
                      <CheckCircle size={14} className="text-teal shrink-0" /> {o}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEANS GÖRSELLERİ */}
      <section className="py-10">
        <div className="container-site">
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {["/1.webp", "/3.webp", "/5.webp"].map((src, i) => (
              <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                <Image src={src} alt={`Hacamat seansı ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="33vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENDİKASYONLAR */}
      <section className="py-20">
        <div className="container-site">
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            <span className="w-4 h-[3px] bg-teal inline-block mr-3 mb-1" />
            Hangi Rahatsızlıklara İyi Gelir?
          </h2>
          <p className="text-white/50 mb-10 text-sm">Geleneksel kaynaklarda 384+ rahatsızlığa faydalı olduğu belirtilmektedir.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {endikasyonlar.map(e => (
              <div key={e} className="flex items-center gap-2 bg-white/5 border border-white/8 rounded-xl px-4 py-3">
                <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                <span className="text-white/70 text-xs font-medium">{e}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOKTALAR */}
      <section className="py-20 bg-white/3">
        <div className="container-site">
          <h2 className="font-display text-3xl font-bold text-white mb-10">
            <span className="w-4 h-[3px] bg-teal inline-block mr-3 mb-1" />
            Temel Uygulama Noktaları
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {noktalar.map((n, i) => (
              <div key={n.isim} className="bg-anthracite-dark border border-white/10 rounded-2xl p-5">
                <div className="w-8 h-8 rounded-lg bg-teal/10 border border-teal/20 flex items-center justify-center text-teal font-black text-sm mb-3">{i + 1}</div>
                <div className="text-white font-bold text-base mb-1">{n.isim}</div>
                <div className="text-teal text-[11px] font-bold uppercase tracking-widest mb-2">{n.yer}</div>
                <div className="text-white/50 text-xs">{n.etki}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KONTRENDİKASYONLAR */}
      <section className="py-20">
        <div className="container-site max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <AlertTriangle size={28} className="text-amber-400" /> Kimler Yaptırmamalı?
          </h2>
          <div className="bg-amber-400/5 border border-amber-400/20 rounded-2xl p-6 space-y-3">
            {["Hamile kadınlar", "Aktif kanser tedavisi görenler", "Kan sulandırıcı ilaç kullananlar", "Açık yara veya enfeksiyon olan bölgeler", "Hemofili ve kanama bozukluğu olanlar", "Aşırı zayıf veya kansız hastalar"].map(k => (
              <div key={k} className="flex items-center gap-3 text-sm text-white/70">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" /> {k}
              </div>
            ))}
          </div>
          <p className="text-white/40 text-xs mt-4">Uygulama öncesi mutlaka uzmanımızla görüşün. Her hastaya bireysel değerlendirme yapılmaktadır.</p>
        </div>
      </section>

      {/* ALMANYA */}
      <section className="py-20 bg-teal/5 border-y border-teal/10">
        <div className="container-site">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="text-teal text-[11px] font-black uppercase tracking-widest">🇩🇪 Avrupa Hizmeti</span>
              <h2 className="font-display text-3xl font-bold text-white mt-2 mb-3">Almanya'da Hacamat Tedavisi</h2>
              <p className="text-white/60 max-w-lg text-sm leading-relaxed">
                Yılın belirli dönemlerinde Almanya başta olmak üzere Avrupa'da yaşayan Müslümanlara
                yönelik periyodik hacamat seansları düzenliyoruz. Tarih ve konum bilgisi için
                WhatsApp üzerinden bize ulaşın.
              </p>
            </div>
            <a href="https://wa.me/905544062383?text=Almanya%20hacamat%20seans%20tarihleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
              target="_blank" rel="noopener noreferrer nofollow"
              className="shrink-0 flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all">
              <MessageCircle size={18} fill="currentColor" /> Almanya Randevusu
            </a>
          </div>
        </div>
      </section>

      {/* HİJYEN */}
      <section className="py-20">
        <div className="container-site">
          <h2 className="font-display text-3xl font-bold text-white mb-10 flex items-center gap-3">
            <Shield size={28} className="text-teal" /> Sterilizasyon & Hijyen Protokolü
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Her seans için tek kullanımlık steril vantuz seti",
              "CE sertifikalı tek kullanımlık bistüri",
              "Uygulama öncesi deri antisepsisi",
              "Tıbbi atık protokollerine uygun imha",
              "Sertifikalı uzman tarafından bireysel değerlendirme",
              "Seans sonrası hasta takip protokolü",
            ].map(h => (
              <div key={h} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                <Shield size={16} className="text-teal shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SSS */}
      <section className="py-20 bg-white/3">
        <div className="container-site max-w-3xl">
          <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Merak Edilenler</span>
          <h2 className="font-display text-3xl font-bold text-white mt-3 mb-10">Sık Sorulan Sorular</h2>
          <div className="space-y-4">
            {[
              { s: "Hacamat acıtır mı?", c: "Kuru hacamat ağrısızdır. Yaş hacamatta küçük yüzeysel kesiler yapılır; lokal anestezi benzeri bir his oluşur. Çoğu hasta ilk seanstan sonra beklediğinden çok daha az ağrı hissettiğini ifade eder." },
              { s: "Ne sıklıkla yaptırılmalı?", c: "Sağlıklı bireyler için yılda 2–3 kez, Hicri takvimin faziletli günleri (13, 14, 15, 17, 19, 21) tercih edilir. Kronik rahatsızlıklar için uzmanımız kişisel program belirler." },
              { s: "Seans öncesi hazırlık gerekli mi?", c: "Seansa aç veya tok olarak gelmeyin. Seans öncesi 2–3 saat hafif beslenin. Giysilerin rahat olmasına dikkat edin. Kan sulandırıcı ilaç kullanıyorsanız önceden bildirim yapın." },
              { s: "Kaç seans gerekir?", c: "Akut sorunlarda 1–3 seans yeterli olabilir. Kronik hastalıklarda 6–12 seanslık program uygulanır. Her hasta bireysel değerlendirilir; kişiye özel protokol belirlenir." },
              { s: "Almanya'da da yaptırabilir miyim?", c: "Evet. Ebusadullah Hoca yılda 2–3 kez Almanya'ya giderek Frankfurt, Köln ve Stuttgart başta olmak üzere çevre şehirlerde seans düzenlemektedir. Tarihler için WhatsApp üzerinden ulaşabilirsiniz." },
              { s: "Hacamat eğitimi alabilir miyim?", c: "Evet. Ebusadullah Akademi'de Temel Hacamat Uzmanlık Kursu ile Sülük Terapisi Kursu verilmektedir. Kurslar küçük gruplarla, birebir süpervizyon altında gerçekleşir. Uluslararası geçerli sertifika verilir." },
            ].map((q, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-teal/20 transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-teal font-black text-lg shrink-0 mt-0.5">S.</span>
                  <div>
                    <p className="text-white font-bold mb-2">{q.s}</p>
                    <p className="text-white/60 text-sm leading-relaxed">{q.c}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* İLGİLİ SAYFALAR */}
      <section className="py-16">
        <div className="container-site">
          <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Daha Fazlası</span>
          <h2 className="font-display text-2xl font-bold text-white mt-3 mb-8">İlgili Sayfalar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: "/hizmetler/suluk", baslik: "Sülük Terapisi", aciklama: "Hirudoterapi ile varis, ödem ve eklem tedavisi", emoji: "🐛" },
              { href: "/takvim", baslik: "Randevu Takvimi", aciklama: "Faziletli günlerde randevu alın", emoji: "📅" },
              { href: "/egitimler", baslik: "Eğitim Kursları", aciklama: "Sertifikalı hacamat uzmanlık programları", emoji: "🎓" },
              { href: "/malzemeler", baslik: "Hacamat Malzemeleri", aciklama: "Steril ve sertifikalı ekipmanlar", emoji: "🛒" },
            ].map(l => (
              <Link key={l.href} href={l.href}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-teal/30 hover:bg-white/8 transition-all group">
                <div className="text-3xl mb-3">{l.emoji}</div>
                <div className="text-white font-bold text-sm mb-1 group-hover:text-teal transition-colors">{l.baslik}</div>
                <div className="text-white/50 text-xs leading-relaxed">{l.aciklama}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white/3">
        <div className="container-site">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="bg-white rounded-2xl p-5 shrink-0 shadow-lg">
              <img src="/logo.webp" alt="Konya Hacamat Ebusadullah" className="h-16 w-auto" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-3xl font-bold text-white mb-2">Randevu Almak İster misiniz?</h2>
              <p className="text-white/50 mb-6">Konya veya Almanya seansları için hemen iletişime geçin. {getYearsExpStr()} yıl deneyimle güvenli ve steril uygulama.</p>
              <div className="flex flex-wrap gap-3">
                <a href="https://wa.me/905544062383?text=Hacamat%20randevusu%20almak%20istiyorum." target="_blank" rel="noopener noreferrer nofollow"
                  className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all">
                  <MessageCircle size={16} fill="currentColor" /> 🇹🇷 WhatsApp
                </a>
                <a href="https://wa.me/491634492870?text=Hacamat%20randevusu%20almak%20istiyorum." target="_blank" rel="noopener noreferrer nofollow"
                  className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-white/15 transition-all">
                  <MessageCircle size={16} /> 🇩🇪 Almanya
                </a>
                <Link href="/takvim"
                  className="flex items-center gap-2 bg-teal text-anthracite-dark px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:opacity-90 transition-opacity">
                  Takvim <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
