/*
  Warnings:

  - Added the required column `date` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
