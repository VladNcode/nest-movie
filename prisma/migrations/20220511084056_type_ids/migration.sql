/*
  Warnings:

  - Added the required column `type_id` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_id` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_id` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "type_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "type_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Rating" ADD COLUMN     "type_id" INTEGER NOT NULL;
