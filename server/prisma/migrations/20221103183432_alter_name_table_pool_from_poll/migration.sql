/*
  Warnings:

  - You are about to drop the column `poolId` on the `participants` table. All the data in the column will be lost.
  - You are about to drop the `pools` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,pollId]` on the table `participants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pollId` to the `participants` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "participants" DROP CONSTRAINT "participants_poolId_fkey";

-- DropForeignKey
ALTER TABLE "pools" DROP CONSTRAINT "pools_ownerId_fkey";

-- DropIndex
DROP INDEX "participants_userId_poolId_key";

-- AlterTable
ALTER TABLE "participants" DROP COLUMN "poolId",
ADD COLUMN     "pollId" TEXT NOT NULL;

-- DropTable
DROP TABLE "pools";

-- CreateTable
CREATE TABLE "polls" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "polls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "polls_code_key" ON "polls"("code");

-- CreateIndex
CREATE UNIQUE INDEX "participants_userId_pollId_key" ON "participants"("userId", "pollId");

-- AddForeignKey
ALTER TABLE "polls" ADD CONSTRAINT "polls_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participants" ADD CONSTRAINT "participants_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "polls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
