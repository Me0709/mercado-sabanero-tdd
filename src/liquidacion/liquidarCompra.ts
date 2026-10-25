import { CategoriaCliente, ItemCarrito } from '../dominio/tipos';
import { calcularEnvio, calcularTotal } from '../envio/envio';
import { calcularDescuentos } from '../precios/descuentos';
import { calcularIvaTotal } from '../precios/iva';
import { calcularPuntos } from '../puntos/puntos';

export interface SolicitudCompra {
  items: ItemCarrito[];
  municipio: string;
  categoria: CategoriaCliente;
  codigoCupon?: string;
  hoy: string; // AAAA-MM-DD
}

export interface Liquidacion {
  subtotal: number;
  porcentajeDescuento: number;
  descuento: number;
  iva: number;
  envio: number;
  total: number;
  puntos: number;
}

export function liquidarCompra(solicitud: SolicitudCompra): Liquidacion {
  const { items, municipio, categoria, codigoCupon, hoy } = solicitud;

  const subtotal = items.reduce((suma, i) => suma + i.producto.precio * i.cantidad, 0);
  const productosConIva = items
    .filter((i) => i.producto.tarifaIva > 0)
    .reduce((suma, i) => suma + i.producto.precio * i.cantidad, 0);

  const descuentos = calcularDescuentos(subtotal, codigoCupon, hoy);
  const iva = calcularIvaTotal(items, descuentos.porcentajeDescuento);
  const envio = calcularEnvio(municipio, productosConIva, descuentos.envioGratis);
  const total = calcularTotal(subtotal, descuentos.montoDescuento, iva, envio);
  const puntos = calcularPuntos(total, envio, categoria);

  return {
    subtotal,
    porcentajeDescuento: descuentos.porcentajeDescuento,
    descuento: descuentos.montoDescuento,
    iva,
    envio,
    total,
    puntos,
  };
}
