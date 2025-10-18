import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignore internal routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  const isAuth = req.cookies.get('isAuth')?.value;
  const url = req.nextUrl.clone();

  if (!isAuth && url.pathname.startsWith('/dashboard')) {
    url.pathname = '/';
    const redirectResponse = NextResponse.redirect(new URL('/', req.url));
    redirectResponse.headers.set('x-middleware-cache', 'no-cache');
    return redirectResponse;
  }

  if (isAuth && url.pathname === '/') {
    url.pathname = '/dashboard';
    const redirectResponse = NextResponse.redirect(url);
    redirectResponse.headers.set('x-middleware-cache', 'no-cache');
    return redirectResponse;
  }

  const response = NextResponse.next();
  response.headers.set('x-middleware-cache', 'no-cache');
  return response;
}

export const config = {
  matcher: ['/', '/dashboard/:path*'],
};
