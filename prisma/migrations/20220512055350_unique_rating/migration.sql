/*
  Warnings:

  - A unique constraint covering the columns `[user_id,rating_type,type_id]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rating" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Rating_user_id_rating_type_type_id_key" ON "Rating"("user_id", "rating_type", "type_id");
