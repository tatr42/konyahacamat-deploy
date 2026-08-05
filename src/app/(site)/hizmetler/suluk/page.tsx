import type { Metadata } from "next";
import { ogImages } from "@/lib/og";
import Link from "next/link";
import Image from "next/image";
import { Clock, MessageCircle, Phone, ChevronRight, AlertTriangle } from "lucide-react";
import { academyHref } from "@/data/ecosystem";

export const metadata: Metadata = {
  title: "Sülük Terapisi Konya | Hirudoterapi | Ebusadullah Hacamat Akademi",
  description: "Konya'da uzman sülük terapisi (hirudoterapi). Varis, eklem iltihabı, ödem ve dolaşım bozukluklarında doğal tedavi. Tek kullanımlık tıbbi sülük. Randevu: +90 554 406 23 83",

  alternates: { canonical: '/hizmetler/suluk' },
  openGraph: {
    title: "Sülük Terapisi Konya | Hirudoterapi | Ebusadullah Hacamat Akademi",
    description: "Konya'da uzman sülük terapisi. Varis, eklem ve dolaşım bozukluklarında doğal tedavi. Tek kullanımlık tıbbi sülük ile steril uygulama.",
    url: '/hizmetler/suluk',
    images: ogImages({ title: "Sülük Terapisi (Hirudoterapi)", eyebrow: "Uzmanlık Alanımız", alt: "Sülük Terapisi Konya Ebusadullah" }),
  },
};

const BASE = "https://www.konyahacamat.net";

/** SSS — hem görünür bölümde hem FAQPage şemasında TEK kaynak (Google, şemadaki
 *  cevabın sayfada görünür olmasını şart koşar). Tedavi/seans odaklı sorular. */
const SSS: { s: string; c: string }[] = [
  { s: "Sülük terapisi ağrılı mıdır?", c: "Sülük tutunduğunda hafif bir ısırma hissi olur ancak sülüğün doğal anestezik salgısı sayesinde bu his birkaç saniye içinde geçer. Çoğu hasta seanstan keyifle çıkar." },
  { s: "Bir seans ne kadar sürer?", c: "Sülük terapisi seansı, uygulama bölgesine ve sülük sayısına göre genellikle 30 ile 60 dakika arasında sürer. Ön değerlendirme ve sonrası bakımla birlikte toplam süre biraz daha uzayabilir." },
  { s: "Kaç sülük kullanılır?", c: "Uygulama bölgesi ve rahatsızlığın durumuna göre 2 ile 10 arasında sülük kullanılabilir. Bu sayıyı uzmanımız yüz yüze değerlendirme sonrasında belirler." },
  { s: "Sülükler tekrar kullanılıyor mu?", c: "Hayır. Her hastada kullanılan tıbbi sülükler bir daha kullanılmaz. Tek kullanımlık sülük politikamız enfeksiyon riskini sıfıra indirir." },
  { s: "Seans sonrası morluk olur mu?", c: "Uygulama bölgesinde 3–7 gün içinde geçen küçük morluklar görülebilir. Bu, yüzeydeki durgun kanın tahliye edildiğinin göstergesidir ve normaldir." },
  { s: "Sülük terapisi kimlere uygulanmaz?", c: "Hamilelere, kan sulandırıcı ilaç kullananlara, ileri anemisi veya kanama bozukluğu olanlara ve bazı kronik hastalığı bulunanlara uygulanmaz. Uygulama öncesi mutlaka ön değerlendirme yapılır." },
  { s: "Hacamat ile birlikte uygulanabilir mi?", c: "Evet. Kombine hacamat + sülük terapisi protokolleri bazı durumlarda çok daha etkili sonuçlar verir. Uzmanımız bireysel programınızı belirler." },
  { s: "Konya dışından geliyorum, nasıl randevu alırım?", c: "WhatsApp veya telefonla ulaşarak uygun günü birlikte belirleyebiliriz. Konya merkez kliniğimizin yanı sıra yılın belirli dönemlerinde Almanya seanslarımız da mevcuttur." },
];

const medicalTherapySchema = {
  "@context": "https://schema.org",
  "@type": "MedicalTherapy",
  name: "Sülük Terapisi (Hirudoterapi)",
  alternateName: ["Hirudoterapi", "Leech Therapy", "Sülük Tedavisi"],
  description:
    "Tıbbi sülük (Hirudo medicinalis) ile uygulanan, varis, ödem, eklem iltihabı, cilt hastalıkları ve kulak çınlaması gibi rahatsızlıklarda kullanılan doğal dolaşım tedavisi. Seanslar 30–60 dakika sürer.",
  howPerformed:
    "Uygulama bölgesi antiseptikle temizlenir; tıbbi sülükler belirlenen noktalara yerleştirilir ve 20–45 dakika boyunca kontrollü emme sağlanır. Seans sonunda bölge yeniden temizlenerek antiseptik uygulanır.",
  bodyLocation: ["Bacak (varis)", "Eklem bölgeleri", "Sırt", "Kulak çevresi"],
  relevantSpecialty: "Geleneksel ve Tamamlayıcı Tıp",
  url: `${BASE}/hizmetler/suluk`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "tr-TR",
  mainEntity: SSS.map(({ s, c }) => ({
    "@type": "Question",
    name: s,
    acceptedAnswer: { "@type": "Answer", text: c },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: BASE },
    { "@type": "ListItem", position: 2, name: "Hizmetler", item: `${BASE}/hizmetler` },
    { "@type": "ListItem", position: 3, name: "Sülük Terapisi", item: `${BASE}/hizmetler/suluk` },
  ],
};

function HeroSection() {
  return (
    <section className="pt-20 pb-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[120px]" />
      <div className="container-site relative z-10">
        <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Hirudoterapi</span>
        <h1 className="font-display text-5xl md:text-7xl font-bold text-white mt-4 mb-6 leading-tight">
          Sülük<br /><span className="text-teal italic">Terapisi</span>
        </h1>
        <p className="text-white/60 text-lg max-w-2xl leading-relaxed mb-10">
          Tıbbi sülükler (Hirudo medicinalis), doğal antikoagülan, anestezik ve anti-inflamatuar
          salgıları sayesinde yerel kan dolaşımını iyileştirir. Kadim tıptan günümüz modern tıbbına
          kadar bilimsel olarak desteklenen nadir tedavi yöntemlerinden biridir.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="https://wa.me/905544062383?text=S%C3%BCl%C3%BCk%20terapisi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." title="Türkiye Hacamat İletişim" target="_blank" rel="noopener noreferrer nofollow"
            className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all">
            <MessageCircle size={18} fill="currentColor" /> WhatsApp
          </a>
          <a href="tel:+905544062383" title="Türkiye Hacamat İletişim"
            className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/15 transition-all">
            🇹🇷 <Phone size={18} /> +90 554 406 23 83
          </a>
          <a href="tel:+491634492870" title="Almanya Hacamat İletişim"
            className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/15 transition-all">
            🇩🇪 <Phone size={18} /> +49 163 449 28 70
          </a>
        </div>
      </div>
    </section>
  );
}

function EtkiMekanizmasiSection() {
  return (
    <section className="py-20 bg-white/3">
      <div className="container-site">
        <h2 className="font-display text-3xl font-bold text-white mb-10">
          <span className="w-4 h-[3px] bg-teal inline-block mr-3 mb-1" />
          Nasıl Çalışır?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { no: "01", baslik: "Hirudin Salgısı", aciklama: "Sülük, tükürüğündeki hirudin enzimi ile kanın pıhtılaşmasını önler. Bu sayede tıkalı damarlar açılır ve mikrosirkülasyon düzelir." },
            { no: "02", baslik: "Anestezik Etki", aciklama: "Doğal anestezik maddeler sayesinde uygulama neredeyse ağrısız gerçekleşir. Bölgede hafif uyuşma ve gevşeme hissedilir." },
            { no: "03", baslik: "Anti-inflamatuar", aciklama: "Sülük salgısındaki enzimler iltihabı azaltır, şişlik ve kızarıklığı giderir. Eklem hastalıklarında özellikle etkilidir." },
          ].map(m => (
            <div key={m.no} className="bg-anthracite-dark border border-white/10 rounded-2xl p-6">
              <div className="text-teal font-black text-4xl font-display mb-4 opacity-30">{m.no}</div>
              <h3 className="text-white font-bold text-lg mb-2">{m.baslik}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{m.aciklama}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SeansGorselleriSection() {
  return (
    <section className="py-10">
      <div className="container-site">
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {[
            { src: "/6.webp", alt: "Tıbbi sülük (Hirudo medicinalis) ile hirudoterapi uygulaması" },
            { src: "/7.webp", alt: "Yüz bölgesine sülük terapisi seansı — Konya Ebusadullah" },
            { src: "/9.webp", alt: "Steril, tek kullanımlık tıbbi sülük hazırlığı" },
          ].map((g, i) => (
            <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
              <Image src={g.src} alt={g.alt} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="33vw" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UygulamaAlanlariSection() {
  return (
    <section className="py-20">
      <div className="container-site">
        <h2 className="font-display text-3xl font-bold text-white mb-10">
          <span className="w-4 h-[3px] bg-teal inline-block mr-3 mb-1" />
          Hangi Rahatsızlıklarda Uygulanır?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { baslik: "Varis ve Ödem", aciklama: "Bacak varislerinde kan dolaşımını iyileştirir, ödem ve ağırlık hissini azaltır.", sure: "45–60 dk" },
            { baslik: "Eklem Hastalıkları", aciklama: "Diz, dirsek ve el bileği gibi eklemlerdeki iltihap ve ağrıyı doğal yollarla giderir.", sure: "30–45 dk" },
            { baslik: "Cilt Hastalıkları", aciklama: "Mikrosirkülasyon bozukluklarına bağlı cilt sorunlarında, sedef ve egzama destekleyici tedavisinde.", sure: "30–45 dk" },
            { baslik: "Kulak Çınlaması", aciklama: "Kulak bölgesindeki damar tıkanıklığına bağlı tinnitus vakalarında olumlu sonuçlar alınmaktadır.", sure: "30 dk" },
          ].map(u => (
            <div key={u.baslik} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-teal/30 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-white font-bold text-lg">{u.baslik}</h3>
                <span className="flex items-center gap-1 text-teal text-[10px] font-black bg-teal/10 px-2 py-1 rounded-full whitespace-nowrap">
                  <Clock size={10} /> {u.sure}
                </span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">{u.aciklama}</p>
            </div>
          ))}
        </div>
        <p className="text-white/50 text-sm mt-6">
          Sülük tedavisinin ne olduğu, bilimsel temeli ve faydaları hakkında kapsamlı bilgi için{" "}
          <Link href="/blog/suluk-tedavisi-hirudoterapi-nedir" className="text-teal hover:underline" title="Sülük Tedavisi (Hirudoterapi) Nedir?">
            Sülük Tedavisi (Hirudoterapi) Nedir?
          </Link>{" "}
          rehberimizi okuyabilirsiniz.
        </p>
      </div>
    </section>
  );
}

function SeansSureciSection() {
  return (
    <section className="py-20 bg-white/3">
      <div className="container-site max-w-3xl">
        <h2 className="font-display text-3xl font-bold text-white mb-10">
          <span className="w-4 h-[3px] bg-teal inline-block mr-3 mb-1" />
          Seans Nasıl İşler?
        </h2>
        <div className="space-y-4">
          {[
            { adim: "1", baslik: "Ön Değerlendirme", aciklama: "Uzmanımız şikayetlerinizi dinler, uygun uygulama bölgelerini belirler ve kontraendikasyonları değerlendirir." },
            { adim: "2", baslik: "Hazırlık", aciklama: "Uygulama bölgesi antiseptikle temizlenir. Tıbbi sülükler özel steril ortamda hazırlanır." },
            { adim: "3", baslik: "Uygulama", aciklama: "Sülükler belirlenen noktalara yerleştirilir. 20–45 dakika boyunca doğal emme gerçekleşir. Süreç konforludur." },
            { adim: "4", baslik: "Seans Sonu", aciklama: "Sülükler steril olarak uzaklaştırılır. Bölge tekrar temizlenerek antiseptik uygulanır." },
            { adim: "5", baslik: "Sonrası Öneriler", aciklama: "Bol su içilmesi, 24 saat ağır egzersizden kaçınılması ve beslenme önerileri hakkında bilgilendirilirsiniz." },
          ].map(s => (
            <div key={s.adim} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-teal/10 border border-teal/30 flex items-center justify-center text-teal font-black text-sm shrink-0 mt-1">{s.adim}</div>
              <div>
                <div className="text-white font-bold mb-1">{s.baslik}</div>
                <div className="text-white/70 text-sm leading-relaxed">{s.aciklama}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UyariSection() {
  return (
    <section className="py-16">
      <div className="container-site max-w-3xl">
        <div className="bg-amber-400/5 border border-amber-400/20 rounded-2xl p-6 flex gap-4">
          <AlertTriangle size={22} className="text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-white font-bold mb-2">Dikkat Edilmesi Gerekenler</div>
            <ul className="space-y-1 text-white/60 text-sm">
              {["Kan sulandırıcı ilaç kullananlar önceden bilgilendirmelidir", "Hamilelik döneminde uygulanmaz", "Seans sonrası küçük morluklar normaldir, 3–7 günde geçer", "Tıbbi sülükler tek kullanımlıktır, tekrar kullanılmaz"].map(u => (
                <li key={u} className="flex items-start gap-2"><span className="text-amber-400 mt-1">•</span>{u}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function NedenBizSection() {
  return (
    <section className="py-20">
      <div className="container-site">
        <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Güven & Deneyim</span>
        <h2 className="font-display text-3xl font-bold text-white mt-3 mb-10">
          Neden Ebusadullah Hacamat &amp; Akademi?
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { sayi: `${new Date().getFullYear() - 1994}+`, etiket: "Yıllık Deneyim", alt: "1994'ten beri hirudoterapi" },
            { sayi: "1200+", etiket: "Sertifikalı Mezun", alt: "Kendi merkezini kurdu" },
            { sayi: "Tek", etiket: "Kullanımlık Sülük", alt: "Enfeksiyon riski sıfır" },
            { sayi: "TR + DE", etiket: "Konya & Almanya", alt: "Periyodik seanslar" },
          ].map((s) => (
            <div key={s.etiket} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <div className="font-display text-3xl font-bold text-teal">{s.sayi}</div>
              <div className="text-white font-bold text-sm mt-2">{s.etiket}</div>
              <div className="text-white/50 text-xs mt-1 leading-snug">{s.alt}</div>
            </div>
          ))}
        </div>
        <p className="text-white/60 text-sm leading-relaxed mt-8 max-w-2xl">
          Ulusal ve yerel basında 50+ kez yer aldık.{" "}
          <Link href="/basin" className="text-teal hover:underline" title="Medyada Biz — Basın Odası">Basın odamızı</Link>{" "}
          ve{" "}
          <Link href="/hakkimizda" className="text-teal hover:underline" title="Hakkımızda">kurumsal hikâyemizi</Link>{" "}
          inceleyebilirsiniz. Sülüğü kendiniz uygulamak için satın almak isterseniz{" "}
          <Link href="/suluk-satisi" className="text-teal hover:underline" title="Tıbbi Sülük Satışı">tıbbi sülük satışı</Link>{" "}
          sayfamıza göz atın.
        </p>
      </div>
    </section>
  );
}

function SssSection() {
  return (
    <section className="py-20 bg-white/3">
      <div className="container-site max-w-3xl">
        <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Merak Edilenler</span>
        <h2 className="font-display text-3xl font-bold text-white mt-3 mb-10">Sülük Terapisi Hakkında Sık Sorulan Sorular</h2>
        <div className="space-y-4">
          {SSS.map((q, i) => (
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
  );
}

function IlgiliSayfalarSection() {
  return (
    <section className="py-16">
      <div className="container-site">
        <span className="text-teal text-[11px] font-black uppercase tracking-[0.3em]">Daha Fazlası</span>
        <h2 className="font-display text-2xl font-bold text-white mt-3 mb-8">İlgili Sayfalar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { href: "/suluk-satisi", baslik: "Tıbbi Sülük Satışı", aciklama: "Canlı sülük, tüm Türkiye'ye kargo", emoji: "🪱" },
            { href: "/hizmetler/hacamat", baslik: "Hacamat Tedavisi", aciklama: "Kuru ve yaş hacamat uygulamaları", emoji: "🩸" },
            { href: academyHref(), baslik: "Sülük Terapisi Kursu", aciklama: "Hirudoterapi uzmanlık eğitimi", emoji: "🎓" },
            { href: "/takvim", baslik: "Randevu Takvimi", aciklama: "Faziletli günlerde randevu alın", emoji: "📅" },
          ].map(l => (
            <Link key={l.href} href={l.href} title={(l as any).baslik || (l as any).title || (l as any).isim || "Bağlantı Detayı"}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-teal/30 hover:bg-white/8 transition-all group">
              <div className="text-3xl mb-3">{l.emoji}</div>
              <div className="text-white font-bold text-sm mb-1 group-hover:text-teal transition-colors">{l.baslik}</div>
              <div className="text-white/70 text-xs leading-relaxed">{l.aciklama}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="py-20 bg-white/3">
      <div className="container-site">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="bg-white rounded-2xl p-5 shrink-0 shadow-lg">
            <Image src="/logo.webp" alt="Konya Hacamat Ebusadullah" width={200} height={64} className="h-16 w-auto" />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-3xl font-bold text-white mb-2">Sülük Terapisi Randevusu</h2>
            <p className="text-white/70 mb-6">Konya kliniğimizde veya Almanya seanslarımızda randevu almak için bize ulaşın.</p>
            <div className="flex flex-wrap gap-3">
              <a href="https://wa.me/905544062383?text=S%C3%BCl%C3%BCk%20terapisi%20randevusu%20almak%20istiyorum." title="Türkiye Hacamat İletişim" target="_blank" rel="noopener noreferrer nofollow"
                className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all">
                <MessageCircle size={16} fill="currentColor" /> 🇹🇷 WhatsApp
              </a>
              <a href="https://wa.me/491634492870?text=S%C3%BCl%C3%BCk%20terapisi%20randevusu%20almak%20istiyorum." title="Almanya Hacamat İletişim" target="_blank" rel="noopener noreferrer nofollow"
                className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-white/15 transition-all">
                <MessageCircle size={16} /> 🇩🇪 Almanya
              </a>
              <Link href="/takvim" title="Randevu Al"
                className="flex items-center gap-2 bg-teal text-anthracite-dark px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:opacity-90 transition-opacity">
                Takvim <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SulukPage() {
  return (
    <div className="min-h-screen bg-anthracite-dark">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalTherapySchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HeroSection />
      <EtkiMekanizmasiSection />
      <SeansGorselleriSection />
      <UygulamaAlanlariSection />
      <SeansSureciSection />
      <NedenBizSection />
      <UyariSection />
      <SssSection />
      <IlgiliSayfalarSection />
      <CtaSection />
    </div>
  );
}
