import { ilStaticParams, makeIlMetadata, ilPage } from "@/lib/pseo/page-kit";

export const dynamicParams = false;
export const generateStaticParams = ilStaticParams;
export const generateMetadata = makeIlMetadata("suluk-nedir");
export default ilPage("suluk-nedir");
