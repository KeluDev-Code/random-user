import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './css/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'App Random user',
  description: 'Aplicación de random-user usando NextJs',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode;}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} font-inter antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
