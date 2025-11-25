import { prisma } from './prismaLib';

export async function getAllArticulos() {
  return await prisma.Articulo.findMany();
}
