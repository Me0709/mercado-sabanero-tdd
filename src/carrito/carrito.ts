import { Inventario, ItemCarrito, Producto } from '../dominio/tipos';

export function agregarAlCarrito(
  carrito: ItemCarrito[],
  producto: Producto,
  cantidad: number,
  inventario: Inventario,
): ItemCarrito[] {
  if (cantidad < 1 || cantidad > 50) {
    throw new Error('Cantidad inválida: debe estar entre 1 y 50 unidades');
  }
  if (inventario.consultarStock(producto.id) < cantidad) {
    throw new Error('Stock insuficiente');
  }
  return [{ producto, cantidad }];
}