import type { Metadata } from "next";
import { getPressItems } from "@/lib/press";
import HeroSection from "@/components/HeroSection";
import ServicesGrid from "@/components/ServicesGrid";
import DiseaseTabs from "@/components/DiseaseTabs";
import AcademySection from "@/components/AcademySection";
import PressSection from "@/components/PressSection";
import Testimonials from "@/components/Testimonials";
import WhatsAppWidget from "@/components/WhatsAppWidget";

/**
 * Ana Sayfa Metadata Yapısı
 * alternates ve openGraph içindeki url değerleri metadataBase üzerinden 
 * otomatik çözülmesi için göreceli (/) olarak bırakılmıştır.
 */
export const metadata: Metadata = {
  title: "Konya Sülük Terapisi & Hacamat | Ebusadullah Hacamat & Akademi",
  description: "Konya'da uzman sülük terapisi (hirudoterapi): varis, eklem, ödem ve dolaşım tedavisi. Ayrıca kuru & yaş hacamat, tıbbi sülük satışı ve sertifikalı kurslar. 32+ yıl deneyim, CE steril malzeme. Almanya seansları. Randevu: +90 554 406 23 83",
  alternates: { canonical: '/' },
  openGraph: {
    title: "Konya Sülük Terapisi & Hacamat | Ebusadullah Hacamat & Akademi",
    description: "Konya'da uzman sülük terapisi (hirudoterapi), kuru & yaş hacamat ve sertifikalı kurslar. 32+ yıl deneyim, tek kullanımlık steril uygulama. Almanya periyodik seansları.",
    url: '/',
    type: "website",
    images: [{ url: "/logo.webp", width: 1200, height: 630, alt: "Konya Hacamat Ebusadullah Akademi" }],
  },
};

/**
 * SSS Şeması (FAQ Schema)
 */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Sülük terapisi (hirudoterapi) nedir, ne işe yarar?", acceptedAnswer: { "@type": "Answer", text: "Sülük terapisi (hirudoterapi), tıbbi sülüğün (Hirudo medicinalis) salgıladığı hirudin, doğal anestezik ve anti-inflamatuar maddelerden yararlanan doğal bir dolaşım tedavisidir. Varis, ödem, eklem iltihabı, cilt hastalıkları ve kulak çınlaması gibi durumlarda uygulanır. Konya Meram'daki <a href=\"https://www.konyahacamat.net/hizmetler/suluk\">Ebusadullah Hacamat & Akademi</a>'de tek kullanımlık steril sülüklerle uygulanır. Randevu: +90 554 406 23 83" } },
    { "@type": "Question", name: "Konya'da sülük terapisi ve hacamat nerede yaptırılır?", acceptedAnswer: { "@type": "Answer", text: "Konya Meram'da <a href=\"https://www.konyahacamat.net/\">Ebusadullah Hacamat & Akademi</a> olarak 32+ yıldır profesyonel sülük terapisi ve hacamat hizmeti sunuyoruz. Adres: Sahibiata Mh. Taşcami Uzunharmanlar Cd. No: 16-4, 42040 Meram/Konya. Randevu için: +90 554 406 23 83" } },
    { "@type": "Question", name: "Hacamat ne işe yarar?", acceptedAnswer: { "@type": "Answer", text: "Hacamat; kronik bel ve boyun ağrıları, migren, yüksek tansiyon, uyku bozuklukları, cilt hastalıkları, bağışıklık sistemi güçlendirme ve genel detoks amacıyla geleneksel kaynaklarda 384'ten fazla rahatsızlığa faydalı olduğu belirtilmektedir." } },
    { "@type": "Question", name: "Kuru ve yaş hacamat arasındaki fark nedir?", acceptedAnswer: { "@type": "Answer", text: "Kuru hacamatta yalnızca negatif basınç uygulanır, kesi yapılmaz. Yaş hacamatta ise küçük yüzeysel kesiler açılarak metabolik atıkların uzaklaştırılması sağlanır. Yaş hacamat Hz. Peygamber'in tavsiye ettiği klasik yöntemdir." } },
    { "@type": "Question", name: "Hacamat kursu nerede verilmektedir?", acceptedAnswer: { "@type": "Answer", text: "<a href=\"https://www.konyahacamat.net/\">Ebusadullah Akademi</a>, Konya'da Temel Hacamat Uzmanlık Kursu ve Sülük Terapisi Kursu vermektedir. Yılın belirli dönemlerinde Almanya'da da eğitim düzenlenmektedir. Program sonunda Akademi'nin kendi kurum sertifikası düzenlenir." } },
    { "@type": "Question", name: "Almanya'da hacamat yaptırabilir miyim?", acceptedAnswer: { "@type": "Answer", text: "Evet. Ebusadullah Hoca yılda 2–3 kez Almanya'ya giderek Frankfurt, Köln, Stuttgart ve çevre şehirlerde hacamat seansları düzenlendirmektedir. Tarih bilgisi için WhatsApp: +49 163 449 28 70" } },
  ],
};


const BASE = "https://www.konyahacamat.net";


/**
 * İşletme ve Hizmet Şeması (MedicalBusiness Schema)
 * Şema verilerinde (JSON-LD) mutlak URL kullanımı SEO açısından zorunludur.
 */

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Ebusadullah Hacamat & Akademi",

  url: BASE,
 
  telephone: "+905544062383",
  address: { 
    "@type": "PostalAddress", 
    streetAddress: "Sahibiata Mh. Taşcami Uzunharmanlar Cd. No: 16-4",
    addressLocality: "Meram",
    postalCode: "42040",
    addressRegion: "Konya", 
    addressCountry: "TR" 
  },
  medicalSpecialty: "Geleneksel Tıp",
  availableService: [
    { "@type": "MedicalTherapy", name: "Sülük Terapisi (Hirudoterapi)", url: `${BASE}/hizmetler/suluk` },
    { "@type": "MedicalTherapy", name: "Kuru Hacamat", url: `${BASE}/hizmetler/hacamat` },
    { "@type": "MedicalTherapy", name: "Yaş Hacamat", url: `${BASE}/hizmetler/hacamat` },
  ],
};

// ISR: basın kartları sunucuda render edilir (SEO), 5 dakikada bir yenilenir.
export const revalidate = 300;

export default async function Home() {
  const pressItems = (await getPressItems()).slice(0, 6);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <HeroSection />
      <ServicesGrid />
      <DiseaseTabs />
      <AcademySection />
      <Testimonials />
      <PressSection items={pressItems} />
      <WhatsAppWidget />
    </>
  );
}