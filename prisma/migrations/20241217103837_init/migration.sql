-- AlterTable
ALTER TABLE `tasks` MODIFY `number_phone` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `calls` (
    `Id_API` INTEGER NOT NULL,
    `task_id` INTEGER NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `status_task` VARCHAR(191) NOT NULL,
    `info_result` JSON NULL,

    UNIQUE INDEX `calls_Id_API_key`(`Id_API`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
