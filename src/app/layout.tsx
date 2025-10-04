import '@/styles/globals.css';

// import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';

/* import { Footer } from '@/components/footer'; */
import { TanstackProvider } from '@/components/providers/tanstack-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { siteConfig } from '@/lib/constant';
import { fonts } from '@/lib/fonts';
import { cn } from '@/lib/utils';

export const generateMetadata = (): Metadata => ({
  metadataBase: new URL(siteConfig.url()),
  title: {
    default: siteConfig.title(),
    template: `%s | ${siteConfig.title()}`,
  },
  description: siteConfig.description(),
  keywords: siteConfig.keywords(),
  robots: { index: true, follow: true },
  icons: {
    icon: '/jfp.svg',
    shortcut: '/jfp.svg',
    apple: '/jfp.svg',
  },
  // verification: {
  //   google: siteConfig.googleSiteVerificationId(),
  // },
  // openGraph: {
  //   url: siteConfig.url(),
  //   title: siteConfig.title(),
  //   description: siteConfig.description(),
  //   siteName: siteConfig.title(),
  //   images: '/opengraph-image.png',
  //   type: 'website',
  //   locale: languageTag(),
  // },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: siteConfig.title(),
  //   description: siteConfig.description(),
  //   images: '/opengraph-image.png',
  // },
});

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang={'es'} suppressHydrationWarning>
      <body className={cn('min-h-screen font-sans', fonts)}>
        <TanstackProvider>
          <ThemeProvider attribute="class">
            {children}
            {/* <Footer /> */}
            <Toaster />
          </ThemeProvider>
        </TanstackProvider>
      </body>
    </html>
  );
};

export default RootLayout;
