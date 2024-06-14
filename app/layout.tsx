import type { Metadata, Viewport } from 'next';
import './globals.css';
import './globals.scss';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import localFont from 'next/font/local';
import { cookies } from 'next/headers';
import { ThemeProvider } from 'next-themes';
import { CookieThemeProvider } from '@/components/CookieThemeProvider';
import { ColorProvider } from '@/components/ColorProvider';

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
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const cookieTheme = cookieStore.get('theme')?.value || 'g10';

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className}`}>
        <CookieThemeProvider cookieTheme={cookieTheme}>
          <ColorProvider color={cookieTheme === 'g10' ? '#0f62fe' : '#78a9ff'}>
            <ThemeProvider
              attribute="data-carbon-theme"
              defaultTheme="system"
              themes={['g10', 'g90']}
              enableSystem
              disableTransitionOnChange
            >
              <div className="grid grid-rows-[58px,1fr,70px] min-h-dvh w-full justify-items-center">
                <Header></Header>
                <main className="w-full max-w-[984px] px-8 print:px-4 md:px-4 py-6">
                  {children}
                </main>
                <Footer></Footer>
              </div>
            </ThemeProvider>
          </ColorProvider>
        </CookieThemeProvider>
      </body>
    </html>
  );
}
