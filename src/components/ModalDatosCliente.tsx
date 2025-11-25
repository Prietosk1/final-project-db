'use client';

// import { useState } from 'react';

export default function ModalDatosCliente({ onCerrar }: { onCerrar: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-[#FFEFEF] w-[90%] max-w-2xl p-8 rounded-3xl shadow-xl border border-[#E3C7C7] relative">
        {/* Cerrar */}
        <button
          className="absolute top-4 right-5 text-3xl font-bold text-[#5A2E1C]"
          onClick={onCerrar}
        >
          ×
        </button>

        <h2 className="text-3xl text-center text-[#5A2E1C] font-extrabold mb-6">
          Datos del cliente
        </h2>

        <div className="flex flex-col gap-4">
          {/* Número de documento + Autocompletar */}
          <div className="flex gap-2">
            <input
              className="border border-[#E2BFBF] p-3 rounded-full flex-1"
              placeholder="Número de documento"
            />

            <button
              className="bg-[#5A2E1C] text-white px-4 py-2 rounded-2xl font-bold text-sm"
              onClick={() => console.log('Autocompletar')}
            >
              Autocompletar
            </button>
          </div>

          <input className="border border-[#E2BFBF] p-3 rounded-full" placeholder="Nombre" />
          <input className="border border-[#E2BFBF] p-3 rounded-full" placeholder="Apellido" />
          <input
            className="border border-[#E2BFBF] p-3 rounded-full"
            placeholder="Fecha de nacimiento AAAA-MM-DD"
          />
          <input className="border border-[#E2BFBF] p-3 rounded-full" placeholder="Teléfono" />
          <input className="border border-[#E2BFBF] p-3 rounded-full" placeholder="Correo" />
          <input className="border border-[#E2BFBF] p-3 rounded-full" placeholder="Dirección" />

          <button className="bg-[#5A2E1C] text-white py-3 rounded-2xl font-bold text-lg mt-4">
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
