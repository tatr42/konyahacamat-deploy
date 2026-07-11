import { getPressItems } from "@/lib/press";
import BasinClient from "./BasinClient";

// ISR: haber listesi sunucuda render edilir (SEO), 5 dakikada bir yenilenir.
export const revalidate = 300;

export default async function BasinPage() {
  const items = await getPressItems();
  return <BasinClient initialItems={items} />;
}
