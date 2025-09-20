import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const isAuth = req.cookies.get('isAuth')?.value;
  const url = req.nextUrl.clone();

  if (!isAuth && url.pathname.startsWith('/dashboard')) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (isAuth && url.pathname === '/login') {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
