import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

const publicRoutes = [
  "/",
  "/login",
  "/demo",
  "/register",
  "/forgot-password",
  "/verify-email",
  "/mfa",
  "/pricing",
  "/legal/termos",
  "/legal/privacidade",
];
const authRoutes = ["/login", "/register", "/forgot-password", "/demo"];
const adminRoutes = ["/admin"];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isPublic =
    publicRoutes.some((r) => nextUrl.pathname === r || nextUrl.pathname.startsWith(r + "/")) ||
    nextUrl.pathname.startsWith("/api/auth");
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdmin = adminRoutes.some((r) => nextUrl.pathname.startsWith(r));
  const role = (req.auth?.user as { role?: string })?.role;

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  if (
    !isPublic &&
    !isLoggedIn &&
    (nextUrl.pathname.startsWith("/dashboard") || nextUrl.pathname.startsWith("/admin"))
  ) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  if (isAdmin && role !== "ADMIN" && role !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
