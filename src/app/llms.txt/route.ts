import { getPublishedPosts } from "@/lib/posts";
import { getYearsExpStr } from "@/lib/experience";
import { BUSINESS, addressLine } from "@/lib/business";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await getPublishedPosts();
  const yearsExp = getYearsExpStr();

  const blogSection = posts
    .map(
      (post) =>
        `- [${post.title}](https://www.konyahacamat.net/blog/${post.slug}): ${post.excerpt}`
    )
    .join("\n");

  const content = `# Ebusadullah Hacamat & Akademi (Konya Hacamat)

> Konya Meram'da ${yearsExp} yıldır hizmet veren profesyonel hacamat (kupa terapisi) ve sülük terapisi (hirudoterapi) merkezi. Steril, CE sertifikalı, tek kullanımlık malzeme. Ayrıca uluslararası geçerli sertifikalı hacamat/sülük uzmanlık kursları ve periyodik Almanya seansları.

Adres: ${addressLine()}, Türkiye
Telefon / WhatsApp: ${BUSINESS.phone.tr.display}
Almanya hattı: ${BUSINESS.phone.de.display}
E-posta: ${BUSINESS.email}
Web: https://www.konyahacamat.net

## Hizmetler
- [Hacamat Tedavisi (Kuru & Yaş)](https://www.konyahacamat.net/hizmetler/hacamat): Kuru ve yaş hacamat seansları; steril, CE sertifikalı, tek kullanımlık malzeme.
- [Sülük Terapisi (Hirudoterapi)](https://www.konyahacamat.net/hizmetler/suluk): Tıbbi sülük ile varis, ödem, eklem iltihabı ve dolaşım rahatsızlıklarında doğal tedavi.
- [Tüm Hizmetler](https://www.konyahacamat.net/hizmetler): Sunulan hizmetlerin genel listesi.
- [Eğitimler / Uzmanlık Kursları](https://www.konyahacamat.net/egitimler): Sertifikalı hacamat ve sülük uzmanlık eğitimleri.
- [Hacamat & Kupa Malzemeleri](https://www.konyahacamat.net/malzemeler): CE sertifikalı vantuz seti, tek kullanımlık bistüri ve sülük bakım seti; Türkiye geneli kargo.

## Bilgi ve Rehber
- [Hacamat Nedir?](https://www.konyahacamat.net/hacamat-nedir): Hacamatın tanımı, nasıl uygulandığı ve kapsamı.
- [Sülük Nedir?](https://www.konyahacamat.net/suluk-nedir): Sülük (hirudoterapi) tedavisinin tanımı ve faydaları.
- [Blog](https://www.konyahacamat.net/blog): Hacamat ve sülük üzerine bilgilendirici yazılar.
- [Hacamat Takvimi](https://www.konyahacamat.net/takvim): Hicri takvime göre faziletli hacamat günleri ve randevu.
- [Almanya Hacamat Seansları](https://www.konyahacamat.net/almanya-hacamat): Periyodik Almanya (Frankfurt, Köln, Stuttgart) seansları.

## Son Blog Yazıları & Rehberler
${blogSection}

## Kurumsal
- [Hakkımızda](https://www.konyahacamat.net/hakkimizda): Ebusadullah Hacamat & Akademi ve ${yearsExp} saha tecrübesi.
- [İletişim & Randevu](https://www.konyahacamat.net/iletisim): Adres, telefon, WhatsApp ve harita.
- [Basında Biz](https://www.konyahacamat.net/basin): Basın ve medya içerikleri.

## Notlar
- Hizmet merkezi Konya Meram'dadır; malzeme siparişleri Türkiye geneline kargolanır.
- Hacamat ve sülük geleneksel/tamamlayıcı yöntemlerdir; tıbbi teşhis veya tedavi yerine geçmez. Kronik hastalık veya düzenli ilaç kullanımı olanlar uygulamadan önce hekimine danışmalıdır.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
