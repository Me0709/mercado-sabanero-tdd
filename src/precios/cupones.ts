export type Cupon =
  | {
      codigo: string;
      tipo: 'PORCENTAJE';
      porcentaje: number;
      subtotalMinimo: number;
      vence: string; // AAAA-MM-DD
    }
  | {
      codigo: string;
      tipo: 'ENVIO_GRATIS';
      vence: string; // AAAA-MM-DD
    };

export interface ResultadoCupon {
  porcentajeDescuento: number;
  envioGratis: boolean;
}

export class CuponInvalidoError extends Error {
  constructor(codigo: string) {
    super(`Cupón inválido: ${codigo}`);
    this.name = 'CuponInvalidoError';
  }
}

export class CuponNoAplicableError extends Error {
  constructor(codigo: string, subtotalMinimo: number) {
    super(`El cupón ${codigo} requiere un subtotal mínimo de ${subtotalMinimo}`);
    this.name = 'CuponNoAplicableError';
  }
}

export const CATALOGO_CUPONES: Cupon[] = [
  {
    codigo: 'SABANERO10',
    tipo: 'PORCENTAJE',
    porcentaje: 10,
    subtotalMinimo: 50000,
    vence: '2026-12-31',
  },
  { codigo: 'ENVIOGRATIS', tipo: 'ENVIO_GRATIS', vence: '2026-12-31' },
];

export function aplicarCupon(
  codigo: string,
  subtotal: number,
  hoy: string,
  catalogo: Cupon[] = CATALOGO_CUPONES,
): ResultadoCupon {
  const cupon = catalogo.find((c) => c.codigo === codigo);
  if (!cupon || hoy > cupon.vence) throw new CuponInvalidoError(codigo);

  if (cupon.tipo === 'ENVIO_GRATIS') {
    return { porcentajeDescuento: 0, envioGratis: true };
  }
  if (subtotal < cupon.subtotalMinimo) {
    throw new CuponNoAplicableError(codigo, cupon.subtotalMinimo);
  }
  return { porcentajeDescuento: cupon.porcentaje, envioGratis: false };
}
