-- CreateTable
CREATE TABLE "Articulo" (
    "IDarticulo" SERIAL NOT NULL,
    "Nombre" TEXT NOT NULL,
    "Precio" DECIMAL(65,30) NOT NULL,
    "Tamaño" DOUBLE PRECISION NOT NULL,
    "Talla" TEXT NOT NULL,
    "IDcategoria" INTEGER NOT NULL,

    CONSTRAINT "Articulo_pkey" PRIMARY KEY ("IDarticulo")
);

-- CreateTable
CREATE TABLE "CategoriaArticulo" (
    "IDcategoria" SERIAL NOT NULL,
    "Nombre" TEXT NOT NULL,
    "FechaModificacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoriaArticulo_pkey" PRIMARY KEY ("IDcategoria")
);

-- AddForeignKey
ALTER TABLE "Articulo" ADD CONSTRAINT "Articulo_IDcategoria_fkey" FOREIGN KEY ("IDcategoria") REFERENCES "CategoriaArticulo"("IDcategoria") ON DELETE RESTRICT ON UPDATE CASCADE;
