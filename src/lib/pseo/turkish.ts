/**
 * Türkçe ek üretimi — özel adlara (il/ilçe) kesme işaretiyle doğru hâl eki.
 *
 * Binlerce pSEO sayfasında "İstanbul'e / Konya'de" gibi hatalar profesyonelliği
 * ve güveni zedeler. Bu modül ünlü uyumu (a/e) ve ünsüz sertleşmesi (d/t)
 * kurallarını uygular:
 *   - Yönelme (-e): İstanbul'a, Konya'ya, İzmir'e, Muğla'ya
 *   - Bulunma (-de): İstanbul'da, Sinop'ta, İzmir'de, Konya'da
 */

const BACK_VOWELS = new Set([..."aAıIoOuU"]);
const FRONT_VOWELS = new Set([..."eEiİöÖüÜ"]);
// Sert (sedasız) ünsüzler — "fıstıkçışahap"
const VOICELESS = new Set([..."fFsStTkKçÇşŞhHpP"]);

function isVowel(ch: string): boolean {
  return BACK_VOWELS.has(ch) || FRONT_VOWELS.has(ch);
}

/** Son ünlüye göre kalın (back) mı? Bulunamazsa kalın varsayılır. */
function lastVowelIsBack(name: string): boolean {
  for (let i = name.length - 1; i >= 0; i--) {
    if (BACK_VOWELS.has(name[i])) return true;
    if (FRONT_VOWELS.has(name[i])) return false;
  }
  return true;
}

function endsWithVowel(name: string): boolean {
  const t = name.trimEnd();
  return isVowel(t[t.length - 1]);
}

function lastCharVoiceless(name: string): boolean {
  const t = name.trimEnd();
  return VOICELESS.has(t[t.length - 1]);
}

/** Yönelme hâli: "-e/-a" (ünlüden sonra kaynaştırma "-ye/-ya"). */
export function dative(name: string): string {
  const back = lastVowelIsBack(name);
  if (endsWithVowel(name)) return `${name}'${back ? "ya" : "ye"}`;
  return `${name}'${back ? "a" : "e"}`;
}

/** Bulunma hâli: "-de/-da", sert ünsüzden sonra "-te/-ta". */
export function locative(name: string): string {
  const back = lastVowelIsBack(name);
  const hard = !endsWithVowel(name) && lastCharVoiceless(name);
  const suffix = hard ? (back ? "ta" : "te") : back ? "da" : "de";
  return `${name}'${suffix}`;
}
