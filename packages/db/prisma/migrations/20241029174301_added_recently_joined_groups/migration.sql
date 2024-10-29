-- CreateTable
CREATE TABLE "recently_joined_groups" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "group_id" UUID NOT NULL,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recently_joined_groups_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "recently_joined_groups" ADD CONSTRAINT "recently_joined_groups_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recently_joined_groups" ADD CONSTRAINT "recently_joined_groups_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "chat_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
