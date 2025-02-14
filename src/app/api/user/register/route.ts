import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { getErrorResponse } from "@/lib/helpers";

export interface UserRequest {
  username: string;
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  const { email, password, username } = (await request.json()) as UserRequest;
  try {
    console.log({ email, password, username });
    const passwordHash = await bcrypt.hash(password, 10);

    const userExist = await prisma.user.findMany({
      where: { OR: [{ email }, { username }] },
    });

    if (userExist.length)
      return getErrorResponse(400, "Email or username already exists.");

    const userSaved = await prisma?.user.create({
      data: {
        email,
        password: passwordHash,
        username,
      },
    });

    // const profile = await prisma.profile.create({
    //   data: {
    //     name: "",
    //     bio: "",
    //     location: "",
    //     avatar: "",
    //     userId: userSaved.id,
    //   },
    // });

    return NextResponse.json({ userSaved });
  } catch (error) {
    console.log(error, "error");
    return NextResponse.json({ error }, { status: 410 });
  }
}
