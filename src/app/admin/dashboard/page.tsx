"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileText, Newspaper, Eye, LogOut, Plus, TrendingUp, Image } from "lucide-react";

interface Post { id: string; title: string; published: boolean; views?: number; createdAt?: { seconds: number }; }
interface PressItem { id: string; kaynak: string; baslik: string; yil: string; }

export default function DashboardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [press, setPress] = useState<PressItem[]>([]);
  const [totalViews, setTotalViews] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/blog").then(r => r.json()).then(data => {
      if (Array.isArray(data)) {
        setPosts(data);
        setTotalViews(data.reduce((acc: number, p: Post) => acc + (p.views || 0), 0));
      }
    });
    fetch("/api/basin").then(r => r.json()).then(data => { if (Array.isArray(data)) setPress(data); });
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-white font-bold text-lg">Admin Paneli</h1>
          <p className="text-white/40 text-xs">konyahacamat.net</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors">
          <LogOut size={16} /> Çıkış
        </button>
      </header>

      <div className="p-6 max-w-6xl mx-auto space-y-8">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Blog Yazısı", value: posts.length, icon: FileText, color: "teal" },
            { label: "Yayında", value: posts.filter(p => p.published).length, icon: TrendingUp, color: "green" },
            { label: "Basın Haberi", value: press.length, icon: Newspaper, color: "blue" },
            { label: "Toplam Görüntüleme", value: totalViews.toLocaleString("tr"), icon: Eye, color: "purple" },
          ].map(s => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="text-white/40 text-xs uppercase tracking-widest mb-2">{s.label}</div>
              <div className="text-3xl font-bold text-white">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Blog Yönetimi */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <h2 className="text-white font-bold flex items-center gap-2"><FileText size={18} className="text-teal" /> Blog Yazıları</h2>
            <Link href="/admin/blog/new"
              className="flex items-center gap-2 bg-teal text-anthracite-dark px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest hover:opacity-90">
              <Plus size={14} /> Yeni Yazı
            </Link>
          </div>
          {posts.length === 0 ? (
            <div className="p-8 text-center text-white/30 text-sm">Henüz blog yazısı yok.</div>
          ) : (
            <div className="divide-y divide-white/5">
              {posts.slice(0, 10).map(p => (
                <div key={p.id} className="flex items-center justify-between px-5 py-3 hover:bg-white/3">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${p.published ? "bg-green-400" : "bg-white/20"}`} />
                    <span className="text-white text-sm font-medium">{p.title}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-white/30 text-xs flex items-center gap-1"><Eye size={12} /> {p.views || 0}</span>
                    <Link href={`/admin/blog/${p.id}`} className="text-teal text-xs hover:underline">Düzenle</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Basın Yönetimi */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <h2 className="text-white font-bold flex items-center gap-2"><Newspaper size={18} className="text-teal" /> Basın Haberleri</h2>
            <Link href="/admin/basin"
              className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/15">
              Yönet
            </Link>
          </div>
          {press.length === 0 ? (
            <div className="p-8 text-center text-white/30 text-sm">Henüz basın haberi yok.</div>
          ) : (
            <div className="divide-y divide-white/5">
              {press.slice(0, 6).map(p => (
                <div key={p.id} className="flex items-center justify-between px-5 py-3 hover:bg-white/3">
                  <div>
                    <span className="text-white text-sm font-medium">{p.baslik}</span>
                    <span className="text-white/40 text-xs ml-3">{p.kaynak} · {p.yil}</span>
                  </div>
                  <Link href="/admin/basin" className="text-teal text-xs hover:underline">Düzenle</Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hızlı Linkler */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Siteyi Görüntüle", href: "/", external: true },
            { label: "Blog'a Git", href: "/blog", external: true },
            { label: "Basın Sayfası", href: "/basin", external: true },
            { label: "Yeni Blog Yazısı", href: "/admin/blog/new", external: false },
            { label: "📁 Medya Yöneticisi", href: "/admin/medya", external: false },
          ].map(l => (
            <Link key={l.label} href={l.href} target={l.external ? "_blank" : undefined}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/60 text-sm text-center hover:border-teal/30 hover:text-teal transition-colors">
              {l.label}
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
