"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText, Newspaper, Eye, LogOut, Plus, Pencil, Trash2,
  X, Check, TrendingUp, Image as ImageIcon, ExternalLink,
  RefreshCw, Globe, BarChart2, Users, Activity, AlertCircle,
} from "lucide-react";
import RichEditor from "@/components/RichEditor";

/* ─── Tipler ─── */
interface Post { id: string; title: string; slug: string; category: string; published: boolean; views?: number; }
interface PressItem { id: string; kaynak: string; yil: string; baslik: string; img: string; slug: string; icerik: string; seoTitle: string; seoDescription: string; }
interface GA4Country { code: string; name: string; sessions: number; }
interface GA4Page { path: string; views: number; }
interface GA4Summary { sessions: number; users: number; pageviews: number; bounceRate: number; }
interface GA4Data { configured: boolean; error?: string; countries?: GA4Country[]; pages?: GA4Page[]; summary?: GA4Summary; }

const emptyPress = (): Omit<PressItem, "id"> => ({
  kaynak: "", yil: new Date().getFullYear().toString(), baslik: "",
  img: "", slug: "", icerik: "", seoTitle: "", seoDescription: "",
});

const slugify = (t: string) =>
  t.toLowerCase().trim()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");

const flagEmoji = (code: string) => {
  if (!code || code.length !== 2) return "🌐";
  return code.toUpperCase().replace(/./g, c => String.fromCodePoint(c.charCodeAt(0) + 127397));
};

type Tab = "dashboard" | "blog" | "basin";
type PressMode = "list" | "add" | "edit";

/* ─── Bar Chart Bileşeni ─── */
function BarChart({ items, maxVal, colorClass = "bg-teal" }: {
  items: { label: string; value: number; sub?: string }[];
  maxVal: number;
  colorClass?: string;
}) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i}>
          <div className="flex justify-between items-center mb-1">
            <span className="text-white/70 text-xs truncate max-w-[70%]">{item.label}</span>
            <span className="text-white font-bold text-xs">{item.value.toLocaleString("tr")}{item.sub && <span className="text-white/30 font-normal"> {item.sub}</span>}</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className={`h-full ${colorClass} rounded-full transition-all duration-700`}
              style={{ width: maxVal > 0 ? `${(item.value / maxVal) * 100}%` : "0%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Ana Bileşen ─── */
export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [press, setPress] = useState<PressItem[]>([]);
  const [ga4, setGa4] = useState<GA4Data | null>(null);
  const [loadingBlog, setLoadingBlog] = useState(true);
  const [loadingPress, setLoadingPress] = useState(true);
  const [loadingGa4, setLoadingGa4] = useState(true);
  const [blogError, setBlogError] = useState("");
  const [pressError, setPressError] = useState("");
  const [tab, setTab] = useState<Tab>("dashboard");
  const [pressMode, setPressMode] = useState<PressMode>("list");
  const [pressForm, setPressForm] = useState(emptyPress());
  const [pressEditId, setPressEditId] = useState<string | null>(null);
  const [pressSaving, setPressSaving] = useState(false);

  const loadBlogs = async () => {
    setLoadingBlog(true); setBlogError("");
    try {
      const r = await fetch("/api/blog");
      const d = await r.json();
      if (Array.isArray(d)) setPosts(d); else setBlogError(d.error ?? "Hata");
    } catch (e) { setBlogError(String(e)); }
    setLoadingBlog(false);
  };
  const loadPress = async () => {
    setLoadingPress(true); setPressError("");
    try {
      const r = await fetch("/api/basin");
      const d = await r.json();
      if (Array.isArray(d)) setPress(d); else setPressError(d.error ?? "Hata");
    } catch (e) { setPressError(String(e)); }
    setLoadingPress(false);
  };
  const loadGa4 = async () => {
    setLoadingGa4(true);
    try {
      const r = await fetch("/api/admin/ga4");
      setGa4(await r.json());
    } catch { setGa4({ configured: false }); }
    setLoadingGa4(false);
  };

  useEffect(() => { loadBlogs(); loadPress(); loadGa4(); }, []);

  const deletePost = async (id: string) => {
    if (!confirm("Bu blog yazısı silinsin mi?")) return;
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    loadBlogs();
  };
  const setPressField = (key: keyof typeof pressForm, val: string) => {
    if (key === "baslik") setPressForm(f => ({ ...f, baslik: val, slug: slugify(val), seoTitle: val }));
    else setPressForm(f => ({ ...f, [key]: val }));
  };
  const openAddPress = () => { setPressForm(emptyPress()); setPressEditId(null); setPressMode("add"); };
  const openEditPress = (item: PressItem) => { const { id, ...rest } = item; setPressForm(rest); setPressEditId(id); setPressMode("edit"); };
  const cancelPress = () => { setPressMode("list"); setPressForm(emptyPress()); setPressEditId(null); };
  const savePress = async () => {
    if (!pressForm.kaynak.trim() || !pressForm.baslik.trim()) { alert("Kaynak ve Başlık zorunludur."); return; }
    setPressSaving(true);
    try {
      const url = pressMode === "edit" && pressEditId ? `/api/basin/${pressEditId}` : "/api/basin";
      const method = pressMode === "edit" ? "PUT" : "POST";
      const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(pressForm) });
      if (!r.ok) { const d = await r.json(); alert("Hata: " + (d.error ?? r.status)); setPressSaving(false); return; }
      await loadPress(); cancelPress();
    } catch (e) { alert("Başarısız: " + String(e)); }
    setPressSaving(false);
  };
  const deletePress = async (id: string) => {
    if (!confirm("Silinsin mi?")) return;
    await fetch(`/api/basin/${id}`, { method: "DELETE" });
    loadPress();
  };
  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  const totalViews = posts.reduce((a, p) => a + (p.views ?? 0), 0);
  const published = posts.filter(p => p.published).length;
  const topBlogs = [...posts].sort((a, b) => (b.views ?? 0) - (a.views ?? 0)).slice(0, 8);
  const maxViews = topBlogs[0]?.views ?? 1;

  const navItems: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: "dashboard", label: "Dashboard", icon: BarChart2 },
    { key: "blog", label: "Blog Yazıları", icon: FileText },
    { key: "basin", label: "Basın Haberleri", icon: Newspaper },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-white flex">

      {/* ── SIDEBAR ── */}
      <aside className="w-56 border-r border-white/5 hidden lg:flex flex-col p-5 shrink-0 bg-black/40">
        <div className="mb-8">
          <div className="text-white font-black text-xl tracking-tight">Eb<span className="text-teal">Panel</span></div>
          <div className="text-white/20 text-[10px] uppercase tracking-widest mt-0.5">konyahacamat.net</div>
        </div>
        <nav className="space-y-1 flex-1">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => setTab(key)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all text-left ${
                tab === key ? "bg-teal/15 text-teal" : "text-white/40 hover:text-white hover:bg-white/5"
              }`}>
              <Icon size={16} /> {label}
            </button>
          ))}
          <Link href="/admin/medya"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-white/40 hover:text-white hover:bg-white/5 transition-all">
            <ImageIcon size={16} /> Medya
          </Link>
        </nav>
        <div className="space-y-1 pt-4 border-t border-white/5">
          <Link href="/" target="_blank"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/30 hover:text-white hover:bg-white/5 transition-all">
            <ExternalLink size={15} /> Siteyi Gör
          </Link>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400/50 hover:text-red-400 hover:bg-red-400/5 transition-all font-bold">
            <LogOut size={16} /> Çıkış
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="flex-1 overflow-y-auto">
        <header className="border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 bg-[#080808]/95 backdrop-blur z-10">
          <div className="flex items-center gap-3">
            <span className="font-black text-base">Admin Paneli</span>
          </div>
          {/* Mobil sekmeler */}
          <div className="flex lg:hidden gap-1.5">
            {navItems.map(n => (
              <button key={n.key} onClick={() => setTab(n.key)}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all ${tab === n.key ? "bg-teal text-black" : "bg-white/10 text-white/50"}`}>
                {n.label.split(" ")[0]}
              </button>
            ))}
          </div>
          <button onClick={handleLogout} className="hidden lg:flex items-center gap-2 text-white/30 hover:text-white text-sm transition-colors">
            <LogOut size={15} />
          </button>
        </header>

        <div className="p-6 max-w-6xl mx-auto space-y-6">

          {/* ── İSTATİSTİK KARTLARI ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Blog Yazısı", value: posts.length, icon: FileText, color: "text-blue-400" },
              { label: "Yayında", value: published, icon: TrendingUp, color: "text-green-400" },
              { label: "Basın Haberi", value: press.length, icon: Newspaper, color: "text-purple-400" },
              { label: "Toplam Görüntüleme", value: totalViews.toLocaleString("tr"), icon: Eye, color: "text-teal" },
            ].map(s => (
              <div key={s.label} className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-5 hover:border-white/15 transition-colors">
                <s.icon size={18} className={`${s.color} mb-3 opacity-80`} />
                <div className="text-2xl font-black text-white">{s.value}</div>
                <div className="text-white/30 text-[10px] uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* ══ DASHBOARD SEKMESİ ══ */}
          {tab === "dashboard" && (
            <div className="space-y-5">

              {/* GA4 Özet + Blog İstatistikleri */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                {/* En Çok Okunan Bloglar */}
                <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-bold flex items-center gap-2 text-sm"><Eye size={15} className="text-teal" /> En Çok Okunan</h3>
                    <button onClick={loadBlogs} className="text-white/20 hover:text-white transition-colors"><RefreshCw size={13} /></button>
                  </div>
                  {loadingBlog ? (
                    <div className="text-white/20 text-sm text-center py-6">Yükleniyor...</div>
                  ) : topBlogs.length === 0 ? (
                    <div className="text-white/20 text-sm text-center py-6">Veri yok</div>
                  ) : (
                    <BarChart
                      items={topBlogs.map(p => ({ label: p.title, value: p.views ?? 0, sub: "görüntüleme" }))}
                      maxVal={maxViews}
                    />
                  )}
                </div>

                {/* GA4 Özet */}
                {loadingGa4 ? (
                  <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-5 flex items-center justify-center text-white/20 text-sm">
                    GA4 yükleniyor...
                  </div>
                ) : !ga4?.configured ? (
                  <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle size={16} className="text-amber-400" />
                      <h3 className="font-bold text-amber-400 text-sm">Google Analytics bağlanamadı</h3>
                    </div>
                    {ga4?.error && (
                      <div className="bg-black/30 rounded-xl p-3 mb-4">
                        <p className="text-red-300 text-[11px] font-mono break-all">{ga4.error}</p>
                      </div>
                    )}
                    <div className="space-y-1.5 text-[11px]">
                      <p className="text-white/30 font-bold uppercase tracking-widest mb-2">Yapılması gerekenler:</p>
                      <p className="text-white/50">1. <span className="text-amber-300">analytics.google.com</span> → Admin → Property Access Management</p>
                      <p className="text-white/50">2. <span className="text-amber-300">ga4-monitor@cagkon-ecommerce.iam.gserviceaccount.com</span> → Viewer ekle</p>
                      <p className="text-white/50">3. Vercel&apos;de Redeploy yap</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="font-bold flex items-center gap-2 text-sm"><Activity size={15} className="text-green-400" /> Son 30 Gün — GA4</h3>
                      <span className="text-green-400 text-[10px] font-bold uppercase tracking-widest">Canlı</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      {[
                        { label: "Oturum", value: ga4.summary?.sessions.toLocaleString("tr") ?? "—", icon: Activity },
                        { label: "Kullanıcı", value: ga4.summary?.users.toLocaleString("tr") ?? "—", icon: Users },
                        { label: "Sayfa Görüntüleme", value: ga4.summary?.pageviews.toLocaleString("tr") ?? "—", icon: Eye },
                        { label: "Hemen Çıkma", value: ga4.summary ? `%${(ga4.summary.bounceRate * 100).toFixed(1)}` : "—", icon: TrendingUp },
                      ].map(s => (
                        <div key={s.label} className="bg-white/5 rounded-xl p-3">
                          <s.icon size={13} className="text-white/30 mb-1.5" />
                          <div className="text-lg font-black">{s.value}</div>
                          <div className="text-white/30 text-[10px]">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* GA4: Ülkeler + En Çok Ziyaret Edilen Sayfalar */}
              {ga4?.configured && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {/* Ülkeler */}
                  <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-5">
                    <h3 className="font-bold flex items-center gap-2 text-sm mb-5"><Globe size={15} className="text-blue-400" /> Ülkeler — Son 30 Gün</h3>
                    {(ga4.countries?.length ?? 0) === 0 ? (
                      <div className="text-white/20 text-sm text-center py-6">Veri yok</div>
                    ) : (
                      <div className="space-y-3">
                        {ga4.countries!.map(c => {
                          const max = ga4.countries![0].sessions;
                          const pct = max > 0 ? (c.sessions / max) * 100 : 0;
                          return (
                            <div key={c.code}>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-white/70 text-xs flex items-center gap-2">
                                  <span className="text-base">{flagEmoji(c.code)}</span>
                                  {c.name}
                                </span>
                                <span className="text-white font-bold text-xs">{c.sessions.toLocaleString("tr")}</span>
                              </div>
                              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-400 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* En Çok Ziyaret Edilen Sayfalar */}
                  <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-5">
                    <h3 className="font-bold flex items-center gap-2 text-sm mb-5"><BarChart2 size={15} className="text-purple-400" /> En Çok Ziyaret Edilen</h3>
                    {(ga4.pages?.length ?? 0) === 0 ? (
                      <div className="text-white/20 text-sm text-center py-6">Veri yok</div>
                    ) : (
                      <BarChart
                        items={ga4.pages!.map(p => ({ label: p.path, value: p.views, sub: "görüntüleme" }))}
                        maxVal={ga4.pages![0].views}
                        colorClass="bg-purple-400"
                      />
                    )}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ══ BLOG SEKMESİ ══ */}
          {tab === "blog" && (
            <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <h2 className="font-bold">Blog Yazıları</h2>
                  <button onClick={loadBlogs} className="text-white/20 hover:text-white transition-colors"><RefreshCw size={13} /></button>
                </div>
                <Link href="/admin/blog/new"
                  className="flex items-center gap-2 bg-teal text-black px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest hover:opacity-90">
                  <Plus size={13} /> Yeni Yazı
                </Link>
              </div>
              {loadingBlog ? (
                <div className="p-10 text-center text-white/20 text-sm">Yükleniyor...</div>
              ) : blogError ? (
                <div className="p-8 text-center">
                  <p className="text-red-400 text-sm mb-3">Hata: {blogError}</p>
                  <button onClick={loadBlogs} className="text-teal text-sm underline">Tekrar Dene</button>
                </div>
              ) : posts.length === 0 ? (
                <div className="p-10 text-center text-white/20 text-sm">Henüz blog yazısı yok.</div>
              ) : (
                <div className="divide-y divide-white/[0.04]">
                  {posts.map(p => (
                    <div key={p.id} className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02]">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${p.published ? "bg-green-400" : "bg-white/15"}`} />
                        <div className="min-w-0">
                          <div className="text-white text-sm font-medium truncate">{p.title}</div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-white/20 text-[10px] font-mono">/{p.slug}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${p.published ? "bg-green-400/10 text-green-400" : "bg-white/10 text-white/30"}`}>
                              {p.published ? "Yayında" : "Taslak"}
                            </span>
                            <span className="text-white/20 text-[10px] hidden sm:flex items-center gap-1"><Eye size={10} /> {p.views ?? 0}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-4">
                        <Link href={`/admin/blog/${p.id}`}
                          className="flex items-center gap-1.5 bg-white/5 hover:bg-teal/20 hover:text-teal text-white/50 px-3 py-1.5 rounded-lg text-xs font-bold transition-all">
                          <Pencil size={12} /> Düzenle
                        </Link>
                        <button onClick={() => deletePost(p.id)}
                          className="p-1.5 text-white/20 hover:text-red-400 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ══ BASIN SEKMESİ ══ */}
          {tab === "basin" && (
            <div className="space-y-5">
              {/* Form */}
              {pressMode !== "list" && (
                <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-bold">{pressMode === "add" ? "Yeni Haber Ekle" : "Haberi Düzenle"}</h2>
                    <button onClick={cancelPress} className="text-white/30 hover:text-white transition-colors"><X size={20} /></button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "Kaynak *", key: "kaynak" as const, placeholder: "Yenigün, TRT..." },
                      { label: "Yıl", key: "yil" as const, placeholder: "2024" },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="text-white/30 text-[10px] uppercase tracking-widest block mb-1">{f.label}</label>
                        <input value={pressForm[f.key]} onChange={e => setPressField(f.key, e.target.value)} placeholder={f.placeholder}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal/50" />
                      </div>
                    ))}
                    <div className="sm:col-span-2">
                      <label className="text-white/30 text-[10px] uppercase tracking-widest block mb-1">Başlık *</label>
                      <input value={pressForm.baslik} onChange={e => setPressField("baslik", e.target.value)} placeholder="Haber başlığı"
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
                      <input value={pressForm.img} onChange={e => setPressField("img", e.target.value)} placeholder="/basin/gazete-01.webp"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-teal/50" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-white/30 text-[10px] uppercase tracking-widest block mb-1">İçerik</label>
                      <RichEditor
                        value={pressForm.icerik}
                        onChange={v => setPressField("icerik", v)}
                        folder="basin"
                        placeholder="Haberin detayını buraya yazın..."
                      />
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
                    <button onClick={cancelPress} className="flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/15">
                      İptal
                    </button>
                  </div>
                </div>
              )}

              <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <h2 className="font-bold">Basın Haberleri</h2>
                    <button onClick={loadPress} className="text-white/20 hover:text-white transition-colors"><RefreshCw size={13} /></button>
                  </div>
                  {pressMode === "list" && (
                    <button onClick={openAddPress}
                      className="flex items-center gap-2 bg-teal text-black px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest hover:opacity-90">
                      <Plus size={13} /> Haber Ekle
                    </button>
                  )}
                </div>
                {loadingPress ? (
                  <div className="p-10 text-center text-white/20 text-sm">Yükleniyor...</div>
                ) : pressError ? (
                  <div className="p-8 text-center">
                    <p className="text-red-400 text-sm mb-3">Hata: {pressError}</p>
                    <button onClick={loadPress} className="text-teal text-sm underline">Tekrar Dene</button>
                  </div>
                ) : press.length === 0 ? (
                  <div className="p-10 text-center text-white/20 text-sm">Henüz haber eklenmedi.</div>
                ) : (
                  <div className="divide-y divide-white/[0.04]">
                    {press.map(item => (
                      <div key={item.id} className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02]">
                        <div className="flex items-center gap-4 min-w-0">
                          {item.img && <img src={item.img} alt="" className="w-10 h-12 object-cover rounded-lg bg-white/5 shrink-0" />}
                          <div className="min-w-0">
                            <div className="text-white text-sm font-medium truncate">{item.baslik}</div>
                            <div className="text-teal text-xs mt-0.5">{item.kaynak} · {item.yil}</div>
                            {item.slug && (
                              <a href={`/basin/${item.slug}`} target="_blank" rel="noopener noreferrer"
                                className="text-white/20 text-[10px] font-mono hover:text-teal mt-0.5 inline-flex items-center gap-1">
                                /basin/{item.slug} <ExternalLink size={9} />
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 ml-4">
                          <button onClick={() => openEditPress(item)}
                            className="flex items-center gap-1.5 bg-white/5 hover:bg-teal/20 hover:text-teal text-white/50 px-3 py-1.5 rounded-lg text-xs font-bold transition-all">
                            <Pencil size={12} /> Düzenle
                          </button>
                          <button onClick={() => deletePress(item.id)}
                            className="p-1.5 text-white/20 hover:text-red-400 transition-colors">
                            <Trash2 size={14} />
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
