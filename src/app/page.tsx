'use client';

import { useState } from 'react';
//import Image from 'next/image'; // ← IMPORT NECESARIO

import Header from '@/components/Header';
import ProductoCard from '@/components/ProductoCard';
import DetalleProducto from '@/components/DetalleProducto';
import CarritoModal from '@/components/CarritoModal';
import LoginEmpleado from '@/components/LoginEmpleado';
import VistaEmpleados from '@/components/VistaEmpleado'; // ← CORREGIDO
import { Producto, ItemCarrito } from '@/types';
import SideMenu from '@/components/SideMenu';
import ModalDatosCliente from '@/components/ModalDatosCliente';

// ----------- Productos de ejemplo -----------
const productos: Producto[] = [
  {
    id: 1,
    nombre: 'Bolso Rosa Cute',
    precio: 75000,
    imagen: '/IMG.png',
  },
  {
    id: 2,
    nombre: 'Camisa Beige Casual',
    precio: 60000,
    imagen: '/IMG.png',
  },
  {
    id: 3,
    nombre: 'Bolso Beige Casual',
    precio: 65000,
    imagen: '/IMG.png',
  },
  {
    id: 4,
    nombre: 'Bolso Casual',
    precio: 80000,
    imagen: '/IMG.png',
  },
  {
    id: 5,
    nombre: 'idk',
    precio: 75000,
    imagen: '/IMG.png',
  },
];

export default function Home() {
  // Estados principales
  const [vista, setVista] = useState<'home' | 'login' | 'empleados'>('home');
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [cantidad, setCantidad] = useState<number>(1);
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [empleadoNombre, setEmpleadoNombre] = useState<string>('');
  const [modalDatosCliente, setModalDatosCliente] = useState(false);

  // Abrir detalle del producto
  const abrirProducto = (producto: Producto) => {
    setProductoSeleccionado(producto);
    setCantidad(1);
  };

  // Cerrar detalle del producto
  const cerrarProducto = () => {
    setProductoSeleccionado(null);
  };

  // Agregar al carrito
  const agregarAlCarrito = () => {
    if (!productoSeleccionado) return;

    setCarrito((prev) => {
      const existe = prev.find((i) => i.id === productoSeleccionado.id);

      if (existe) {
        return prev.map((i) =>
          i.id === productoSeleccionado.id ? { ...i, cantidad: i.cantidad + cantidad } : i,
        );
      }

      return [
        ...prev,
        {
          id: productoSeleccionado.id,
          nombre: productoSeleccionado.nombre,
          precio: productoSeleccionado.precio,
          cantidad,
          imagen: productoSeleccionado.imagen,
        },
      ];
    });

    cerrarProducto();
  };

  // Eliminar del carrito
  const eliminarDelCarrito = (id: number) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FFF9D9]">
      {/* HEADER */}
      <Header abrirMenu={() => setMenuAbierto(true)} abrirCarrito={() => setCarritoAbierto(true)} />

      {/* MENU LATERAL */}
      <SideMenu
        abierto={menuAbierto}
        onCerrar={() => setMenuAbierto(false)}
        onEmpleados={() => setVista('login')}
      />

      {/* ======= HOME PRINCIPAL ======= */}
      {vista === 'home' && (
        <div className="px-6 py-10 bg-[#FFF7C8] min-h-screen">
          {/* BUSCADOR */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center bg-white border border-gray-300 rounded-full w-full max-w-2xl px-4 py-2 shadow">
              <span className="text-[#5A2E1C] mr-2 text-xl">🔍</span>
              <input
                type="text"
                placeholder="Buscar producto"
                className="w-full outline-none text-[#5A2E1C]"
              />
            </div>
          </div>

          {/* CATEGORÍAS */}
          <div className="flex justify-center gap-4 mb-10">
            <button className="bg-[#FFF9D9] border border-[#5A2E1C] text-[#5A2E1C] px-6 py-2 rounded-full font-bold shadow">
              TODAS
            </button>
            <button className="bg-white border border-[#5A2E1C] text-[#5A2E1C] px-6 py-2 rounded-full shadow">
              CAT1
            </button>
            <button className="bg-white border border-[#5A2E1C] text-[#5A2E1C] px-6 py-2 rounded-full shadow">
              CAT2
            </button>
          </div>

          {/* TÍTULO */}
          <h2 className="text-2xl font-extrabold text-[#5A2E1C] text-center mb-6 tracking-wide">
            PRODUCTOS DESTACADOS
          </h2>

          {/* TARJETAS DE PRODUCTOS */}
          <div
            className="
  grid 
  grid-cols-2
  sm:grid-cols-3
  lg:grid-cols-4
  xl:grid-cols-5
  gap-8
  place-items-center
"
          >
            {productos.map((p) => (
              <ProductoCard key={p.id} producto={p} onClick={() => abrirProducto(p)} />
            ))}
          </div>
        </div>
      )}

      {/* LOGIN */}
      {vista === 'login' && (
        <LoginEmpleado
          onSuccess={(username) => {
            setEmpleadoNombre(username);
            setVista('empleados');
          }}
        />
      )}

      {/* EMPLEADOS */}
      {vista === 'empleados' && (
        <VistaEmpleados username={empleadoNombre} onLogout={() => setVista('home')} />
      )}

      {/* ======= MODAL DETALLE PRODUCTO ======= */}
      {productoSeleccionado && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="w-full flex justify-center items-center">
            <DetalleProducto
              producto={productoSeleccionado}
              cantidad={cantidad}
              onCambiarCantidad={setCantidad}
              onAgregar={agregarAlCarrito}
              onVolver={cerrarProducto}
            />
          </div>
        </div>
      )}

      {/* CARRITO */}
      {carritoAbierto && (
        <CarritoModal
          carrito={carrito}
          onCerrar={() => setCarritoAbierto(false)}
          onEliminar={eliminarDelCarrito}
          onRealizarPago={() => {
            setCarritoAbierto(false);
            setModalDatosCliente(true);
          }}
        />
      )}

      {/* MODAL DATOS DEL CLIENTE */}
      {modalDatosCliente && <ModalDatosCliente onCerrar={() => setModalDatosCliente(false)} />}
    </div>
  );
}
