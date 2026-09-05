# PLAN.md — Konyahacamat.net İyileştirme Yol Haritası ve Stratejik SEO Rehberi

Bu doküman, sitedeki teknik borçları, yasal riskleri, SEO eksikliklerini ve UX/UI iyileştirmelerini kapsayan önceliklendirilmiş eylem planı ile **Uzun Soluklu SEO & İçerik Stratejisi Rehberi**ni içermektedir.

---

## 🟢 STRATEJİK STRATEJİ VE YOL HARİTASI (SSS & STRATEJİK SEO MİMARİSİ)

### 1. Kodda Ne Eksik & Ağırlık Yapan Kodlar Nelerdir?
* **Statik Pre-rendering (SSG) ve Dynamic Route Caching:**
  - Blog detay ve dinamik sayfaların istemci/sunucu tarafında her istekte sıfırdan render edilmesi (SSR) sunucu yükünü artırır ve TTFB (Time to First Byte) süresini uzatır.
  - `export async function generateStaticParams()` ile dinamik rotalar derleme (build) anında statik HTML/JSON olarak üretilmeli, veritabanı sorguları `React.cache` ile sarmalanmalıdır.
* **Görsel Optimizasyonu & LCP (Largest Contentful Paint):**
  - Standart HTML `<img>` veya eksik `sizes` / `priority` niteliğine sahip Next.js `<Image>` bileşenleri responsive cihazlarda aşırı büyük resim yükleyerek LCP ve CLS skorlarını düşürür.
  - Hero ve kapak görsellerinde `priority` ve `fetchPriority="high"` kullanılmalı; grid görsellerinde doğru `sizes="(max-width: 768px) 100vw, 50vw"` tanımlanmalıdır.
* **Ağırlık Yapan Üçüncü Parti Kodlar ve Scriptler:**
  - `@next/third-parties/google` paketi gibi senkron yüklenen analitik ve harita scriptleri Total Blocking Time (TBT) artışına neden olur. Google Analytics ve diğer scriptler `strategy="lazyOnload"` veya Next.js `<Script>` bileşeni ile ertelenmiş modda yüklenmelidir.
  - Ağır fontlar, kullanılmayan CSS kütüphaneleri veya devasa JS paketleri temizlenmeli, Tailwind CSS 4 JIT derleyicisi ile minimal CSS bundle korunmalıdır.
* **Erişilebilirlik (A11y) ve İç Link Mimarisi:**
  - Sayfalar arası geçişlerde ham `<a>` etiketleri yerine Next.js `<Link>` kullanılarak SPA yönlendirmesi sağlanmalı ve gereksiz tam sayfa yenilemelerinin önüne geçilmelidir.
  - Mobil menülerde `aria-expanded`, butonlarda `aria-label` eksiklikleri giderilmelidir.

---

### 2. 2 Site Birbirini Aramada Nasıl Geri Çekmez? (Kanibalizasyon & Çifte Domain Önleme)
Eğer aynı sektör/hizmet için iki farklı alan adınız varsa (Örn: `konyahacamat.net` ve `konyahacamat.com.tr`):

1. **Net Niş ve Konumlandırma Ayrımı (Silo Mimarisi):**
   - **Site A (`konyahacamat.net`):** Yerel Klinik ve Randevu Odaklı. Sadece Konya içi fiziksel hacamat, sülük uygulamaları, klinik konum, randevu ve yerel şikayet/semptom rehberlerine odaklanır.
   - **Site B (`konyahacamat.com.tr`):** Akademi, Eğitim ve Tedarik Odaklı. Türkiye geneli (81 il + ilçeler) hacamat kursu, haccamlık eğitimi, sertifikasyon, kupa ve sülük malzemesi satışı/e-ticaret odağındadır.
2. **Kopyalanmış İçerikten (Duplicate Content) Kaçınma:**
   - İki sitede asla aynı paragrafı, makaleyi veya ürün açıklamasını yayınlamayın. Yapay zeka ile kelimeleri değiştirilmiş (spin edilmiş) metinler dahi Google SpamBrain tarafından tespit edilip her iki sitenin de sıralamasını düşürür (kanibalizasyon).
3. **Canonical ve Cross-Domain Etiketleri:**
   - İki site arasında bir içerik alıntılanıyorsa veya asıl kaynak diğer sitedeyse `<link rel="canonical" href="https://asıl-site.com/sayfa" />` etiketi ile asıl yetkili kaynak arama motorlarına bildirilmelidir.
4. **Çapraz Bağlantı (Backlink) Spam'inden Kaçınma:**
   - İki site arasında footer veya header menülerinden tüm sayfaları kapsayan karşılıklı (reciprocal) toplu linkler verilmemelidir. Linkler yalnızca içerik içerisinden doğal ve bağlamsal (contextual) olarak yönlendirilmelidir (Örn: `.net` sitesindeki "Hacamat Eğitimi" bağlantısının `COMTR_LIVE` bayrağı ile `.com.tr` akademisine 301 veya dış yönlendirme ile aktarılması).

---

### 3. Yapay Zeka (AI) İçeriklerinin Anlaşılmaması ve Öne Çıkması (GEO / Helpful Content / E-E-A-T)
Google'ın Helpful Content Update (HCU) ve E-E-A-T (Deneyim, Uzmanlık, Otorite, Güvenilirlik) güncellemeleri, sıfatlarla dolu jenerik AI metinlerini tespit edip arama sonuçlarında geriye itmektedir:

1. **Information Gain (Bilgi Kazanımı) İlkesi:**
   - Sadece internetteki mevcut makaleleri özetleyen AI metinleri sıfır değer üretir.
   - Metinlere **gerçek klinik tecrübeler, uygulama püf noktaları, vaka gözlemleri ve somut uzman tavsiyeleri** eklenerek makalenin internetteki diğer kaynaklardan daha fazla bilgi vermesi sağlanmalıdır.
2. **GEO (Generative Engine Optimization - AI Arama Motoru Optimizasyonu):**
   - ChatGPT, Perplexity ve Google AI Overviews gibi yapay zeka arama motorlarında kaynak gösterilmek ve ilk sırada çıkmak için:
     - Makale başlarına veya H2 altlarına **40–50 kelimelik net, doğrudan yanıt veren "Kısa Cevap" (AI Summary) kutuları** eklenmelidir.
     - Soru-Cevap (FAQ) formatında net ve tereddütsüz cümleler kullanılmalıdır.
3. **E-E-A-T Sinyalleri ve Uzman İmzası:**
   - Tüm blog ve rehber sayfalarında makaleyi kaleme alan uzmanın biyografisi (Author Box), uzmanlık sertifikaları ve yayın tarihi yer almalıdır.
   - YMYL (Your Money Your Life - Sağlık) kapsamında yasal tıp uyarısı (Medical Disclaimer) ve akademik/tıbbi referanslar bulunmalıdır.
4. **Zengin Şema Markup (JSON-LD):**
   - `MedicalBusiness`, `FAQPage`, `HowTo` ve `Article` şemaları eksiksiz yapılandırılmalı; `acceptedAnswer` metinleri içerisinde dahili linkler (`<a>`) kullanılarak arama botlarının site içi dolaşımı kolaylaştırılmalıdır.

---

### 4. Eklenmesi Gereken İçerikler ve İçerik Doluluğu
* **Şikayet ve Semptom Odaklı Rehberler:**
  - Yasal çerçevede (tanı ve tedavi iddiası bulunmadan, "destekleyici geleneksel yaklaşım" diliyle) hazırlanan baş ağrısı, kronik yorgunluk, bel/boyun hassasiyeti rehberleri.
* **Detaylı Sık Sorulan Sorular (FAQ Clusters):**
  - Hacamat ve Sülük öncesi (açlık durumu, diyet) ve sonrası (banyo, beslenme, dinlenme) dikkat edilecek hususlar.
* **Gerçek Varlık ve Görsel Kanıtlar:**
  - Stok fotoğraflar yerine klinik ortamı, sterilizasyon ekipmanları ve gerçek seans sürecini gösteren özgün fotoğraflar ve kısa tanıtım videoları.
* **Yurt Dışı / Almanya Hizmet Detayları:**
  - Almanya (Berlin vb.) gurbetçi hastalar için Türkiye'ye seyahat etmeden yerinde hizmet ve eğitim alabileceklerini belirten özel sayfa ve içerikler.

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
