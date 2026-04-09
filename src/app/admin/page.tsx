"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Trash2, Edit3, LayoutDashboard, FileText, Settings, LogOut, Image as ImageIcon, ExternalLink } from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  category: string;
  published: boolean;
  createdAt?: string;
}

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Verileri senin API'nden çeken fonksiyon
  const loadData = async () => {
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      if (Array.isArray(data)) setBlogs(data);
    } catch (error) {
      console.error("Veri yüklenemedi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Bu yazıyı silmek istediğine emin misin?")) return;
    const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
    if (res.ok) loadData();
  };

  const handleLogout = () => {
    // Session temizleme gerekirse buraya eklenebilir
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* SIDEBAR */}
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
          <Link href="/admin/blog/new" className="w-full flex items-center gap-3 px-4 py-3 text-white/40 hover:text-white hover:bg-white/5 rounded-xl text-sm font-bold transition-all">
            <FileText size={18} /> Blog Yazıları
          </Link>
          <Link href="/admin/basin" className="w-full flex items-center gap-3 px-4 py-3 text-white/40 hover:text-white hover:bg-white/5 rounded-xl text-sm font-bold transition-all">
            <ExternalLink size={18} /> Basın Yönetimi
          </Link>
          <Link href="/admin/medya" className="w-full flex items-center gap-3 px-4 py-3 text-white/40 hover:text-white hover:bg-white/5 rounded-xl text-sm font-bold transition-all">
            <ImageIcon size={18} /> Medya / Galeri
          </Link>
        </nav>

        <button onClick={handleLogout} className="mt-auto flex items-center gap-3 px-4 py-3 text-red-400/50 hover:text-red-400 rounded-xl text-sm font-bold transition-all font-black uppercase tracking-widest">
          <LogOut size={18} /> Çıkış
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter">
              Admin <span className="text-teal-400">Dashboard</span>
            </h1>
            <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em] mt-1">konyahacamat.net</p>
          </div>
          
          <Link href="/admin/blog/new" className="bg-teal text-black px-6 py-3 rounded-2xl font-black text-xs uppercase transition-all flex items-center gap-2 active:scale-95 hover:opacity-90">
            <Plus size={18} /> Yeni İçerik
          </Link>
        </header>

        {/* TABLO */}
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
          <div className="p-6 border-b border-white/5">
            <h3 className="font-bold text-sm flex items-center gap-2 uppercase tracking-widest text-white/60">
              <span className="w-2 h-[2px] bg-teal"></span> Son Paylaşımlar
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-white/30 text-[10px] uppercase font-black tracking-widest">
                <tr>
                  <th className="px-6 py-4">İçerik Başlığı</th>
                  <th className="px-6 py-4">Kategori</th>
                  <th className="px-6 py-4">Durum</th>
                  <th className="px-6 py-4 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr><td colSpan={4} className="px-6 py-10 text-center text-white/20">Yükleniyor...</td></tr>
                ) : blogs.length === 0 ? (
                  <tr><td colSpan={4} className="px-6 py-10 text-center text-white/20">Henüz yazı yok.</td></tr>
                ) : (
                  blogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-5">
                        <div className="font-bold text-white/80 group-hover:text-teal-400 transition-colors">{blog.title}</div>
                        <div className="text-[10px] text-white/20 font-mono mt-1">/{blog.slug}</div>
                      </td>
                      <td className="px-6 py-5 text-white/40 italic">{blog.category}</td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          blog.published ? "bg-teal-500/10 text-teal-400" : "bg-white/10 text-white/40"
                        }`}>
                          {blog.published ? "Yayında" : "Taslak"}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right space-x-2">
                        <Link href={`/admin/blog/${blog.id}`} className="inline-flex p-2.5 bg-white/5 hover:bg-teal-500/20 rounded-xl transition-all text-teal-400">
                          <Edit3 size={16} />
                        </Link>
                        <button onClick={() => handleDelete(blog.id)} className="p-2.5 bg-white/5 hover:bg-red-500/20 rounded-xl transition-all text-red-400/50 hover:text-red-400">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}