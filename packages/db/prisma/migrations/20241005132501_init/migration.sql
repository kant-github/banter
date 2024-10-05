/*
  Warnings:

  - You are about to drop the column `created_at` on the `group_users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `group_users` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `group_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "group_users" DROP COLUMN "created_at",
DROP COLUMN "name",
ADD COLUMN     "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "group_users" ADD CONSTRAINT "group_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
