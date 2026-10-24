import { ResultadoDescuentos } from '../dominio/tipos';
import { aplicarCupon } from './cupones';
import { porcentajeDescuentoPorVolumen } from './descuentoPorVolumen';

export function calcularDescuentos(
  subtotal: number,
  codigoCupon: string | undefined,
  hoy: string,
): ResultadoDescuentos {
  const porcentajeVolumen = porcentajeDescuentoPorVolumen(subtotal);
  const cupon =
    codigoCupon === undefined
      ? { porcentajeDescuento: 0, envioGratis: false }
      : aplicarCupon(codigoCupon, subtotal, hoy);

  const porcentajeDescuento = Math.max(porcentajeVolumen, cupon.porcentajeDescuento);
  return {
    porcentajeDescuento,
    montoDescuento: Math.round((subtotal * porcentajeDescuento) / 100),
    envioGratis: cupon.envioGratis,
  };
}
