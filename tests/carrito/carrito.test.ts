import { agregarAlCarrito } from '../../src/carrito/carrito';
import { Inventario, ItemCarrito, Producto } from '../../src/dominio/tipos';

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

    test('[CP-02] agrega 50 unidades y queda en el carrito con cantidad 50', () => {
      // Arrange
      const inventario: Inventario = { consultarStock: jest.fn().mockReturnValue(100) };

      // Act
      const carrito = agregarAlCarrito([], leche, 50, inventario);

      // Assert
      expect(carrito).toEqual([{ producto: leche, cantidad: 50 }]);
    });
  });

  describe('CA2: se rechazan 0 unidades o más de 50', () => {
    test.each<[string, number]>([
      ['CP-03', 0],
      ['CP-04', 51],
    ])('[%s] rechaza la cantidad %i y deja el carrito sin cambios', (_id, cantidad) => {
      // Arrange
      const inventario: Inventario = { consultarStock: jest.fn().mockReturnValue(100) };
      const carritoInicial: ItemCarrito[] = [];

      // Act y Assert
      expect(() => agregarAlCarrito(carritoInicial, leche, cantidad, inventario)).toThrow(
        'Cantidad inválida',
      );
      expect(carritoInicial).toEqual([]);
    });
  });
});