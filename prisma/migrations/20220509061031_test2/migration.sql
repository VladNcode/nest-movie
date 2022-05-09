/*
  Warnings:

  - A unique constraint covering the columns `[tag]` on the table `Actor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tag` to the `Actor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Actor" ADD COLUMN     "tag" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Actor_tag_key" ON "Actor"("tag");
