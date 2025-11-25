import { prisma } from './prismaLib';

export async function getAllRepartidor() {
  return await prisma.Repartidor.findMany();
}
