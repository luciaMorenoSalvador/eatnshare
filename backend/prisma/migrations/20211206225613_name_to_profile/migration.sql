/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `name` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_name_role_idx";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name";

-- CreateIndex
CREATE INDEX "Profile_name_idx" ON "Profile"("name");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");
