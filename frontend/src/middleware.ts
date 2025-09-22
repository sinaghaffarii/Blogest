import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const isAuth = req.cookies.get('isAuth')?.value;
  const url = req.nextUrl.clone();

  if (!isAuth && url.pathname.startsWith('/dashboard')) {
    url.pathname = '/login';
    const redirectResponse = NextResponse.redirect(url);
    redirectResponse.headers.set('x-middleware-cache', 'no-cache');
    return redirectResponse;
  }

  if (isAuth && url.pathname === '/login') {
    url.pathname = '/dashboard';
    const redirectResponse = NextResponse.redirect(url);
    redirectResponse.headers.set('x-middleware-cache', 'no-cache');
    return redirectResponse;
  }

  const response = NextResponse.next();
  response.headers.set('x-middleware-cache', 'no-cache');
  return response;
}
