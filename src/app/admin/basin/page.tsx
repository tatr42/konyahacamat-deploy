"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Pencil, X, Check } from "lucide-react";

interface PressItem {
  id: string;
  kaynak: string;
  yil: string;
  baslik: string;
  img: string;
  slug: string;
  icerik: string;
  seoTitle: string;
  seoDescription: string;
}

const empty = (): Omit<PressItem, "id"> => ({
  kaynak: "",
  yil: new Date().getFullYear().toString(),
  baslik: "",
  img: "",
  slug: "",
  icerik: "",
  seoTitle: "",
  seoDescription: "",
});

const slugify = (t: string) =>
  t.toLowerCase().trim()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");

type Mode = "list" | "add" | "edit";

export default function AdminBasinPage() {
  const [items, setItems] = useState<PressItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<Mode>("list");
  const [form, setForm] = useState(empty());
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const r = await fetch("/api/basin");
    const data = await r.json();
    if (Array.isArray(data)) setItems(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const set = (key: keyof typeof form, val: string) => {
    if (key === "baslik") {
      setForm(f => ({ ...f, baslik: val, slug: slugify(val), seoTitle: val }));
    } else {
      setForm(f => ({ ...f, [key]: val }));
    }
  };

  const openAdd = () => { setForm(empty()); setEditId(null); setMode("add"); };
  const openEdit = (item: PressItem) => {
    const { id, ...rest } = item;
    setForm(rest);
    setEditId(id);
    setMode("edit");
  };
  const cancel = () => { setMode("list"); setForm(empty()); setEditId(null); };

  const handleSave = async () => {
    if (!form.kaynak.trim() || !form.baslik.trim()) {
      alert("Kaynak ve Başlık zorunludur.");
      return;
    }
    setSaving(true);
    try {
      if (mode === "add") {
        await fetch("/api/basin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else if (mode === "edit" && editId) {
        await fetch(`/api/basin/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      await load();
      cancel();
    } catch {
      alert("Kaydetme başarısız. Konsolu kontrol edin.");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu haber silinsin mi?")) return;
    await fetch(`/api/basin/${id}`, { method: "DELETE" });
    await load();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-white/50 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-bold text-lg">Basın Yönetimi</h1>
          <span className="text-white/30 text-sm">({items.length} haber)</span>
        </div>
        {mode === "list" && (
          <button onClick={openAdd}
            className="flex items-center gap-2 bg-teal text-black px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest hover:opacity-90">
            <Plus size={14} /> Haber Ekle
          </button>
        )}
      </header>

      <div className="max-w-4xl mx-auto p-6">

        {/* FORM: Ekle veya Düzenle */}
        {mode !== "list" && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-white">{mode === "add" ? "Yeni Haber Ekle" : "Haberi Düzenle"}</h2>
              <button onClick={cancel} className="text-white/40 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-white/40 text-xs uppercase tracking-widest block mb-1">Kaynak *</label>
                <input value={form.kaynak} onChange={e => set("kaynak", e.target.value)}
                  placeholder="Yenigün, Merhaba, TRT..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal/50" />
              </div>
              <div>
                <label className="text-white/40 text-xs uppercase tracking-widest block mb-1">Yıl</label>
                <input value={form.yil} onChange={e => set("yil", e.target.value)}
                  placeholder="2024"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal/50" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-white/40 text-xs uppercase tracking-widest block mb-1">Başlık *</label>
                <input value={form.baslik} onChange={e => set("baslik", e.target.value)}
                  placeholder="Haber başlığı"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal/50" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-white/40 text-xs uppercase tracking-widest block mb-1">Slug (URL)</label>
                <input value={form.slug} onChange={e => set("slug", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-teal font-mono text-sm focus:outline-none focus:border-teal/50" />
                <p className="text-white/20 text-[10px] mt-1">/basin/{form.slug || "..."}</p>
              </div>
              <div className="sm:col-span-2">
                <label className="text-white/40 text-xs uppercase tracking-widest block mb-1">Görsel Yolu</label>
                <input value={form.img} onChange={e => set("img", e.target.value)}
                  placeholder="/basin/gazete-01.webp"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-teal/50" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-white/40 text-xs uppercase tracking-widest block mb-1">İçerik</label>
                <textarea value={form.icerik} onChange={e => set("icerik", e.target.value)}
                  placeholder="Haberin detayını buraya yazın..."
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal/50 resize-y" />
              </div>
              <div>
                <label className="text-white/40 text-xs uppercase tracking-widest block mb-1">SEO Başlık</label>
                <input value={form.seoTitle} onChange={e => set("seoTitle", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal/50" />
                <p className={`text-[10px] mt-1 ${form.seoTitle.length > 60 ? "text-red-400" : "text-white/20"}`}>{form.seoTitle.length}/60</p>
              </div>
              <div>
                <label className="text-white/40 text-xs uppercase tracking-widest block mb-1">SEO Açıklama</label>
                <input value={form.seoDescription} onChange={e => set("seoDescription", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal/50" />
                <p className={`text-[10px] mt-1 ${form.seoDescription.length > 160 ? "text-red-400" : "text-white/20"}`}>{form.seoDescription.length}/160</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} disabled={saving}
                className="flex items-center gap-2 bg-teal text-black px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:opacity-90 disabled:opacity-50">
                <Check size={16} /> {saving ? "Kaydediliyor..." : mode === "add" ? "Ekle" : "Kaydet"}
              </button>
              <button onClick={cancel}
                className="flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/15">
                İptal
              </button>
            </div>
          </div>
        )}

        {/* LİSTE */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-white font-bold">Haberler</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center text-white/30 text-sm">Yükleniyor...</div>
          ) : items.length === 0 ? (
            <div className="p-8 text-center text-white/30 text-sm">Henüz haber eklenmedi.</div>
          ) : (
            <div className="divide-y divide-white/5">
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between px-5 py-4 hover:bg-white/3">
                  <div className="flex items-center gap-4 min-w-0">
                    {item.img && (
                      <img src={item.img} alt="" className="w-12 h-14 object-cover rounded-lg bg-white/5 shrink-0" />
                    )}
                    <div className="min-w-0">
                      <div className="text-white font-medium text-sm truncate">{item.baslik}</div>
                      <div className="text-teal text-xs mt-0.5">{item.kaynak} · {item.yil}</div>
                      {item.slug && (
                        <a href={`/basin/${item.slug}`} target="_blank" rel="nofollow noopener noreferrer"
                          className="text-white/30 text-[10px] font-mono hover:text-teal mt-0.5 inline-block">
                          /basin/{item.slug}
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-4">
                    <button onClick={() => openEdit(item)}
                      className="text-white/40 hover:text-teal transition-colors p-2">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(item.id)}
                      className="text-white/40 hover:text-red-400 transition-colors p-2">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
