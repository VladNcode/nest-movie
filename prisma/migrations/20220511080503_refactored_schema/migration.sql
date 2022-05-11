/*
  Warnings:

  - You are about to drop the column `actor_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `movie_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `review_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `actor_id` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `comment4comment_id` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `comment_id` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `movie_id` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `review_id` on the `Like` table. All the data in the column will be lost.
  - Added the required column `comment_type` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `like_type` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LikeType" AS ENUM ('movie', 'actor', 'review', 'comment', 'comment4Comment');

-- CreateEnum
CREATE TYPE "CommentType" AS ENUM ('actor', 'movie', 'review');

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_actor_id_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_movie_id_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_review_id_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_actor_id_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_comment4comment_id_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_movie_id_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_review_id_fkey";

-- DropIndex
DROP INDEX "Comment_actor_id_key";

-- DropIndex
DROP INDEX "Comment_movie_id_key";

-- DropIndex
DROP INDEX "Comment_review_id_key";

-- DropIndex
DROP INDEX "Like_actor_id_key";

-- DropIndex
DROP INDEX "Like_comment4comment_id_key";

-- DropIndex
DROP INDEX "Like_comment_id_key";

-- DropIndex
DROP INDEX "Like_movie_id_key";

-- DropIndex
DROP INDEX "Like_review_id_key";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "actor_id",
DROP COLUMN "movie_id",
DROP COLUMN "review_id",
ADD COLUMN     "comment_type" "CommentType" NOT NULL;

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "actor_id",
DROP COLUMN "comment4comment_id",
DROP COLUMN "comment_id",
DROP COLUMN "movie_id",
DROP COLUMN "review_id",
ADD COLUMN     "like_type" "LikeType" NOT NULL;
