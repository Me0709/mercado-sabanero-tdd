import { CategoriaCliente } from '../dominio/tipos';

export function calcularPuntos(
  totalPagado: number,
  envio: number,
  categoria: CategoriaCliente,
): number {
  return Math.floor(totalPagado / 1000);
}