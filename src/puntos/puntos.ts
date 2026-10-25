import { CategoriaCliente } from '../dominio/tipos';

const PESOS_POR_PUNTO = 1000;
const MULTIPLICADOR_ORO = 2;

export function calcularPuntos(
  totalPagado: number,
  envio: number,
  categoria: CategoriaCliente,
): number {
  const totalSinEnvio = totalPagado - envio;
  const puntosBase = Math.floor(totalSinEnvio / PESOS_POR_PUNTO);
  return categoria === 'ORO' ? puntosBase * MULTIPLICADOR_ORO : puntosBase;
}