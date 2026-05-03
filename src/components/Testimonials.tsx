"use client";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

const reviews = [
  {
    id: 1,
    author: "Mehmet Y.",
    role: "Bel Fıtığı Tedavisi",
    text: "Ebusadullah Hocam'a bel fıtığı şikayetiyle geldim. 3 seans hacamat ve sülük sonrası ağrılarımda %90 azalma oldu. Allah razı olsun, herkese tavsiye ederim.",
    stars: 5,
    date: "2 hafta önce"
  },
  {
    id: 2,
    author: "Ayşe K.",
    role: "Migren Şikayeti",
    text: "Yıllardır bitmeyen migren ağrılarım için hacamat yaptırdım. İlk seanstan sonra bile farkı hissettim. Steril ve profesyonel bir ortam.",
    stars: 5,
    date: "1 ay önce"
  },
  {
    id: 3,
    author: "Hüseyin B.",
    role: "Kurs Kursiyeri",
    text: "Ebusadullah Akademi'den hacamat eğitimi aldım. Hocamızın tecrübesi ve anlatımı harika. Şimdi kendi merkezimi açma hazırlığındayım.",
    stars: 5,
    date: "2 ay önce"
  },
  {
    id: 4,
    author: "Fatma T.",
    role: "Genel Detoks",
    text: "Mevsim geçişlerinde mutlaka gelirim. Vücudumun hafiflediğini hissediyorum. Temizliğe ve hijyene verilen önem beni çok etkiledi.",
    stars: 5,
    date: "3 hafta önce"
  }
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % reviews.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-anthracite relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-teal/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-teal/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="container-site relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/20 px-4 py-2 rounded-full">
            <Star size={14} className="text-teal fill-teal" />
            <span className="text-[11px] font-black text-teal uppercase tracking-[0.2em]">Müşteri Deneyimleri</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight">
            Şifaya Kavuşanların <br /><span className="text-teal italic">Yorumları</span>
          </h2>
          <div className="flex items-center justify-center gap-1 text-teal">
             {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
             <span className="ml-2 text-white/50 font-bold text-sm">4.9/5 Ortalama</span>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigasyon Okları */}
          <button
            onClick={() => setActive((prev) => (prev - 1 + reviews.length) % reviews.length)}
            className="absolute left-0 lg:-left-20 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-teal hover:border-teal/50 hover:bg-teal/5 transition-all z-20 hidden md:flex"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setActive((prev) => (prev + 1) % reviews.length)}
            className="absolute right-0 lg:-right-20 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-teal hover:border-teal/50 hover:bg-teal/5 transition-all z-20 hidden md:flex"
          >
            <ChevronRight size={24} />
          </button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {reviews.map((rev) => (
                <div key={rev.id} className="w-full shrink-0 px-4">
                  <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group">
                    <Quote size={80} className="absolute -top-4 -right-4 text-white/[0.03] group-hover:text-teal/[0.05] transition-colors" />

                    <div className="relative z-10 space-y-6">
                      <div className="flex gap-1">
                        {[...Array(rev.stars)].map((_, i) => (
                          <Star key={i} size={18} className="text-teal fill-teal" />
                        ))}
                      </div>

                      <p className="text-xl md:text-2xl text-white/80 font-medium italic leading-relaxed">
                        &ldquo;{rev.text}&rdquo;
                      </p>

                      <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                        <div className="w-12 h-12 rounded-full bg-teal/20 flex items-center justify-center text-teal font-black text-lg">
                          {rev.author[0]}
                        </div>
                        <div>
                          <div className="text-white font-bold">{rev.author}</div>
                          <div className="text-teal text-[10px] font-black uppercase tracking-widest">{rev.role}</div>
                        </div>
                        <div className="ml-auto text-white/20 text-xs font-medium">
                          {rev.date}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all ${
                  active === i ? "w-8 bg-teal" : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Google Link */}
        <div className="mt-16 text-center">
          <a
            href="https://www.google.com/maps/search/Ebusadullah+Hacamat+Konya"
            target="_blank" rel="noopener noreferrer nofollow"

            title="Ebusadullah Hacamat Google Yorumları"
            className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-2xl font-bold text-white text-sm transition-all active:scale-95"
          >
            <Image src="/logo.webp" alt="Google" width={20} height={20} className="w-5 h-5 object-contain grayscale brightness-200" />
            TÜM GOOGLE YORUMLARINI GÖR
          </a>
        </div>
      </div>
    </section>
  );
}
