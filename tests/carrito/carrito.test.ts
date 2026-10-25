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

    test('[CP-08] consulta el stock una sola vez con el id del producto', () => {
      // Arrange
      const consultarStock = jest.fn().mockReturnValue(100);
      const inventario: Inventario = { consultarStock };
      const producto: Producto = { ...leche, id: 'p1' };

      // Act
      agregarAlCarrito([], producto, 2, inventario);

      // Assert
      expect(consultarStock).toHaveBeenCalledTimes(1);
      expect(consultarStock).toHaveBeenCalledWith('p1');
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

  describe('CA3: se informa cuando el stock es insuficiente', () => {
    test('[CP-05] rechaza 10 unidades cuando el stock es 5 y deja el carrito sin cambios', () => {
      // Arrange: el doble de prueba del inventario dice que solo hay 5
      const inventario: Inventario = { consultarStock: jest.fn().mockReturnValue(5) };
      const carritoInicial: ItemCarrito[] = [];

      // Act y Assert
      expect(() => agregarAlCarrito(carritoInicial, leche, 10, inventario)).toThrow(
        'Stock insuficiente',
      );
      expect(carritoInicial).toEqual([]);
    });

    test('[CP-45] rechaza si el stock no alcanza para la cantidad acumulada y deja el carrito sin cambios', () => {
      // Arrange: ya hay 8 unidades en el carrito y el stock es 10
      const inventario: Inventario = { consultarStock: jest.fn().mockReturnValue(10) };
      const carritoInicial = agregarAlCarrito([], leche, 8, inventario);

      // Act y Assert: 8 + 5 = 13, más de lo que hay en stock
      expect(() => agregarAlCarrito(carritoInicial, leche, 5, inventario)).toThrow(
        'Stock insuficiente',
      );
      expect(carritoInicial).toEqual([{ producto: leche, cantidad: 8 }]);
    });
  });

  describe('CA4: si el producto ya está en el carrito se suman las cantidades', () => {
    test('[CP-06] suma 2 y 3 unidades del mismo producto en una sola línea', () => {
      // Arrange
      const inventario: Inventario = { consultarStock: jest.fn().mockReturnValue(100) };
      const primero = agregarAlCarrito([], leche, 2, inventario);

      // Act
      const carrito = agregarAlCarrito(primero, leche, 3, inventario);

      // Assert
      expect(carrito).toEqual([{ producto: leche, cantidad: 5 }]);
    });

    test('[CP-07] rechaza si la cantidad acumulada supera 50 y conserva el carrito', () => {
      // Arrange: ya hay 30 y se intenta agregar 25 más, para un total de 55
      const inventario: Inventario = { consultarStock: jest.fn().mockReturnValue(100) };
      const carritoInicial = agregarAlCarrito([], leche, 30, inventario);

      // Act y Assert
      expect(() => agregarAlCarrito(carritoInicial, leche, 25, inventario)).toThrow(
        'Cantidad inválida',
      );
      expect(carritoInicial).toEqual([{ producto: leche, cantidad: 30 }]);
    });

    test('[CP-06b] suma solo el producto repetido y deja intacto el otro producto', () => {
      // Arrange: el carrito ya tiene leche × 2 y arroz × 4
      const arroz: Producto = { id: 'P2', nombre: 'Arroz', precio: 4500, tarifaIva: 0 };
      const inventario: Inventario = { consultarStock: jest.fn().mockReturnValue(100) };
      const carritoInicial: ItemCarrito[] = [
        { producto: leche, cantidad: 2 },
        { producto: arroz, cantidad: 4 },
      ];

      // Act
      const carrito = agregarAlCarrito(carritoInicial, leche, 3, inventario);

      // Assert
      expect(carrito).toEqual([
        { producto: leche, cantidad: 5 },
        { producto: arroz, cantidad: 4 },
      ]);
    });
  });
});