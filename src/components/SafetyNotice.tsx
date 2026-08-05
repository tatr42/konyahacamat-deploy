/**
 * TIBBİ SORUMLULUK NOTU — sağlık (YMYL) içeriğinin görüldüğü her yerde basılır.
 *
 * NEDEN AYRI DOSYA:
 *   Bu bileşen daha önce `components/pseo/BlockWidgets.tsx` içinde özel bir
 *   fonksiyondu ve yalnızca pSEO sayfalarında kullanılabiliyordu. Ana sayfadaki
 *   şikâyet listesi (`DiseaseTabs`) ise bir CLIENT component; `BlockWidgets`'ten
 *   import etmek o modülün tamamını (ulaşım tablosu, adım kartları, rozetler)
 *   client bundle'a taşırdı. Bu yüzden not kendi dosyasına çıkarıldı: hem
 *   sunucu hem client tarafından bedelsiz kullanılabilir, hem de metin TEK
 *   yerde durur — sağlık uyarısının sayfadan sayfaya farklılaşması istenmez.
 *
 * DİL KURALI: metin "tedavi eder / iyileştirir" demez, uygulamanın
 * geleneksel-tamamlayıcı olduğunu ve hekim yerine geçmediğini açıkça söyler.
 * Bu, `blog-posts.ts` ve `faq-pool.ts` içindeki dil kuralıyla aynı çizgidir.
 */

import { ShieldAlert } from "lucide-react";

interface Props {
  /** Dış boşluk — kullanıldığı bloğun ritmine göre ayarlanır. */
  className?: string;
}

export default function SafetyNotice({ className = "mt-6" }: Props) {
  return (
    <div
      className={`p-5 rounded-2xl bg-gold/5 border border-gold/20 flex items-start gap-4 ${className}`}
    >
      <ShieldAlert size={20} className="text-gold shrink-0 mt-0.5" />
      <p className="text-white/55 text-sm leading-relaxed">
        <strong className="text-white">Tıbbi uyarı:</strong> Bu içerik ön
        bilgilendirme amaçlıdır ve tıbbi tanı veya tedavi yerine geçmez. Hacamat
        ve sülük geleneksel/tamamlayıcı yöntemlerdir; hastalık tedavi ettiği
        iddiasında bulunulmaz. Gebelik, kan sulandırıcı kullanımı, pıhtılaşma
        bozukluğu ve ileri anemi gibi durumlarda uygulama yapılmaz veya özel
        dikkat gerektirir. Şikâyetleriniz için önce hekiminize danışın.
      </p>
    </div>
  );
}
