import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import './globals.scss';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Create CV',
  description:
    'Create a CV and preview it, choose colors, fonts, icons, or use your own. Design your best resume that stands out from the rest and find your dream job.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="grid grid-rows-[58px,1fr,70px] min-h-dvh w-dvw max-w-[1024px] justify-items-center">
          <Header></Header>
          <main>{children}</main>
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}
