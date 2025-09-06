/*
  Warnings:

  - You are about to drop the column `criadoPorId` on the `ocorrencias` table. All the data in the column will be lost.
  - You are about to drop the column `equipeId` on the `ocorrencias` table. All the data in the column will be lost.
  - You are about to drop the column `horaFim` on the `ocorrencias` table. All the data in the column will be lost.
  - You are about to drop the column `horaInicio` on the `ocorrencias` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `ocorrencias` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `ocorrencias` table. All the data in the column will be lost.
  - You are about to drop the column `numero` on the `ocorrencias` table. All the data in the column will be lost.
  - You are about to drop the column `viaturaId` on the `ocorrencias` table. All the data in the column will be lost.
  - You are about to alter the column `tipo` on the `ocorrencias` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - The values [CRITICA] on the enum `ocorrencias_prioridade` will be removed. If these variants are still used in the database, this will fail.
  - The values [CANCELADA] on the enum `ocorrencias_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `ativo` on the `users` table. All the data in the column will be lost.
  - The values [COMANDANTE,TENENTE,SARGENTO,OPERADOR] on the enum `users_role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `anexos_ocorrencias` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `atualizacoes_ocorrencias` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `equipe_membros` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `equipes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `escalas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `manutencoes_viaturas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `materiais` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `materiais_utilizados` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `viaturas` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `responsavelId` on table `ocorrencias` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `anexos_ocorrencias` DROP FOREIGN KEY `anexos_ocorrencias_ocorrenciaId_fkey`;

-- DropForeignKey
ALTER TABLE `atualizacoes_ocorrencias` DROP FOREIGN KEY `atualizacoes_ocorrencias_ocorrenciaId_fkey`;

-- DropForeignKey
ALTER TABLE `equipe_membros` DROP FOREIGN KEY `equipe_membros_equipeId_fkey`;

-- DropForeignKey
ALTER TABLE `equipe_membros` DROP FOREIGN KEY `equipe_membros_userId_fkey`;

-- DropForeignKey
ALTER TABLE `escalas` DROP FOREIGN KEY `escalas_bombeiroId_fkey`;

-- DropForeignKey
ALTER TABLE `escalas` DROP FOREIGN KEY `escalas_equipeId_fkey`;

-- DropForeignKey
ALTER TABLE `escalas` DROP FOREIGN KEY `escalas_viaturaId_fkey`;

-- DropForeignKey
ALTER TABLE `manutencoes_viaturas` DROP FOREIGN KEY `manutencoes_viaturas_viaturaId_fkey`;

-- DropForeignKey
ALTER TABLE `materiais_utilizados` DROP FOREIGN KEY `materiais_utilizados_materialId_fkey`;

-- DropForeignKey
ALTER TABLE `materiais_utilizados` DROP FOREIGN KEY `materiais_utilizados_ocorrenciaId_fkey`;

-- DropForeignKey
ALTER TABLE `ocorrencias` DROP FOREIGN KEY `ocorrencias_criadoPorId_fkey`;

-- DropForeignKey
ALTER TABLE `ocorrencias` DROP FOREIGN KEY `ocorrencias_equipeId_fkey`;

-- DropForeignKey
ALTER TABLE `ocorrencias` DROP FOREIGN KEY `ocorrencias_responsavelId_fkey`;

-- DropForeignKey
ALTER TABLE `ocorrencias` DROP FOREIGN KEY `ocorrencias_viaturaId_fkey`;

-- DropIndex
DROP INDEX `ocorrencias_criadoPorId_fkey` ON `ocorrencias`;

-- DropIndex
DROP INDEX `ocorrencias_equipeId_fkey` ON `ocorrencias`;

-- DropIndex
DROP INDEX `ocorrencias_numero_key` ON `ocorrencias`;

-- DropIndex
DROP INDEX `ocorrencias_responsavelId_fkey` ON `ocorrencias`;

-- DropIndex
DROP INDEX `ocorrencias_viaturaId_fkey` ON `ocorrencias`;

-- AlterTable
ALTER TABLE `ocorrencias` DROP COLUMN `criadoPorId`,
    DROP COLUMN `equipeId`,
    DROP COLUMN `horaFim`,
    DROP COLUMN `horaInicio`,
    DROP COLUMN `latitude`,
    DROP COLUMN `longitude`,
    DROP COLUMN `numero`,
    DROP COLUMN `viaturaId`,
    MODIFY `tipo` VARCHAR(191) NOT NULL,
    MODIFY `prioridade` ENUM('BAIXA', 'MEDIA', 'ALTA') NOT NULL,
    MODIFY `status` ENUM('AGUARDANDO', 'EM_ANDAMENTO', 'CONCLUIDA') NOT NULL DEFAULT 'AGUARDANDO',
    MODIFY `responsavelId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `ativo`,
    MODIFY `role` ENUM('ADMIN', 'BOMBEIRO') NOT NULL DEFAULT 'BOMBEIRO';

-- DropTable
DROP TABLE `anexos_ocorrencias`;

-- DropTable
DROP TABLE `atualizacoes_ocorrencias`;

-- DropTable
DROP TABLE `equipe_membros`;

-- DropTable
DROP TABLE `equipes`;

-- DropTable
DROP TABLE `escalas`;

-- DropTable
DROP TABLE `manutencoes_viaturas`;

-- DropTable
DROP TABLE `materiais`;

-- DropTable
DROP TABLE `materiais_utilizados`;

-- DropTable
DROP TABLE `viaturas`;

-- AddForeignKey
ALTER TABLE `ocorrencias` ADD CONSTRAINT `ocorrencias_responsavelId_fkey` FOREIGN KEY (`responsavelId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
