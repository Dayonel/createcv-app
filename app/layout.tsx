import type { Metadata, Viewport } from 'next';
import './globals.css';
import './globals.scss';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import localFont from 'next/font/local';
import ThemeProvider from '@/components/ThemeProvider';

const roboto = localFont({
  src: [
    {
      path: '../public/fonts/Roboto-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Roboto-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    { path: '../public/fonts/Roboto-Bold.ttf', weight: '700', style: 'normal' },
  ],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Create CV',
  description:
    'Create a CV and preview it, choose colors, fonts, icons, or use your own. Design your best resume that stands out from the rest and find your dream job.',
};

export const viewport: Viewport = {
  userScalable: false,
  minimumScale: 1,
  maximumScale: 1
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className}`}>
        <ThemeProvider>
          <div className="grid grid-rows-[58px,1fr,70px] min-h-dvh w-full justify-items-center">
            <Header></Header>
            <main className="w-full max-w-[984px] px-8 md:px-4 print:px-4 py-6">
              {children}
            </main>
            <Footer></Footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
