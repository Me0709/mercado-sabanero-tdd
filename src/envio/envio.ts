const MUNICIPIO_LOCAL = 'Sincelejo';
const ENVIO_LOCAL = 8000;
const ENVIO_OTROS_MUNICIPIOS = 15000;
const MINIMO_PARA_ENVIO_GRATIS = 150000;

export function calcularEnvio(
  municipio: string,
  productosConIva: number,
  envioGratisPorCupon = false,
): number {
  if (envioGratisPorCupon || productosConIva >= MINIMO_PARA_ENVIO_GRATIS) {
    return 0;
  }
  if (municipio === MUNICIPIO_LOCAL) {
    return ENVIO_LOCAL;
  }
  return ENVIO_OTROS_MUNICIPIOS;
}

export function calcularTotal(
  subtotal: number,
  descuento: number,
  iva: number,
  envio: number,
): number {
  return subtotal - descuento + iva + envio;
}