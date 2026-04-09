"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X, Calendar } from 'lucide-react';

const navLinks = [
  { name: 'Ana Sayfa', href: '/' },
  {
    name: 'Hizmetler',
    href: '#',
    dropdown: [
      { name: 'Hacamat', sub: 'Kuru & Yaş Hacamat Tedavisi', href: '/hizmetler/hacamat' },
      { name: 'Sülük Terapisi', sub: 'Doğal Hirudoterapi', href: '/hizmetler/suluk' },
      { name: 'Kurs & Eğitim', sub: 'Sertifikalı Uzmanlık Programı', href: '/egitimler' },
    ]
  },
  { name: 'Takvim', href: '/takvim' },
  {
    name: 'Medya',
    href: '#',
    dropdown: [
      { name: 'Blog', sub: 'Hacamat & Sağlık Yazıları', href: '/blog' },
      { name: 'Basın', sub: 'Medya & Haberler', href: '/basin' },
      { name: 'Galeri', sub: 'Fotoğraf & Video', href: '/galeri' },
    ]
  },
  {
    name: 'Kurumsal',
    href: '#',
    dropdown: [
      { name: 'Hakkımızda', sub: 'Biz Kimiz?', href: '/hakkimizda' },
      { name: 'İletişim', sub: 'Bize Ulaşın', href: '/iletisim' },
    ]
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
      scrolled ? 'bg-anthracite-dark/95 backdrop-blur-md py-3 shadow-2xl' : 'bg-transparent py-6'
    }`}>
      <div className="container-site flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <img src="/fav.webp" alt="Konya Hacamat" className="w-10 h-10 rounded-lg object-contain transition-transform group-hover:scale-110" />
          <div className="flex flex-col text-left">
            <span className="text-white font-bold text-lg leading-none tracking-tight uppercase">
              konyahacamat<span className="text-teal">.net</span>
            </span>
            <span className="text-[9px] text-white/50 font-black uppercase tracking-[0.2em] mt-1 whitespace-nowrap">
              EBUSADULLAH • HACAMAT & AKADEMİ
            </span>
          </div>
        </Link>

        {/* MASAÜSTÜ MENÜ */}
        <div className="hidden lg:flex items-center gap-5">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group/item">
              {link.dropdown ? (
                <button 
                  onClick={(e) => e.preventDefault()} 
                  className="flex items-center gap-1 text-[12px] font-bold text-white/70 hover:text-teal transition-all tracking-wide uppercase outline-none py-4"
                >
                  {link.name}
                  <ChevronDown size={14} className="group-hover/item:rotate-180 transition-transform" />
                </button>
              ) : (
                <Link
                  href={link.href}
                  className="inline-flex items-center text-[12px] font-bold text-white/70 hover:text-teal transition-all tracking-wide uppercase py-4"
                >
                  {link.name}
                </Link>
              )}

              {/* Dropdown Menü - Fare Köprüsü Geliştirildi */}
              {link.dropdown && (
                <div className="absolute top-[80%] left-[-20px] w-64 pt-[20px] opacity-0 translate-y-4 pointer-events-none group-hover/item:opacity-100 group-hover/item:translate-y-0 group-hover/item:pointer-events-auto transition-all duration-300 z-[110]">
                  <div className="bg-anthracite-dark border border-white/10 rounded-2xl p-4 shadow-2xl">
                    {link.dropdown.map((sub) => (
                      <Link key={sub.name} href={sub.href} className="block p-3 rounded-xl hover:bg-white/5 transition-colors group/sub">
                        <div className="text-white font-bold text-sm group-hover/sub:text-teal">{sub.name}</div>
                        <div className="text-[10px] text-white/40 leading-tight">{sub.sub}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* RANDEVU BUTONU */}
        <div className="hidden lg:block">
          <Link 
            href="/takvim" 
            className="bg-teal text-anthracite-dark px-7 py-3 rounded-full font-black text-[11px] uppercase tracking-widest hover:scale-105 hover:shadow-[0_0_25px_rgba(20,184,166,0.4)] active:scale-95 transition-all duration-300 flex items-center gap-2"
          >
            <Calendar size={16} /> Randevu Al
          </Link>
        </div>

        {/* MOBİL BUTON */}
        <button className="lg:hidden text-white" onClick={() => setIsOpen(true)}>
          <Menu size={32} />
        </button>
      </div>

      {/* MOBİL PANEL */}
      <div className={`fixed inset-0 bg-anthracite-dark z-[200] transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="container-site py-8 h-full flex flex-col">
          <div className="flex justify-between items-center mb-12">
            <span className="text-teal font-black tracking-[.2em] uppercase text-xs">MENÜ</span>
            <button onClick={() => setIsOpen(false)} className="text-white hover:rotate-90 transition-transform"><X size={35} /></button>
          </div>
          
          <div className="flex flex-col gap-6 overflow-y-auto pb-24 text-left">
            {navLinks.map((link) => (
              <React.Fragment key={link.name}>
                {link.dropdown ? (
                  link.dropdown.map(sub => (
                    <Link key={sub.name} href={sub.href} onClick={() => setIsOpen(false)} className="text-2xl font-bold text-white/80 border-b border-white/5 pb-3">
                      {sub.name}
                    </Link>
                  ))
                ) : (
                  <Link href={link.href} onClick={() => setIsOpen(false)} className="text-2xl font-bold text-white border-b border-white/5 pb-3">
                    {link.name}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="mt-auto">
            <Link 
              href="/takvim" 
              onClick={() => setIsOpen(false)}
              className="bg-teal text-anthracite-dark w-full py-5 rounded-2xl font-black text-center text-lg uppercase block shadow-2xl"
            >
              Randevu Al
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}