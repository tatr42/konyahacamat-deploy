import { ilStaticParams, makeIlMetadata, ilPage } from "@/lib/pseo/page-kit";

export const dynamicParams = false;
export const generateStaticParams = ilStaticParams;
export const generateMetadata = makeIlMetadata("suluk-satisi");
export default ilPage("suluk-satisi");
