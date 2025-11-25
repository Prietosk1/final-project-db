import Image from 'next/image';
import { Producto } from '@/types';

interface Props {
  producto: Producto;
  onClick: () => void;
}

export default function ProductoCard({ producto, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="
        w-52
        h-80
        bg-white
        rounded-3xl
        shadow-lg
        border
        border-[#F7CFE3]             /* Borde pastel rosado */
        cursor-pointer
        hover:scale-105
        hover:shadow-[0_0_20px_#F7A8D0] /* Glow rosado */
        hover:border-[#FF8EC7]         /* Borde rosado fuerte en hover */
        transition-all
        flex flex-col
        overflow-hidden
      "
    >
      {/* Imagen fija */}
      <div className="relative w-full h-44">
        <Image src={producto.imagen} alt={producto.nombre} fill className="object-cover" />
      </div>

      {/* Texto centrado y uniforme */}
      <div className="flex flex-col px-3 pt-3">
        <h3 className="text-base font-bold text-[#7A3E3E] truncate">{producto.nombre}</h3>

        <p className="text-lg text-[#A15678] font-semibold mt-1">${producto.precio}</p>
      </div>
    </div>
  );
}
