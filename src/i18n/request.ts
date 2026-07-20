import {cookies} from 'next/headers';
import {getRequestConfig} from 'next-intl/server';

// next-intl calls this on every server render to decide which locale/message
// bundle to serve. The locale itself is just read from the "locale" cookie
// written by app/actions/locale.ts's setLocale(); it isn't derived from the
// request (Accept-Language header, etc.) yet.
export default getRequestConfig(async () => {
  // Static for now, we'll change this later
  const store = await cookies();
  const locale = store.get('locale')?.value || 'en';

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
