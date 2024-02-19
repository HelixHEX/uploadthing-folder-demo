"use client";

import { useState } from "react";
import { UploadButton } from "./utils/uploadthing";
import { useCreateFolder, useFolders } from "@/lib/api/client";
import Folder from "@/components/folder";
import { uploadToFolder } from "@/lib/api/server";
import { useQueryClient } from "@tanstack/react-query";

export default function Home() {
  const { mutate, isPending: isCreatingFolder } = useCreateFolder();
  const { data: folders, isPending: loadingFolders } = useFolders();
  const loadedFolders = !loadingFolders && folders && folders.length > 0;
  const [selectedFolder, setSelectedFolder] = useState<string>("");
  const [folderName, setFolderName] = useState<string>("");
  const queryClient = useQueryClient();

  const createFolder = () => {
    if (folderName.length > 3) {
      mutate({ name: folderName });
      setFolderName("");
    }
  };

  return (
    <div className="">
      <div className="flex flex-row">
        <input
          disabled={isCreatingFolder}
          onChange={(e) => setFolderName(e.target.value)}
          value={folderName}
          className="w-120 mr-4 h-12 appearance-none rounded-md border-2 border-gray-200 bg-black px-4 py-2  text-white"
          id="inline-full-name"
          type="text"
          placeholder="Folder Name"
        />
        <button
          disabled={isCreatingFolder}
          onClick={createFolder}
          className="mr-4 h-12 rounded border border-black bg-transparent px-4 py-2 font-semibold text-black hover:border-transparent hover:bg-black hover:text-white"
        >
          Create Folder
        </button>
        {loadedFolders && (
          <>
            {selectedFolder && (
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(files) => {
                  // Do something with the response
                  const url = files[0].url;
                  uploadToFolder({ url, folderId: selectedFolder });
                  queryClient.invalidateQueries({
                    queryKey: ["folder", selectedFolder],
                  });
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />
            )}
            <select
              value={selectedFolder}
              className={`${selectedFolder ? "ml-4" : ""} h-10 w-36 rounded-md bg-black px-2 text-white hover:cursor-pointer`}
              onChange={(e) => setSelectedFolder(e.target.value)}
            >
              <option value="" disabled selected>
                Select folder
              </option>
              {folders.map((folder, index) => (
                <option value={folder.id} key={index}>
                  {folder.name}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
      <h3 className="mr-4 text-3xl font-bold text-gray-800">Folders</h3>
      <div>
        {loadedFolders &&
          folders.map((folder, index) => (
            <Folder folder={folder} key={index} />
          ))}
      </div>
    </div>
  );
}
