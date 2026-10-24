import {
  Cupon,
  CuponInvalidoError,
  CuponNoAplicableError,
  aplicarCupon,
} from '../../src/precios/cupones';

const HOY = '2026-11-01';

describe('HU-04 cupones', () => {
  describe('CA1: SABANERO10 da 10 % con un subtotal de al menos $50.000', () => {
    test('[CP-22] aplicarCupon devuelve 10 por ciento sin envío gratis cuando el subtotal es 50000', () => {
      // Arrange
      const subtotal = 50000;

      // Act
      const resultado = aplicarCupon('SABANERO10', subtotal, HOY);

      // Assert
      expect(resultado).toEqual({ porcentajeDescuento: 10, envioGratis: false });
    });

    test('[CP-23] aplicarCupon lanza CuponNoAplicableError cuando el subtotal es 49999', () => {
      // Arrange
      const subtotal = 49999;

      // Act
      const aplicar = () => aplicarCupon('SABANERO10', subtotal, HOY);

      // Assert
      expect(aplicar).toThrow(CuponNoAplicableError);
    });
  });

  describe('CA2: ENVIOGRATIS deja el envío en $0', () => {
    test('[CP-24] aplicarCupon devuelve envío gratis y 0 por ciento cuando el cupón es ENVIOGRATIS', () => {
      // Arrange
      const subtotal = 30000;

      // Act
      const resultado = aplicarCupon('ENVIOGRATIS', subtotal, HOY);

      // Assert
      expect(resultado).toEqual({ porcentajeDescuento: 0, envioGratis: true });
    });
  });

  describe('CA3: un cupón inexistente o vencido se rechaza', () => {
    test('[CP-25] aplicarCupon lanza CuponInvalidoError cuando el cupón no existe', () => {
      // Arrange
      const subtotal = 100000;

      // Act
      const aplicar = () => aplicarCupon('NOEXISTE', subtotal, HOY);

      // Assert
      expect(aplicar).toThrow(CuponInvalidoError);
    });

    describe('con un cupón que vence el 2026-01-31', () => {
      const catalogo: Cupon[] = [
        {
          codigo: 'VIEJO10',
          tipo: 'PORCENTAJE',
          porcentaje: 10,
          subtotalMinimo: 0,
          vence: '2026-01-31',
        },
      ];

      test('[CP-26] aplicarCupon lanza CuponInvalidoError cuando la fecha es posterior al vencimiento', () => {
        // Arrange
        const hoy = '2026-02-01';

        // Act
        const aplicar = () => aplicarCupon('VIEJO10', 100000, hoy, catalogo);

        // Assert
        expect(aplicar).toThrow(CuponInvalidoError);
      });

      test('[CP-43] aplicarCupon aplica el cupón cuando la fecha es el último día de vigencia', () => {
        // Arrange
        const hoy = '2026-01-31';

        // Act
        const resultado = aplicarCupon('VIEJO10', 100000, hoy, catalogo);

        // Assert
        expect(resultado).toEqual({ porcentajeDescuento: 10, envioGratis: false });
      });
    });
  });
});
