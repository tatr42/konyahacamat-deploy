"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Eye, EyeOff, LogIn } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error ?? "Hatalı şifre");
        setPassword("");
      }
    } catch {
      setError("Bağlantı hatası. Tekrar deneyin.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl overflow-hidden mb-4 border border-white/10">
            <Image src="/fav.webp" alt="Logo" width={64} height={64} className="w-full h-full object-contain" />
          </div>
          <h1 className="text-white font-black text-xl tracking-tight">
            Eb<span className="text-teal">Panel</span>
          </h1>
          <p className="text-white/30 text-xs mt-1 uppercase tracking-widest">konyahacamat.net</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white/[0.04] border border-white/[0.08] rounded-3xl p-8 space-y-5">
          <div>
            <label className="text-white/40 text-[10px] uppercase tracking-widest block mb-2">
              <Lock size={11} className="inline mr-1.5 mb-0.5" />Yönetici Şifresi
            </label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={e => { setPassword(e.target.value); setError(""); }}
                placeholder="••••••••••••"
                autoFocus
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white pr-12 focus:outline-none focus:border-teal/50 transition-colors placeholder:text-white/20"
              />
              <button
                type="button"
                onClick={() => setShow(s => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
              >
                {show ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            {error && (
              <p className="text-red-400 text-xs mt-2 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !password.trim()}
            className="w-full flex items-center justify-center gap-2 bg-teal text-black py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest hover:opacity-90 disabled:opacity-40 transition-all active:scale-95"
          >
            <LogIn size={16} />
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        <p className="text-center text-white/15 text-[10px] mt-6 uppercase tracking-widest">
          Ebusadullah Hacamat & Akademi
        </p>
      </div>
    </div>
  );
}
