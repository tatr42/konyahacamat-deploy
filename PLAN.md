# PLAN.md — Konyahacamat.net İyileştirme Yol Haritası ve Stratejik SEO Rehberi

Bu doküman, sitedeki teknik borçları, yasal riskleri, SEO eksikliklerini ve UX/UI iyileştirmelerini kapsayan önceliklendirilmiş eylem planı ile **Uzun Soluklu SEO & İçerik Stratejisi Rehberi**ni içermektedir.

---

## 🟢 STRATEJİK REHBER: SSS & SEO / MİMARİ MANTIĞI

### 1. Kodda Ne Eksik & Ağırlık Yapan Kodlar Nelerdir?
* **Statik Pre-rendering (SSG) Eksikliği:** Blog detay sayfaları dynamic rendering modunda çalışıyordu. `generateStaticParams` ile derleme anında oluşturulmalı.
* **Görsel Optimizasyonu (`sizes` & `priority`):** Resimlerin responsive boyutlandırılması için `sizes` niteliği eksik olan `<Image>` bileşenleri düzenlenmeli.
* **Erişilebilirlik & Link Yapısı:** Dahili bağlantılarda düz `<a>` yerine Next.js `<Link>` kullanılmalı; mobil menüde `aria-expanded` gibi a11y standartları tamamlanmalı.
* **Ağırlık Yapan Unsurlar:** Kullanılmayan scriptler, üçüncü parti ağır JS kütüphaneleri (örn. ağır analytics veya kütüphane kalıntıları). Next.js SSG + Tailwind CSS 4 ile minimal JS bundle boyutu hedeflenmelidir.

### 2. 2 Site Birbirini Aramada Nasıl Geri Çekmez? (Kanibalizasyon & Çifte Domain Önleme)
Eğer aynı hizmet/sektör için 2 farklı siteniz varsa (ör. *konyahacamat.net* ve başka bir domain):
1. **İçerik Birebir Aynı Olmamalı (Duplicate Content):** İki sitede asla aynı paragrafı veya makaleyi yayınlamayın. Yapay zeka ile bile olsa sadece kelime değiştirilmiş kopyalar Google tarafından tespit edilir.
2. **Farklı Niş / Hedefleme Yapın:**
   - **Site A (Örn: konyahacamat.net):** Konya yerel hacamat ve sülük hizmeti, fiziksel konum ve randevu odaklı.
   - **Site B:** Türkiye geneli hacamat eğitimi, kurs, sülük ve malzeme satışı veya e-ticaret odaklı.
3. **Canonical ve Cross-Domain Etiketleri:** Sitedeki bir sayfa diğer siteden alıntı yapıyorsa veya ana kaynak diğeri ise `canonical` URL belirleyin.
4. **Çapraz Bağlantı (Backlink) Spam'inden Kaçının:** İki site arasında sürekli footer/header'dan karşılıklı (reciprocal) link vermek spam algılanır. Yalnızca mantıklı context (içerik içi) yönlendirmeler yapın.

### 3. Yapay Zeka (AI) İçeriklerinin Anlaşılmaması ve Öne Çıkması (GEO / Helpful Content)
Google'ın son güncellemeleri (Helpful Content Update & E-E-A-T) yapay zeka tarafından yazılmış jenerik metinleri (sıfatlarla dolu, somut bilgi içermeyen) geriye itmektedir:
* **Information Gain (Bilgi Kazanımı):** Sadece İnternet'teki bilgiyi özetleyen AI metinleri değer kaybetmektedir. Metinlere **özgün deneyim, gerçek klinik gözlem, uygulama püf noktaları ve uzman görüşü** eklenmelidir.
* **Uzman İmzası & Şeffaflık:** Blog ve içerik sayfalarında uygulayıcının özgeçmişi (Author Box), kaynaklar ve yasal uyarılar (Medical Disclaimer) yer almalıdır.
* **Kısa Cevap / AI Özet Blokları (GEO):** ChatGPT / Perplexity / Google AI Overviews yanıtlarında öne çıkmak için makale başlarına 40–50 kelimelik net "Kısa Cevap" kutuları eklenmelidir.

### 4. Eklenmesi Gereken İçerikler
* **Sık Sorulan Sorular (Detaylı FAQ):** Sülük ve hacamat öncesi/sonrası dikkat edilecekler.
* **Şikayet & Semptom Odaklı Rehberler:** Yasal çerçevede (tanı koymadan, "şikayetlere destek" diliyle) hazırlanan rehberler.
* **Uygulama Videoları ve Özgün Fotoğraflar:** Stok fotoğraflar yerine gerçek seans/ekipman görselleri.

---

## 📅 SPRINT PLANLARI VE UYGULAMA DURUMU

**Durum işaretleri:** `[ ]` bekliyor · `[x]` tamam · `[!]` **dış veri bekliyor (bloke)**

### Sprint 1: Kritik Kırıklar ve Güvenlik / Şema Temelleri
- [x] **6. İşletme sabitleri tek kaynak (`src/lib/business.ts`)**
- [x] **3. Çift WhatsApp widget kaldırıldı**
- [x] **7. Footer nofollow düzeltildi**
- [x] **4. JSON-LD mutlak URL'ler sağlandı**
- [x] **5. Root şema birleştirildi (`MedicalBusiness`)**
- [x] **2. Blog tipografisi düzenlendi (`globals.css`)**
- [x] **9b. Vercel Analytics aktif edildi**
- [x] **1. `/kvkk` sayfası yazıldı**
- [x] **8. Geo koordinatları Google Maps pin'ine göre güncellendi**

### Sprint 2: Yasal / Kalite Riskleri ve İçerik Revizyonu
- [x] **1. Hastalık listesi → Şikayet listesine dönüştürüldü**
- [x] **2. Müşteri yorumları YMYL kurallarına göre düzenlendi**
- [ ] **3. Galeri sayfası gerçek görsellerle doldurulacak**
- [ ] **4. `llms.txt` dinamik route olarak güncellenecek**

### Sprint 3: Görsel Varlık Üretimi & Optimizasyon
- [ ] **1. Stok görseller gerçek seans fotoğrafları ile değiştirilecek**
- [x] **2. Dinamik OG kart üretimi (`src/app/og/route.tsx`) eklendi**
- [ ] **3. `<Image>` `sizes` nitelikleri eksiksiz tamamlanacak**
- [ ] **4. Favicon ve Manifest güncellenecek**

### Sprint 4: SEO Derinleştirme & Statik Üretim
- [x] **1. Blog statik üretim (`generateStaticParams`) yapılandırıldı**
- [x] **8. AI-Özet (GEO) blokları eklendi**
- [x] **9. Hacamat blog kümesi genişletildi**
- [x] **7. Hicri takvim hesabı hassaslaştırıldı (`Intl.DateTimeFormat`)**

### Sprint 5: Kod Hijyeni ve Mimari Temizlik
- [x] **1. Eski ps1 scriptleri temizlendi**
- [ ] **2. Dahili linkler Next.js `<Link>` bileşenine dönüştürülecek**
- [x] **3. İç içe `<main>` etiketleri tekilleştirildi**
