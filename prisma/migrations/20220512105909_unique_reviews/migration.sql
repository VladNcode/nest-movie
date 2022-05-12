/*
  Warnings:

  - A unique constraint covering the columns `[user_id,movie_id]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Review_movie_id_key";

-- DropIndex
DROP INDEX "Review_user_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Review_user_id_movie_id_key" ON "Review"("user_id", "movie_id");
