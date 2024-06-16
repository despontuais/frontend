import {LocalePrefix} from 'next-intl/routing';

export const locales = ['en', 'es', 'pt-BR'] as const;
 
export const localePrefix = 'always' satisfies LocalePrefix;