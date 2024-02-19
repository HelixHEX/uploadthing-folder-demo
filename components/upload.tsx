import { type Upload } from "@/lib/api/client";

export default function Upload({ upload }: { upload: Upload }) {
  return <p className="mt-2">{upload.url}</p>;
}
