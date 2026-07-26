import type { PressItem } from "@/lib/press";

/**
 * Basın haberleri ("Medyada Biz") — ELLE düzenlenir.
 *
 * Firebase/Firestore kaldırıldı; haberler artık bu dosyadan okunur.
 * Yeni haber eklemek için aşağıdaki listeye bir nesne ekleyin.
 *
 * Alanlar:
 *   id        : benzersiz bir kimlik (herhangi bir metin, ör. "1")
 *   kaynak    : gazete/dergi adı (ör. "Yenigün")
 *   yil       : yıl metni (ör. "2024") — liste yıla göre sıralanır
 *   baslik    : haber başlığı
 *   img       : görsel yolu — /public içindeki dosya (ör. "/basin/haber-01.webp")
 *               veya tam bir URL (https://...)
 *   slug?     : verilirse /basin/<slug> detay sayfası açılır; verilmezse
 *               kart tıklanınca görsel büyütülür (lightbox)
 *   icerik?   : detay sayfası için HTML içerik
 *   seoTitle? : opsiyonel özel SEO başlığı
 *   seoDescription? : opsiyonel özel SEO açıklaması
 *   tarih?    : tam yayın tarihi (ISO, ör. "2015-09-02") — NewsArticle
 *               şemasındaki datePublished için; yoksa yılın başı kullanılır
 *   imgCaption? : küpür görselinin altına yazılan açıklama
 *   faq?      : [{ soru, cevap }] — sayfada görünür SSS bölümü olarak basılır
 *               ve aynı veriden FAQPage JSON-LD üretilir
 *
 * İçerik HTML'i `.press-article` sınıfıyla stillenir (bkz. globals.css);
 * projede @tailwindcss/typography kurulu DEĞİL, `prose` sınıfları çalışmaz.
 */
export const PRESS_ITEMS: PressItem[] = [
  {
    id: "rasyonel-haber-2015",
    kaynak: "Rasyonel Haber",
    yil: "2015",
    tarih: "2015-09-02",
    baslik: "70 derde deva hacamat",
    img: "/basin/rasyonel-haber-2015-70-derde-deva.webp",
    imgCaption: "Rasyonel Haber, 02 Eylül 2015 — Kent sayfası. Büyütmek için tıklayın.",
    slug: "70-derde-deva-hacamat-rasyonel-haber-2015",
    seoTitle: "70 Derde Deva Hacamat: Abdullah Keskinoğlu Röportajı | 2015",
    seoDescription:
      "Rasyonel Haber'in 2015 röportajı: Haccam Abdullah Keskinoğlu hacamatın tarihini, nasıl uygulandığını, kimlere yapılmadığını ve sonrasındaki kuralları anlatıyor.",
    icerik: `
<p><strong>Eskiden halk arasında pek bilinmeyen, hatta bir dönem yapılması yasak olan hacamat, günümüzde popülaritesi yüksek bir uygulama hâline geldi.</strong> Konyalı Haccam Abdullah Keskinoğlu, 2015 yılında Rasyonel Haber'e verdiği röportajda hacamatın tarihini, uygulanış biçimini ve dikkat edilmesi gereken kuralları anlattı.</p>

<h2>Hacamat Nedir?</h2>
<p>Hacamat, uygulanacak bölgeye özel vakumlu kupalar yerleştirildikten sonra açılan 1-2 milimetre derinliğindeki ince çiziklerle bölgesel kan alınmasına dayanan geleneksel bir yöntemdir. Keskinoğlu'nun ifadesiyle hacamat, &ldquo;özel vakumlu kupalarla kan alma yöntemidir.&rdquo;</p>

<h2>&ldquo;4 Bin Senelik Bir Tedavi Şekli&rdquo;</h2>
<p>Hacamatın İslami bir boyutunun da bulunduğunu söyleyen Keskinoğlu, uygulamanın tarihini şöyle özetliyor:</p>
<blockquote><p>4 bin senelik bir tedavi şekli olan hacamat, Peygamber Efendimiz'in ömründe tavsiye ettiği bir tedavidir. Hacamatın ilk olarak Asurlularda başladığı varsayılmaktadır.</p></blockquote>
<p>Keskinoğlu, Peygamber Efendimiz'in hacamatın 70 derde şifa olduğunu söylediğini ve bizzat kendisinin de hacamat olduğunu aktarıyor.</p>

<h2>Dünyada ve Türkiye'de Hacamata İlgi</h2>
<p>Röportajda, hacamatın Türkiye'de uzun süre hak ettiği ilgiyi görmediği vurgulanıyor. Keskinoğlu'na göre uygulama başta <strong>Malezya, Suudi Arabistan, Endonezya ve İran</strong> olmak üzere birçok ülkede yaygınlaşmış ve bilimsel çalışmalara konu olmuş durumda.</p>
<p>Malezya'da bu işin lisansını alan Keskinoğlu, Türkiye'deki değişimi şöyle anlatıyor:</p>
<blockquote><p>Yakın zamana kadar insanlar hacamat yaptırmaktan korkardı. Zaten yaptırması da yasaktı, bu yüzden yapılmasını isteyenlere gizli yapardık. Şimdi ise ilgi her geçen gün artıyor.</p></blockquote>

<figure>
  <img src="/basin/hacamat-bas-bolgesi-uygulama-2015.webp" alt="Haccam Abdullah Keskinoğlu'nun baş bölgesine hacamat uygulaması, 2015" width="1032" height="506" loading="lazy" />
  <figcaption>Baş bölgesine kupa uygulaması — 2015 tarihli arşiv görseli.</figcaption>
</figure>

<h2>&ldquo;Faydaları Saymakla Bitmez&rdquo;</h2>
<p>Aşağıdaki başlıklar, Keskinoğlu'nun röportajda kendi ifadeleriyle aktardığı faydalardır; kişisel deneyim ve geleneksel uygulama aktarımıdır.</p>

<h3>Dolaşım ve Kan Üzerindeki Etkileri</h3>
<ul>
  <li>Kılcal damarlardaki tıkanıklıkların açılması</li>
  <li>Kandaki ve dokulardaki gaz ile toksinlerin dışarı atılması</li>
  <li>Damarlardaki kan akımının canlanması ve kan fazlalığından kurtulma</li>
  <li>Kan üretiminden sorumlu organların (kemik iliği, karaciğer, dalak) uyarılması</li>
  <li>Dokuların beslenmesinin artması</li>
</ul>

<h3>Ağrı ve Kas-İskelet Sistemi</h3>
<ul>
  <li>Bel tutulması, boyun ağrıları ve eklem ağrıları</li>
  <li>Baş ağrısı ve baş dönmesi</li>
  <li>Kireçlenme kaynaklı şikâyetler</li>
  <li>Sırt bölgesindeki yaygın ağrılar</li>
</ul>

<h3>Genel İyilik Hâli</h3>
<ul>
  <li>Bağışıklık sisteminin kuvvetlenmesi</li>
  <li>Kansızlık şikâyetleri</li>
  <li>Yüksek tansiyon, varis ve basur</li>
  <li>İdrar yolları ile ilgili şikâyetler</li>
  <li>İştah ve uyku düzeni</li>
  <li>Göz kapağı, diş, dişeti ve burun rahatsızlıkları</li>
</ul>
<blockquote><p>Vücudun çeşitli bölgelerine uygulanan hacamatın türlü türlü şifası vardır.</p></blockquote>

<h2>Psikolojik Rahatsızlıklarda Hacamat</h2>
<p>Keskinoğlu, hacamatın yalnızca fiziksel şikâyetlerde değil, psikolojik rahatsızlıklarda da rahatlama sağladığını savunuyor:</p>
<blockquote><p>Hacamat 5 bin yıllık bir tedavi yöntemi. Vücut iç organlarının işleyişi ve sinir sistemi üzerinde reset görevi görüyor.</p></blockquote>
<p>Röportajda özellikle şu şikâyetlerde uygulandığı belirtiliyor: migren, baş ağrısı, sinüzit, sırt ağrıları, bel ve bacak problemleri, bazı alerjik şikâyetler, mide ve karaciğer kaynaklı rahatsızlıklar.</p>

<h3>Saç Kesmeden Baş Bölgesine Uygulama</h3>
<p>Dünyada ilk kez saç üzerinden hacamat yapan kişinin kendisi olduğunu söyleyen Keskinoğlu, &ldquo;Önceden kupaları yerleştirebilmek için insanların saçlarını kesiyorduk. Artık bu sorun çözüldü, işlemi saç kesmeden yapabiliyoruz&rdquo; diyor.</p>

<figure style="max-width:26rem;margin-left:auto;margin-right:auto;text-align:center">
  <img src="/basin/hacamat-sirt-uygulama-2015.webp" alt="Sırt bölgesine hacamat uygulaması sırasında Haccam Abdullah Keskinoğlu" width="468" height="520" loading="lazy" />
  <figcaption>Sırt bölgesine kupa uygulaması.</figcaption>
</figure>

<h2>Çocuklarda Hacamat Yapılır mı?</h2>
<p>Keskinoğlu, yetişkinler gibi çocuklara da hacamat yaptırılabileceğini belirtiyor. Röportajdaki ifadesine göre çocuklarda alt sınır genel olarak <strong>2 yaş</strong> kabul ediliyor; Malezya ve Endonezya gibi ülkelerde ise çok daha küçük bebeklere uygulandığını aktarıyor. Kendisi, uygulama yapılan çocuklarda gece huzursuzluğunun azaldığını ve uyku düzeninin iyileştiğini gözlemlediğini söylüyor.</p>
<blockquote><p><strong>Önemli:</strong> Bu ifadeler röportajda aktarılan kişisel gözlemlerdir. Çocuklarda herhangi bir geleneksel uygulama öncesinde mutlaka çocuk hekimine danışılmalıdır.</p></blockquote>

<h2>Hacamat Nasıl Yapılır? Adım Adım</h2>
<p>Keskinoğlu işlemi şöyle anlatıyor:</p>
<ol>
  <li><strong>Bölge belirlenir.</strong> Uygulama, şikâyete göre farklı bölgelerden yapılır.</li>
  <li><strong>Vakum uygulanır.</strong> Hijyenik bardak veya hacamat aparatı ile bölge vakumlanır; bu sayede bölgedeki kan yüzeye toplanır.</li>
  <li><strong>Kupa çıkarılır.</strong> Vakumlama sonrası kupa kaldırılır.</li>
  <li><strong>İnce çizikler atılır.</strong> Neşter veya steril jiletle 1-2 milimetre derinliğinde ince kesikler açılır.</li>
  <li><strong>Kan alınır.</strong> Kupa yeniden yerleştirilerek toplanan kan dışarı alınır.</li>
</ol>
<blockquote><p>Jiletle ve neşterle atılan bu çizikler yara olmadan kapanır, hatta izi kalmaz.</p></blockquote>

<h2>Hacamat Ne Zaman Yaptırılmalı?</h2>
<ul>
  <li><strong>Sünnet niyetiyle yaptıracaklar için:</strong> Keskinoğlu, ayın ikinci dönemini tavsiye ediyor.</li>
  <li><strong>Şikâyeti olanlar için:</strong> Beklemeden, ilk fırsatta yaptırmanın daha doğru olduğunu söylüyor.</li>
</ul>

<h2>Kimlere Hacamat Uygulanmaz?</h2>
<p>Röportajda belirtilen sınırlamalar:</p>
<ul>
  <li>Çok ileri yaştaki ve aşırı zayıf kişiler</li>
  <li>Kalp yetmezliği bulunanlar</li>
</ul>
<p>Bunlara ek olarak kanama bozukluğu olanların, kan sulandırıcı ilaç kullananların, gebelerin ve ağır kronik hastalığı bulunanların uygulama öncesinde hekimlerine danışması gerekir.</p>

<h2>Hacamat Sonrası Dikkat Edilmesi Gerekenler</h2>
<ul>
  <li>İşlemden sonra <strong>2-3 saat uyunmaması</strong></li>
  <li><strong>Çok sıcak suyla yıkanılmaması</strong></li>
  <li>Uygulama yapılan bölgenin <strong>en az 1 gün</strong> korunması</li>
  <li>Bal şerbeti, hafif gıdalar ve içecekler tercih edilmesi</li>
</ul>

<h2>Hijyen ve Güvenlik</h2>
<p>Keskinoğlu sözlerini şöyle tamamlıyor:</p>
<blockquote><p>İnsanlar hacamat yaptırmaktan korkmasın. Hacamat yaparken çok dikkat ediyoruz. Gayet hijyenik bir ortamda çalışıyoruz. Kullandığımız malzemeleri bir daha kullanmıyoruz.</p></blockquote>
`.trim(),
    faq: [
      {
        soru: "Hacamat nedir?",
        cevap:
          "Hacamat, cilt yüzeyine vakumlu kupalar yerleştirildikten sonra açılan ince çiziklerle bölgesel kan alınmasına dayanan geleneksel bir uygulamadır. Kökeni binlerce yıl öncesine dayanır, İslam geleneğinde sünnet olarak kabul edilir ve bugün Türkiye dâhil birçok ülkede uygulanmaktadır.",
      },
      {
        soru: "Hacamatın faydaları nelerdir?",
        cevap:
          "Röportajda Keskinoğlu; kılcal damar tıkanıklıklarının açılması, kan akımının canlanması, bağışıklığın güçlenmesi, bel-boyun-eklem ağrılarının hafiflemesi ve uyku ile iştah düzeninin iyileşmesi gibi faydalar aktarıyor. Bu ifadeler geleneksel uygulama deneyimidir; tıbbi tedavi yerine geçmez.",
      },
      {
        soru: "Kimlere hacamat yapılmaz?",
        cevap:
          "Röportaja göre çok ileri yaştaki ve aşırı zayıf kişilerle kalp yetmezliği bulunanlara hacamat uygulanmaz. Ayrıca kanama bozukluğu olanlar, kan sulandırıcı ilaç kullananlar, gebeler ve ağır kronik hastalığı bulunanlar uygulamadan önce mutlaka hekimlerine danışmalıdır.",
      },
      {
        soru: "Çocuklara hacamat yapılır mı?",
        cevap:
          "Keskinoğlu, çocuklarda genel alt sınırın 2 yaş kabul edildiğini, bazı ülkelerde çok daha küçük bebeklere uygulandığını aktarıyor. Bu bir kişisel gözlem aktarımıdır; çocuklarda uygulama öncesinde mutlaka bir çocuk hekiminin görüşü alınmalıdır.",
      },
      {
        soru: "Hacamat izi kalır mı?",
        cevap:
          "Keskinoğlu'na göre neşter veya steril jiletle atılan 1-2 milimetre derinliğindeki ince çizikler yara oluşturmadan kapanır ve kalıcı iz bırakmaz. Kupa vakumundan kaynaklanan geçici kızarıklıklar ise genellikle birkaç gün içinde kendiliğinden kaybolur.",
      },
      {
        soru: "Hacamat sonrası nelere dikkat edilmeli?",
        cevap:
          "İşlemden sonra 2-3 saat uyunmaması, çok sıcak suyla yıkanılmaması ve uygulama yapılan bölgenin en az bir gün korunması tavsiye ediliyor. Bu süreçte bal şerbeti ile hafif gıda ve içeceklerin tercih edilmesi öneriliyor.",
      },
    ],
  },
];
