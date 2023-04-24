-- CreateTable
CREATE TABLE `section` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `is_active` ENUM('0', '1') NOT NULL DEFAULT '1',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `subdistrict_id` INTEGER UNSIGNED NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `section` ADD CONSTRAINT `section_subdistrict_id_fkey` FOREIGN KEY (`subdistrict_id`) REFERENCES `location_subdistrict`(`subdistrict_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
