import { ilStaticParams, makeIlMetadata, ilPage } from "@/lib/pseo/page-kit";

export const dynamicParams = false;
export const generateStaticParams = ilStaticParams;
export const generateMetadata = makeIlMetadata("hacamat-nedir");
export default ilPage("hacamat-nedir");
