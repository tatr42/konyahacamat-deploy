import Image from "next/image";

/**
 * Sürekli kayan fotoğraf şeridi — sayfa aralarına görsel nefes ve hareket
 * katan bant. Bölümler arasındaki geçişlerde kullanılır.
 *
 * Şerit DEKORATİF DEĞİLDİR: gerçek uygulama ve eğitim kareleridir, bu yüzden
 * her görselin anlamlı `alt` metni vardır. Ancak ikinci (klon) kopya
 * `aria-hidden` ile gizlenir — aynı fotoğraf listesini iki kez okutmayalım.
 *
 * Performans: `loading="lazy"` + dar `sizes`. Şerit genelde ekranın
 * altındadır; LCP'ye girmemesi için hiçbiri `priority` almaz.
 */

interface Shot {
  src: string;
  alt: string;
}

/**
 * Yerel arşiv fotoğrafları. Yeni kareler `/public`e eklendikçe buraya
 * satır eklemek yeterli — bileşende değişiklik gerekmez.
 */
const DEFAULT_SHOTS: Shot[] = [
  { src: "/1.webp", alt: "Konya'da steril kupa ile hacamat uygulaması" },
  { src: "/4.webp", alt: "Ebusadullah Akademi kurs sınıfında uygulamalı eğitim" },
  { src: "/6.webp", alt: "Tıbbi sülük ile hirudoterapi seansı hazırlığı" },
  { src: "/2.webp", alt: "Hacamat seansı öncesi steril alan hazırlığı" },
  { src: "/5.webp", alt: "Eğitmen gözetiminde kupa uygulaması" },
  { src: "/8.webp", alt: "Sırt bölgesine hacamat uygulaması" },
  { src: "/3.webp", alt: "Profesyonel hacamat kupaları ve vakum seti" },
  { src: "/7.webp", alt: "Yüz bölgesine sülük terapisi uygulaması" },
  { src: "/9.webp", alt: "Tek kullanımlık steril tıbbi sülük hazırlığı" },
  { src: "/11.webp", alt: "Hacamat uygulama noktalarının belirlenmesi" },
];

interface Props {
  shots?: Shot[];
  /** Şeridin akış yönü. İki bant üst üste kullanılıyorsa zıt verin. */
  reverse?: boolean;
  /** Tam tur süresi. Büyük değer = yavaş. */
  durationSeconds?: number;
  className?: string;
}

export default function PhotoMarquee({
  shots = DEFAULT_SHOTS,
  reverse = false,
  durationSeconds = 60,
  className = "",
}: Props) {
  const items = [...shots, ...shots];

  return (
    <div
      className={`marquee-hover-pause relative overflow-hidden py-4 ${className}`}
      role="group"
      aria-label="Uygulama ve eğitim fotoğrafları"
    >
      <div
        className={`marquee-track gap-4 ${reverse ? "marquee-track-reverse" : ""}`}
        style={{ ["--marquee-duration" as string]: `${durationSeconds}s` }}
      >
        {items.map((shot, i) => (
          <div
            key={`${shot.src}-${i}`}
            aria-hidden={i >= shots.length || undefined}
            className="group relative h-40 w-64 shrink-0 overflow-hidden rounded-2xl border border-white/10 md:h-48 md:w-72"
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              loading="lazy"
              sizes="288px"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Hafif koyultma: şerit arka plan gibi dursun, içeriği bastırmasın.
                Üzerine gelince fotoğraf tam parlaklığına çıkar. */}
            <div className="pointer-events-none absolute inset-0 bg-anthracite-dark/40 transition-opacity duration-500 group-hover:opacity-0" />
          </div>
        ))}
      </div>

      {/* İki kenarda sönümleme — şerit sayfaya gömülü hissettirsin. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-anthracite-dark to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-anthracite-dark to-transparent md:w-32" />
    </div>
  );
}
