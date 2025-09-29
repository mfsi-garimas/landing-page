/*
  Warnings:

  - Added the required column `slug` to the `Insights` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `SuccessStories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Insights` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `SuccessStories` ADD COLUMN `slug` VARCHAR(191) NOT NULL;
