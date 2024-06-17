import React from 'react';
import LoginScreen from './../components/LoginScreen';
import Register from './../components/Register';
import { HomePage } from '@/components/home';
import { NextUIProvider } from '@nextui-org/system';

export default function Home() {
  return (
    <NextUIProvider>
      <HomePage/>
    </NextUIProvider>
  );
}
