"use client";
import { useState, useEffect } from 'react';
import { MessageCircle, X, Send, CheckCheck } from 'lucide-react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPulse, setShowPulse] = useState(true);

  // İlk açılışta dikkat çekmek için küçük bir gecikme ile pulse efekti
  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = () => {
    const phone = "905544062383";
    const text = "Merhaba Ebusadullah Hocam, konyahacamat.net üzerinden ulaşıyorum. Randevu ve eğitimler hakkında bilgi alabilir miyim?";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed bottom-[88px] lg:bottom-6 right-6 z-[999]">
      {/* WhatsApp Paneli - absolute konumlu, buton alanını etkilemez */}
      <div className={`absolute bottom-[80px] right-0 transition-all duration-500 ease-in-out transform ${
        isOpen ? 'scale-100 opacity-100 translate-y-0 pointer-events-auto' : 'scale-95 opacity-0 translate-y-4 pointer-events-none'
      } bg-anthracite-dark rounded-[2rem] shadow-2xl w-[320px] overflow-hidden border border-white/10`}>
        
        {/* Header */}
        <div className="bg-teal p-6 text-anthracite-dark relative">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-anthracite-dark/10 flex items-center justify-center border border-anthracite-dark/20 font-display font-bold text-xl">
                E
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] rounded-full border-2 border-teal animate-pulse"></span>
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-tight">Ebusadullah Destek</h3>
              <div className="flex items-center gap-1 opacity-80">
                <span className="text-[10px] font-bold">Çevrimiçi</span>
                <CheckCheck size={12} />
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="absolute top-4 right-4 hover:bg-black/10 p-2 rounded-full transition-colors"
          >
            <X size={20}/>
          </button>
        </div>

        {/* Mesaj Alanı */}
        <div className="p-6 space-y-4">
          <div className="bg-white/5 rounded-2xl rounded-tl-none p-4 border border-white/5">
            <p className="text-sm text-text-muted leading-relaxed">
              Selamun Aleyküm, <br />
              <b>Ebusadullah Akademi</b>'ye hoş geldiniz. Şifa ve eğitim süreçleri için direkt mesaj atabilirsiniz.
            </p>
          </div>
          
          <button 
            onClick={sendMessage}
            className="w-full bg-[#25D366] hover:bg-[#1da851] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-lg shadow-[#25D366]/20 active:scale-95"
          >
            <Send size={18} fill="currentColor" />
            WHATSAPP'TAN YAZIN
          </button>
          
          <p className="text-[10px] text-center text-text-muted/40 uppercase tracking-widest font-medium">
            Ortalama yanıt süresi: 5 dakika
          </p>
        </div>
      </div>

      {/* Ana Buton */}
      <div className="relative">
        {!isOpen && showPulse && (
          <div className="absolute bottom-full right-0 mb-3 bg-white text-anthracite-dark px-4 py-2 rounded-2xl shadow-xl text-xs font-bold animate-bounce border border-teal/20 whitespace-nowrap">
            Size nasıl yardımcı olabilirim?
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white rotate-45 border-r border-b border-teal/10"></div>
          </div>
        )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'WhatsApp penceresini kapat' : 'WhatsApp ile iletişime geç'}
        aria-expanded={isOpen}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform active:scale-90 ${
          isOpen ? 'bg-anthracite border border-white/10 text-white rotate-90' : 'bg-[#25D366] text-white hover:scale-110'
        }`}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={32} fill="currentColor" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-teal rounded-full border-4 border-anthracite-dark animate-ping"></span>
        )}
      </button>
      </div>
    </div>
  );
}