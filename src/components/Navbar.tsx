"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, Calendar, Home, Newspaper, Building2, Stethoscope, X } from 'lucide-react';

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

const bottomNav = [
  { name: 'Takvim', href: '/takvim', icon: Calendar },
  {
    name: 'Hizmetler', icon: Stethoscope,
    dropdown: [
      { name: 'Hacamat', href: '/hizmetler/hacamat' },
      { name: 'Sülük', href: '/hizmetler/suluk' },
      { name: 'Eğitim', href: '/egitimler' },
    ]
  },
  { name: 'Ana Sayfa', href: '/', icon: Home, center: true },
  {
    name: 'Medya', icon: Newspaper,
    dropdown: [
      { name: 'Blog', href: '/blog' },
      { name: 'Basın', href: '/basin' },
      { name: 'Galeri', href: '/galeri' },
    ]
  },
  {
    name: 'Kurumsal', icon: Building2,
    dropdown: [
      { name: 'Hakkımızda', href: '/hakkimizda' },
      { name: 'İletişim', href: '/iletisim' },
    ]
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(null); }, [pathname]);

  return (
    <>
      {/* ── ÜST NAV BAR ── */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled ? 'bg-anthracite-dark/95 backdrop-blur-md py-3 shadow-2xl' : 'bg-transparent py-3 lg:py-6'
      }`}>
        <div className="container-site flex justify-between items-end lg:items-center">
          <Link title="Konyahacamat" href="/" className="flex items-center gap-2 group shrink-0">
            <Image src="/fav.webp" alt="Konya Hacamat" width={40} height={40} className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg object-contain transition-transform group-hover:scale-110" />
            <div className="flex flex-col text-left">
              <span className="text-white font-bold text-sm lg:text-lg leading-none tracking-tight uppercase">
                konyahacamat<span className="text-teal">.net</span>
              </span>
              <span className="text-[8px] lg:text-[9px] text-white/50 font-black uppercase tracking-[0.15em] mt-0.5 whitespace-nowrap">
                EBUSADULLAH • HACAMAT & AKADEMİ
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group/item">
                {link.dropdown ? (
                  <button className="flex items-center gap-1 text-[12px] font-bold text-white/70 hover:text-teal transition-all tracking-wide uppercase outline-none py-4">
                    {link.name}
                    <ChevronDown size={14} className="group-hover/item:rotate-180 transition-transform" />
                  </button>
                ) : (
                  <Link title="Konyahacamat" href={link.href} className="inline-flex items-center text-[12px] font-bold text-white/70 hover:text-teal transition-all tracking-wide uppercase py-4">
                    {link.name}
                  </Link>
                )}
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

          <Link title="Konyahacamat" href="/takvim"
            className="bg-teal text-anthracite-dark px-4 py-2.5 lg:px-7 lg:py-3 rounded-full font-black text-[10px] lg:text-[11px] uppercase tracking-widest hover:scale-105 hover:shadow-[0_0_25px_rgba(20,184,166,0.4)] active:scale-95 transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap shrink-0">
            <Calendar size={14} className="shrink-0" /> Randevu Al
          </Link>
        </div>
      </nav>

      {/* ── MOBİL ALT NAV ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[200]">
        
        {/* Dropdown Paneller - WHATSAPP ÜSTÜNE ÇIKARILDI (z-[1001]) */}
        {bottomNav.map(item => {
          if (!item.dropdown || mobileOpen !== item.name) return null;
          return (
            <div key={item.name} className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                <div className="absolute bottom-[80px] left-4 right-4 bg-anthracite-dark border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
                    <div className="flex items-center justify-between p-5 border-b border-white/5">
                        <span className="text-teal font-black uppercase tracking-widest text-xs">{item.name}</span>
                        <button onClick={() => setMobileOpen(null)} className="p-2 bg-white/5 rounded-full text-white/50">
                            <X size={20} />
                        </button>
                    </div>
                    <div className="p-2 grid grid-cols-1 gap-1">
                        {item.dropdown.map(sub => (
                            <Link key={sub.href} href={sub.href}
                                onClick={() => setMobileOpen(null)}
                                className="flex items-center justify-between px-5 py-4 rounded-2xl hover:bg-white/5 active:bg-teal/10 transition-all group">
                                <span className="text-white font-bold group-active:text-teal">{sub.name}</span>
                                <ChevronDown size={16} className="text-white/20 -rotate-90" />
                            </Link>
                        ))}
                    </div>
                </div>
                {/* Dışarıya tıklayınca kapatma alanı */}
                <div className="absolute inset-0 -z-10" onClick={() => setMobileOpen(null)} />
            </div>
          );
        })}

        {/* Alt Bar */}
        <div className="flex items-end bg-anthracite-dark/98 border-t border-white/10 backdrop-blur-xl relative z-[202]"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 8px)' }}>
          {bottomNav.map((item) => {
            const Icon = item.icon;
            const isCenter = item.center;
            const isActive = item.href ? (pathname === item.href) : item.dropdown?.some(d => pathname === d.href);
            const isDropOpen = mobileOpen === item.name;

            if (isCenter) {
              return (
                <Link key={item.name} href={item.href!} className="flex-1 flex flex-col items-center justify-center pb-2">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg -mt-4 transition-all ${
                    isActive ? 'bg-teal shadow-teal/40 scale-105' : 'bg-teal/90 shadow-teal/20 active:scale-95'
                  }`}>
                    <Image src="/fav.webp" alt="Ana Sayfa" width={36} height={36} className="w-9 h-9 rounded-xl object-contain" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest mt-1.5 text-white/50">{item.name}</span>
                </Link>
              );
            }

            return (
              <button key={item.name}
                onClick={(e) => {
                  if (item.href && !item.dropdown) {
                    window.location.href = item.href;
                  } else {
                    setMobileOpen(isDropOpen ? null : item.name);
                  }
                }}
                className="flex-1 flex flex-col items-center justify-center py-3 gap-1 active:bg-white/5 transition-colors">
                <div className={`relative transition-all ${isActive || isDropOpen ? 'scale-110' : ''}`}>
                  <Icon size={20} className={isActive || isDropOpen ? 'text-teal' : 'text-white/50'} />
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest ${isActive || isDropOpen ? 'text-teal' : 'text-white/50'}`}>
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}