import { NextResponse } from 'next/server';
import { obtenerClientePorId } from '@/lib/cliente';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  const cliente = await obtenerClientePorId(id);

  if (!cliente) {
    return NextResponse.json({ found: false }, { status: 404 });
  }

  return NextResponse.json({ found: true, cliente });
}
