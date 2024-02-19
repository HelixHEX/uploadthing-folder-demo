"use server";

import prisma from "@/lib/prisma";

export const uploadToFolder = async ({
  url,
  folderId,
}: {
  url: string;
  folderId: string;
}) => {
  const upload = await prisma.upload.create({
    data: {
      url,
      folder: {
        connect: {
          id: folderId,
        },
      },
    },
  });
  return upload;
};

// export const useUploadToFolder = () => {
//   return useMutation({
//     mutationFn: uploadToFolder,
//   });
// };
