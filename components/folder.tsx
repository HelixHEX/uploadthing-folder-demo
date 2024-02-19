"use client";

import { useFolder, type Folder } from "@/lib/api/client";
import { useState } from "react";
import Upload from "@/components/upload";

export default function Folder({ folder }: { folder: Folder }) {
  const [open, setOpen] = useState<boolean>(false);
  const { data: folderUploads, isPending } = useFolder({
    id: folder.id,
    enabled: open,
  });

  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        className="mt-4 w-full select-none rounded-md border-2 border-black bg-black px-4 py-2 text-white hover:cursor-pointer"
      >
        <p className="select-none">
          {open ? "▲" : "▼"} {folder.name}
        </p>
      </div>
      {!isPending && open ? (
        folderUploads &&
        folderUploads.uploads &&
        folderUploads.uploads.length > 0 ? (
          folderUploads.uploads.map((upload, index) => (
            <Upload key={index} upload={upload} />
          ))
        ) : (
          <p className="mt-2 text-center">No uploads</p>
        )
      ) : null}
    </>
  );
}
