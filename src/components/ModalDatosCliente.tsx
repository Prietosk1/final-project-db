'use client';

import { useState } from 'react';

export default function ModalDatosCliente({ onCerrar }: { onCerrar: () => void }) {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [nacimiento, setNacimiento] = useState('');
  const [tel, setTel] = useState('');
  const [mail, setMail] = useState('');
  const [direccion, setDireccion] = useState('');

  const [mensaje, setMensaje] = useState('');

  // ------------------------------------
  // AUTOCOMPLETAR
  // ------------------------------------
  async function autocompletar() {
    if (!id) {
      setMensaje('Debes ingresar un número de documento.');
      return;
    }

    const res = await fetch(`/api/clientes/${id}`);

    if (res.status === 404) {
      setMensaje('Cliente no encontrado. Debes completarlo manualmente.');
      return;
    }

    const data = await res.json();
    const c = data.cliente;

    setNombre(c.Nombre);
    setApellido(c.Apellido);
    setNacimiento(c.Nacimiento?.slice(0, 10) || '');
    setTel(c.Tel);
    setMail(c.Mail);
    setDireccion(''); // si tu tabla tiene dirección, se completa aquí

    setMensaje('Cliente encontrado y datos cargados.');
  }

  // ------------------------------------
  // GUARDAR / CONTINUAR
  // ------------------------------------
  async function continuar() {
    const payload = {
      IDcliente: Number(id),
      Nombre: nombre,
      Apellido: apellido,
      Tel: Number(tel),
      Mail: mail,
      Nacimiento: new Date(nacimiento),
    };

    const res = await fetch('/api/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!data.ok) {
      setMensaje(data.message);
      return;
    }

    setMensaje('Cliente registrado correctamente.');
    onCerrar();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-[#FFEFEF] w-[90%] max-w-2xl p-8 rounded-3xl shadow-xl border border-[#E3C7C7] relative">
        <button
          className="absolute top-4 right-5 text-3xl font-bold text-[#5A2E1C]"
          onClick={onCerrar}
        >
          ×
        </button>

        <h2 className="text-3xl text-center text-[#5A2E1C] font-extrabold mb-6">
          Datos del cliente
        </h2>

        <div className="text-center text-red-600 font-bold mb-3">{mensaje}</div>

        <div className="flex flex-col gap-4">
          {/* Documento + Autocompletar */}
          <div className="flex gap-2">
            <input
              className="border border-[#E2BFBF] p-3 rounded-full flex-1"
              placeholder="Número de documento"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />

            <button
              className="bg-[#5A2E1C] text-white px-4 py-2 rounded-2xl font-bold text-sm"
              onClick={autocompletar}
            >
              Autocompletar
            </button>
          </div>

          <input
            className="border border-[#E2BFBF] p-3 rounded-full"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            className="border border-[#E2BFBF] p-3 rounded-full"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />

          <input
            className="border border-[#E2BFBF] p-3 rounded-full"
            placeholder="Fecha de nacimiento AAAA-MM-DD"
            type="date"
            value={nacimiento}
            onChange={(e) => setNacimiento(e.target.value)}
          />

          <input
            className="border border-[#E2BFBF] p-3 rounded-full"
            placeholder="Teléfono"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />

          <input
            className="border border-[#E2BFBF] p-3 rounded-full"
            placeholder="Correo"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />

          <input
            className="border border-[#E2BFBF] p-3 rounded-full"
            placeholder="Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />

          <button
            className="bg-[#5A2E1C] text-white py-3 rounded-2xl font-bold text-lg mt-4"
            onClick={continuar}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
