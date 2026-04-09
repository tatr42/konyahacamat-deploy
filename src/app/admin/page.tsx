"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Edit3, LayoutDashboard, FileText, Settings, LogOut } from "lucide-react";

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Çıkış yapma fonksiyonu
  const handleLogout = () => {
    // Burada istersen API'ye istek atıp cookie silebilirsin
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* SOL MENÜ (SIDEBAR) */}
      <aside className="w-64 border-r border-white/5 bg-black/20 p-6 hidden lg:flex flex-col">
        <div className="mb-10">
          <h2 className="text-xl font-black uppercase tracking-tighter italic">
            Eb<span className="text-teal-400">Panel</span>
          </h2>
        </div>

        <nav className="space-y-2 flex-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-teal/10 text-teal-400 rounded-xl text-sm font-bold transition-all">
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-white/40 hover:text-white hover:bg-white/5 rounded-xl text-sm font-bold transition-all">
            <FileText size={18} /> Blog Yazıları
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-white/40 hover:text-white hover:bg-white/5 rounded-xl text-sm font-bold transition-all">
            <Settings size={18} /> Ayarlar
          </button>
        </nav>

        <button onClick={handleLogout} className="mt-auto flex items-center gap-3 px-4 py-3 text-red-400/50 hover:text-red-400 rounded-xl text-sm font-bold transition-all">
          <LogOut size={18} /> Çıkış Yap
        </button>
      </aside>

      {/* ANA İÇERİK ALANI */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter">İçerik <span className="text-teal-400">Yönetimi</span></h1>
            <p className="text-white/30 text-xs font-bold uppercase tracking-widest mt-1">Hoş geldin, Bekir</p>
          </div>
          
          <button className="bg-teal-500 hover:bg-teal-400 text-black px-6 py-3 rounded-2xl font-black text-xs uppercase transition-all flex items-center gap-2 active:scale-95">
            <Plus size={18} /> Yeni Blog Ekle
          </button>
        </header>

        {/* ÖZET KARTLARI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem]">
            <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Toplam Yazı</span>
            <p className="text-3xl font-black text-white mt-1">12</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem]">
            <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Ziyaretçi (Ay)</span>
            <p className="text-3xl font-black text-teal-400 mt-1">1,420</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem]">
            <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Durum</span>
            <p className="text-3xl font-black text-green-500 mt-1">Aktif</p>
          </div>
        </div>

        {/* BLOG LİSTESİ TABLOSU */}
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h3 className="font-bold text-sm">Son Blog Yazıları</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-white/30 text-[10px] uppercase font-black tracking-widest">
                <tr>
                  <th className="px-6 py-4">Başlık</th>
                  <th className="px-6 py-4">Tarih</th>
                  <th className="px-6 py-4 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {/* ÖRNEK VERİLER */}
                {[1, 2, 3].map((item) => (
                  <tr key={item} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-5 font-bold text-white/80">Konya'da Hacamatın Faydaları - {item}</td>
                    <td className="px-6 py-5 text-white/40">10.04.2026</td>
                    <td className="px-6 py-5 text-right space-x-2">
                      <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all text-teal-400">
                        <Edit3 size={16} />
                      </button>
                      <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all text-red-400">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}