-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password_reset_expires" DROP NOT NULL,
ALTER COLUMN "password_reset_token" DROP NOT NULL;
