import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pb-[72px] lg:pb-0">{children}</main>
      <Footer />
      <WhatsAppWidget />
    </>
  );
}
