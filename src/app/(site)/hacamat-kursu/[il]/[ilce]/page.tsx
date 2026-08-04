import { makeIlceStaticParams, makeIlceMetadata, ilcePage } from "@/lib/pseo/page-kit";

// Bkz. üst dizindeki not: silo devredilince bu route de üretilmez.
export const dynamicParams = false;
export const generateStaticParams = makeIlceStaticParams("hacamat-kursu");
export const generateMetadata = makeIlceMetadata("hacamat-kursu");
export default ilcePage("hacamat-kursu");
