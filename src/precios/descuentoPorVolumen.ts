import { porcentajeDe } from './dinero';

// Ordenados de mayor a menor subtotal: se aplica el primer tramo que se alcance.
const TRAMOS_DESCUENTO = [
  { subtotalDesde: 500000, porcentaje: 10 },
  { subtotalDesde: 200000, porcentaje: 5 },
];

export function porcentajeDescuentoPorVolumen(subtotal: number): number {
  const tramo = TRAMOS_DESCUENTO.find((t) => subtotal >= t.subtotalDesde);
  return tramo ? tramo.porcentaje : 0;
}

export function calcularDescuentoPorVolumen(subtotal: number): number {
  return porcentajeDe(subtotal, porcentajeDescuentoPorVolumen(subtotal));
}
