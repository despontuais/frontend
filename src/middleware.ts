import createIntlMiddleware from 'next-intl/middleware';
import { locales } from './config'; 
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export default async function middleware(request: NextRequest) {
  // Step 1: Use the incoming request (example)
  //const defaultLocale = request.headers.get('x-your-custom-locale') || 'en';
  // Step 2: Create and call the next-intl middleware (example)
  const handleI18nRouting = createIntlMiddleware({
    locales,
    defaultLocale: 'en'
  });
  const response = handleI18nRouting(request);

  // Step 3: Alter the response (example)
  //response.headers.set('x-your-custom-locale', defaultLocale);
 
  return response;
}

export const config = { 
  // Match only internationalized pathnames
  matcher: ['/', '/(es|en|pt-BR)/:path*']
};


