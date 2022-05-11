/*
  Warnings:

  - You are about to drop the column `rating` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Review` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "RatingType" AS ENUM ('actor', 'movie', 'review');

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "rating";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "rating";

-- CreateTable
CREATE TABLE "Rating" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rating_type" "RatingType" NOT NULL,
    "score" SMALLINT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rating_user_id_key" ON "Rating"("user_id");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
