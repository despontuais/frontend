import type { Metadata } from "next";
import { locales } from "@/config";
import { Inter } from "next/font/google";
import {ThemeProvider} from "@/components/theme-provider";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {unstable_setRequestLocale} from 'next-intl/server';
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - Cronolog", 
    default: "Cronolog"},
  description: "Generated by create next app",
};

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  
  children,
  params: {locale}}
  : {
    children: React.ReactNode;
    params: {locale: string};
  }) {
  
  unstable_setRequestLocale(locale);
  
  const messages = await getMessages();


  
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>

      
      <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      >
      <NextIntlClientProvider messages={messages}>
      {children}
      </NextIntlClientProvider>
      </ThemeProvider>
        </body>
    </html>
  );
}

