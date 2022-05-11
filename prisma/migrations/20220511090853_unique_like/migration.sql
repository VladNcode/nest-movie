/*
  Warnings:

  - A unique constraint covering the columns `[user_id,like_type,type_id]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Like_user_id_like_type_type_id_key" ON "Like"("user_id", "like_type", "type_id");
