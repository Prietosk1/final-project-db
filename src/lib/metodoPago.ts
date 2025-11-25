import { prisma } from './prismaLib';

export async function getAllMetodoPago() {
  return await prisma.MetodoPago.findMany();
}
