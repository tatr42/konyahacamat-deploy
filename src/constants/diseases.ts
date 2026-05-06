import { Brain, Heart, Bone, Leaf, Users, Zap, LucideIcon } from "lucide-react";

export interface DiseaseCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  img?: string;
  diseases: string[];
}

export const categories: DiseaseCategory[] = [
  {
    id: "noroloji",
    label: "Nöroloji",
    icon: Brain,
    color: "from-purple-500/20 to-teal/10",
    img: "/11.webp",
    diseases: [
      "Migren", "Vertigo", "Epilepsi", "Parkinson", "Alzheimer",
      "Dikkat Kaybı", "Unutkanlık", "Hafıza Bozukluğu", "Tinnitus",
      "Sinir Sıkışması", "Trigeminal Nevralji", "Karpal Tünel",
      "Kol Uyuşması", "Baş Dönmesi", "Konsantrasyon Bozukluğu",
    ],
  },
  {
    id: "kas-iskelet",
    label: "Kas & İskelet",
    icon: Bone,
    color: "from-amber-500/20 to-teal/10",
    img: "/10.webp",
    diseases: [
      "Boyun Fıtığı", "Bel Fıtığı", "Romatizma", "Gut Hastalığı",
      "Fibromiyalji", "Adale Yırtılması", "Kramp", "Eklem Ağrısı",
      "Romatoid Artrit", "Sırt Ağrısı", "Omuz Ağrısı", "Diz Ağrısı",
    ],
  },
  {
    id: "dahiliye",
    label: "Dahiliye",
    icon: Heart,
    color: "from-red-500/20 to-teal/10",
    diseases: [
      "Tansiyon", "Karaciğer Temizliği", "Hemoroid (Basur)", "Varis",
      "Kronik Yorgunluk", "Uyku Apnesi", "Çok Uyumak", "Uyuyamamak",
      "Sinüzit", "Meniere Sendromu", "Gece Terlemesi", "Ayak Üşümesi",
    ],
  },
  {
    id: "dermatoloji",
    label: "Deri & Göz",
    icon: Leaf,
    color: "from-green-500/20 to-teal/10",
    diseases: [
      "Saç Dökülmesi", "Sedef (Psöriyazis)", "Egzama", "Kurdeşen",
      "Göz Kuruluğu", "Göz Tansiyonu", "Üveyt", "Dil Yanması",
      "Aft (Ağız Yarası)", "Ayak Terlemesi", "Ayak Kokusu", "Cilt Hastalıkları",
    ],
  },
  {
    id: "kadin-erkek",
    label: "Kadın & Erkek",
    icon: Users,
    color: "from-pink-500/20 to-teal/10",
    diseases: [
      "Kısırlık", "Sperm Azlığı", "Adet Düzensizliği", "Menopoz",
      "Jinekolojik Hastalıklar", "Genital Siğil", "Serviks Tedavisi",
      "Pelviks Fertilite", "Performans", "Rahim Ağzı Rahatsızlıkları",
    ],
  },
  {
    id: "psikoloji",
    label: "Psikoloji",
    icon: Zap,
    color: "from-blue-500/20 to-teal/10",
    diseases: [
      "Anksiyete", "Manik Atak", "Bipolar Bozukluk", "Alt Islatma",
      "Titreme", "Panik Atak", "Stres", "Depresyon",
      "Dikkat Dağınıklığı", "OKB", "Uyku Bozukluğu",
    ],
  },
];
