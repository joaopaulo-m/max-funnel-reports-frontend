import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_PATHS = [
  '/app/clients',
  '/app/users',
  '/app/settings',
  '/create-password',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('access_token');

  const isProtectedRoute = PROTECTED_PATHS.some((path) =>
    pathname.startsWith(path + '/') || pathname === path
  );

  const isExceptionRoute = pathname === '/create-password/new';

  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/app/clients', request.url));
  }

  if (isProtectedRoute && !isExceptionRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname === '/' && token) {
    return NextResponse.redirect(new URL('/app/clients', request.url));
  }

  if (pathname === '/' && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/app/clients/:path*',
    '/app/users/:path*',
    '/app/settings/:path*',
    '/create-password',
    '/create-password/new',
  ],
};