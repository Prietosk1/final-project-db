/*
  Warnings:

  - You are about to drop the column `Talla` on the `Articulo` table. All the data in the column will be lost.
  - You are about to drop the column `Tamaño` on the `Articulo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Articulo" DROP COLUMN "Talla",
DROP COLUMN "Tamaño";

-- AlterTable
ALTER TABLE "MetodoPago" ALTER COLUMN "NumCuenta" SET DATA TYPE DOUBLE PRECISION;
