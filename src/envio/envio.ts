export function calcularEnvio(municipio: string, productosConIva: number): number {
  if (productosConIva >= 150000) {
    return 0;
  }
  if (municipio === 'Sincelejo') {
    return 8000;
  }
  return 15000;
}