import Link from "next/link";
import { Home, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen hero-mesh flex items-center justify-center relative overflow-hidden">
      {/* Arka Plan Süslemesi */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container-site relative z-10 flex flex-col items-center text-center gap-8 animate-slide-up">
        {/* İkon ve 404 Sayısı */}
        <div className="relative">
          <p className="font-display text-[12rem] md:text-[15rem] leading-none text-teal/10 font-bold select-none">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
             <AlertCircle size={64} className="text-teal/40" />
          </div>
        </div>

        {/* Metin Alanı */}
        <div className="max-w-md space-y-4">
          <h1 className="font-display text-3xl md:text-5xl text-white font-semibold italic">
            Yolunuzu mu <span className="text-teal">kaybettiniz?</span>
          </h1>
          <p className="text-text-muted text-base md:text-lg leading-relaxed">
            Aradığınız sayfa mevcut değil veya başka bir şifa kaynağına taşınmış olabilir. 
            Ebusadullah rehberliğinde ana sayfaya dönebilirsiniz.
          </p>
        </div>

        {/* Buton */}
        <Link
          href="/"
          className="group flex items-center gap-3 bg-teal hover:bg-teal-dark text-anthracite-dark font-bold px-10 py-5 rounded-full transition-all duration-300 shadow-xl shadow-teal/10 hover:scale-105 active:scale-95"
        >
          <Home size={20} className="group-hover:-translate-y-0.5 transition-transform" />
          Ana Sayfaya Dön
        </Link>

        {/* Alt Bilgi */}
        <p className="text-[10px] uppercase tracking-[0.3em] text-teal/40 mt-8">
          Ebusadullah • Hacamat & Akademi
        </p>
      </div>
    </section>
  );
}