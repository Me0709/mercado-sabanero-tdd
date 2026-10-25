import { ItemCarrito, TarifaIva } from '../../src/dominio/tipos';
import { calcularIvaPorProducto, calcularIvaTotal } from '../../src/precios/iva';

function item(id: string, precio: number, tarifaIva: TarifaIva, cantidad = 1): ItemCarrito {
  return { producto: { id, nombre: id, precio, tarifaIva }, cantidad };
}

describe('HU-02 IVA', () => {
  describe('CA1: el IVA de cada producto corresponde a su tarifa (0 %, 5 % o 19 %)', () => {
    test.each<[string, number, TarifaIva, number]>([
      ['CP-09', 4500, 0, 0],
      ['CP-10', 15000, 5, 750],
      ['CP-11', 180000, 19, 34200],
    ])('[%s] con precio %i y tarifa %i por ciento devuelve IVA %i', (_id, precio, tarifa, esperado) => {
      // Arrange
      const items = [item('p1', precio, tarifa)];

      // Act
      const [linea] = calcularIvaPorProducto(items, 0);

      // Assert
      expect(linea.iva).toBe(esperado);
    });

    test('[CP-12] calcularIvaPorProducto redondea el .5 hacia arriba cuando el IVA no es entero', () => {
      // Arrange: 5 % de 4510 es 225,5
      const items = [item('p1', 4510, 5)];

      // Act
      const [linea] = calcularIvaPorProducto(items, 0);

      // Assert
      expect(linea.iva).toBe(226);
    });
  });

  describe('CA2: el IVA se calcula sobre el valor del producto con el descuento aplicado', () => {
    test('[CP-13] calcularIvaPorProducto calcula el IVA de 180000 al 19 por ciento con 5 por ciento de descuento', () => {
      // Arrange: 180000 con 5 % de descuento es 171000
      const items = [item('licuadora', 180000, 19)];

      // Act
      const [linea] = calcularIvaPorProducto(items, 5);

      // Assert
      expect(linea.iva).toBe(32490);
    });

    describe('con el ejemplo del enunciado y 5 % de descuento', () => {
      const ejemplo = [
        item('licuadora', 180000, 19, 1),
        item('cafe', 15000, 5, 2),
        item('arroz', 4500, 0, 4),
      ];

      test('[CP-14a] calcularIvaPorProducto devuelve el IVA de cada producto', () => {
        // Arrange: el ejemplo viene definido arriba

        // Act
        const lineas = calcularIvaPorProducto(ejemplo, 5);

        // Assert
        expect(lineas).toEqual([
          { productoId: 'licuadora', iva: 32490 },
          { productoId: 'cafe', iva: 1425 },
          { productoId: 'arroz', iva: 0 },
        ]);
      });

      test('[CP-14b] calcularIvaTotal devuelve 33915', () => {
        // Arrange: el ejemplo viene definido arriba

        // Act
        const total = calcularIvaTotal(ejemplo, 5);

        // Assert
        expect(total).toBe(33915);
      });
    });
  });
});
