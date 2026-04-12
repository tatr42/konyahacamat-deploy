import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Award, Users, Globe, Heart, CheckCircle, MessageCircle } from "lucide-react";
import { getYearsExpStr } from "@/lib/experience";

export const metadata: Metadata = {
  title: "Hakkımızda | Ebusadullah Hacamat & Akademi Konya | 32+ Yıl Deneyim",
  description: "Ebusadullah Hacamat & Akademi hakkında. 32+ yıl deneyim, 1200+ sertifikalı mezun, 384+ rahatsızlık kategorisi. Konya merkezli, Almanya dahil Avrupa'da hizmet.",
  keywords: ["ebusadullah hacamat kimdir", "konya hacamat merkezi", "hacamat akademi konya", "ebusadullah akademi", "konya hacamat hakkında", "geleneksel tıp merkezi konya"],
  alternates: { canonical: "https://konyahacamat.net/hakkimizda" },
  openGraph: {
    title: "Hakkımızda | Ebusadullah Hacamat & Akademi Konya",
    description: "32+ yıl deneyim, 1200+ mezun. Konya'nın köklü hacamat ve akademi merkezi. Almanya dahil Avrupa'da hizmet.",
    url: "https://konyahacamat.net/hakkimizda",
    images: [{ url: "/logo.webp", width: 1200, height: 630, alt: "Ebusadullah Hacamat Akademi Konya" }],
  },
};

const degerler = [
  { icon: Heart, baslik: "Şifa Önce Gelir", aciklama: "Her kararımızda hastanın iyileşmesi temel önceliğimizdir. Ticari kaygıdan önce şifa gelir." },
  { icon: Award, baslik: "Bilim & Gelenek", aciklama: "Hz. Peygamberin sünnetine dayanan geleneksel yöntemleri modern bilimsel verilerle harmanlıyoruz." },
  { icon: CheckCircle, baslik: "Sterilizasyon", aciklama: "Sıfır enfeksiyon riski için her seansta tek kullanımlık, CE sertifikalı malzeme kullanıyoruz." },
  { icon: Globe, baslik: "Uluslararası Standart", aciklama: "Uluslararası geçerlilikte sertifika programlarımız mezunlarımızı dünyanın her yerinde yetkili kılmaktadır." },
];

export default function HakkimizdaPage() {
  return (
    <main className="min-h-screen bg-anthracite-dark">

      {/* HERO */}
      <section className="pt-20 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal/5 rounded-full blur-[150px]" />
        <div className="container-site relative z-10 max-w-4xl">
          <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Biz Kimiz?</span>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mt-4 mb-8 leading-tight">
            Ebusadullah<br /><span className="text-teal italic">Hacamat & Akademi</span>
          </h1>
          <p className="text-white/60 text-xl leading-relaxed">
            1990'ların sonunda kadim şifa geleneğine duyulan derin merak ile başlayan bu yolculuk;
            bugün Türkiye'nin en köklü hacamat merkezlerinden birine ve 1200'den fazla mezun
            yetiştiren uluslararası bir akademiye dönüştü.
          </p>
        </div>
      </section>

      {/* KURUCUNUN HİKAYESİ */}
      <section className="py-20 bg-white/3">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-teal text-[11px] font-black uppercase tracking-widest">Kurucu</span>
              <h2 className="font-display text-4xl font-bold text-white mt-3 mb-6">Ebusadullah Hoca</h2>
              <div className="space-y-4 text-white/60 text-base leading-relaxed">
                <p>
                  Hacamat ile tanışması, ailesindeki kronik hastalıkların geleneksel yöntemlerle iyileştirilmesi
                  sayesinde oldu. Bu deneyim onu hem uygulayıcı hem de eğitimci olmaya yöneltti.
                </p>
                <p>
                  İslam tıbbı, geleneksel Çin tıbbı ve Avrupa hirudoterapi ekollerini derinlemesine
                  inceleyerek özgün bir uygulama protokolü geliştirdi. Yıllar içinde verdiği eğitimlerle
                  Türkiye'nin dört bir yanında ve <strong className="text-white">Almanya başta olmak üzere Avrupa'da</strong> aktif
                  uygulayıcılar yetiştirdi.
                </p>
                <p>
                  Yılın belirli dönemlerinde Almanya'da düzenlediği seanslarla Avrupa'daki Müslüman
                  topluluklarına da hizmet götürmekte; orada da eğitimler vermektedir.
                </p>
              </div>

              {/* Arşiv fotoğrafları */}
              <div className="mt-6">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/25 mb-3">Arşivden — 1990'lar</p>
                <div className="flex gap-3">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-white/10 shrink-0 opacity-60 hover:opacity-80 transition-opacity">
                    <Image src="/14.webp" alt="Ebusadullah Hoca — arşiv 1990'lar" fill className="object-cover grayscale" sizes="96px" />
                  </div>
                  <div className="relative w-36 h-24 rounded-xl overflow-hidden border border-white/10 shrink-0 opacity-60 hover:opacity-80 transition-opacity">
                    <Image src="/15.webp" alt="Ebusadullah Hoca hacamat seansı — arşiv 1990'lar" fill className="object-cover grayscale" sizes="144px" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                <Image src="/13.webp" alt="Hacamat danışmanlık" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-anthracite-dark/60 to-transparent" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { sayi: getYearsExpStr(), label: "Yıl Deneyim" },
                  { sayi: "1200+", label: "Akademi Mezunu" },
                  { sayi: "384+", label: "Rahatsızlık Kategorisi" },
                  { sayi: "10+", label: "Ülkede Mezun" },
                ].map(s => (
                  <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:border-teal/30 transition-colors">
                    <div className="font-display text-3xl font-bold text-teal mb-1">{s.sayi}</div>
                    <div className="text-white/50 text-[10px] uppercase tracking-widest font-bold">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HACAMAT & EBUSADULLAH GELENEĞİ */}
      <section className="py-20">
        <div className="container-site max-w-4xl">
          <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Gelenek & İlim</span>
          <h2 className="font-display text-4xl font-bold text-white mt-3 mb-10 leading-tight">
            Hacamat'ın Temeli &amp; <span className="text-teal italic">Ebusadullah Geleneği</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-teal/20 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center mb-4">
                <span className="text-lg">☪️</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-3">İslam'da Hacamat</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Hacamat, köklü bir tedavi yöntemi olarak kabul görmekte ve İslam dininde de tavsiye edilmektedir.
                Ebusadullah'ın soyundan gelenlerin hacamat tedavisinde uzman oldukları bilinmekte;
                bu gelenek nesiller boyunca titizlikle aktarılmaktadır.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-teal/20 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center mb-4">
                <span className="text-lg">🌿</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-3">Doğal Tedavi Felsefesi</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Ebusadullah'ın öğretileri arasında sağlıklı bir yaşam için doğal tedavi yöntemlerinin
                kullanılması yer almaktadır. Merkezimizde kimyasal müdahale yerine bedenin kendi
                iyileşme gücünü destekleyen geleneksel yöntemler ön planda tutulmaktadır.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-teal/20 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center mb-4">
                <span className="text-lg">📈</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-3">Türkiye'de Yükselen İlgi</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Son yıllarda Türkiye'de hacamat tedavisi giderek daha popüler hale gelmektedir.
                Pek çok insan bu yöntemi tercih etmekte; ancak tedavinin uzman kişiler tarafından
                ve hijyenik koşullarda uygulanmasının önemi her geçen gün daha iyi anlaşılmaktadır.
              </p>
            </div>
            <div className="bg-teal/5 border border-teal/20 rounded-2xl p-7">
              <div className="w-10 h-10 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center mb-4">
                <span className="text-lg">🛡️</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-3">Konya Hacamat Ebusadullah</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Merkezimiz, hacamat tedavisi konusunda uzmanlaşmış bir kurum olarak hizmet vermektedir.
                Yapılan tüm tedavilerin hijyenik koşullara uygun olduğu ve alanında uzman kişiler
                tarafından gerçekleştirildiği temel ilkemizdir. Herhangi bir tedavi öncesinde
                mutlaka uzmanımıza danışmanızı tavsiye ederiz.
              </p>
            </div>
          </div>
          <div className="bg-amber-400/5 border border-amber-400/20 rounded-2xl p-5 flex gap-3">
            <span className="text-amber-400 text-xl shrink-0">⚠️</span>
            <p className="text-white/60 text-sm leading-relaxed">
              <strong className="text-white">Önemli Hatırlatma:</strong> Herhangi bir tedavi yöntemine başlamadan önce mutlaka uzman bir uygulayıcıya danışmak ve gerekli değerlendirmelerin yapılması son derece önemlidir. Merkezimiz bu konuda ücretsiz ön danışmanlık hizmeti sunmaktadır.
            </p>
          </div>
        </div>
      </section>

      {/* ALMANYA */}
      <section className="py-20">
        <div className="container-site">
          <div className="bg-teal/5 border border-teal/20 rounded-3xl p-10">
            <div className="flex items-start gap-4 mb-6">
              <span className="text-4xl">🇩🇪</span>
              <div>
                <h2 className="font-display text-3xl font-bold text-white mb-3">Almanya & Avrupa Faaliyetleri</h2>
                <p className="text-white/60 leading-relaxed max-w-2xl">
                  Almanya'da yaşayan Türk ve Müslüman toplulukların geleneksel tıbba olan ihtiyacını
                  karşılamak amacıyla yılın belirli dönemlerinde Almanya'ya seyahat edip seans
                  düzenliyoruz. Ayrıca burada eğitim programları vererek Avrupa'da yetkin
                  hacamat uzmanları yetiştiriyoruz.
                </p>
              </div>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {[
                "Yılda 2–3 kez Almanya'da tedavi seansı",
                "Frankfurt, Köln, Stuttgart ve çevre şehirlerde hizmet",
                "Avrupa'da hacamat eğitim programları",
                "WhatsApp üzerinden randevu ve bilgi",
              ].map(m => (
                <li key={m} className="flex items-center gap-2 text-white/70 text-sm">
                  <CheckCircle size={14} className="text-teal shrink-0" /> {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* MİSYON & DEĞERLER */}
      <section className="py-20 bg-white/3">
        <div className="container-site">
          <h2 className="font-display text-3xl font-bold text-white mb-12 text-center">
            <span className="w-4 h-[3px] bg-teal inline-block mr-3 mb-1" />
            Değerlerimiz
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {degerler.map(d => (
              <div key={d.baslik} className="bg-anthracite-dark border border-white/10 rounded-2xl p-6 hover:border-teal/30 transition-colors text-center">
                <div className="w-12 h-12 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center mx-auto mb-4">
                  <d.icon size={22} className="text-teal" />
                </div>
                <h3 className="text-white font-bold mb-2">{d.baslik}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{d.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AKADEMİ */}
      <section className="py-20">
        <div className="container-site max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <Users size={28} className="text-teal" />
            <h2 className="font-display text-3xl font-bold text-white">Ebusadullah Akademi</h2>
          </div>
          <p className="text-white/60 leading-relaxed mb-6">
            Hacamat ve sülük terapisi alanında Türkiye'nin en kapsamlı eğitim programlarından birini
            sunuyoruz. Teorik anatomi bilgisinden uygulamalı seans eğitimine kadar her aşamada
            sertifikalı uzmanlar yetiştiriyoruz.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {["Temel & İleri Hacamat Kursları", "Sülük Terapisi (Hirudoterapi)", "Online Teorik Eğitimler", "Uluslararası Geçerli Sertifika"].map(e => (
              <div key={e} className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-3 text-sm text-white/70">
                <CheckCircle size={14} className="text-teal shrink-0" /> {e}
              </div>
            ))}
          </div>
          <Link href="/egitimler" className="inline-flex items-center gap-2 bg-teal text-anthracite-dark px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:opacity-90 transition-opacity">
            Eğitim Programları →
          </Link>
        </div>
      </section>

      {/* SAYFALAR */}
      <section className="py-16">
        <div className="container-site">
          <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Keşfedin</span>
          <h2 className="font-display text-2xl font-bold text-white mt-3 mb-8">Hizmet &amp; Eğitimlerimiz</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: "/hizmetler/hacamat", baslik: "Hacamat Tedavisi", aciklama: "Kuru & yaş hacamat, detoks, kronik ağrı", emoji: "🩸" },
              { href: "/hizmetler/suluk", baslik: "Sülük Terapisi", aciklama: "Hirudoterapi, varis, eklem tedavisi", emoji: "🐛" },
              { href: "/egitimler", baslik: "Uzmanlık Kursları", aciklama: "Sertifikalı hacamat & sülük eğitimleri", emoji: "🎓" },
              { href: "/takvim", baslik: "Randevu Al", aciklama: "Hicri faziletli günlerde seans planla", emoji: "📅" },
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
      <section className="py-20 bg-teal/5 border-t border-teal/10">
        <div className="container-site flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="bg-white rounded-2xl p-4 shrink-0 shadow-lg">
              <img src="/logo.webp" alt="Konya Hacamat Ebusadullah" className="h-14 w-auto" />
            </div>
            <div>
              <h2 className="font-display text-3xl font-bold text-white mb-2">Bize Ulaşın</h2>
              <p className="text-white/50">Tedavi veya eğitim hakkında her şeyi sormaktan çekinmeyin.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="https://wa.me/905544062383" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all">
              <MessageCircle size={18} fill="currentColor" /> 🇹🇷 WhatsApp
            </a>
            <a href="https://wa.me/491634492870" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-white/15 transition-all">
              <MessageCircle size={18} /> 🇩🇪 Almanya
            </a>
            <Link href="/iletisim"
              className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-white/15 transition-all">
              İletişim
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
