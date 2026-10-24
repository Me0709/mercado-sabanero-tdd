import {
  calcularDescuentoPorVolumen,
  porcentajeDescuentoPorVolumen,
} from '../../src/precios/descuentoPorVolumen';

describe('HU-03 descuento por volumen', () => {
  describe('CA1: un subtotal menor a $200.000 no tiene descuento', () => {
    test.each<[string, number]>([
      ['CP-15', 50000],
      ['CP-16', 199999],
    ])('[%s] con subtotal %i devuelve 0 por ciento', (_id, subtotal) => {
      // Arrange: el subtotal viene de la fila de la tabla

      // Act
      const porcentaje = porcentajeDescuentoPorVolumen(subtotal);

      // Assert
      expect(porcentaje).toBe(0);
    });
  });

  describe('CA2: un subtotal desde $200.000 y menor a $500.000 tiene 5 %', () => {
    test.each<[string, number]>([
      ['CP-17', 200000],
      ['CP-18', 499999],
    ])('[%s] con subtotal %i devuelve 5 por ciento', (_id, subtotal) => {
      // Arrange: el subtotal viene de la fila de la tabla

      // Act
      const porcentaje = porcentajeDescuentoPorVolumen(subtotal);

      // Assert
      expect(porcentaje).toBe(5);
    });

    test('[CP-21] calcularDescuentoPorVolumen devuelve 11400 cuando el subtotal es 228000', () => {
      // Arrange
      const subtotal = 228000;

      // Act
      const descuento = calcularDescuentoPorVolumen(subtotal);

      // Assert
      expect(descuento).toBe(11400);
    });

    test('[CP-42] calcularDescuentoPorVolumen redondea el .5 hacia arriba cuando el descuento no es entero', () => {
      // Arrange: 5 % de 200010 es 10000,5
      const subtotal = 200010;

      // Act
      const descuento = calcularDescuentoPorVolumen(subtotal);

      // Assert
      expect(descuento).toBe(10001);
    });
  });

  describe('CA3: un subtotal desde $500.000 tiene 10 %', () => {
    test.each<[string, number]>([
      ['CP-19', 500000],
      ['CP-20', 1000000],
    ])('[%s] con subtotal %i devuelve 10 por ciento', (_id, subtotal) => {
      // Arrange: el subtotal viene de la fila de la tabla

      // Act
      const porcentaje = porcentajeDescuentoPorVolumen(subtotal);

      // Assert
      expect(porcentaje).toBe(10);
    });
  });
});
