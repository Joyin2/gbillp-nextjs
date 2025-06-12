import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Get the pathname of the request
  const path = req.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === '/admin/login' || path === '/admin/signup';

  // For now, allow access to all admin routes
  // Firebase will handle authentication on the client side
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
}; 