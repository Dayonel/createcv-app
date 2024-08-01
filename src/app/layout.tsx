import type { Metadata, Viewport } from 'next';
import './globals.css';
import './globals.scss';
import './menu.scss';
import Footer from '@/components/footer/footer';
import localFont from 'next/font/local';
import { cookies } from 'next/headers';
import { ThemeProvider } from 'next-themes';
import { CookieThemeProvider } from '@/components/providers/cookie-theme-provider';
import { FormProvider } from '@/components/providers/form-provider';
import { MenuProvider } from '@/components/providers/menu-provider';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { PrintProvider } from '@/components/providers/print-provider';

const roboto = localFont({
  src: [
    {
      path: '../../public/fonts/Roboto-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Roboto-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Roboto-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
});

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Create CV',
  description:
    'Create a CV and preview it, choose colors, fonts, icons, or use your own. Design your best resume that stands out from the rest and find your dream job.',
};

export const viewport: Viewport = {
  width: 'device-width',
  userScalable: false,
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const cookieTheme = cookieStore.get('theme')?.value;
  const savedForm = cookieStore.get('savedForm')?.value;
  const printed = cookieStore.get('printed')?.value;
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className}`}>
        <SessionProvider session={session}>
          <CookieThemeProvider cookieTheme={cookieTheme}>
            <ThemeProvider
              attribute="data-carbon-theme"
              disableTransitionOnChange
            >
              <PrintProvider>
                <FormProvider savedForm={savedForm} printed={printed}>
                  <div className="grid grid-rows-[58px,1fr] min-h-dvh w-full justify-items-center">
                    <MenuProvider>
                      <main className="w-full">{children}</main>
                    </MenuProvider>
                    <Footer></Footer>
                  </div>
                </FormProvider>
              </PrintProvider>
            </ThemeProvider>
          </CookieThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
