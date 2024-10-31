import { NextRequest, NextResponse } from "next/server";
import { getErrorResponse } from "./lib/helpers";
import { getToken } from "next-auth/jwt";

interface AuthenticatedRequest extends NextRequest {
  user: {
    id: string;
  };
}

export async function middleware(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (req.nextUrl.pathname === "/") return;

  //Profile
  if (
    req.nextUrl.pathname.startsWith("/profile") &&
    req.nextUrl.pathname.endsWith("create")
  ) {
    console.log("create");

    const id = req.nextUrl.pathname.slice(
      9,
      req.nextUrl.pathname.lastIndexOf("/")
    );
    const res = await fetch(`http://localhost:3000/api/user/${id}`);
    const user = await res.json();

    if (user && user?.Profile)
      return NextResponse.redirect(new URL(`/profile/${id}`, req.url));
    return;
  } else if (req.nextUrl.pathname.startsWith("/profile/")) {
    const id = req.nextUrl.pathname.slice(9, req.nextUrl.pathname.length);

    try {
      const res = await fetch(`http://localhost:3000/api/user/${id}`);
      const user = await res.json();
      console.log(user);
      if (user && user.Profile) return;
    } catch (error) {
      console.error(error);
      return NextResponse.redirect(new URL(`/profile/${id}/create`, req.url));
    }
  }

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
    if (token?.sub) {
      (req as AuthenticatedRequest).user = {
        id: token.sub,
      };
    }
  } catch (error) {
    console.log(error);
    return;
  }

  const authUser = (req as AuthenticatedRequest).user;

  if (!authUser && req.nextUrl.pathname.startsWith("/login")) return;
  if (!authUser && req.nextUrl.pathname.startsWith("/register")) return;

  if (!authUser) return NextResponse.redirect(new URL("/login", req.url));

  if (
    (req.url.includes("/login") || req.url.includes("/register")) &&
    authUser
  ) {
    return NextResponse.redirect(new URL(`/profile/${authUser.id}`, req.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/register/",
    "/login/",
    "/profile/:id/",
    "/profile/:id/create",
    "/api/profile",
    "/api/profile/:path*",
  ],
};
