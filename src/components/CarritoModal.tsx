'use client';

import Image from 'next/image';
import { ItemCarrito } from '@/types';

interface CarritoModalProps {
  carrito: ItemCarrito[];
  onCerrar: () => void;
  onEliminar: (id: number) => void;
  onRealizarPago: () => void; // ⬅ NUEVO
}

export default function CarritoModal({
  carrito,
  onCerrar,
  onEliminar,
  onRealizarPago,
}: CarritoModalProps) {
  const total = carrito.reduce((s, item) => s + item.cantidad * item.precio, 0);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-[#FFFDF9] w-[95%] max-w-3xl p-6 rounded-3xl shadow-xl relative border border-[#E3C7C7]">
        {/* Cerrar */}
        <button
          onClick={onCerrar}
          className="absolute top-3 right-4 text-3xl font-bold text-[#5A2E1C]"
        >
          ×
        </button>

        {/* Título */}
        <h2 className="text-3xl font-bold text-center text-[#5A2E1C] mb-4">
          Productos seleccionados
        </h2>

        {/* GRID DE PRODUCTOS */}
        {carrito.length === 0 ? (
          <p className="text-center text-gray-600">Tu carrito está vacío</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto px-2">
            {carrito.map((item) => (
              <div
                key={item.id}
                className="bg-[#FFEAEA] p-4 rounded-xl flex items-center gap-3 border border-[#E3B5B5]"
              >
                <div className="relative w-20 h-20">
                  <Image
                    src={item.imagen || '/IMG.png'}
                    alt={item.nombre}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                <div className="flex-1">
                  <p className="font-bold text-[#5A2E1C]">{item.nombre}</p>
                  <p className="text-sm text-[#5A2E1C]">Cantidad: {item.cantidad}</p>
                  <p className="text-sm font-semibold text-[#5A2E1C]">
                    Subtotal: ${item.cantidad * item.precio}
                  </p>
                </div>

                <button className="text-red-600 text-xl" onClick={() => onEliminar(item.id)}>
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TOTAL */}
        <p className="mt-5 text-lg font-semibold text-[#5A2E1C] text-start">
          Total: <span className="font-bold">${total}</span>
        </p>

        {/* BOTONES FINALES */}
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <button
            className="bg-[#5A2E1C] text-white px-6 py-3 rounded-2xl font-bold w-full sm:w-52"
            onClick={onCerrar}
          >
            Ver más productos
          </button>

          <button
            className="bg-[#5A2E1C] text-white px-6 py-3 rounded-2xl font-bold w-full sm:w-52"
            onClick={onRealizarPago}
          >
            Realizar el pago
          </button>
        </div>
      </div>
    </div>
  );
}
