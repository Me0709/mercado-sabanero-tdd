import { ItemCarrito } from '../dominio/tipos';

export interface LineaIva {
  productoId: string;
  iva: number;
}

// Dos porcentajes encadenados (descuento y tarifa): se divide una sola vez al final.
const DIVISOR_DE_DOS_PORCENTAJES = 100 * 100;

function ivaDeLinea({ producto, cantidad }: ItemCarrito, porcentajeDescuento: number): number {
  const valorDeLinea = producto.precio * cantidad;
  const porcentajeSinDescuento = 100 - porcentajeDescuento;
  return Math.round(
    (valorDeLinea * porcentajeSinDescuento * producto.tarifaIva) / DIVISOR_DE_DOS_PORCENTAJES,
  );
}

export function calcularIvaPorProducto(
  items: ItemCarrito[],
  porcentajeDescuento: number,
): LineaIva[] {
  return items.map((item) => ({
    productoId: item.producto.id,
    iva: ivaDeLinea(item, porcentajeDescuento),
  }));
}

export function calcularIvaTotal(items: ItemCarrito[], porcentajeDescuento: number): number {
  return calcularIvaPorProducto(items, porcentajeDescuento).reduce(
    (suma, linea) => suma + linea.iva,
    0,
  );
}
