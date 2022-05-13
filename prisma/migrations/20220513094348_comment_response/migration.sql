/*
  Warnings:

  - You are about to drop the `Comment4Comment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment4Comment" DROP CONSTRAINT "Comment4Comment_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "Comment4Comment" DROP CONSTRAINT "Comment4Comment_user_id_fkey";

-- DropTable
DROP TABLE "Comment4Comment";

-- CreateTable
CREATE TABLE "CommentResponse" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "body" VARCHAR(240) NOT NULL,
    "comment_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "CommentResponse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommentResponse" ADD CONSTRAINT "CommentResponse_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentResponse" ADD CONSTRAINT "CommentResponse_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
