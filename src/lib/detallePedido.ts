import { prisma } from './prismaLib';

export async function getAllDetallePedido() {
  return await prisma.detallePedido.findMany();
}

export async function crearDetallePedido(
  IDpedido: number,
  IDarticulo: number,
  CantidadArti: number,
  Descuento: number,
  ValorTotal: number,
) {
  // 1. Obtener el último IDdetalle de ese pedido
  const ultimo = await prisma.detallePedido.findFirst({
    where: { IDpedido },
    orderBy: { IDdetalle: 'desc' },
  });

  const nuevoIDdetalle = ultimo ? ultimo.IDdetalle + 1 : 1;

  // 2. Crear el registro
  const detalle = await prisma.detallePedido.create({
    data: {
      IDdetalle: nuevoIDdetalle,
      IDpedido,
      IDarticulo,
      CantidadArti,
      Descuento,
      ValorTotal,
    },
  });

  return detalle;
}
