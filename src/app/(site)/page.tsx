import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import ServicesGrid from "@/components/ServicesGrid";
import DiseaseTabs from "@/components/DiseaseTabs";
import AcademySection from "@/components/AcademySection";
import PressSection from "@/components/PressSection";
import Testimonials from "@/components/Testimonials";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export const metadata: Metadata = {
  title: "Konya Hacamat | Ebusadullah Hacamat & Akademi | Konyahacamat.net",
  description: "Konya'nın en köklü hacamat merkezi. Kuru & yaş hacamat, sülük terapisi, sertifikalı hacamat kursu. 32+ yıl deneyim, CE steril malzeme. Almanya seansları. Randevu: 0554 406 23 83",
  alternates: { canonical: '/' },
  openGraph: {
    title: "Konya Hacamat | Ebusadullah Hacamat & Akademi",
    description: "Konya'nın köklü hacamat merkezi. Kuru & yaş hacamat, sülük terapisi, uzmanlık kursları. 32+ yıl deneyim. Almanya periyodik seansları.",
    url: '/',
    type: "website",
    images: [{ url: "/logo.webp", width: 1200, height: 630, alt: "Konya Hacamat Ebusadullah Akademi" }],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Konya'da hacamat nerede yaptırılır?", acceptedAnswer: { "@type": "Answer", text: "Konya Selçuklu'da Ebusadullah Hacamat & Akademi olarak 32+ yıldır profesyonel hacamat hizmeti sunuyoruz. Adres: Nişantaş Mh. Dr. Hulusi Baybal Cd. Selçuklu/Konya. Randevu için: 0554 406 23 83" } },
    { "@type": "Question", name: "Hacamat ne işe yarar?", acceptedAnswer: { "@type": "Answer", text: "Hacamat; kronik bel ve boyun ağrıları, migren, yüksek tansiyon, uyku bozuklukları, cilt hastalıkları, bağışıklık sistemi güçlendirme ve genel detoks amacıyla geleneksel kaynaklarda 384'ten fazla rahatsızlığa faydalı olduğu belirtilmektedir." } },
    { "@type": "Question", name: "Kuru ve yaş hacamat arasındaki fark nedir?", acceptedAnswer: { "@type": "Answer", text: "Kuru hacamatta yalnızca negatif basınç uygulanır, kesi yapılmaz. Yaş hacamatta ise küçük yüzeysel kesiler açılarak metabolik atıkların uzaklaştırılması sağlanır. Yaş hacamat Hz. Peygamber'in tavsiye ettiği klasik yöntemdir." } },
    { "@type": "Question", name: "Hacamat kursu nerede verilmektedir?", acceptedAnswer: { "@type": "Answer", text: "Ebusadullah Akademi, Konya'da Temel Hacamat Uzmanlık Kursu ve Sülük Terapisi Kursu vermektedir. Yılın belirli dönemlerinde Almanya'da da eğitim düzenlenmektedir. Uluslararası geçerli sertifika verilmektedir." } },
    { "@type": "Question", name: "Almanya'da hacamat yaptırabilir miyim?", acceptedAnswer: { "@type": "Answer", text: "Evet. Ebusadullah Hoca yılda 2–3 kez Almanya'ya giderek Frankfurt, Köln, Stuttgart ve çevre şehirlerde hacamat seansları düzenlemektedir. Tarih bilgisi için WhatsApp: +49 163 449 28 70" } },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Ebusadullah Hacamat & Akademi",
  url: "/",
  telephone: "+905544062383",
  address: { "@type": "PostalAddress", streetAddress: "Nişantaş Mh. Dr. Hulusi Baybal Cd.", addressLocality: "Selçuklu", addressRegion: "Konya", addressCountry: "TR" },
  medicalSpecialty: "Geleneksel Tıp",
  availableService: [
    { "@type": "MedicalTherapy", name: "Kuru Hacamat", url: "/hizmetler/hacamat" },
    { "@type": "MedicalTherapy", name: "Yaş Hacamat", url: "/hizmetler/hacamat" },
    { "@type": "MedicalTherapy", name: "Sülük Terapisi (Hirudoterapi)", url: "/hizmetler/suluk" },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <HeroSection />
      <ServicesGrid />
      <DiseaseTabs />
      <AcademySection />
      <Testimonials />
      <PressSection />
      <WhatsAppWidget />
    </>
  );
}
