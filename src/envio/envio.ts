export function calcularEnvio(municipio: string, productosConIva: number): number {
  if (municipio === 'Sincelejo') {
    return 8000;
  }
  return 15000;
}