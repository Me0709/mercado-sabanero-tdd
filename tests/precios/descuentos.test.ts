import { calcularDescuentos } from '../../src/precios/descuentos';

const HOY = '2026-11-01';

describe('HU-04 CA4: se aplica solo el descuento mayor, sin sumarlos', () => {
  test('[CP-27] calcularDescuentos aplica el cupón de 10 por ciento cuando el volumen da 5 por ciento', () => {
    // Arrange
    const subtotal = 300000;

    // Act
    const resultado = calcularDescuentos(subtotal, 'SABANERO10', HOY);

    // Assert
    expect(resultado).toEqual({
      porcentajeDescuento: 10,
      montoDescuento: 30000,
      envioGratis: false,
    });
  });

  test('[CP-28] calcularDescuentos aplica 10 por ciento, no 20, cuando volumen y cupón empatan', () => {
    // Arrange
    const subtotal = 600000;

    // Act
    const resultado = calcularDescuentos(subtotal, 'SABANERO10', HOY);

    // Assert
    expect(resultado).toEqual({
      porcentajeDescuento: 10,
      montoDescuento: 60000,
      envioGratis: false,
    });
  });

  test('[CP-29] calcularDescuentos conserva el descuento por volumen cuando el cupón es ENVIOGRATIS', () => {
    // Arrange
    const subtotal = 300000;

    // Act
    const resultado = calcularDescuentos(subtotal, 'ENVIOGRATIS', HOY);

    // Assert
    expect(resultado).toEqual({
      porcentajeDescuento: 5,
      montoDescuento: 15000,
      envioGratis: true,
    });
  });

  test('[CP-44] calcularDescuentos aplica solo el descuento por volumen cuando no hay cupón', () => {
    // Arrange
    const subtotal = 228000;

    // Act
    const resultado = calcularDescuentos(subtotal, undefined, HOY);

    // Assert
    expect(resultado).toEqual({
      porcentajeDescuento: 5,
      montoDescuento: 11400,
      envioGratis: false,
    });
  });
});
