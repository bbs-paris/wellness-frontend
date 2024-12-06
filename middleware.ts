import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Protéger les routes partenaires
  if (request.nextUrl.pathname.startsWith("/partenaires")) {
    // Rediriger vers la page de connexion si non connecté
    // Note: Dans une vraie application, vous devriez vérifier le token JWT ou la session
    return NextResponse.redirect(new URL("/connexion", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/partenaires/:path*",
};