import { Inventario, ItemCarrito, Producto } from '../dominio/tipos';

const CANTIDAD_MINIMA = 1;
const CANTIDAD_MAXIMA = 50;

export function agregarAlCarrito(
  carrito: ItemCarrito[],
  producto: Producto,
  cantidad: number,
  inventario: Inventario,
): ItemCarrito[] {
  const existente = carrito.find((item) => item.producto.id === producto.id);
  const cantidadTotal = (existente ? existente.cantidad : 0) + cantidad;

  if (cantidad < CANTIDAD_MINIMA || cantidadTotal > CANTIDAD_MAXIMA) {
    throw new Error(
      `Cantidad inválida: debe estar entre ${CANTIDAD_MINIMA} y ${CANTIDAD_MAXIMA} unidades`,
    );
  }
  if (inventario.consultarStock(producto.id) < cantidadTotal) {
    throw new Error('Stock insuficiente');
  }

  if (existente) {
    return carrito.map((item) =>
      item.producto.id === producto.id ? { ...item, cantidad: cantidadTotal } : item,
    );
  }
  return [...carrito, { producto, cantidad }];
}