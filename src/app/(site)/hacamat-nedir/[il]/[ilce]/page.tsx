import { ilceStaticParams, makeIlceMetadata, ilcePage } from "@/lib/pseo/page-kit";

export const dynamicParams = false;
export const generateStaticParams = ilceStaticParams;
export const generateMetadata = makeIlceMetadata("hacamat-nedir");
export default ilcePage("hacamat-nedir");
