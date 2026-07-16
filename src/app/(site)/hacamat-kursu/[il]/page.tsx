import { ilStaticParams, makeIlMetadata, ilPage } from "@/lib/pseo/page-kit";

export const dynamicParams = false;
export const generateStaticParams = ilStaticParams;
export const generateMetadata = makeIlMetadata("hacamat-kursu");
export default ilPage("hacamat-kursu");
