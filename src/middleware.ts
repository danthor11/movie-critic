import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./lib/jwt";
import { getErrorResponse } from "./lib/helpers";

//Extension del request
interface AuthenticatedRequest extends NextRequest {
  user: {
    id: string;
  };
}

export async function middleware(req: NextRequest) {
  let token: string | undefined;

  if (req.cookies.has("token")) {
    token = req.cookies.get("token")?.value;
  } else if (req.headers.get("Authorization")?.startsWith("Bearer ")) {
    token = req.headers.get("Authorization")?.substring(7);
  }

  // ? Validacion para rutas API
  console.log(token);
  if (req.nextUrl.pathname.startsWith("/login")) return;

  console.log(
    !token && req.nextUrl.pathname.startsWith("/api/profile"),
    req.nextUrl.pathname
  );
  if (
    !token &&
    (req.nextUrl.pathname.startsWith("/api/rated") ||
      req.nextUrl.pathname.startsWith("/api/profile"))
  ) {
    return getErrorResponse(
      401,
      "You are not logged in. Please provide a token to gain access."
    );
  }

  const response = NextResponse.next();

  try {
    if (token) {
      const { id } = await verifyJWT<{ id: number }>(token);
      response.headers.set("X-USER-ID", id.toString());

      (req as AuthenticatedRequest).user = {
        id: id.toString(),
      };
    }
  } catch (error) {
    return NextResponse.redirect(new URL(`/login`, req.url));
  }

  const authUser = (req as AuthenticatedRequest).user;

  if (req.url.includes("/login") && authUser) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  return response;
}

export const config = {
  matcher: ["/api/rated", "/api/profile", "/api/profile/:path*"],
};
