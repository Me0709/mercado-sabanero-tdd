import { calcularEnvio, calcularTotal } from '../../src/envio/envio';

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

  describe('CA2: el envío es gratis desde 150000 en productos con IVA', () => {
    test('[CP-32] con productos con IVA por 150000 el envío es 0', () => {
      // Arrange: el límite exacto
      const municipio = 'Sincelejo';
      const productosConIva = 150000;

      // Act
      const envio = calcularEnvio(municipio, productosConIva);

      // Assert
      expect(envio).toBe(0);
    });

    test('[CP-33] con productos con IVA por 149999 se cobra el envío', () => {
      // Arrange: un peso por debajo del límite
      const municipio = 'Sincelejo';
      const productosConIva = 149999;

      // Act
      const envio = calcularEnvio(municipio, productosConIva);

      // Assert
      expect(envio).toBe(8000);
    });
  });

  describe('CA3: el total es subtotal menos descuento más IVA más envío', () => {
    test('[CP-34] con subtotal 100000, descuento 0, IVA 19000 y envío 8000 el total es 127000', () => {
      // Arrange
      const subtotal = 100000;
      const descuento = 0;
      const iva = 19000;
      const envio = 8000;

      // Act
      const total = calcularTotal(subtotal, descuento, iva, envio);

      // Assert
      expect(total).toBe(127000);
    });
  });
});