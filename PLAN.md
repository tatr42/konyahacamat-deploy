# PLAN.md — Konyahacamat.net & Ecosystem İyileştirme Yol Haritası ve Stratejik SEO Rehberi

Bu doküman; sitedeki teknik borçları, performans ağırlıklarını, SEO stratejilerini, iki site (`.net` vs `.com.tr`) arasındaki çakışmasız arama motoru mimarisini, yapay zeka (AI/GEO) içerik stratejisini ve içerik zenginleştirme rehberini kapsamaktadır.

---

## 🟢 STRATEJİK YOL HARİTASI VE DETAYLI SORU-CEVAP REHBERİ

### 1. Kodda Ne Eksik & Ağırlık Yapan Kodlar Nelerdir?
* **Ağırlık Yapan Üçüncü Parti Kodlar ve Scriptler:**
  - Senkron veya hatalı yüklenen analitik, harita ve widget scriptleri Total Blocking Time (TBT) artışına sebep olur. Google Analytics ve diğer dış scriptler Next.js `<Script>` bileşeni ile `strategy="lazyOnload"` modunda yüklenmelidir (`@next/third-parties/google` paketi TBT regresyonu yarattığı için doğrudan Next.js Script kullanılmalıdır).
* **Statik Pre-rendering (SSG) ve Dynamic Route Caching:**
  - Blog detay (`/blog/[slug]`), hizmet sayfaları ve dinamik rotalar her istekte sunucu tarafında sıfırdan render (SSR) edilirse TTFB (Time to First Byte) süresi uzar ve sunucuya yük bindirir.
  - `export async function generateStaticParams()` kullanılarak dinamik sayfalar derleme (build) anında statik HTML/JSON olarak üretilmeli, veritabanı/Firestore sorguları `React.cache` ile sarmalanmalıdır.
* **Görsel Optimizasyonu & LCP (Largest Contentful Paint):**
  - Standart HTML `<img>` kullanımı veya `sizes` / `priority` niteliği eksik olan `<Image>` bileşenleri mobil cihazlarda gereksiz büyük resimler indirerek LCP skorunu düşürür.
  - Hero görsellerinde `priority` ve `fetchPriority="high"` kullanılmalı; liste/grid görsellerinde responsive `sizes="(max-width: 768px) 100vw, 50vw"` tanımlanmalıdır.
* **Erişilebilirlik (A11y) ve Kod Hijyeni:**
  - Mobil menülerde `aria-expanded`, butonlarda `aria-label`, Slider/Carousel noktalarında 44x44px minimum dokunma alanı ve kuyu/karanlık temada yeterli kontrast (`text-white/70` ve üzeri) sağlanmalıdır.
  - HTML içi ham `<a>` etiketleri yerine Next.js `<Link>` bileşeni kullanılarak istemci taraflı SPA geçişleri sağlanmalıdır.

---

### 2. 2 Site Birbirini Aramada Nasıl Geri Çekmez? (Kanibalizasyon & Çifte Domain Önleme)
Eğer iki farklı alan adınız varsa (Örn: `konyahacamat.net` ve `konyahacamat.com.tr`):

1. **Kesin Niş ve Konumlandırma Ayrımı (Silo Mimarisi):**
   - **Site A (`konyahacamat.net` - Yerel Klinik & Randevu):**
     Sadece Konya merkezli fiziksel hacamat, sülük seansları, klinik konumu, randevu alma ve yerel şikayet/semptom rehberlerine odaklanır. Ayrıca gurbetçi hastalar için Almanya (Berlin) fiziki seans bilgilerini (+49 163 449 28 70) sunar.
   - **Site B (`konyahacamat.com.tr` - Akademi & E-Ticaret):**
     Türkiye geneli (81 il ve ilçeler) hacamat kursu, haccamlık eğitimi, sertifikasyon, kupa ve sülük malzemeleri satışı/e-ticaret odağındadır.
2. **Kopyalanmış İçerik (Duplicate Content) ve SpamBrain Engelleyici:**
   - İki sitede asla aynı paragraf veya makale yayınlanmamalıdır. Kelimelerin yerleri değiştirilmiş (spin edilmiş) AI metinleri dahi Google SpamBrain tarafından tespit edilip her iki sitenin de sıralamasını düşürür.
3. **Cross-Domain Canonical ve 301 Yönlendirmeleri:**
   - `.net` üzerindeki eğitim/kurs içerikleri `src/data/ecosystem.ts` içindeki `COMTR_LIVE` bayrağı ile `.com.tr` alan adının ilgili sayfalarına 301 kalıcı yönlendirme ile aktarılmalı veya `<link rel="canonical" href="https://konyahacamat.com.tr/..." />` etiketi ile yetkili adres gösterilmelidir.
4. **Çapraz Bağlantı (Backlink) Kuralları:**
   - Header/Footer menülerinden tüm sayfaları kapsayan siteler arası toplu (reciprocal) link verilmemeli, linkler metin içinden doğal ve bağlamsal (contextual) yönlendirilmelidir.

---

### 3. Yapay Zeka (AI) İçeriklerinin Anlaşılmaması ve Öne Çıkması (GEO / Helpful Content / E-E-A-T)
Google'ın Helpful Content Update (HCU) ve E-E-A-T (Deneyim, Uzmanlık, Otorite, Güvenilirlik) standartları, jenerik AI metinlerini tespit edip arama sonuçlarında geriye itmektedir:

1. **Information Gain (Bilgi Kazanımı) İlkesi:**
   - İnternetteki mevcut makaleleri özetleyen AI metinleri değer üretmez. Metinlere **gerçek klinik tecrübeler, seans gözlemleri, vaka yorumları ve uzman tavsiyeleri** eklenerek makalenin internetteki diğer kaynaklardan daha nitelikli bilgi sunması sağlanmalıdır.
2. **GEO (Generative Engine Optimization - AI Arama Motoru Optimizasyonu):**
   - ChatGPT, Perplexity ve Google AI Overviews gibi yapay zeka arama motorlarında ilk kaynak olarak gösterilmek için:
     - Makale başlarına veya H2 altlarına **40–50 kelimelik net, doğrudan yanıt veren "Kısa Cevap" (`AiSummaryBox`) kutuları** eklenmelidir.
     - Soru-Cevap (FAQ) formatında tereddütsüz ve somut ifadeler kullanılmalıdır.
3. **E-E-A-T Sinyalleri ve Uzman İmzası:**
   - Makalelerde Yazar Biyografisi (`Author Box`), yayın/güncelleme tarihi ve tıp/sağlık uyarısı (Medical Disclaimer) bulunmalıdır.
4. **Zengin Şema Markup (JSON-LD):**
   - `MedicalBusiness`, `FAQPage`, `HowTo` ve `Article` şemaları eksiksiz yapılandırılmalı; `acceptedAnswer` metinleri içerisinde dahili linkler (`<a>`) kullanılarak arama botlarının site içi dolaşımı güçlendirilmelidir.

---

### 4. Eklenmesi Gereken İçerikler ve İçerik Doluluğu
* **Şikayet ve Semptom Odaklı Rehberler:**
  - Yasal çerçevede (tanı ve tedavi iddiası bulunmadan, "destekleyici geleneksel yaklaşım" diliyle) hazırlanan kronik yorgunluk, baş ağrısı, bel/boyun hassasiyeti rehberleri.
* **Detaylı Sık Sorulan Sorular (FAQ Clusters):**
  - Hacamat ve Sülük öncesi (açlık durumu, diyet, kan sulandırıcılar) ve sonrası (banyo, beslenme, dinlenme) dikkat edilecek hususlar.
* **Almanya / Yurt Dışı Hizmet Sayfası:**
  - Almanya'daki (Berlin vb.) gurbetçiler için Türkiye'ye seyahat etmelerine gerek kalmadan doğrudan yerinde fiziki seans ve rehberlik alabileceklerini vurgulayan özel içerikler.

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
- [x] **4. `llms.txt` dinamik route olarak güncellenecek**

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
- [x] **2. Dahili linkler Next.js `<Link>` bileşenine dönüştürülecek / modülerize edildi**
- [x] **3. İç içe `<main>` etiketleri tekilleştirildi**
