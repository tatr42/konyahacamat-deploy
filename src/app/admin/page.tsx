"use client";
import { useState, useEffect } from "react";
// Buraya kendi kullandığın diğer bileşenleri (Sidebar, Stats vb.) ekle

export default function AdminPage() {
  // Buraya eski kodundaki State'leri ve Fonksiyonları geri koy
  return (
    <div className="min-h-screen bg-anthracite-dark p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
          <h1 className="text-2xl font-black text-white uppercase tracking-tighter">
            Ebusadullah <span className="text-teal">Panel</span>
          </h1>
          <button className="bg-white/5 hover:bg-white/10 text-white/50 px-4 py-2 rounded-xl text-xs transition-all">
            Güvenli Çıkış
          </button>
        </header>

        {/* Buraya eski Dashboard içeriğini (Randevular, Blog Yönetimi vb.) ekle */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
            <h3 className="text-white/50 text-xs font-bold uppercase mb-2">Toplam Randevu</h3>
            <p className="text-3xl font-black text-teal">--</p>
          </div>
        </div>
      </div>
    </div>
  );
}