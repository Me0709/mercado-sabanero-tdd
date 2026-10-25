import { Inventario, ItemCarrito, Producto } from '../dominio/tipos';

export function agregarAlCarrito(
  carrito: ItemCarrito[],
  producto: Producto,
  cantidad: number,
  inventario: Inventario,
): ItemCarrito[] {
  return [{ producto, cantidad }];
}