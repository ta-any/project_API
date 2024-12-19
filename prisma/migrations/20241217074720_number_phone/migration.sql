/*
  Warnings:

  - Added the required column `number_phone` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tasks` ADD COLUMN `info` JSON NULL,
    ADD COLUMN `number_phone` INTEGER NOT NULL;
