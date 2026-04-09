"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Save, ExternalLink } from "lucide-react";

interface PressItem {
  id?: string; kaynak: string; yil: string; baslik: string; img: string;
  slug: string; icerik: string; seoTitle: string; seoDescription: string;
}

const emptyItem: PressItem = {
  kaynak: "", yil: new Date().getFullYear().toString(), baslik: "", img: "",
  slug: "", icerik: "", seoTitle: "", seoDescription: "",
};

const slugify = (text: string) =>
  text.toLowerCase().trim()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");

export default function AdminBasinPage() {
  const [items, setItems] = useState<PressItem[]>([]);
  const [form, setForm] = useState<PressItem>(emptyItem);
  const [saving, setSaving] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = () => fetch("/api/basin").then(r => r.json()).then(data => { if (Array.isArray(data)) setItems(data); });
  useEffect(() => { load(); }, []);

  const handleBaslikChange = (v: string) => {
    setForm(f => ({ ...f, baslik: v, slug: slugify(v), seoTitle: v }));
  };

  const handleAdd = async () => {
    if (!form.kaynak || !form.baslik) { alert("Kaynak ve başlık zorunludur."); return; }
    setSaving(true);
    await fetch("/api/basin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm(emptyItem);
    await load();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Silinsin mi?")) return;
    await fetch(`/api/basin/${id}`, { method: "DELETE" });
    await load();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-white/10 px-6 py-4 flex items-center gap-3">
        <Link href="/admin/dashboard" className="text-white/50 hover:text-white"><ArrowLeft size={20} /></Link>
        <h1 className="font-bold">Basın Yönetimi</h1>
      </header>

      <div className="max-w-4xl mx-auto p-6 space-y-8">

        {/* Yeni Ekle */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-bold mb-5 flex items-center gap-2"><Plus size={16} className="text-teal" /> Yeni Haber Ekle</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-white/40 text-xs uppercase tracking-widest block mb-1">Kaynak *</label>
              <input value={form.kaynak} onChange={e => setForm(f => ({ ...f, kaynak: e.target.value }))}
                placeholder="Yenigün, Merhaba..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal/50" />
            </div>
            <div>
              <label className="text-white/40 text-xs uppercase tracking-widest block mb-1">Yıl</label>
              <input value={form.yil} onChange={e => setForm(f => ({ ...f, yil: e.target.value }))}
                placeholder="2024"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal/50" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-white/40 text-xs uppercase tracking-widest block mb-1">Başlık *</label>
              <input value={form.baslik} onChange={e => handleBaslikChange(e.target.value)}
                placeholder="Haber başlığı"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal/50" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-white/40 text-xs uppercase tracking-widest block mb-1">Slug (URL)</label>
              <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-teal font-mono text-sm focus:outline-none focus:border-teal/50" />
              <p className="text-white/20 text-[10px] mt-1">/basin/{form.slug || "..."}</p>
            </div>
            <div className="sm:col-span-2">
              <label className="text-white/40 text-xs uppercase tracking-widest block mb-1">Görsel Yolu</label>
              <input value={form.img} onChange={e => setForm(f => ({ ...f, img: e.target.value }))}
                placeholder="/basin/gazete-01.webp"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal/50 font-mono text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-white/40 text-xs uppercase tracking-widest block mb-1">Haber İçeriği <span className="normal-case text-white/20">(detay sayfasında görünür)</span></label>
              <textarea value={form.icerik} onChange={e => setForm(f => ({ ...f, icerik: e.target.value }))}
                placeholder="Haberin detay içeriğini buraya yazın..."
                rows={6}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal/50 resize-y" />
            </div>

            {/* SEO */}
            <div>
              <label className="text-white/40 text-xs uppercase tracking-widest block mb-1">SEO Title</label>
              <input value={form.seoTitle} onChange={e => setForm(f => ({ ...f, seoTitle: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal/50 text-sm" />
              <p className={`text-[10px] mt-1 ${form.seoTitle.length > 60 ? "text-red-400" : "text-white/20"}`}>{form.seoTitle.length}/60</p>
            </div>
            <div>
              <label className="text-white/40 text-xs uppercase tracking-widest block mb-1">SEO Description</label>
              <input value={form.seoDescription} onChange={e => setForm(f => ({ ...f, seoDescription: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal/50 text-sm" />
              <p className={`text-[10px] mt-1 ${form.seoDescription.length > 160 ? "text-red-400" : "text-white/20"}`}>{form.seoDescription.length}/160</p>
            </div>

            {/* Google önizleme */}
            {(form.seoTitle || form.seoDescription) && (
              <div className="sm:col-span-2 bg-white rounded-xl p-3">
                <p className="text-[#1a0dab] text-sm font-medium">{form.seoTitle || form.baslik}</p>
                <p className="text-[#006621] text-[11px]">konyahacamat.net/basin/{form.slug}</p>
                <p className="text-[#545454] text-xs mt-1">{form.seoDescription}</p>
              </div>
            )}
          </div>
          <button onClick={handleAdd} disabled={saving}
            className="mt-5 flex items-center gap-2 bg-teal text-anthracite-dark px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:opacity-90 disabled:opacity-50">
            <Save size={14} /> {saving ? "Kaydediliyor..." : "Ekle"}
          </button>
        </div>

        {/* Liste */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-white font-bold">Mevcut Haberler ({items.length})</h2>
          </div>
          {items.length === 0 ? (
            <div className="p-8 text-center text-white/30 text-sm">Henüz haber eklenmedi.</div>
          ) : (
            <div className="divide-y divide-white/5">
              {items.map(item => (
                <div key={item.id}>
                  <div className="flex items-center justify-between px-5 py-4 hover:bg-white/3 cursor-pointer"
                    onClick={() => setExpanded(expanded === item.id ? null : item.id!)}>
                    <div className="flex items-center gap-4">
                      {item.img && <img src={item.img} alt="" className="w-12 h-16 object-cover rounded-lg bg-white/5 shrink-0" />}
                      <div>
                        <div className="text-white font-medium text-sm">{item.baslik}</div>
                        <div className="text-teal text-xs mt-0.5">{item.kaynak} · {item.yil}</div>
                        {item.slug && (
                          <a href={`/basin/${item.slug}`} target="_blank" rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="text-white/30 text-[10px] font-mono hover:text-teal flex items-center gap-1 mt-0.5">
                            /basin/{item.slug} <ExternalLink size={10} />
                          </a>
                        )}
                      </div>
                    </div>
                    <button onClick={e => { e.stopPropagation(); handleDelete(item.id!); }}
                      className="text-red-400/60 hover:text-red-400 transition-colors p-2">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  {expanded === item.id && item.icerik && (
                    <div className="px-5 pb-4 bg-white/3 border-t border-white/5">
                      <p className="text-white/50 text-sm leading-relaxed mt-3 whitespace-pre-wrap">{item.icerik}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
