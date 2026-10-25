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
  });
});