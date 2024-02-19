import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // const body = await req.json();
      // This code runs on your server before upload
      const user = await currentUser();

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      // return { userId: user.id, folderId: body.folderId };
      return {
        userId: user.id,
        folderId: "550e25d8-436a-47ae-9889-1c5b5a1ea647",
      };
    })
    .onUploadComplete(async ({ file }) => {
      // This code RUNS ON YOUR SERVER after upload

      return { message: "Uploaded!", url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
