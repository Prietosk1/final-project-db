import { prisma } from './prismaLib';

export async function crearPedido({
  IDvendedor,
  IDcliente,
  IDmetodoPago,
  FechaInicio,
  FechaEntrega,
  Direccion,
  IDrepartidor,
  TotalVenta,
}: {
  IDvendedor: number;
  IDcliente: number;
  IDmetodoPago: number;
  FechaInicio: Date;
  FechaEntrega: Date;
  Direccion: string;
  IDrepartidor: number;
  TotalVenta: number;
}) {
  try {
    const nuevoPedido = await prisma.pedido.create({
      data: {
        IDvendedor,
        IDcliente,
        IDmetodoPago,
        FechaInicio,
        FechaEntrega,
        Direccion,
        IDrepartidor,
        TotalVenta,
      },
    });

    return {
      ok: true,
      pedido: nuevoPedido,
    };
  } catch (error) {
    console.error('Error creando el pedido:', error);

    return {
      ok: false,
      error: error,
    };
  }
}
