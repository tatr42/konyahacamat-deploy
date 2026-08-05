/**
 * Derin içerik blokları için YAPISAL sunum bileşenleri.
 *
 * NEDEN VAR (Faz 1):
 *   Uygulama adımları, kargo takip süreci, sertifika/güven bilgileri ve tıbbi
 *   uyarı — bunların hepsi 81 ilde AYNI bilgidir. Önceki motorda bu bilgi
 *   düz paragraf olarak tekrarlanıyor ve gövdenin yarısını kopya metne
 *   çeviriyordu. Artık aynı bilgi burada yapısal olarak sunuluyor:
 *   kullanıcı bilgiyi kaybetmiyor, tarama motoru kopya paragraf görmüyor.
 *
 * Widget'lar `lib/pseo/content.ts` içinde VERİ olarak tarif edilir
 * (`BlockWidget`); JSX yalnızca burada bulunur. Böylece içerik motoru saf
 * TypeScript kalır ve test edilebilir.
 *
 * Tümü server component — statik üretime uygundur.
 */

import {
  ShieldCheck,
  Award,
  Recycle,
  PackageCheck,
  Truck,
  MapPin,
  MessageCircle,
  TrainFront,
  Plane,
  Bus,
  Car,
} from "lucide-react";
import type { BlockWidget } from "@/lib/pseo/content";
import SafetyNotice from "@/components/SafetyNotice";

// ─── Ortak kabuk ──────────────────────────────────────────────────────────

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-2xl bg-white/[0.03] border border-white/10 p-6">
      {children}
    </div>
  );
}

function PanelTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[11px] font-black text-teal uppercase tracking-[0.25em] mb-5">
      {children}
    </h3>
  );
}

// ─── Uygulama adımları ────────────────────────────────────────────────────

const HACAMAT_STEPS: { title: string; body: string }[] = [
  { title: "Değerlendirme", body: "Genel durum, kullanılan ilaçlar ve varsa kronik rahatsızlıklar sorgulanır. Uygun olmayan durumlarda uygulama yapılmaz." },
  { title: "Bölge temizliği", body: "Uygulama yapılacak bölge antiseptikle temizlenir." },
  { title: "Birinci vakum", body: "Kupalar yerleştirilir, pompayla vakum oluşturulur ve kısa süre bekletilir." },
  { title: "Yüzeysel çizik", body: "Kupa kaldırılır; steril, tek kullanımlık bistüri ile çok yüzeysel çizikler açılır." },
  { title: "İkinci vakum", body: "Kupa yeniden yerleştirilir ve kontrollü miktarda kan kupada toplanır." },
  { title: "Bakım", body: "Bölge temizlenip kapatılır, sonrası için bakım önerileri paylaşılır." },
];

const SULUK_STEPS: { title: string; body: string }[] = [
  { title: "Değerlendirme", body: "Genel durum, kullanılan ilaçlar ve kan değerleri sorgulanır." },
  { title: "Bölge hazırlığı", body: "Bölge kokusuz sabunla temizlenir; parfüm, krem ve kimyasal kalıntı sülüğün tutunmasını engeller." },
  { title: "Yerleştirme", body: "Aç ve bakımlı tıbbi sülük uygun noktaya yerleştirilir, kendiliğinden tutunması beklenir." },
  { title: "Emme süreci", body: "Sülük doyduğunda kendiliğinden bırakır; zorla çekilmez." },
  { title: "Sonlandırma", body: "Bölge steril pansumanla kapatılır. Bir süre sızıntı tarzında kanama beklenen bir durumdur." },
  { title: "Tek kullanım", body: "Kullanılan sülük tek kişiliktir ve uygulama sonrası imha edilir." },
];

function ApplicationSteps({ variant }: { variant: "hacamat" | "suluk" }) {
  const steps = variant === "suluk" ? SULUK_STEPS : HACAMAT_STEPS;
  return (
    <Panel>
      <PanelTitle>
        {variant === "suluk" ? "Sülük Uygulaması" : "Hacamat Uygulaması"} — Adım Adım
      </PanelTitle>
      <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {steps.map((s, i) => (
          <li key={s.title} className="flex gap-3">
            <span className="shrink-0 w-7 h-7 rounded-lg bg-teal/10 border border-teal/20 text-teal text-xs font-black flex items-center justify-center">
              {i + 1}
            </span>
            <div>
              <span className="block text-white text-sm font-bold">{s.title}</span>
              <span className="block text-white/55 text-sm leading-relaxed mt-0.5">
                {s.body}
              </span>
            </div>
          </li>
        ))}
      </ol>
      <p className="text-white/40 text-xs leading-relaxed mt-5">
        Uygulama, eğitimli kişilerce ve steril koşullarda yapılmalıdır.
      </p>
    </Panel>
  );
}

// ─── Kargo süreci ─────────────────────────────────────────────────────────

const SHIPPING_STEPS: { icon: React.ReactNode; title: string; body: string }[] = [
  { icon: <PackageCheck size={18} />, title: "Hazırlık", body: "Sipariş Konya merkezimizde hazırlanır ve mevsim koşuluna göre paketlenir." },
  { icon: <Truck size={18} />, title: "Sevkiyat", body: "Bölgeye en hızlı ulaşan anlaşmalı kargo seçilir; canlı gönderide tecrübeli hatlar tercih edilir." },
  { icon: <MessageCircle size={18} />, title: "Takip numarası", body: "Gönderi yola çıktığında takip numarası ve tahmini teslim günü paylaşılır." },
  { icon: <ShieldCheck size={18} />, title: "Teslim", body: "Teslim anında ambalajı kontrol etmeniz yeterlidir; sorun olursa çözüm sağlanır." },
];

function ShippingSteps() {
  return (
    <Panel>
      <PanelTitle>Kargo Süreci</PanelTitle>
      <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SHIPPING_STEPS.map((s) => (
          <li key={s.title} className="flex gap-3">
            <span className="shrink-0 w-9 h-9 rounded-xl bg-teal/10 border border-teal/20 text-teal flex items-center justify-center">
              {s.icon}
            </span>
            <div>
              <span className="block text-white text-sm font-bold">{s.title}</span>
              <span className="block text-white/55 text-sm leading-relaxed mt-0.5">
                {s.body}
              </span>
            </div>
          </li>
        ))}
      </ol>
      <p className="text-white/40 text-xs leading-relaxed mt-5">
        Ödeme seçenekleri: kapıda ödeme, havale/EFT ve anlaşmalı kargo.
      </p>
    </Panel>
  );
}

// ─── Güven rozetleri (E-E-A-T) ────────────────────────────────────────────

const TRUST_ITEMS: { icon: React.ReactNode; title: string; body: string }[] = [
  { icon: <Award size={18} />, title: "1994'ten beri", body: "Kurucumuz Ebusadullah Hoca'nın uygulama ve eğitim birikimi." },
  { icon: <ShieldCheck size={18} />, title: "CE sertifikalı", body: "Kupa ve vantuz setleri sertifikalı, steril ambalajlı." },
  { icon: <Recycle size={18} />, title: "Tek kullanımlık", body: "Bistüri ve kesici uçlar kişiye özeldir, tekrar kullanılmaz." },
  { icon: <MessageCircle size={18} />, title: "Aynı gün dönüş", body: "WhatsApp ve telefon sorularına aynı gün yanıt veriyoruz." },
];

function TrustBadges() {
  return (
    <Panel>
      <PanelTitle>Çalışma İlkelerimiz</PanelTitle>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {TRUST_ITEMS.map((t) => (
          <li key={t.title} className="flex gap-3">
            <span className="shrink-0 w-9 h-9 rounded-xl bg-gold/10 border border-gold/20 text-gold flex items-center justify-center">
              {t.icon}
            </span>
            <div>
              <span className="block text-white text-sm font-bold">{t.title}</span>
              <span className="block text-white/55 text-sm leading-relaxed mt-0.5">
                {t.body}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

// ─── Konya'ya ulaşım tablosu ──────────────────────────────────────────────

function KonyaAccess({
  distanceKm,
  cargoHat,
}: {
  distanceKm: number;
  cargoHat: string;
}) {
  const rows: { icon: React.ReactNode; label: string; value: string }[] = [
    {
      icon: <MapPin size={16} />,
      label: "Merkezimize mesafe",
      value:
        distanceKm === 0
          ? "Merkezimiz bu şehirde — şehir içi ulaşım"
          : `Karayoluyla yaklaşık ${distanceKm} km`,
    },
    { icon: <Truck size={16} />, label: "Kargo koridoru", value: cargoHat },
    { icon: <TrainFront size={16} />, label: "YHT", value: "Ankara ve İstanbul'dan Konya'ya doğrudan sefer" },
    { icon: <Plane size={16} />, label: "Havayolu", value: "Konya Havalimanı" },
    { icon: <Bus size={16} />, label: "Otobüs", value: "Şehirlerarası terminal bağlantısı" },
    { icon: <Car size={16} />, label: "Karayolu", value: "Ankara, Antalya ve Adana yönlerinden bölünmüş yol" },
  ];

  return (
    <Panel>
      <PanelTitle>Konya Merkeze Ulaşım</PanelTitle>
      {/* Dar ekranda tablo taşmasın diye kendi yatay kaydırma kabında */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse min-w-[420px]">
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b border-white/5 last:border-0">
                <th
                  scope="row"
                  className="py-3 pr-4 text-left font-bold text-white/80 align-top whitespace-nowrap"
                >
                  <span className="inline-flex items-center gap-2">
                    <span className="text-teal">{r.icon}</span>
                    {r.label}
                  </span>
                </th>
                <td className="py-3 text-white/55 leading-relaxed">{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

// Tıbbi sorumluluk notu artık `components/SafetyNotice.tsx` içinde —
// ana sayfadaki şikâyet listesi de aynı metni kullanabilsin diye ayrıldı.

// ─── Dağıtıcı ─────────────────────────────────────────────────────────────

/** `BlockWidget` verisini karşılık gelen bileşene bağlar. */
export function BlockWidgetView({ widget }: { widget: BlockWidget }) {
  switch (widget.kind) {
    case "application-steps":
      return <ApplicationSteps variant={widget.variant} />;
    case "shipping-steps":
      return <ShippingSteps />;
    case "trust-badges":
      return <TrustBadges />;
    case "konya-access":
      return (
        <KonyaAccess distanceKm={widget.distanceKm} cargoHat={widget.cargoHat} />
      );
    case "safety-notice":
      return <SafetyNotice />;
  }
}

/** Widget dizisi için anahtar üretir (aynı blokta tür tekrarlanmaz). */
export function widgetKey(widget: BlockWidget): string {
  return widget.kind === "application-steps"
    ? `${widget.kind}-${widget.variant}`
    : widget.kind;
}
