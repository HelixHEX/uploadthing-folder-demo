import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const user = await currentUser();
    if (!user) return NextResponse.json({ message: "Unauthorized" });
    const folders = await prisma.folder.findMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json(folders);
  } catch (e) {
    console.log(e);
  }
};

export const POST = async (req: NextRequest) => {
  const { name } = await req.json();
  const user = await currentUser();

  if (!user) return NextResponse.json({ message: "Unauthorized" });

  const folder = await prisma.folder.create({
    data: {
      name,
      userId: user.id,
    },
  });

  return NextResponse.json({ folder });
};
