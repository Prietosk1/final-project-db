'use client';

import { useState } from 'react';
import Image from 'next/image';

// =====================
// TIPOS
// =====================

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
};

type ItemCarrito = {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
};

const constantes = 2;
let hola = 2;

hola = 5;

// =====================
// COMPONENTE PRINCIPAL
// =====================

export default function Home() {
  // Menú lateral
  const [menuAbierto, setMenuAbierto] = useState<boolean>(false);

  // Vistas: "home" | "login" | "detalle"
  const [vista, setVista] = useState<'home' | 'login' | 'detalle' | 'logout'>('home');

  // Carrito tipado
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

  // Producto seleccionado
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);

  // Cantidad en el detalle
  const [cantidad, setCantidad] = useState<number>(1);

  // =====================
  // Productos de prueba
  // =====================

  const jabon: Producto = {
    id: 1,
    imagen: 'https:jsjhjhdsjsd',
    nombre: 'Jabon',
    precio: 9000.2,
  };

  const productos: Producto[] = [
    { id: 1, nombre: 'Bolso elegante', precio: 120000, imagen: '/IMG.png' },
    { id: 2, nombre: 'Bolso casual', precio: 95000, imagen: '/IMG.png' },
    { id: 3, nombre: 'Bolso girly', precio: 110000, imagen: '/IMG.png' },
    { id: 4, nombre: 'Bolso mini', precio: 80000, imagen: '/IMG.png' },
  ];

  // =====================
  // FUNCIONES
  // =====================

  const abrirMenu = () => setMenuAbierto(true);
  const cerrarMenu = () => setMenuAbierto(false);

  const irALogin = () => {
    setVista('login');
    cerrarMenu();
  };

  const abrirProducto = (p: Producto) => {
    setProductoSeleccionado(p);
    setCantidad(1);
    setVista('detalle');
  };

  const agregarAlCarrito = () => {
    if (!productoSeleccionado) return;

    const item: ItemCarrito = {
      id: productoSeleccionado.id,
      nombre: productoSeleccionado.nombre,
      precio: productoSeleccionado.precio,
      cantidad,
    };

    setCarrito([...carrito, item]);
    alert('Producto añadido al carrito');
  };

  // =====================
  // RENDER PRINCIPAL
  // =====================

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#FFF5F7] relative">
      {/* ===================== MENU LATERAL ===================== */}
      {menuAbierto && (
        <div className="absolute top-0 left-0 w-64 h-full bg-white shadow-lg p-6 z-10">
          <h3 className="text-xl font-bold mb-6">Menú</h3>

          <button
            className="w-full text-left py-2 px-3 bg-zinc-100 rounded mb-3"
            onClick={irALogin}
          >
            Empleado
          </button>

          <button className="mt-10 w-full bg-pink-300 py-2 rounded" onClick={cerrarMenu}>
            Cerrar
          </button>
        </div>
      )}

      {/* ===================== HEADER ===================== */}
      <header className="w-full bg-[#F3D6D6] py-6 px-6 flex items-center justify-between">
        <button className="text-3xl cursor-pointer" onClick={abrirMenu}>
          ☰
        </button>
        <h1 className="text-4xl tracking-[0.4em] font-semibold text-[#4B2E2E]">V A N E</h1>
        <div className="flex items-center gap-6 text-3xl">
          <span>🛒</span>
          <span>⋮⋮⋮</span>
        </div>
      </header>

      {/* ===================== VISTA LOGIN ===================== */}
      {vista === 'login' && (
        <div className="flex flex-col items-center justify-center py-20 bg-[#FFF9D9]">
          <div className="bg-[#fbe2e2] p-10 rounded-3xl shadow-md w-96">
            <h2 className="text-center font-bold text-xl mb-6 text-[#4B2E2E]">
              INICIO DE SESIÓN PARA EMPLEADOS
            </h2>

            <input
              type="text"
              placeholder="Username"
              className="w-full mb-4 px-3 py-2 rounded shadow"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full mb-6 px-3 py-2 rounded shadow"
            />

            <button
              className="w-full bg-[#4B2E2E] text-white py-2 rounded"
              onClick={() => alert('Buscar empleado en BD')}
            >
              INICIAR SESIÓN
            </button>
          </div>
        </div>
      )}

      {/* ===================== VISTA DETALLE ===================== */}
      {vista === 'detalle' && productoSeleccionado && (
        <div className="flex flex-col items-center py-16 bg-[#FFF9D9]">
          <div className="bg-white rounded-3xl shadow p-6 flex flex-col md:flex-row gap-8 w-[80%] max-w-3xl">
            <Image
              src={productoSeleccionado.imagen}
              alt="Producto"
              width={250}
              height={250}
              className="object-cover"
            />

            <div className="flex flex-col justify-center w-full">
              <div className="bg-[#F3D6D6] text-[#4B2E2E] font-bold py-2 text-center rounded mb-4">
                {productoSeleccionado.nombre}
              </div>

              <p className="text-lg mb-4">Precio: ${productoSeleccionado.precio}</p>

              {/* Contador */}
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  className="w-8 h-8 rounded-full bg-[#F3C0C8] text-xl"
                >
                  –
                </button>

                <span className="text-xl">{cantidad}</span>

                <button
                  onClick={() => setCantidad(cantidad + 1)}
                  className="w-8 h-8 rounded-full bg-[#F3C0C8] text-xl"
                  id=""
                >
                  +
                </button>
              </div>

              <p className="font-bold mb-6">Subtotal: ${cantidad * productoSeleccionado.precio}</p>

              <button
                id="boton-carrito"
                className="bg-[#4B2E2E] text-white py-2 rounded"
                onClick={agregarAlCarrito}
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== VISTA HOME ===================== */}
      {vista === 'home' && (
        <>
          {/* Search */}
          <section className="w-full flex flex-col items-center py-8 bg-[#FFF9D9]">
            <div className="w-10/12 flex items-center bg-white rounded-full shadow px-4 py-3">
              <span className="text-zinc-400 mr-2">🔍</span>
              <input
                type="text"
                placeholder="Buscar producto"
                className="w-full outline-none text-zinc-500"
              />
            </div>
          </section>

          {/* Productos */}
          <section className="px-10 py-6 bg-[#FFF9D9]">
            <h2 className="text-2xl font-extrabold text-[#4B2E2E] mb-6">PRODUCTOS DESTACADOS</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {productos.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-3xl shadow p-4 flex flex-col items-center"
                >
                  <Image
                    src={p.imagen}
                    alt="Producto"
                    width={150}
                    height={150}
                    className="object-cover"
                  />

                  <p className="mt-4 font-normal text-[#4B2E2E]">{p.nombre}</p>
                  <p className="text-zinc-700">${p.precio}</p>

                  <button
                    className="mt-3 w-8 h-8 rounded-full bg-[#F3C0C8]"
                    onClick={() => abrirProducto(p)}
                  >
                    h
                  </button>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="w-full h-24 bg-[#F3D6D6] mt-10"></footer>
    </div>
  );
}
