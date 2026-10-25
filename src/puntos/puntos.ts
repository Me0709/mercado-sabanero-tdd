import { CategoriaCliente } from '../dominio/tipos';

export function calcularPuntos(
  totalPagado: number,
  envio: number,
  categoria: CategoriaCliente,
): number {
  const puntosBase = Math.floor((totalPagado - envio) / 1000);
  return categoria === 'ORO' ? puntosBase * 2 : puntosBase;
}