import React from 'react';
import { HomePage } from '@/app/components/home';
import {unstable_setRequestLocale} from 'next-intl/server';
import IPage from '@/IPage';
import { NextUIProvider } from '@nextui-org/system';


export default function Home({params: {locale}}: IPage) {
  unstable_setRequestLocale(locale);
  return (
    <NextUIProvider>
      <HomePage params={{locale}}/>
    </NextUIProvider>
  );
}
