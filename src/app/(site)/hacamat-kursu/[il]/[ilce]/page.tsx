import { ilceStaticParams, makeIlceMetadata, ilcePage } from "@/lib/pseo/page-kit";

export const dynamicParams = false;
export const generateStaticParams = ilceStaticParams;
export const generateMetadata = makeIlceMetadata("hacamat-kursu");
export default ilcePage("hacamat-kursu");
