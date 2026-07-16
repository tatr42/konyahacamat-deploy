import { ilceStaticParams, makeIlceMetadata, ilcePage } from "@/lib/pseo/page-kit";

export const dynamicParams = false;
export const generateStaticParams = ilceStaticParams;
export const generateMetadata = makeIlceMetadata("suluk-satisi");
export default ilcePage("suluk-satisi");
