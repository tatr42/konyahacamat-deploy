"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { PressItem } from "./types";
import { BasinForm } from "./components/BasinForm";
import { BasinList } from "./components/BasinList";

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
          <Link href="/admin" title="Admin Panele Dön" className="text-white/50 hover:text-white transition-colors">
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

        {mode !== "list" && (
          <BasinForm
            mode={mode}
            form={form}
            set={set}
            saving={saving}
            handleSave={handleSave}
            cancel={cancel}
          />
        )}

        <BasinList
          items={items}
          loading={loading}
          openEdit={openEdit}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}
