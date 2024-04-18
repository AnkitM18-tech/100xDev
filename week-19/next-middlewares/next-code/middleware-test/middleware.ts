import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

let requestCount = 0;

// This middleware will run first irrespective of where the request is coming, BE route endpoint or FE page endpoint. With NextJS we don't have to write app.use() like syntax, nextjs understands our files and it does file based routing.The problem is it will run on every route, so we need to restrict it.

export function middleware(request: NextRequest) {
  requestCount++;
  console.log("number of requests is " + requestCount);
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
// track only requests that start with /api, the middleware will only run if an /api endpoint is being called. Now If a FE route is being called, then the middleware will not run.
// allows us some level of filtering, but not always helpful.

export const config = {
  matcher: "/api/:path*",
};

/* 

// Selectively running middlewares

export function middleware(request: NextRequest) {
  console.log(request.nextUrl.pathname)
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }
 
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.next()
  }
}

*/
