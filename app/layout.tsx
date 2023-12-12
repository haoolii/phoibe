import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import Script from 'next/script'
import GoogleCaptchaWrapper from '@/components/google-captcha-wrapper';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: "#fff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: '查網站-風險詐騙網站查詢',
  description: '風險、詐騙網址查詢',
  icons: "favicon.ico"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='relative flex min-h-screen flex-col'>
          <SiteHeader />
          <GoogleCaptchaWrapper>
            <div className='flex-1'>{children}</div>
          </GoogleCaptchaWrapper>
          <SiteFooter />
        </div>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-SVYEKV4EQX" />
        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-SVYEKV4EQX');
            `}
        </Script>
        <Analytics />
      </body>
    </html>
  );
}
