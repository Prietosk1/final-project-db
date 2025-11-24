/*
  Warnings:

  - You are about to alter the column `Precio` on the `Articulo` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(12,2)`.

*/
-- AlterTable
ALTER TABLE "Articulo" ALTER COLUMN "Precio" SET DATA TYPE DECIMAL(12,2);

-- CreateTable
CREATE TABLE "Inventario" (
    "IDarticulo" INTEGER NOT NULL,
    "NumEstanteria" INTEGER NOT NULL,
    "CantDisponible" INTEGER NOT NULL,

    CONSTRAINT "Inventario_pkey" PRIMARY KEY ("IDarticulo")
);

-- CreateTable
CREATE TABLE "Empleado" (
    "IDempleado" SERIAL NOT NULL,
    "Nombre" TEXT NOT NULL,
    "Apellido" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "TelEmpresa" INTEGER NOT NULL,
    "MailEmpresa" TEXT NOT NULL,
    "Nacimiento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Empleado_pkey" PRIMARY KEY ("IDempleado")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "IDcliente" SERIAL NOT NULL,
    "Nombre" TEXT NOT NULL,
    "Apellido" TEXT NOT NULL,
    "Tel" INTEGER NOT NULL,
    "Mail" TEXT NOT NULL,
    "Nacimiento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("IDcliente")
);

-- CreateTable
CREATE TABLE "Repartidor" (
    "IDrepartidor" SERIAL NOT NULL,
    "Nombre" TEXT NOT NULL,
    "Apellido" TEXT NOT NULL,
    "Vehiculo" TEXT NOT NULL,
    "Placa" TEXT NOT NULL,
    "TelEmpresa" INTEGER NOT NULL,
    "Nacimiento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Repartidor_pkey" PRIMARY KEY ("IDrepartidor")
);

-- CreateTable
CREATE TABLE "MetodoPago" (
    "IDmetodo" SERIAL NOT NULL,
    "Banco" TEXT NOT NULL,
    "FormatoPago" TEXT NOT NULL,
    "NumCuenta" INTEGER NOT NULL,

    CONSTRAINT "MetodoPago_pkey" PRIMARY KEY ("IDmetodo")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "IDpedido" SERIAL NOT NULL,
    "IDvendedor" INTEGER NOT NULL,
    "IDcliente" INTEGER NOT NULL,
    "IDmetodoPago" INTEGER NOT NULL,
    "FechaInicio" TIMESTAMP(3) NOT NULL,
    "FechaEntrega" TIMESTAMP(3) NOT NULL,
    "Direccion" TEXT NOT NULL,
    "IDrepartidor" INTEGER NOT NULL,
    "EstadoVenta" BOOLEAN NOT NULL DEFAULT true,
    "TotalVenta" DECIMAL(14,2) NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("IDpedido")
);

-- CreateTable
CREATE TABLE "DetallePedido" (
    "IDdetalle" INTEGER NOT NULL,
    "IDpedido" INTEGER NOT NULL,
    "IDarticulo" INTEGER NOT NULL,
    "CantidadArti" INTEGER NOT NULL,
    "Descuento" DECIMAL(5,2) NOT NULL,
    "ValorTotal" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "DetallePedido_pkey" PRIMARY KEY ("IDdetalle","IDpedido")
);

-- AddForeignKey
ALTER TABLE "Inventario" ADD CONSTRAINT "Inventario_IDarticulo_fkey" FOREIGN KEY ("IDarticulo") REFERENCES "Articulo"("IDarticulo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_IDvendedor_fkey" FOREIGN KEY ("IDvendedor") REFERENCES "Empleado"("IDempleado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_IDcliente_fkey" FOREIGN KEY ("IDcliente") REFERENCES "Cliente"("IDcliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_IDmetodoPago_fkey" FOREIGN KEY ("IDmetodoPago") REFERENCES "MetodoPago"("IDmetodo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_IDrepartidor_fkey" FOREIGN KEY ("IDrepartidor") REFERENCES "Repartidor"("IDrepartidor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetallePedido" ADD CONSTRAINT "DetallePedido_IDpedido_fkey" FOREIGN KEY ("IDpedido") REFERENCES "Pedido"("IDpedido") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetallePedido" ADD CONSTRAINT "DetallePedido_IDarticulo_fkey" FOREIGN KEY ("IDarticulo") REFERENCES "Articulo"("IDarticulo") ON DELETE RESTRICT ON UPDATE CASCADE;
