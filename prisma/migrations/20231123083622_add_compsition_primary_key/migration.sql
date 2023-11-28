/*
  Warnings:

  - You are about to drop the `config` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[websiteName,url]` on the table `Record` will be added. If there are existing duplicate values, this will fail.

*/
-- DropTable
DROP TABLE "config";

-- CreateTable
CREATE TABLE "Config" (
    "id" TEXT NOT NULL,
    "enable" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "description_en" TEXT NOT NULL,
    "syncDataAt" TIMESTAMP(3) NOT NULL,
    "checkDataAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Config_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Record_websiteName_url_key" ON "Record"("websiteName", "url");
