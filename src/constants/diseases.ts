import { Brain, Heart, Bone, Leaf, Users, Zap, LucideIcon } from "lucide-react";

/**
 * ANA SAYFA ŞİKÂYET LİSTESİ — hastalık listesi DEĞİL.
 *
 * ═══════════════════════════════════════════════════════════════════════
 * DİL KURALI (YMYL / sağlık reklam mevzuatı) — DEĞİŞTİRMEDEN ÖNCE OKUYUN
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Bu liste "hangi hastalıkları tedavi ediyoruz" değil, "insanlar bize hangi
 * ŞİKÂYETLE geliyor" sorusunu yanıtlar. Aradaki fark hukuki:
 *
 *   ✗ YASAK — TANI ADI:  "Epilepsi", "Parkinson", "Alzheimer", "Bipolar
 *     Bozukluk", "Sedef", "Romatoid Artrit", "Kısırlık", "Göz Tansiyonu",
 *     "Tansiyon", "Uyku Apnesi", "Serviks Tedavisi"...
 *     Bir tanıyı listelemek, o hastalığa yönelik hizmet verildiği beyanıdır.
 *     Geleneksel ve Tamamlayıcı Tıp Uygulamaları Yönetmeliği ile Sağlık
 *     Bakanlığı reklam kuralları bunu yasaklar; Google'ın YMYL/tıbbi kalite
 *     değerlendirmesinde de en sert cezalandırılan kalıptır.
 *
 *   ✓ SERBEST — ŞİKÂYET/SEMPTOM:  "bel ağrısı", "eklem tutukluğu",
 *     "bacaklarda ağırlık hissi", "uykuya dalmakta zorlanma"...
 *     Kişinin kendi ifadesiyle söylediği durumdur, tanı içermez.
 *
 * EK KURAL — CİDDİ HASTALIK YÖNLENDİRMESİ:
 *   Geciktirilmesi zarar veren tanılar (kanser, glokom, epilepsi, kısırlık,
 *   psikiyatrik tanılar) buraya ŞİKÂYET BİÇİMİNDE BİLE eklenmez. Böyle bir
 *   ziyaretçinin hekime gitmesini geciktirmek, sıralama kaybından çok daha
 *   ağır bir sorumluluktur.
 *
 * Bu kural `data/blog-posts.ts:34` ve `data/faq-pool.ts:12` içindeki dil
 * kuralıyla aynıdır — orada uygulanıyordu, burada uygulanmıyordu.
 *
 * Listenin gösterildiği yer: `components/DiseaseTabs.tsx`. O bileşen bu
 * listenin altına `SafetyNotice` basar; kaldırmayın.
 */

export interface DiseaseCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  img?: string;
  /** Şikâyet/semptom ifadeleri — tanı adı YAZILMAZ (yukarıdaki kurala bakın). */
  complaints: string[];
}

export const categories: DiseaseCategory[] = [
  {
    id: "bas-boyun",
    label: "Baş & Boyun",
    icon: Brain,
    color: "from-purple-500/20 to-teal/10",
    img: "/11.webp",
    complaints: [
      "Baş ağrısı",
      "Ense ve boyun tutukluğu",
      "Baş dönmesi hissi",
      "Kulak çınlaması",
      "Omuz-boyun gerginliği",
      "Kol ve elde uyuşma hissi",
      "Göz çevresinde baskı hissi",
      "Yoğunlaşmada zorlanma",
      "Gün içi zihinsel yorgunluk",
    ],
  },
  {
    id: "kas-eklem",
    label: "Kas & Eklem",
    icon: Bone,
    color: "from-amber-500/20 to-teal/10",
    img: "/10.webp",
    complaints: [
      "Bel ağrısı",
      "Sırt ağrısı",
      "Boyun ağrısı",
      "Omuz ağrısı",
      "Diz ve bacak ağrısı",
      "Eklemlerde tutukluk",
      "Sabah tutukluğu hissi",
      "Kas kasılması ve kramp",
      "Uzun oturmaya bağlı bel yorgunluğu",
      "Ağır kaldırma sonrası sırt gerginliği",
    ],
  },
  {
    id: "dolasim",
    label: "Dolaşım & Genel",
    icon: Heart,
    color: "from-red-500/20 to-teal/10",
    complaints: [
      "Bacaklarda ağırlık hissi",
      "Ayak ve bacaklarda şişlik (ödem) hissi",
      "Bacaklarda varis görünümü",
      "Ellerde ve ayaklarda üşüme",
      "Gün boyu süren halsizlik hissi",
      "Gece terlemesi",
      "Uzun süre ayakta kalmaya bağlı yorgunluk",
      "Vücutta ağırlık ve durgunluk hissi",
    ],
  },
  {
    id: "cilt-goz",
    label: "Cilt & Göz",
    icon: Leaf,
    color: "from-green-500/20 to-teal/10",
    complaints: [
      "Ciltte kuruluk",
      "Ciltte kaşıntı hissi",
      "Ciltte matlık ve donukluk",
      "Saç dökülmesi şikâyeti",
      "Göz kuruluğu hissi",
      "Göz yorgunluğu",
      "Ağızda aft şikâyeti",
      "Ayak terlemesi",
    ],
  },
  {
    id: "kadin-erkek",
    label: "Kadın & Erkek",
    icon: Users,
    color: "from-pink-500/20 to-teal/10",
    // NOT: Bu kategori bilinçli olarak KISA tutulmuştur. Doğurganlık, jinekolojik
    // tanılar ve cinsel sağlık iddiaları buraya EKLENMEZ — hem mevzuat gereği
    // hem de bu şikâyetlerle gelen kişinin hekime yönlendirilmesi gerektiği için.
    complaints: [
      "Adet dönemi bel ve kasık ağrısı",
      "Menopoz döneminde sıcak basması şikâyeti",
      "Dönemsel gerginlik ve huzursuzluk hissi",
      "Genel halsizlik ve isteksizlik",
    ],
  },
  {
    id: "stres-uyku",
    label: "Stres & Uyku",
    icon: Zap,
    color: "from-blue-500/20 to-teal/10",
    complaints: [
      "Stres ve gerginlik hissi",
      "Uykuya dalmakta zorlanma",
      "Gece sık uyanma",
      "Sabah yorgun uyanma",
      "Huzursuzluk hissi",
      "Gün içi enerji düşüklüğü",
      "Zihinsel yorgunluk",
    ],
  },
];
