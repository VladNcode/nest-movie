/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Actor` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Actor` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Actor` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Actor` table. All the data in the column will be lost.
  - You are about to drop the column `actorId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `reviewId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `commentId` on the `Comment4Comment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Comment4Comment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Comment4Comment` table. All the data in the column will be lost.
  - You are about to drop the column `actorId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `comment4CommentId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `commentId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `reviewId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `releaseDate` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[actor_id]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[movie_id]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[review_id]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[comment_id]` on the table `Comment4Comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[movie_id]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[actor_id]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[review_id]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[comment_id]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[comment4comment_id]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[movie_id]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `first_name` to the `Actor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Actor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Actor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actor_id` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movie_id` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `review_id` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment_id` to the `Comment4Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Comment4Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actor_id` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment4comment_id` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment_id` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movie_id` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `review_id` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `release_date` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movie_id` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_actorId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Comment4Comment" DROP CONSTRAINT "Comment4Comment_commentId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_actorId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_comment4CommentId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_commentId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- DropIndex
DROP INDEX "Comment_actorId_key";

-- DropIndex
DROP INDEX "Comment_movieId_key";

-- DropIndex
DROP INDEX "Comment_reviewId_key";

-- DropIndex
DROP INDEX "Comment_userId_key";

-- DropIndex
DROP INDEX "Comment4Comment_commentId_key";

-- DropIndex
DROP INDEX "Like_actorId_key";

-- DropIndex
DROP INDEX "Like_comment4CommentId_key";

-- DropIndex
DROP INDEX "Like_commentId_key";

-- DropIndex
DROP INDEX "Like_movieId_key";

-- DropIndex
DROP INDEX "Like_reviewId_key";

-- DropIndex
DROP INDEX "Like_userId_key";

-- DropIndex
DROP INDEX "Review_movieId_key";

-- DropIndex
DROP INDEX "Review_userId_key";

-- AlterTable
ALTER TABLE "Actor" DROP COLUMN "createdAt",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "actorId",
DROP COLUMN "createdAt",
DROP COLUMN "movieId",
DROP COLUMN "reviewId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "actor_id" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "movie_id" INTEGER NOT NULL,
ADD COLUMN     "review_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Comment4Comment" DROP COLUMN "commentId",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "comment_id" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "actorId",
DROP COLUMN "comment4CommentId",
DROP COLUMN "commentId",
DROP COLUMN "createdAt",
DROP COLUMN "movieId",
DROP COLUMN "reviewId",
DROP COLUMN "userId",
ADD COLUMN     "actor_id" INTEGER NOT NULL,
ADD COLUMN     "comment4comment_id" INTEGER NOT NULL,
ADD COLUMN     "comment_id" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "movie_id" INTEGER NOT NULL,
ADD COLUMN     "review_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "createdAt",
DROP COLUMN "releaseDate",
ADD COLUMN     "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "release_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "createdAt",
DROP COLUMN "movieId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "movie_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "passwordHash",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "password_hash" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Comment_user_id_key" ON "Comment"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_actor_id_key" ON "Comment"("actor_id");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_movie_id_key" ON "Comment"("movie_id");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_review_id_key" ON "Comment"("review_id");

-- CreateIndex
CREATE UNIQUE INDEX "Comment4Comment_comment_id_key" ON "Comment4Comment"("comment_id");

-- CreateIndex
CREATE UNIQUE INDEX "Like_user_id_key" ON "Like"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Like_movie_id_key" ON "Like"("movie_id");

-- CreateIndex
CREATE UNIQUE INDEX "Like_actor_id_key" ON "Like"("actor_id");

-- CreateIndex
CREATE UNIQUE INDEX "Like_review_id_key" ON "Like"("review_id");

-- CreateIndex
CREATE UNIQUE INDEX "Like_comment_id_key" ON "Like"("comment_id");

-- CreateIndex
CREATE UNIQUE INDEX "Like_comment4comment_id_key" ON "Like"("comment4comment_id");

-- CreateIndex
CREATE UNIQUE INDEX "Review_user_id_key" ON "Review"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Review_movie_id_key" ON "Review"("movie_id");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "Actor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment4Comment" ADD CONSTRAINT "Comment4Comment_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "Actor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_comment4comment_id_fkey" FOREIGN KEY ("comment4comment_id") REFERENCES "Comment4Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
