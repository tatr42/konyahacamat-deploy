import { makeIlStaticParams, makeIlMetadata, ilPage } from "@/lib/pseo/page-kit";

// Bu silo kardeş domaine (konyahacamat.com.tr) devredilmektedir.
// COMTR_LIVE açıldığında `makeIlStaticParams` boş dizi döner ve bu route hiç
// üretilmez; istekler next.config'teki 301 kurallarıyla karşılanır.
export const dynamicParams = false;
export const generateStaticParams = makeIlStaticParams("hacamat-kursu");
export const generateMetadata = makeIlMetadata("hacamat-kursu");
export default ilPage("hacamat-kursu");
