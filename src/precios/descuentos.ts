import { ResultadoDescuentos } from '../dominio/tipos';
import { aplicarCupon, ResultadoCupon } from './cupones';
import { porcentajeDescuentoPorVolumen } from './descuentoPorVolumen';
import { porcentajeDe } from './dinero';

const SIN_CUPON: ResultadoCupon = { porcentajeDescuento: 0, envioGratis: false };

export function calcularDescuentos(
  subtotal: number,
  codigoCupon: string | undefined,
  hoy: string,
): ResultadoDescuentos {
  const cupon =
    codigoCupon === undefined ? SIN_CUPON : aplicarCupon(codigoCupon, subtotal, hoy);

  const porcentajeDescuento = Math.max(
    porcentajeDescuentoPorVolumen(subtotal),
    cupon.porcentajeDescuento,
  );
  return {
    porcentajeDescuento,
    montoDescuento: porcentajeDe(subtotal, porcentajeDescuento),
    envioGratis: cupon.envioGratis,
  };
}
