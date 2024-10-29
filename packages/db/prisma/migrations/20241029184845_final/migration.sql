/*
  Warnings:

  - A unique constraint covering the columns `[user_id,group_id]` on the table `recently_joined_groups` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "recently_joined_groups_user_id_group_id_key" ON "recently_joined_groups"("user_id", "group_id");
