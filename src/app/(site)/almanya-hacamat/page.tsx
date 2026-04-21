"use client";
import React from 'react';
import Link from 'next/link';
import { CheckCircle2, MapPin, Phone, Award, Shield, Calendar, Users, Stethoscope } from 'lucide-react';
import Image from 'next/image';

export default function AlmanyaHacamatPage() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-anthracite-dark overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-anthracite-dark/90 z-10" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal/20 rounded-full blur-[100px] z-0" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal/10 rounded-full blur-[100px] z-0" />
        </div>

        <div className="container-site relative z-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 text-teal font-bold text-sm mb-4">
              <MapPin size={16} />
              <span>Almanya & Berlin Özel Hizmetleri</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-display font-black text-white leading-tight">
              Almanya Hacamat ve <br className="hidden lg:block" />
              <span className="text-teal">Sülük Terapisi Merkezi</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto font-medium">
              Türkiye'ye gelmenize gerek yok! Ebusadullah Akademi güvencesiyle <strong>Almanya Hacamat</strong>, <strong>Berlin Hacamat</strong> ve <strong>Almanya Sülük</strong> tedavisi hizmetlerimiz ile bizzat yanınızdayız. Geleneksel şifa yöntemlerini Almanya'da profesyonel ve steril bir ortamda sunuyoruz.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <a
                href="https://wa.me/491634492870"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="w-full sm:w-auto bg-teal text-anthracite-dark px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-teal/20 flex items-center justify-center gap-2"
              >
                <Phone size={18} />
                WhatsApp'tan Randevu Al
              </a>
              <a
                href="tel:+491634492870"
                className="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                +49 163 449 28 70
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US IN GERMANY */}
      <section className="py-20 lg:py-32 bg-anthracite relative border-t border-white/5">
        <div className="container-site">
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-white mb-6">
              Neden Bizi <span className="text-teal">Tercih Etmelisiniz?</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Almanya'da hacamat ve sülük terapisi yaptırmak isteyenler için sterilizasyon, tecrübe ve İslami usullere uygunluk büyük önem taşır.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-anthracite-dark/50 p-8 rounded-3xl border border-white/5 hover:border-teal/30 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-teal/10 flex items-center justify-center mb-6 text-teal group-hover:scale-110 transition-transform">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Maksimum Hijyen</h3>
              <p className="text-white/60 leading-relaxed">
                Tüm hacamat ve sülük malzemelerimiz tek kullanımlıktır. Almanya'nın standartlarına uygun, %100 steril bir ortamda, enfeksiyon riski olmadan tedavi imkanı sunuyoruz.
              </p>
            </div>

            <div className="bg-anthracite-dark/50 p-8 rounded-3xl border border-white/5 hover:border-teal/30 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-teal/10 flex items-center justify-center mb-6 text-teal group-hover:scale-110 transition-transform">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{currentYear - 1994} Yıllık Tecrübe</h3>
              <p className="text-white/60 leading-relaxed">
                1994'ten günümüze uzanan engin tecrübemiz ve uzman kadromuzla, yüzlerce başarılı seans gerçekleştirdik. Ebusadullah hocamızın bilgisiyle en doğru noktalardan şifa bulun.
              </p>
            </div>

            <div className="bg-anthracite-dark/50 p-8 rounded-3xl border border-white/5 hover:border-teal/30 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-teal/10 flex items-center justify-center mb-6 text-teal group-hover:scale-110 transition-transform">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Yerinde Hizmet</h3>
              <p className="text-white/60 leading-relaxed">
                "Hacamat için Türkiye'ye mi gitmeliyim?" derdine son! Almanya'da ve özellikle Berlin hacamat talepleriniz için yerinde ve ulaşılabilir profesyonel hizmet sunuyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 lg:py-32 bg-anthracite-dark relative border-t border-white/5">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 text-teal font-bold text-sm">
                <Stethoscope size={16} />
                <span>Almanya Geneli Hizmetlerimiz</span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-display font-bold text-white leading-tight">
                Almanya Hacamat ve <br/>
                <span className="text-teal">Sülük Terapisi</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                Kan dolaşımını rahatlatmak, vücuttaki toksinleri atmak ve bağışıklık sistemini güçlendirmek için en etkili doğal yöntemler Almanya'da sizleri bekliyor.
              </p>

              <ul className="space-y-4">
                {[
                  "Sünnet olan günlerde İslami usullere uygun hacamat",
                  "Migren, bel ve boyun fıtığı için özel tedavi bölgeleri",
                  "Tıbbi sülük (Hirudoterapi) ile doğal şifa",
                  "Ağrısız, sızısız ve tamamen profesyonel teknikler",
                  "Seans öncesi ve sonrası detaylı bilgilendirme"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="text-teal shrink-0 mt-1" size={20} />
                    <span className="text-white/80 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <Link title="Konyahacamat" href="/hizmetler/hacamat" className="text-teal font-bold hover:text-white transition-colors flex items-center gap-2">
                  Hacamat Hakkında Daha Fazla Bilgi &rarr;
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-anthracite border border-white/10 relative">
                <Image
                  src="/hacamat-suluk-1.webp"
                  alt="Almanya Hacamat ve Sülük Tedavisi"
                  fill
                  className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                  onError={(e) => {
                     e.currentTarget.src = "https://images.unsplash.com/photo-1542841791-1925b02a2bfb?q=80&w=800&auto=format&fit=crop";
                  }}
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-anthracite-dark p-6 rounded-3xl border border-white/10 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-teal/20 flex items-center justify-center text-teal">
                    <Users size={28} />
                  </div>
                  <div>
                    <div className="text-3xl font-black text-white">1000+</div>
                    <div className="text-sm text-white/50 font-medium">Memnun Danışan</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRAINING (EĞİTİM) */}
      <section className="py-20 lg:py-32 bg-anthracite relative border-t border-white/5">
        <div className="container-site">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-col-reverse lg:flex-row-reverse">
            <div className="space-y-8 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 text-teal font-bold text-sm">
                <Award size={16} />
                <span>Uluslararası Sertifikalı</span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-display font-bold text-white leading-tight">
                Almanya Hacamat <br/>
                <span className="text-teal">Eğitimi ve Kursu</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                Avrupa standartlarında, alanında uzman hocalardan <strong>Almanya hacamat eğitimi</strong> alarak siz de sertifikalı bir haccâm/haccâme olabilirsiniz.
              </p>

              <div className="bg-anthracite-dark/50 border border-white/5 p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <Calendar className="text-teal" size={24} />
                  <div>
                    <h4 className="text-white font-bold">Kapsamlı Müfredat</h4>
                    <p className="text-sm text-white/50">Anatomi, noktalar, kesi teknikleri ve sterilizasyon.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <Award className="text-teal" size={24} />
                  <div>
                    <h4 className="text-white font-bold">Geçerli Sertifika</h4>
                    <p className="text-sm text-white/50">Eğitim sonrasında uluslararası geçerliliği olan belge.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="https://wa.me/491634492870?text=Almanya%20Hacamat%20E%C4%9Fitimi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="bg-teal text-anthracite-dark px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all text-center"
                >
                  Eğitim Kayıt
                </a>
              </div>
            </div>

            <div className="relative lg:order-1">
              <div className="aspect-square rounded-[2rem] overflow-hidden bg-anthracite-dark border border-white/10 relative">
                 <Image
                  src="/egitim-1.webp"
                  alt="Almanya Hacamat Eğitimi"
                  fill
                  className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                  onError={(e) => {
                     e.currentTarget.src = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / CONTACT */}
      <section className="py-24 bg-gradient-to-b from-anthracite-dark to-anthracite text-center border-t border-white/5 relative overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-teal/5 rounded-full blur-[150px] pointer-events-none" />

         <div className="container-site relative z-10 max-w-3xl">
            <h2 className="text-4xl lg:text-5xl font-display font-black text-white mb-6">
              Hemen İletişime Geçin
            </h2>
            <p className="text-white/60 text-lg mb-10">
              Almanya, Berlin ve çevresindeki randevu, sülük tedavisi ve eğitim kurslarımız hakkında bilgi almak için bizimle WhatsApp üzerinden doğrudan iletişime geçebilirsiniz.
            </p>
            <div className="flex flex-col items-center justify-center gap-6">
              <a title="Konyahacamat Bağlantısı" href="https://wa.me/491634492870" target="_blank" rel="nofollow noopener noreferrer" className="text-4xl font-black text-teal hover:text-white transition-colors">
                +49 163 449 28 70
              </a>
              <span className="text-sm text-white/40 uppercase tracking-widest font-bold">Almanya İletişim Hattı</span>
            </div>
         </div>
      </section>
    </>
  );
}
