import { ItemCarrito } from '../dominio/tipos';

export interface LineaIva {
  productoId: string;
  iva: number;
}

export function calcularIvaPorProducto(
  items: ItemCarrito[],
  porcentajeDescuento: number,
): LineaIva[] {
  return items.map(({ producto, cantidad }) => ({
    productoId: producto.id,
    iva: Math.round(
      (producto.precio * cantidad * (100 - porcentajeDescuento) * producto.tarifaIva) / 10000,
    ),
  }));
}

export function calcularIvaTotal(items: ItemCarrito[], porcentajeDescuento: number): number {
  return calcularIvaPorProducto(items, porcentajeDescuento).reduce(
    (suma, linea) => suma + linea.iva,
    0,
  );
}
