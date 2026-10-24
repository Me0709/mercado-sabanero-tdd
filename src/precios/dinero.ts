// Porcentaje de un monto en pesos, redondeado al peso más cercano (el .5 sube).
// Se multiplica antes de dividir: el producto es entero y exacto, así que no hay
// errores de coma flotante que desplacen un resultado de .5.
export function porcentajeDe(monto: number, porcentaje: number): number {
  return Math.round((monto * porcentaje) / 100);
}
