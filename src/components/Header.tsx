'use client';

export default function Header({
  abrirMenu,
  abrirCarrito,
}: {
  abrirMenu: () => void;
  abrirCarrito: () => void;
}) {
  return (
    <header className="w-full bg-[#F3D6D6] py-6 px-6 flex items-center justify-between">
      <button className="text-3xl cursor-pointer" onClick={abrirMenu}>
        ☰
      </button>

      <h1 className="text-4xl tracking-[0.4em] font-semibold text-[#4B2E2E]">V A N E L</h1>

      <div className="flex items-center gap-6 text-3xl">
        <button onClick={abrirCarrito}>🛒</button>
        <span>⋮⋮⋮</span>
      </div>
    </header>
  );
}
