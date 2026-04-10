"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText, Newspaper, Eye, LogOut, Plus,
  Pencil, Trash2, X, Check, TrendingUp,
  Image as ImageIcon, ExternalLink, RefreshCw,
} from "lucide-react";

interface Post {
  id: string; title: string; slug: string; category: string;
  published: boolean; views?: number;
}
interface PressItem {
  id: string; kaynak: string; yil: string; baslik: string;
  img: string; slug: string; icerik: string; seoTitle: string; seoDescription: string;
}

const emptyPress = (): Omit<PressItem, "id"> => ({
  kaynak: "", yil: new Date().getFullYear().toString(), baslik: "",
  img: "", slug: "", icerik: "", seoTitle: "", seoDescription: "",
});

const slugify = (t: string) =>
  t.toLowerCase().trim()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");

type Tab = "blog" | "basin";
type PressMode = "list" | "add" | "edit";

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [press, setPress] = useState<PressItem[]>([]);
  const [blogError, setBlogError] = useState("");
  const [pressError, setPressError] = useState("");
  const [loadingBlog, setLoadingBlog] = useState(true);
  const [loadingPress, setLoadingPress] = useState(true);
  const [tab, setTab] = useState<Tab>("blog");

  /* basin form */
  const [pressMode, setPressMode] = useState<PressMode>("list");
  const [pressForm, setPressForm] = useState(emptyPress());
  const [pressEditId, setPressEditId] = useState<string | null>(null);
  const [pressSaving, setPressSaving] = useState(false);

  const loadBlogs = async () => {
    setLoadingBlog(true);
    setBlogError("");
    try {
      const r = await fetch("/api/blog");
      const d = await r.json();
      if (Array.isArray(d)) {
        setPosts(d);
      } else {
        setBlogError(d.error || "Veri alınamadı");
      }
    } catch (e) {
      setBlogError("Bağlantı hatası: " + String(e));
    }
    setLoadingBlog(false);
  };

  const loadPress = async () => {
    setLoadingPress(true);
    setPressError("");
    try {
      const r = await fetch("/api/basin");
      const d = await r.json();
      if (Array.isArray(d)) {
        setPress(d);
      } else {
        setPressError(d.error || "Veri alınamadı");
      }
    } catch (e) {
      setPressError("Bağlantı hatası: " + String(e));
    }
    setLoadingPress(false);
  };

  useEffect(() => { loadBlogs(); loadPress(); }, []);

  const deletePost = async (id: string) => {
    if (!confirm("Bu blog yazısı silinsin mi?")) return;
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    loadBlogs();
  };

  const setPressField = (key: keyof typeof pressForm, val: string) => {
    if (key === "baslik") {
      setPressForm(f => ({ ...f, baslik: val, slug: slugify(val), seoTitle: val }));
    } else {
      setPressForm(f => ({ ...f, [key]: val }));
    }
  };

  const openAddPress = () => { setPressForm(emptyPress()); setPressEditId(null); setPressMode("add"); };
  const openEditPress = (item: PressItem) => {
    const { id, ...rest } = item;
    setPressForm(rest); setPressEditId(id); setPressMode("edit");
  };
  const cancelPress = () => { setPressMode("list"); setPressForm(emptyPress()); setPressEditId(null); };

  const savePress = async () => {
    if (!pressForm.kaynak.trim() || !pressForm.baslik.trim()) { alert("Kaynak ve Başlık zorunludur."); return; }
    setPressSaving(true);
    try {
      if (pressMode === "add") {
        const r = await fetch("/api/basin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pressForm),
        });
        if (!r.ok) { const d = await r.json(); alert("Hata: " + (d.error || r.status)); setPressSaving(false); return; }
      } else if (pressMode === "edit" && pressEditId) {
        const r = await fetch(`/api/basin/${pressEditId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pressForm),
        });
        if (!r.ok) { const d = await r.json(); alert("Hata: " + (d.error || r.status)); setPressSaving(false); return; }
      }
      await loadPress();
      cancelPress();
    } catch (e) { alert("Kayıt başarısız: " + String(e)); }
    setPressSaving(false);
  };

  const deletePress = async (id: string) => {
    if (!confirm("Bu haber silinsin mi?")) return;
    await fetch(`/api/basin/${id}`, { method: "DELETE" });
    loadPress();
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  };

  const totalViews = posts.reduce((a, p) => a + (p.views || 0), 0);
  const published = posts.filter(p => p.published).length;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">

      {/* SIDEBAR */}
      <aside className="w-56 border-r border-white/5 bg-black/30 hidden lg:flex flex-col p-5 shrink-0">
        <div className="mb-8">
          <div className="text-white font-black text-lg tracking-tight">Eb<span className="text-teal">Panel</span></div>
          <div className="text-white/20 text-[10px] uppercase tracking-widest mt-0.5">konyahacamat.net</div>
        </div>
        <nav className="space-y-1 flex-1">
          <button onClick={() => setTab("blog")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left ${tab === "blog" ? "bg-teal/10 text-teal" : "text-white/40 hover:text-white hover:bg-white/5"}`}>
            <FileText size={17} /> Blog Yazıları
          </button>
          <button onClick={() => setTab("basin")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left ${tab === "basin" ? "bg-teal/10 text-teal" : "text-white/40 hover:text-white hover:bg-white/5"}`}>
            <Newspaper size={17} /> Basın Haberleri
          </button>
          <Link href="/admin/medya"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-white/40 hover:text-white hover:bg-white/5 transition-all">
            <ImageIcon size={17} /> Medya
          </Link>
        </nav>
        <div className="space-y-1 pt-4 border-t border-white/5">
          <Link href="/" target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/30 hover:text-white hover:bg-white/5 transition-all">
            <ExternalLink size={16} /> Siteyi Gör
          </Link>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400/50 hover:text-red-400 hover:bg-red-400/5 transition-all font-bold">
            <LogOut size={17} /> Çıkış
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto">

        {/* Header */}
        <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 bg-[#0a0a0a]/95 backdrop-blur z-10">
          <span className="font-black text-lg">Admin Paneli</span>
          {/* Mobil sekmeler */}
          <div className="flex lg:hidden gap-2">
            <button onClick={() => setTab("blog")} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${tab === "blog" ? "bg-teal text-black" : "bg-white/10 text-white/60"}`}>Blog</button>
            <button onClick={() => setTab("basin")} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${tab === "basin" ? "bg-teal text-black" : "bg-white/10 text-white/60"}`}>Basın</button>
          </div>
          <button onClick={handleLogout} className="hidden lg:flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors">
            <LogOut size={16} /> Çıkış
          </button>
        </header>

        <div className="p-6 max-w-5xl mx-auto space-y-6">

          {/* İstatistikler */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Blog Yazısı", value: posts.length, icon: FileText },
              { label: "Yayında", value: published, icon: TrendingUp },
              { label: "Basın Haberi", value: press.length, icon: Newspaper },
              { label: "Görüntüleme", value: totalViews.toLocaleString("tr"), icon: Eye },
            ].map(s => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <s.icon size={15} className="text-teal mb-2 opacity-60" />
                <div className="text-2xl font-black">{s.value}</div>
                <div className="text-white/30 text-[10px] uppercase tracking-widest mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* ── BLOG ── */}
          {tab === "blog" && (
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <h2 className="font-bold">Blog Yazıları</h2>
                  <button onClick={loadBlogs} className="text-white/30 hover:text-white transition-colors">
                    <RefreshCw size={14} />
                  </button>
                </div>
                <Link href="/admin/blog/new"
                  className="flex items-center gap-2 bg-teal text-black px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest hover:opacity-90">
                  <Plus size={13} /> Yeni Yazı
                </Link>
              </div>

              {loadingBlog ? (
                <div className="p-10 text-center text-white/30 text-sm">Yükleniyor...</div>
              ) : blogError ? (
                <div className="p-8 text-center">
                  <p className="text-red-400 text-sm mb-3">Hata: {blogError}</p>
                  <button onClick={loadBlogs} className="text-teal text-sm underline">Tekrar Dene</button>
                </div>
              ) : posts.length === 0 ? (
                <div className="p-10 text-center text-white/30 text-sm">Henüz blog yazısı yok.</div>
              ) : (
                <div className="divide-y divide-white/5">
                  {posts.map(p => (
                    <div key={p.id} className="flex items-center justify-between px-5 py-4 hover:bg-white/3">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${p.published ? "bg-green-400" : "bg-white/20"}`} />
                        <div className="min-w-0">
                          <div className="text-white text-sm font-medium truncate">{p.title}</div>
                          <div className="flex items-center gap-3 mt-0.5">
                            <span className="text-white/20 text-[10px] font-mono">/{p.slug}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${p.published ? "bg-green-400/10 text-green-400" : "bg-white/10 text-white/40"}`}>
                              {p.published ? "Yayında" : "Taslak"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-4">
                        <span className="text-white/20 text-xs flex items-center gap-1 hidden sm:flex">
                          <Eye size={11} /> {p.views || 0}
                        </span>
                        <Link href={`/admin/blog/${p.id}`}
                          className="flex items-center gap-1.5 bg-white/10 hover:bg-teal/20 hover:text-teal text-white/60 px-3 py-1.5 rounded-lg text-xs font-bold transition-all">
                          <Pencil size={12} /> Düzenle
                        </Link>
                        <button onClick={() => deletePost(p.id)}
                          className="p-1.5 text-white/30 hover:text-red-400 transition-colors">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── BASIN ── */}
          {tab === "basin" && (
            <div className="space-y-5">
              {/* Form */}
              {pressMode !== "list" && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-bold">{pressMode === "add" ? "Yeni Haber Ekle" : "Haberi Düzenle"}</h2>
                    <button onClick={cancelPress} className="text-white/30 hover:text-white transition-colors"><X size={20} /></button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/30 text-[10px] uppercase tracking-widest block mb-1">Kaynak *</label>
                      <input value={pressForm.kaynak} onChange={e => setPressField("kaynak", e.target.value)}
                        placeholder="Yenigün, Merhaba..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal/50" />
                    </div>
                    <div>
                      <label className="text-white/30 text-[10px] uppercase tracking-widest block mb-1">Yıl</label>
                      <input value={pressForm.yil} onChange={e => setPressField("yil", e.target.value)}
                        placeholder="2024"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal/50" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-white/30 text-[10px] uppercase tracking-widest block mb-1">Başlık *</label>
                      <input value={pressForm.baslik} onChange={e => setPressField("baslik", e.target.value)}
                        placeholder="Haber başlığı"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal/50" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-white/30 text-[10px] uppercase tracking-widest block mb-1">Slug (URL)</label>
                      <input value={pressForm.slug} onChange={e => setPressField("slug", e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-teal font-mono text-sm focus:outline-none focus:border-teal/50" />
                      <p className="text-white/20 text-[10px] mt-1">/basin/{pressForm.slug || "..."}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-white/30 text-[10px] uppercase tracking-widest block mb-1">Görsel Yolu</label>
                      <input value={pressForm.img} onChange={e => setPressField("img", e.target.value)}
                        placeholder="/basin/gazete-01.webp"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-teal/50" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-white/30 text-[10px] uppercase tracking-widest block mb-1">İçerik</label>
                      <textarea value={pressForm.icerik} onChange={e => setPressField("icerik", e.target.value)}
                        placeholder="Haberin detayını buraya yazın..." rows={5}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal/50 resize-y" />
                    </div>
                    <div>
                      <label className="text-white/30 text-[10px] uppercase tracking-widest block mb-1">SEO Başlık</label>
                      <input value={pressForm.seoTitle} onChange={e => setPressField("seoTitle", e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal/50" />
                      <p className={`text-[10px] mt-1 ${pressForm.seoTitle.length > 60 ? "text-red-400" : "text-white/20"}`}>{pressForm.seoTitle.length}/60</p>
                    </div>
                    <div>
                      <label className="text-white/30 text-[10px] uppercase tracking-widest block mb-1">SEO Açıklama</label>
                      <input value={pressForm.seoDescription} onChange={e => setPressField("seoDescription", e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal/50" />
                      <p className={`text-[10px] mt-1 ${pressForm.seoDescription.length > 160 ? "text-red-400" : "text-white/20"}`}>{pressForm.seoDescription.length}/160</p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-5">
                    <button onClick={savePress} disabled={pressSaving}
                      className="flex items-center gap-2 bg-teal text-black px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:opacity-90 disabled:opacity-50">
                      <Check size={15} /> {pressSaving ? "Kaydediliyor..." : pressMode === "add" ? "Ekle" : "Kaydet"}
                    </button>
                    <button onClick={cancelPress}
                      className="flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/15">
                      İptal
                    </button>
                  </div>
                </div>
              )}

              {/* Liste */}
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <h2 className="font-bold">Basın Haberleri</h2>
                    <button onClick={loadPress} className="text-white/30 hover:text-white transition-colors">
                      <RefreshCw size={14} />
                    </button>
                  </div>
                  {pressMode === "list" && (
                    <button onClick={openAddPress}
                      className="flex items-center gap-2 bg-teal text-black px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest hover:opacity-90">
                      <Plus size={13} /> Haber Ekle
                    </button>
                  )}
                </div>

                {loadingPress ? (
                  <div className="p-10 text-center text-white/30 text-sm">Yükleniyor...</div>
                ) : pressError ? (
                  <div className="p-8 text-center">
                    <p className="text-red-400 text-sm mb-3">Hata: {pressError}</p>
                    <button onClick={loadPress} className="text-teal text-sm underline">Tekrar Dene</button>
                  </div>
                ) : press.length === 0 ? (
                  <div className="p-10 text-center text-white/30 text-sm">Henüz haber eklenmedi.</div>
                ) : (
                  <div className="divide-y divide-white/5">
                    {press.map(item => (
                      <div key={item.id} className="flex items-center justify-between px-5 py-4 hover:bg-white/3">
                        <div className="flex items-center gap-4 min-w-0">
                          {item.img && (
                            <img src={item.img} alt="" className="w-10 h-12 object-cover rounded-lg bg-white/5 shrink-0" />
                          )}
                          <div className="min-w-0">
                            <div className="text-white text-sm font-medium truncate">{item.baslik}</div>
                            <div className="text-teal text-xs mt-0.5">{item.kaynak} · {item.yil}</div>
                            {item.slug && (
                              <a href={`/basin/${item.slug}`} target="_blank" rel="noopener noreferrer"
                                className="text-white/20 text-[10px] font-mono hover:text-teal mt-0.5 inline-block">
                                /basin/{item.slug}
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 ml-4">
                          <button onClick={() => openEditPress(item)}
                            className="flex items-center gap-1.5 bg-white/10 hover:bg-teal/20 hover:text-teal text-white/60 px-3 py-1.5 rounded-lg text-xs font-bold transition-all">
                            <Pencil size={12} /> Düzenle
                          </button>
                          <button onClick={() => deletePress(item.id)}
                            className="p-1.5 text-white/30 hover:text-red-400 transition-colors">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
