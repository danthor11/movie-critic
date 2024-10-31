import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getErrorResponse } from "@/lib/helpers";

interface Params {
  params: {
    id: string;
  };
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const isDeleted = prisma.profile.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ result: isDeleted || false });
  } catch (error) {
    return getErrorResponse(400, "Occur an error");
  }
}

interface ProfilePutRequest {
  name: string;
  location: string;
  bio: string;
  avatar: string;
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { avatar, bio, location, name } =
    (await req.json()) as ProfilePutRequest;

  try {
    const profile = await prisma.profile.findMany({
      where: { id: params.id },
    });

    if (!profile) return getErrorResponse(400, "Profile doesnt exists");

    const newData = {} as ProfilePutRequest;

    if (avatar) newData.avatar = avatar;
    if (bio) newData.bio = bio;
    if (name) newData.name = name;
    if (location) newData.location = location;

    const profileUpdated = await prisma.profile.update({
      where: { id: params.id },
      data: newData,
      include: {
        user: { select: { email: true, username: true, image: true } },
      },
    });

    return NextResponse.json(profileUpdated);
  } catch (error) {
    console.log(error);
    return getErrorResponse(400, "Occur an error");
  }
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    console.log(params, "profile params");

    const profile = await prisma.profile.findFirstOrThrow({
      where: { id: params.id },
      include: { user: { select: { email: true, username: true, id: true } } },
    });
    console.log(profile, "profile");
    return NextResponse.json(profile);
  } catch (error) {
    console.log(error);
    return getErrorResponse(400, "Error trying getting profile data");
  }
}
