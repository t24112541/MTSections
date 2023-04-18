-- CreateTable
CREATE TABLE `section` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `is_active` ENUM('0', '1') NOT NULL DEFAULT '1',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `subdistrict_id` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `location_subdistrict` (
    `subdistrict_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `district_id` INTEGER UNSIGNED NOT NULL,
    `code` VARCHAR(10) NOT NULL,
    `zip_code` VARCHAR(5) NOT NULL,
    `name_th` VARCHAR(255) NOT NULL,
    `name_en` VARCHAR(255) NULL,

    PRIMARY KEY (`subdistrict_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `location_geography` (
    `geography_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name_th` VARCHAR(255) NOT NULL,
    `name_en` VARCHAR(255) NULL,

    PRIMARY KEY (`geography_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `location_province` (
    `province_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `geography_id` INTEGER UNSIGNED NOT NULL,
    `code` VARCHAR(10) NOT NULL,
    `name_th` VARCHAR(255) NOT NULL,
    `name_en` VARCHAR(255) NULL,

    PRIMARY KEY (`province_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `location_district` (
    `district_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `province_id` INTEGER UNSIGNED NOT NULL,
    `code` VARCHAR(10) NOT NULL,
    `name_th` VARCHAR(255) NOT NULL,
    `name_en` VARCHAR(255) NULL,

    PRIMARY KEY (`district_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `section` ADD CONSTRAINT `section_subdistrict_id_fkey` FOREIGN KEY (`subdistrict_id`) REFERENCES `location_subdistrict`(`subdistrict_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `location_subdistrict` ADD CONSTRAINT `location_subdistrict_district_id_fkey` FOREIGN KEY (`district_id`) REFERENCES `location_district`(`district_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `location_province` ADD CONSTRAINT `location_province_geography_id_fkey` FOREIGN KEY (`geography_id`) REFERENCES `location_geography`(`geography_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `location_district` ADD CONSTRAINT `location_district_province_id_fkey` FOREIGN KEY (`province_id`) REFERENCES `location_province`(`province_id`) ON DELETE CASCADE ON UPDATE CASCADE;
