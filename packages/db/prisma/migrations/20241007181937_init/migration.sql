/*
  Warnings:

  - Added the required column `groupImage` to the `chat_groups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chat_groups" ADD COLUMN     "groupImage" TEXT NOT NULL;
