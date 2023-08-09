import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getErrorResponse } from "@/lib/helpers";

export async function GET() {
  const profiles = await prisma.profile.findMany();
  console.log(profiles);
  return NextResponse.json(profiles);
}

interface ProfileRequest {
  name: string;
  bio: string;
  location: string;
  avatar: string;
  userId: string;
}

export async function POST(req: NextRequest) {
  try {
    const {
      avatar = "",
      bio,
      location,
      name,
      userId,
    } = (await req.json()) as ProfileRequest;

    if (!name && !bio && !location && !userId)
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 410 }
      );
    console.log({ avatar, bio, location, name, userId });

    const profile = await prisma.profile.create({
      data: { avatar, bio, location, name, userId },
    });
    console.log(profile);

    return NextResponse.json(profile);
  } catch (error) {
    console.log(error);
    return getErrorResponse(400, "Errror");
  }
}
