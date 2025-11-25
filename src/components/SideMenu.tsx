'use client';

interface SideMenuProps {
  abierto: boolean; // si el menú está visible
  onCerrar: () => void; // cerrar menú
  onEmpleados: () => void; // abrir login empleados
}

export default function SideMenu({ abierto, onCerrar, onEmpleados }: SideMenuProps) {
  return (
    <div
      className={`fixed inset-0 z-40 transition-opacity ${
        abierto ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Fondo oscuro */}
      <div className="absolute inset-0 bg-black/40" onClick={onCerrar} />

      {/* MENÚ LATERAL */}
      <div
        className={`absolute top-0 left-0 h-full w-64 bg-[#FBE2E2] shadow-2xl p-6 transition-transform duration-300 rounded-r-3xl
        ${abierto ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <h2 className="text-2xl font-bold text-[#4B2E2E] mb-6">Menú</h2>

        {/* Botón empleados */}
        <button
          className="w-full py-3 bg-[#F3D6D6] rounded-xl text-lg font-semibold mb-4 hover:bg-[#FFF9D9] transition"
          onClick={() => {
            onEmpleados();
            onCerrar();
          }}
        >
          Empleados
        </button>

        {/* Botón cerrar */}
        <button
          onClick={onCerrar}
          className="w-full py-3 bg-[#4B2E2E] text-white rounded-xl mt-4 text-lg"
        >
          Cerrar menú
        </button>
      </div>
    </div>
  );
}
