import { calcularPuntos } from '../../src/puntos/puntos';

describe('HU-06 acumular puntos', () => {
  describe('CA1: 1 punto por cada 1000 pesos completos', () => {
    test('[CP-36] un total sin envío de 12999 da 12 puntos al cliente ESTANDAR', () => {
      // Arrange
      const totalPagado = 12999;
      const envio = 0;

      // Act
      const puntos = calcularPuntos(totalPagado, envio, 'ESTANDAR');

      // Assert
      expect(puntos).toBe(12);
    });

    test.each<[string, number, number]>([
      ['CP-37', 999, 0],
      ['CP-38', 1000, 1],
    ])('[%s] un total sin envío de %i da %i puntos', (_id, totalPagado, esperado) => {
      // Arrange: el total y los puntos esperados vienen de la fila de la tabla
      const envio = 0;

      // Act
      const puntos = calcularPuntos(totalPagado, envio, 'ESTANDAR');

      // Assert
      expect(puntos).toBe(esperado);
    });

    test('[CP-40] el envío no suma puntos: total pagado 258515 con envío 8000 da 250', () => {
      // Arrange: sin el envío quedan 250515, o sea 250 miles completos
      const totalPagado = 258515;
      const envio = 8000;

      // Act
      const puntos = calcularPuntos(totalPagado, envio, 'ESTANDAR');

      // Assert
      expect(puntos).toBe(250);
    });
  });
  describe('CA2: el cliente ORO recibe el doble de puntos', () => {
    test('[CP-39] un total sin envío de 12999 da 24 puntos al cliente ORO', () => {
      // Arrange
      const totalPagado = 12999;
      const envio = 0;

      // Act
      const puntos = calcularPuntos(totalPagado, envio, 'ORO');

      // Assert
      expect(puntos).toBe(24);
    });
  });
});