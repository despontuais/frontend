import React from 'react';
import { HomePage } from '@/app/components/home';
import { unstable_setRequestLocale } from 'next-intl/server';
import IPage from '@/IPage';
import { NextUIProvider } from '@nextui-org/system';
import TimelineComponent from '@/components/TimelineComponent';



export default function Timeline(){
  return(
    <TimelineComponent></TimelineComponent>
  )
}