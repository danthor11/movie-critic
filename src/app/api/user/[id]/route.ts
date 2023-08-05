import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

interface UserRequest {
  password: string;
  username: string;
  email: string;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { email, username, password } = (await req.json()) as UserRequest;

    if (!email && !username && !password)
      throw new Error("Fields cannot be empty");

    const isError = await prisma.user.findMany({
      where: { OR: [{ username }, { email }] },
    });

    if (isError.length > 1)
      throw new Error("Email or username already exists.");

    const newData = {} as UserRequest;

    if (email) newData.email = email;

    if (password) newData.password = await bcrypt.hash(password, 10);

    if (username) newData.username = username;

    const user = await prisma.user.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        ...newData,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Usernam" }, { status: 410 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
  } catch (error) {
    return NextResponse.json(
      { error: "Username and password are not valid" },
      { status: 410 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await prisma.user.delete({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json(deleted ? true : false);
  } catch (error) {
    return NextResponse.json({ error: "Occur an error" }, { status: 410 });
  }
}
