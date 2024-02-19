import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const id = params.id;
  const user = await currentUser();

  if (!user) return NextResponse.json({ message: "Unauthorized" });

  const folder = await prisma.folder.findUnique({
    where: { id },
    include: { uploads: true },
  });

  if (!folder) return NextResponse.json({ message: "Folder not found" });

  return NextResponse.json(folder);
};
