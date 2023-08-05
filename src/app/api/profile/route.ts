import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
  userId: number;
}

export async function POST(req: NextRequest) {
  const { avatar, bio, location, name, userId } =
    (await req.json()) as ProfileRequest;

  if (!name && !bio && !location && !avatar && !userId)
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 410 }
    );

  const profile = prisma.profile.create({
    data: { avatar, bio, location, name, userId },
  });

  return NextResponse.json(profile);
}
