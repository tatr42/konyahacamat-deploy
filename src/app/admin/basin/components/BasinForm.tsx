import { PressItem } from "../types";
import { X, Check } from "lucide-react";

interface BasinFormProps {
  mode: "add" | "edit";
  form: Omit<PressItem, "id">;
  set: (key: keyof Omit<PressItem, "id">, val: string) => void;
  saving: boolean;
  handleSave: () => void;
  cancel: () => void;
}

export function BasinForm({ mode, form, set, saving, handleSave, cancel }: BasinFormProps) {
  return (
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
  );
}
