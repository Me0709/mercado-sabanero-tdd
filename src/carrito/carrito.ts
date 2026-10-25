import { Inventario, ItemCarrito, Producto } from '../dominio/tipos';

export function agregarAlCarrito(
  carrito: ItemCarrito[],
  producto: Producto,
  cantidad: number,
  inventario: Inventario,
): ItemCarrito[] {
  const existente = carrito.find((item) => item.producto.id === producto.id);
  const cantidadTotal = (existente ? existente.cantidad : 0) + cantidad;

  if (cantidad < 1 || cantidadTotal > 50) {
    throw new Error('Cantidad inválida: debe estar entre 1 y 50 unidades');
  }
  if (inventario.consultarStock(producto.id) < cantidad) {
    throw new Error('Stock insuficiente');
  }

  if (existente) {
    return carrito.map((item) =>
      item.producto.id === producto.id ? { ...item, cantidad: cantidadTotal } : item,
    );
  }
  return [...carrito, { producto, cantidad }];
}