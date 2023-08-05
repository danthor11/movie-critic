import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { signJWT } from "@/lib/jwt";
import { getErrorResponse } from "@/lib/helpers";

interface LoginRequest {
  username: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const { password, username } = (await req.json()) as LoginRequest;

    const userFinded = await prisma.user.findFirst({ where: { username } });

    if (!userFinded)
      return getErrorResponse(400, "Username and password are not valid");

    const isPasswordOk = await bcrypt.compare(password, userFinded.password);

    if (!isPasswordOk)
      return getErrorResponse(400, "Username and password are not valid");

    const body = {
      id: userFinded.id,
      username: userFinded.username,
    };

    const token = await signJWT(body);

    const cookieOptions = {
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 2,
    };

    const response = new NextResponse(
      JSON.stringify({
        status: "success",
        token,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

    await Promise.all([
      response.cookies.set(cookieOptions),
      response.cookies.set({
        name: "logged-in",
        value: "true",
        maxAge: 60 * 60 * 2,
      }),
    ]);

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Username and password are not valid" },
      { status: 410 }
    );
  }
}
