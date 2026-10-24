// Se multiplica antes de dividir para no depender de decimales intermedios.
export function porcentajeDe(monto: number, porcentaje: number): number {
  return Math.round((monto * porcentaje) / 100);
}
