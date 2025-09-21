import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// This will happen with each request
export async function middleware(request: NextRequest) {
  const cookieName =
    process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token";
  const token = await getToken({ req: request, cookieName });
  const { pathname } = request.nextUrl;

  const authRoutes = ["/login", "/register"];
  const protectedRoutes = [
    "/",
    "/brands",
    "/products",
    "/categories",
    "/cart",
    "/wishlist",
    "/profile",
    "/checkout",
    "/allorders",
  ];

  //if there's a token and the user trys to access login or register we will redirect him to home page
  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  //if there's no token and the user trys to access protected routes we will redirect him to login page
  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

}

// so we have to use the matcher to specify the routes we want to protect
export const config = {
  matcher: [
    "/",
    "/register",
    "/brands/:path*",
    "/products/:path*",
    "/categories/:path*",
    "/cart/:path*",
    "/wishlist/:path*",
    "/profile/:path*",
    "/checkout/:path*",
    "/allorders/:path*",
  ],
};
