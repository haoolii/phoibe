import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: "#fff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
          <div className='flex-1'>{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
