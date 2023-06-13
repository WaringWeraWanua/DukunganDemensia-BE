/*
  Warnings:

  - You are about to drop the column `careId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "careId",
DROP COLUMN "patientId";
