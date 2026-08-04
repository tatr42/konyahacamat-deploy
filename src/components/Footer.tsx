"use client";
import React from 'react';
import Link from 'next/link';
import { MapPin, Instagram, Facebook, HeartPulse, Globe } from 'lucide-react';
import { academyHref, academyHubHref } from "@/data/ecosystem";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-anthracite-dark text-warm-gray pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal/5 rounded-full blur-[120px] -z-0"></div>
      
      <div className="container-site relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* 1. Marka */}
          <div className="space-y-6">
            <Link href="/" title="Ana Sayfa - Konya Hacamat" className="inline-block group">
              <h3 className="text-2xl font-display font-bold text-white leading-tight">
                EBUSADULLAH<br />
                <span className="text-teal text-[10px] font-black uppercase tracking-[0.4em] opacity-80 group-hover:opacity-100 transition-all">
                  Hacamat & Akademi
                </span>
              </h3>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Kadim şifa geleneklerini modern sterilizasyon ve uzmanlık eğitimiyle harmanlayarak geleceğe taşıyoruz. {new Date().getFullYear() - 1994}+ yıl, 1200+ mezun.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/konya_hacamat" target="_blank" rel="noopener noreferrer nofollow" aria-label="Konya Hacamat Instagram" title="Konya Hacamat Instagram" className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-teal hover:text-anthracite-dark transition-all duration-300 border border-white/10">
                <Instagram size={20} />
              </a>
              <a href="https://www.facebook.com/konyahacamat.com.tr/" target="_blank" rel="noopener noreferrer nofollow" aria-label="Konya Hacamat Facebook" title="Konya Hacamat Facebook" className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-teal hover:text-anthracite-dark transition-all duration-300 border border-white/10">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* 2. Navigasyon */}
          <div>
            <h4 className="text-white font-black mb-8 text-[11px] uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-4 h-[2px] bg-teal"></span> KURUMSAL
            </h4>
            <ul className="space-y-4 text-sm font-semibold">
              <li><Link href="/hizmetler/suluk" title="Sülük Terapisi Konya" className="text-white/60 hover:text-teal transition-colors font-bold">Sülük Terapisi</Link></li>
              <li><Link href="/hizmetler" title="Hacamat Tedavisi Konya" className="text-white/60 hover:text-teal transition-colors">Hacamat Tedavisi</Link></li>
              <li><Link href="/almanya-hacamat" title="Almanya Hacamat Şubesi" className="text-white/60 hover:text-teal transition-colors font-bold">Almanya Şubemiz</Link></li>
              <li><Link href={academyHref()} title="Hacamat Eğitim ve Kursları" className="text-white/60 hover:text-teal transition-colors">Eğitim & Kurslar</Link></li>
              <li><Link href="/malzemeler" title="Hacamat Malzeme Satışı" className="text-white/60 hover:text-teal transition-colors">Malzeme Satışı</Link></li>
              <li><Link href="/takvim" title="Hacamat Sünnet Takvimi" className="text-white/60 hover:text-teal transition-colors">Sünnet Takvimi</Link></li>
              <li><Link href="/iletisim" title="Konya Hacamat İletişim" className="text-white/60 hover:text-teal transition-colors">Bize Ulaşın</Link></li>
            </ul>
          </div>

          {/* 3. İletişim */}
          <div>
            <h4 className="text-white font-black mb-8 text-[11px] uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-4 h-[2px] bg-teal"></span> İLETİŞİM
            </h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center shrink-0 border border-teal/20 group-hover:bg-teal transition-colors duration-300">
                  <MapPin size={18} className="text-teal group-hover:text-anthracite-dark" />
                </div>
                <span className="text-sm text-white/60 leading-snug">
                  Sahibiata Mh. Taşcami Uzunharmanlar Cd. No: 16-4<br />
                  <strong className="text-white">Meram / KONYA</strong>
                </span>
              </div>
              <div className="pt-2 space-y-2">
                <span className="text-[10px] text-teal font-black uppercase tracking-widest block mb-2">Randevu & Bilgi</span>
                <div>
                  <span className="text-[9px] text-white/70 uppercase tracking-widest">🇹🇷 Türkiye</span>
                  <a href="tel:+905544062383" title="Konya Hacamat Türkiye: +90 554 406 23 83" className="block text-xl font-display font-bold text-white hover:text-teal transition-colors">
                    +90 554 406 23 83
                  </a>
                </div>
                <div>
                  <span className="text-[9px] text-white/70 uppercase tracking-widest">🇩🇪 Almanya</span>
                  <a href="tel:+491634492870" title="Konya Hacamat Almanya: +49 163 449 28 70" className="block text-xl font-display font-bold text-white hover:text-teal transition-colors">
                    +49 163 449 28 70
                  </a>
                </div>
              </div>
              <div>
                <span className="text-[10px] text-white/70 font-bold uppercase tracking-widest block mb-1">Web</span>
                <a href="https://www.konyahacamat.net" target="_blank" rel="noopener noreferrer nofollow" title="Konya Hacamat Resmi Web Sitesi" className="text-teal text-sm hover:underline font-bold">
                  www.konyahacamat.net
                </a>
              </div>
            </div>
          </div>

          {/* 4. Türkiye Geneli (il il pSEO dizinleri) + Bölge kartları */}
          <div>
            <h4 className="text-white font-black mb-8 text-[11px] uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-4 h-[2px] bg-gold"></span> TÜRKİYE GENELİ
            </h4>
            <ul className="space-y-4 text-sm font-semibold mb-8">
              <li>
                <Link href={academyHubHref()} title="İl İl Hacamat Kursu — Tüm Türkiye" className="text-white/60 hover:text-teal transition-colors">
                  Hacamat Kursu <span className="text-gold/70 text-[9px] font-black uppercase tracking-widest ml-1">81 İl</span>
                </Link>
              </li>
              <li>
                <Link href="/suluk-satisi" title="İl İl Sülük Satışı — Tüm Türkiye" className="text-white/60 hover:text-teal transition-colors">
                  Sülük Satışı <span className="text-gold/70 text-[9px] font-black uppercase tracking-widest ml-1">81 İl</span>
                </Link>
              </li>
              <li>
                <Link href="/kupa-malzemeleri" title="İl İl Hacamat ve Kupa Malzemeleri — Tüm Türkiye" className="text-white/60 hover:text-teal transition-colors">
                  Hacamat Malzemeleri <span className="text-gold/70 text-[9px] font-black uppercase tracking-widest ml-1">81 İl</span>
                </Link>
              </li>
              {/* Faz 0: "...nedir" il siloları kapatıldı (kanibalizasyon).
                  Linkler doğrudan pillar rehberlere gider — 301'e iç link verilmez. */}
              <li>
                <Link href="/blog/hacamat-nedir-tarihi-bilimsel-temelleri-ve-nasil-uygulanir" title="Hacamat Nedir? Tarihi, Uygulaması ve Bilinmesi Gerekenler" className="text-white/60 hover:text-teal transition-colors">
                  Hacamat Nedir?
                </Link>
              </li>
              <li>
                <Link href="/blog/suluk-tedavisi-hirudoterapi-nedir" title="Sülük Tedavisi (Hirudoterapi) Nedir? Kapsamlı Rehber" className="text-white/60 hover:text-teal transition-colors">
                  Sülük Nedir?
                </Link>
              </li>
            </ul>
            <div className="p-4 rounded-2xl bg-teal/5 border border-teal/10 flex items-center gap-3">
              <Globe className="text-teal shrink-0" size={20} />
              <p className="text-[10px] text-white/70 leading-tight font-medium">
                Tüm eğitimlerde program sonunda <br/><span className="text-white font-bold">Akademi Kurum Sertifikası</span> düzenlenir.
              </p>
            </div>
            <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <HeartPulse className="text-teal shrink-0" size={20} />
              <p className="text-[10px] text-white/70 leading-tight font-medium">
                Türkiye genelinde <span className="text-white font-bold">1200+ aktif mezun</span> kendi merkezinde hizmet veriyor.
              </p>
            </div>
          </div>

        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest text-center md:text-left">
            © {currentYear} KONYA HACAMAT - EBUSADULLAH AKADEMİ &nbsp;|&nbsp;
            <a href="https://tataryazilim.com" target="_blank" rel="noopener noreferrer nofollow" title="Tatar Yazılım" className="hover:text-teal transition-colors">
              tataryazilim.com
            </a>
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
            <Link href="/gizlilik" title="Gizlilik Politikası" className="text-white/70 hover:text-teal transition-colors">Gizlilik Politikası</Link>
            <Link href="/kvkk" title="KVKK Aydınlatma Metni" className="text-white/70 hover:text-teal transition-colors">KVKK</Link>
          </div>
        </div>

        {/* Görsel atıfları (CC BY gereği) */}
        <p className="mt-6 text-[9px] text-white/30 leading-relaxed text-center md:text-left">
          Sülük görseli:{" "}
          <a
            href="https://commons.wikimedia.org/wiki/File:European_medicinal_leech_(Hirudo_medicinalis)_at_the_California_Academy_of_Sciences_02.jpg"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="hover:text-teal transition-colors"
          >
            EvanBaldonado
          </a>{" "}
          /{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="hover:text-teal transition-colors"
          >
            CC BY 4.0
          </a>{" "}
          — Wikimedia Commons.
        </p>
      </div>
    </footer>
  );
}
