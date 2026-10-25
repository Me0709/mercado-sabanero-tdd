import { agregarAlCarrito } from '../../src/carrito/carrito';
import { Inventario, Producto } from '../../src/dominio/tipos';

const leche: Producto = { id: 'P1', nombre: 'Leche', precio: 4000, tarifaIva: 5 };

describe('HU-01 agregar productos al carrito', () => {
  describe('CA1: con stock suficiente se agregan de 1 a 50 unidades', () => {
    test('[CP-01] agrega 1 unidad y queda en el carrito con cantidad 1', () => {
      // Arrange: inventario falso con stock de sobra
      const inventario: Inventario = { consultarStock: jest.fn().mockReturnValue(100) };

      // Act
      const carrito = agregarAlCarrito([], leche, 1, inventario);

      // Assert
      expect(carrito).toEqual([{ producto: leche, cantidad: 1 }]);
    });
  });
});