/*
  Warnings:

  - You are about to drop the column `client_secred` on the `section_client` table. All the data in the column will be lost.
  - Added the required column `client_secret` to the `section_client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `section_client` DROP COLUMN `client_secred`,
    ADD COLUMN `client_secret` TEXT NOT NULL;
