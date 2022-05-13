/*
  Warnings:

  - The values [comment4Comment] on the enum `LikeType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LikeType_new" AS ENUM ('movie', 'actor', 'review', 'comment', 'commentResponse');
ALTER TABLE "Like" ALTER COLUMN "like_type" TYPE "LikeType_new" USING ("like_type"::text::"LikeType_new");
ALTER TYPE "LikeType" RENAME TO "LikeType_old";
ALTER TYPE "LikeType_new" RENAME TO "LikeType";
DROP TYPE "LikeType_old";
COMMIT;
