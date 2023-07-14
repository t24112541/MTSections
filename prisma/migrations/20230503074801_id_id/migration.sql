/*
  Warnings:

  - The primary key for the `section` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `section` table. All the data in the column will be lost.
  - Added the required column `ID` to the `section` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `section` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `ID` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`ID`);
