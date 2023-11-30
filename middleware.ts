import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    console.log('request', request)
    request.headers.set('Access-Control-Allow-Origin', 'https://www.safeus.cc/');
    request.headers.set('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
    request.headers.set('Access-Control-Allow-Headers', 'Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date');
  return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
}