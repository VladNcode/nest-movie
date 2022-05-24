/*
  Warnings:

  - Added the required column `password_reset_expires` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_reset_token` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password_reset_expires" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "password_reset_token" TEXT NOT NULL;
