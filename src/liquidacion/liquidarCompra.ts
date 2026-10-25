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

function valorDeLinea({ producto, cantidad }: ItemCarrito): number {
  return producto.precio * cantidad;
}

function sumar(valores: number[]): number {
  return valores.reduce((suma, valor) => suma + valor, 0);
}

export function liquidarCompra(solicitud: SolicitudCompra): Liquidacion {
  const { items, municipio, categoria, codigoCupon, hoy } = solicitud;

  const subtotal = sumar(items.map(valorDeLinea));
  // Supuesto 8: el envío gratis cuenta solo los productos con IVA, a valor de lista.
  const productosConIva = sumar(
    items.filter((item) => item.producto.tarifaIva > 0).map(valorDeLinea),
  );

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
