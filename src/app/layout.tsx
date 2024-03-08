import '@/styles/globals.css';

import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';
import { Providers } from './providers';
import Navbar from '@/components/nav/Navbar';

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head />
      <body className="min-h-screen">
        <Providers>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto pt-6 px-6 flex-grow">{children}</main>
            <footer className="w-full flex items-center justify-center py-3">
              <span className="text-default-600">
                Powered by <strong className="text-primary">CodeCache</strong>
              </span>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
