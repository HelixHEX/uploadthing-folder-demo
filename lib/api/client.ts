import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import prisma from "@/lib/prisma";

/* QUERIES */
export const getFolders = async () => {
  const res = await axios.get("/api/folders");
  return res.data;
};

export const useFolders = () => {
  return useQuery<FoldersResponse>({
    queryKey: ["folders"],
    queryFn: getFolders,
  });
};

export const getFolder = async (id: string) => {
  const res = await axios.get(`/api/folders/${id}`);
  return res.data;
};

export const useFolder = ({
  id,
  enabled,
}: {
  id: string;
  enabled: boolean;
}) => {
  return useQuery<FolderUploadsResponse>({
    queryKey: ["folder", id],
    queryFn: () => getFolder(id),
    enabled,
  });
};

/* MUTATIONS */
const createFolder = async ({ name }: { name: string }) => {
  const res = await axios.post("/api/folders", { name });
  return res.data;
};

export const useCreateFolder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });
};

export type Folder = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: String;
  userId: String;
  uploads?: Upload[];
};

export type Upload = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  url: string;
  folder: Folder;
  folderId: number;
};

type FoldersResponse = Folder[];

type FolderUploadsResponse = Folder;
