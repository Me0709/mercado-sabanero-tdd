export function porcentajeDescuentoPorVolumen(subtotal: number): number {
  if (subtotal >= 500000) return 10;
  if (subtotal >= 200000) return 5;
  return 0;
}

export function calcularDescuentoPorVolumen(subtotal: number): number {
  return Math.round((subtotal * porcentajeDescuentoPorVolumen(subtotal)) / 100);
}
