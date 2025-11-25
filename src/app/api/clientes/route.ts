import { NextResponse } from 'next/server';
import { crearCliente, obtenerClientePorId } from '@/lib/cliente';

export async function POST(req: Request) {
  const data = await req.json();

  const existente = await obtenerClientePorId(data.IDcliente);

  if (existente) {
    return NextResponse.json({ ok: false, message: 'El cliente ya existe' }, { status: 400 });
  }

  const nuevoCliente = await crearCliente(data);

  return NextResponse.json({ ok: true, cliente: nuevoCliente });
}
