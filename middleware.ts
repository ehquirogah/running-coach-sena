import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

const ROLE_ROUTES = {
  ATLETA: ["/dashboard/atleta", "/sesiones", "/mi-plan"],
  ENTRENADOR: ["/dashboard/entrenador", "/planes", "/atletas"],
  ADMIN: ["/admin"],
  SHARED: ["/reportes"], // Atleta o Entrenador
};

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { pathname } = req.nextUrl;

  // 1. Verificar si la ruta requiere autenticación
  const isProtected = Object.values(ROLE_ROUTES)
    .flat()
    .some((route) => pathname.startsWith(route));

  if (!isProtected) return NextResponse.next();

  // 2. Si no hay token: redirigir a /login
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const userRole = token.rol as string;

  // 3. Verificar roles según ruta
  
  // Admin Check
  if (pathname.startsWith("/admin") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/no-autorizado", req.url));
  }

  // Coach Check
  if (
    (pathname.startsWith("/dashboard/entrenador") ||
      pathname.startsWith("/planes") ||
      pathname.startsWith("/atletas")) &&
    userRole !== "ENTRENADOR"
  ) {
    return NextResponse.redirect(new URL("/no-autorizado", req.url));
  }

  // Athlete Check
  if (
    (pathname.startsWith("/dashboard/atleta") ||
      pathname.startsWith("/sesiones") ||
      pathname.startsWith("/mi-plan")) &&
    userRole !== "ATLETA"
  ) {
    return NextResponse.redirect(new URL("/no-autorizado", req.url));
  }

  // Shared Check (Athlete or Coach)
  if (pathname.startsWith("/reportes") && !["ATLETA", "ENTRENADOR"].includes(userRole)) {
    return NextResponse.redirect(new URL("/no-autorizado", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login page)
     * - registro (registration page)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|login|registro).*)",
  ],
};
