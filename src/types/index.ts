export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
}

export interface ItemCarrito extends Producto {
  cantidad: number;
}
