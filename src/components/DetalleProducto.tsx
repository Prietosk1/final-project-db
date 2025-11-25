import React from 'react';
import Image from 'next/image';
import { Producto } from '@/types';

interface DetalleProductoProps {
  producto: Producto;
  cantidad: number;
  onCambiarCantidad: (n: number) => void;
  onAgregar: () => void;
  onVolver: () => void;
}

export default function DetalleProducto({
  producto,
  cantidad,
  onCambiarCantidad,
  onAgregar,
  onVolver,
}: DetalleProductoProps) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-2xl
        border border-pink-200
        w-[95%]
        max-w-3xl
        max-h-[90vh]
        overflow-y-auto
        p-8
        animate-fadeIn
        relative
      "
      style={{
        boxShadow: '0 0 20px rgba(255, 192, 203, 0.5), 0 0 40px rgba(255, 182, 193, 0.3)',
      }}
    >
      {/* BOTÓN VOLVER */}
      <button
        onClick={onVolver}
        className="
          absolute top-4 left-4
          text-pink-700
          bg-pink-100
          px-4 py-2
          rounded-full
          font-semibold
          shadow
          hover:shadow-lg
          hover:bg-pink-200
          transition-all
        "
      >
        ← Volver
      </button>

      {/* CONTENIDO */}
      <div className="flex flex-col md:flex-row gap-10 mt-10">
        {/* IMAGEN – tamaño fijo y completa */}
        <div className="relative w-full max-w-[360px] h-[360px] mx-auto">
          <Image
            src={producto.imagen}
            alt={producto.nombre}
            fill
            className="object-cover rounded-3xl border border-pink-200 shadow-md"
          />
        </div>

        {/* INFO */}
        <div className="flex flex-col justify-center w-full">
          <h2 className="text-3xl font-extrabold text-pink-700 mb-3">{producto.nombre}</h2>

          <p className="text-2xl font-bold text-pink-900 mb-6">${producto.precio}</p>

          {/* CANTIDAD */}
          <div className="flex items-center gap-6 mb-6">
            <button
              onClick={() => onCambiarCantidad(Math.max(1, cantidad - 1))}
              className="
                w-10 h-10 flex items-center justify-center
                bg-pink-200
                rounded-full
                text-2xl text-pink-700
                shadow
                hover:bg-pink-300
                transition-all
              "
            >
              –
            </button>

            <span className="text-2xl text-pink-800">{cantidad}</span>

            <button
              onClick={() => onCambiarCantidad(cantidad + 1)}
              className="
                w-10 h-10 flex items-center justify-center
                bg-pink-200
                rounded-full
                text-2xl text-pink-700
                shadow
                hover:bg-pink-300
                transition-all
              "
            >
              +
            </button>
          </div>

          <p className="text-xl font-bold text-pink-900 mb-6">
            Subtotal: ${cantidad * producto.precio}
          </p>

          <button
            onClick={onAgregar}
            className="
              bg-pink-600
              hover:bg-pink-700
              text-white
              py-3
              rounded-2xl
              text-lg
              shadow-md
              hover:shadow-xl
              transition-all
            "
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
