import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Almanya Hacamat ve Sülük Tedavisi | Berlin Hacamat Eğitimi',
  description: 'Almanya hacamat, Berlin hacamat ve sülük tedavisi merkezimiz. Ebusadullah Akademi ile Almanya hacamat eğitimi ve sertifikalı kurslarımıza katılın. %100 Hijyenik.',
  openGraph: {
    url: '/almanya-hacamat',
  },
  alternates: {
    canonical: '/almanya-hacamat',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}