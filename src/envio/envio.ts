export function calcularEnvio(municipio: string, productosConIva: number): number {
  if (productosConIva >= 150000) {
    return 0;
  }
  if (municipio === 'Sincelejo') {
    return 8000;
  }
  return 15000;
}

export function calcularTotal(
  subtotal: number,
  descuento: number,
  iva: number,
  envio: number,
): number {
  return subtotal - descuento + iva + envio;
}