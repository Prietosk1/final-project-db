import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

// Obtener todos los clientes
export async function obtenerClientes() {
  try {
    return await prisma.cliente.findMany();
  } catch (error) {
    console.error('Error obteniendo clientes:', error);
    throw new Error('No se pudieron obtener los clientes');
  }
}

// Obtener un cliente por ID
export async function obtenerClientePorId(id: number) {
  try {
    return await prisma.cliente.findUnique({
      where: { IDcliente: id },
    });
  } catch (error) {
    console.error('Error obteniendo cliente por ID:', error);
    throw new Error('No se pudo obtener el cliente');
  }
}
