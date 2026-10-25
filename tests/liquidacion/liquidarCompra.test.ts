import { ItemCarrito, TarifaIva } from '../../src/dominio/tipos';
import { liquidarCompra } from '../../src/liquidacion/liquidarCompra';

const HOY = '2026-11-01';

function item(id: string, precio: number, tarifaIva: TarifaIva, cantidad: number): ItemCarrito {
  return { producto: { id, nombre: id, precio, tarifaIva }, cantidad };
}

describe('Integración: liquidación completa de una compra', () => {
  test('[CP-41] liquida el ejemplo del enunciado: total 250515 y 250 puntos', () => {
    // Arrange: cliente ESTANDAR en Sincelejo, sin cupón
    const items = [
      item('licuadora', 180000, 19, 1),
      item('cafe', 15000, 5, 2),
      item('arroz', 4500, 0, 4),
    ];

    // Act
    const liquidacion = liquidarCompra({
      items,
      municipio: 'Sincelejo',
      categoria: 'ESTANDAR',
      hoy: HOY,
    });

    // Assert
    expect(liquidacion).toEqual({
      subtotal: 228000,
      porcentajeDescuento: 5,
      descuento: 11400,
      iva: 33915,
      envio: 0,
      total: 250515,
      puntos: 250,
    });
  });

  test('[CP-47] liquida una compra con cupón, cliente ORO y envío a otro municipio', () => {
    // Arrange: el arroz no tiene IVA, así que los productos con IVA suman solo 40000
    // y se cobra el envío aunque el subtotal (220000) pase de 150000
    const items = [item('arroz', 4500, 0, 40), item('leche', 4000, 5, 10)];

    // Act
    const liquidacion = liquidarCompra({
      items,
      municipio: 'Corozal',
      categoria: 'ORO',
      codigoCupon: 'SABANERO10',
      hoy: HOY,
    });

    // Assert: el cupón (10 %) gana al descuento por volumen (5 %); 199 puntos base x 2 por ORO
    expect(liquidacion).toEqual({
      subtotal: 220000,
      porcentajeDescuento: 10,
      descuento: 22000,
      iva: 1800,
      envio: 15000,
      total: 214800,
      puntos: 398,
    });
  });
});
