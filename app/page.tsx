"use client";

import { UploadButton } from "./utils/uploadthing";

export default function Home() {
  return (
    <main className="flex flex-row pt-10">
      <h3 className="mr-4 text-3xl font-bold text-gray-800">Folders</h3>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
