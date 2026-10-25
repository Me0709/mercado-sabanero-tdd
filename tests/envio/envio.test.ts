import { calcularEnvio } from '../../src/envio/envio';

describe('HU-05 calcular el envío', () => {
  describe('CA1: el costo depende del municipio de destino', () => {
    test('[CP-30] el envío dentro de Sincelejo cuesta 8000', () => {
      // Arrange
      const municipio = 'Sincelejo';
      const productosConIva = 100000;

      // Act
      const envio = calcularEnvio(municipio, productosConIva);

      // Assert
      expect(envio).toBe(8000);
    });

    test('[CP-31] el envío a otro municipio de Sucre cuesta 15000', () => {
      // Arrange
      const municipio = 'Corozal';
      const productosConIva = 100000;

      // Act
      const envio = calcularEnvio(municipio, productosConIva);

      // Assert
      expect(envio).toBe(15000);
    });
  });
});