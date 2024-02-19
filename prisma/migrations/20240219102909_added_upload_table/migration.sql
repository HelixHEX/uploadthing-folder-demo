/*
  Warnings:

  - You are about to drop the column `url` on the `Folder` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Folder_url_key";

-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "url";

-- CreateTable
CREATE TABLE "Upload" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,
    "folderId" TEXT NOT NULL,

    CONSTRAINT "Upload_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Upload_url_key" ON "Upload"("url");

-- AddForeignKey
ALTER TABLE "Upload" ADD CONSTRAINT "Upload_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
