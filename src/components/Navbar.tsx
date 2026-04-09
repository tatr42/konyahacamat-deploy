"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Calendar, Home, Newspaper, Building2, Stethoscope } from 'lucide-react';

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

  // Sayfa değişince dropdown kapat
  useEffect(() => { setMobileOpen(null); }, [pathname]);

  // Dışarı tıklayınca kapat
  useEffect(() => {
    const close = () => setMobileOpen(null);
    if (mobileOpen) document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [mobileOpen]);

  return (
    <>
      {/* ── ÜST NAV BAR ── */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled ? 'bg-anthracite-dark/95 backdrop-blur-md py-3 shadow-2xl' : 'bg-transparent py-6'
      }`}>
        <div className="container-site flex justify-between items-center">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <img src="/fav.webp" alt="Konya Hacamat" className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg object-contain transition-transform group-hover:scale-110" />
            <div className="flex flex-col text-left">
              <span className="text-white font-bold text-sm lg:text-lg leading-none tracking-tight uppercase">
                konyahacamat<span className="text-teal">.net</span>
              </span>
              <span className="text-[8px] lg:text-[9px] text-white/50 font-black uppercase tracking-[0.15em] mt-0.5 whitespace-nowrap">
                EBUSADULLAH • HACAMAT & AKADEMİ
              </span>
            </div>
          </Link>

          {/* MASAÜSTÜ MENÜ */}
          <div className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group/item">
                {link.dropdown ? (
                  <button className="flex items-center gap-1 text-[12px] font-bold text-white/70 hover:text-teal transition-all tracking-wide uppercase outline-none py-4">
                    {link.name}
                    <ChevronDown size={14} className="group-hover/item:rotate-180 transition-transform" />
                  </button>
                ) : (
                  <Link href={link.href} className="inline-flex items-center text-[12px] font-bold text-white/70 hover:text-teal transition-all tracking-wide uppercase py-4">
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

          {/* RANDEVU BUTONU */}
          <Link href="/takvim"
            className="bg-teal text-anthracite-dark px-4 py-2.5 lg:px-7 lg:py-3 rounded-full font-black text-[10px] lg:text-[11px] uppercase tracking-widest hover:scale-105 hover:shadow-[0_0_25px_rgba(20,184,166,0.4)] active:scale-95 transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap shrink-0">
            <Calendar size={14} className="shrink-0" /> Randevu Al
          </Link>
        </div>
      </nav>

      {/* ── MOBİL ALT NAV ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[200]">

        {/* Dropdown overlay — tıklayınca kapat */}
        {mobileOpen && (
          <div className="fixed inset-0 z-[199]" onClick={() => setMobileOpen(null)} />
        )}

        {/* Dropdown paneller — YUKARI açılır */}
        {bottomNav.map(item => {
          if (!item.dropdown || mobileOpen !== item.name) return null;
          return (
            <div key={item.name}
              className="absolute bottom-[72px] left-0 right-0 mx-4 bg-anthracite-dark border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[201]"
              onClick={e => e.stopPropagation()}>
              <div className="p-2">
                {item.dropdown.map(sub => (
                  <Link key={sub.href} href={sub.href}
                    onClick={() => setMobileOpen(null)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 active:bg-white/10 transition-colors">
                    <span className="text-white font-bold text-sm">{sub.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {/* Alt bar */}
        <div className="flex items-end bg-anthracite-dark/98 border-t border-white/10 backdrop-blur-xl"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 8px)' }}>
          {bottomNav.map((item) => {
            const Icon = item.icon;
            const isCenter = item.center;
            const isActive = item.href
              ? (pathname === item.href)
              : item.dropdown?.some(d => pathname === d.href);
            const isDropOpen = mobileOpen === item.name;

            if (isCenter) {
              return (
                <Link key={item.name} href={item.href!}
                  className="flex-1 flex flex-col items-center justify-center pb-2">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg -mt-4 transition-all ${
                    isActive
                      ? 'bg-teal shadow-teal/40 scale-105'
                      : 'bg-teal/90 shadow-teal/20 active:scale-95'
                  }`}>
                    <img src="/fav.webp" alt="Ana Sayfa" className="w-9 h-9 rounded-xl object-contain" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest mt-1.5 text-white/50">
                    {item.name}
                  </span>
                </Link>
              );
            }

            // Dropdown olanlar button, link olanlar Link
            if (item.href && !item.dropdown) {
              return (
                <Link key={item.name} href={item.href}
                  className="flex-1 flex flex-col items-center justify-center py-3 gap-1 active:bg-white/5 transition-colors">
                  <div className={`transition-all ${isActive ? 'scale-110' : ''}`}>
                    <Icon size={20} className={isActive ? 'text-teal' : 'text-white/50'} />
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-widest ${isActive ? 'text-teal' : 'text-white/50'}`}>
                    {item.name}
                  </span>
                </Link>
              );
            }

            return (
              <button key={item.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileOpen(isDropOpen ? null : item.name);
                }}
                className="flex-1 flex flex-col items-center justify-center py-3 gap-1 active:bg-white/5 transition-colors">
                <div className={`relative transition-all ${isActive || isDropOpen ? 'scale-110' : ''}`}>
                  <Icon size={20} className={isActive || isDropOpen ? 'text-teal' : 'text-white/50'} />
                  {isDropOpen && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-teal rounded-full" />
                  )}
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest ${
                  isActive || isDropOpen ? 'text-teal' : 'text-white/50'
                }`}>
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobilde alt nav yüksekliği kadar boşluk bırak */}
      <div className="lg:hidden h-[72px]" />
    </>
  );
}
