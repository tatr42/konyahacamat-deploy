"use client";

/**
 * Lokasyona özel dönüşüm bandı — pSEO sayfalarının alt kısmı için.
 *
 * SSS'yi okuyup sayfa sonuna gelen ziyaretçi en sıcak müşteridir; bu bileşen
 * ona üç dönüşüm yolu sunar:
 *   1. Doğrudan arama (tel:)
 *   2. Tek tıkla WhatsApp (lokasyon+hizmet ön dolgulu mesaj)
 *   3. "Hızlı Bilgi" mini formu — ad + soru alanını WhatsApp mesajına
 *      dönüştürür (backend YOK; SSG ile tamamen uyumlu, KVKK yükü doğurmaz).
 *
 * Client component'tir ama tüm metinler server'dan props ile gelir; böylece
 * içerik motorundaki (lib/pseo/content) farklılaştırma korunur.
 */

import { useState } from "react";
import { Phone, MessageCircle, Send, MapPin } from "lucide-react";

interface Props {
  /** Band başlığı — ör. "Kadıköy Hacamat Hattı" */
  title: string;
  /** Başlık altı satır — lokasyona özel erişim cümlesi */
  subtitle: string;
  /** Görünen telefon — ör. "0554 406 23 83" */
  phoneDisplay: string;
  /** tel: hedefi — ör. "+905544062383" */
  phoneHref: string;
  /** WhatsApp numarası (uluslararası, +'sız) — ör. "905544062383" */
  whatsapp: string;
  /** WhatsApp mesajının lokasyon+hizmet ön eki — form metni buna eklenir */
  waPrefix: string;
}

export default function LocalContactCta({
  title,
  subtitle,
  phoneDisplay,
  phoneHref,
  whatsapp,
  waPrefix,
}: Props) {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");

  const directWa = `https://wa.me/${whatsapp}?text=${encodeURIComponent(waPrefix)}`;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parts = [waPrefix];
    if (name.trim()) parts.push(`Adım: ${name.trim()}.`);
    if (question.trim()) parts.push(`Sorum: ${question.trim()}`);
    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(parts.join(" "))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="py-16 lg:py-24 bg-anthracite-dark border-t border-white/5">
      <div className="container-site">
        <div className="max-w-5xl mx-auto bg-anthracite rounded-[2rem] border border-gold/20 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Sol: hat bilgisi + doğrudan CTA'lar */}
            <div className="p-8 lg:p-12 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold font-bold text-xs uppercase tracking-widest">
                <MapPin size={14} />
                Yerel Danışma Hattı
              </div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-white leading-tight">
                {title}
              </h2>
              <p className="text-white/60 leading-relaxed">{subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`tel:${phoneHref}`}
                  className="flex items-center justify-center gap-2 bg-teal text-anthracite-dark px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-teal/20"
                >
                  <Phone size={17} />
                  {phoneDisplay}
                </a>
                <a
                  href={directWa}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center justify-center gap-2 bg-[#25D366]/90 text-white px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#25D366] hover:scale-105 active:scale-95 transition-all"
                >
                  <MessageCircle size={17} />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Sağ: Hızlı Bilgi formu → WhatsApp'a köprü */}
            <div className="p-8 lg:p-12 bg-white/[0.02] border-t lg:border-t-0 lg:border-l border-white/5">
              <h3 className="text-white font-bold text-lg mb-1">Hızlı Bilgi Formu</h3>
              <p className="text-white/40 text-xs mb-6">
                Bilgilerinizi yazın, WhatsApp mesajınız otomatik hazırlansın — tek dokunuşla gönderin.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Adınız (isteğe bağlı)"
                  autoComplete="name"
                  className="w-full bg-anthracite-dark border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-teal/50 transition-colors"
                />
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Sorunuz — ör. fiyat, kargo süresi, uygun tarih…"
                  rows={3}
                  className="w-full bg-anthracite-dark border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-teal/50 transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gold/90 text-anthracite-dark px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gold hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <Send size={16} />
                  WhatsApp ile Gönder
                </button>
                <p className="text-white/25 text-[10px] leading-snug text-center">
                  Form verileriniz sunucuya kaydedilmez; yalnızca WhatsApp mesajınızı hazırlamak için kullanılır.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
