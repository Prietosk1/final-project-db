'use client';

export default function VistaEmpleados({
  username,
  onLogout,
}: {
  username: string;
  onLogout: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#FFF9D9] px-10 py-10">
      <h2 className="text-xl font-bold bg-pink-100 border border-pink-300 px-4 py-2 rounded-lg inline-block mb-6">
        Bienvenido, {username}
      </h2>

      <div className="flex flex-col gap-4">
        <button className="bg-[#5A2E1C] text-white py-2 rounded-lg w-40 shadow-md">Pedidos</button>

        <button className="bg-[#5A2E1C] text-white py-2 rounded-lg w-40 shadow-md">Clientes</button>

        <button className="bg-[#5A2E1C] text-white py-2 rounded-lg w-40 shadow-md">
          Productos
        </button>

        <button className="bg-[#5A2E1C] text-white py-2 rounded-lg w-40 shadow-md">...</button>

        {/* BOTÓN CERRAR SESIÓN */}
        <button
          onClick={onLogout}
          className="bg-[#a05e43] text-white py-2 rounded-lg w-40 shadow-md"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
