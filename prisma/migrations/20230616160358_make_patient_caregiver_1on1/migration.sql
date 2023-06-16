/*
  Warnings:

  - A unique constraint covering the columns `[careGiverId]` on the table `CareRelation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[patientId]` on the table `CareRelation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CareRelation_careGiverId_key" ON "CareRelation"("careGiverId");

-- CreateIndex
CREATE UNIQUE INDEX "CareRelation_patientId_key" ON "CareRelation"("patientId");
