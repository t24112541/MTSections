/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `section` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `section_code_key` ON `section`(`code`);
