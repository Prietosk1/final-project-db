import { prisma } from './prismaLib';

export async function getAllinventario() {
  return await prisma.Inventario.findMany();
}
