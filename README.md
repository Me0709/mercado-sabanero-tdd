# Mercado Sabanero: módulo de liquidación de compras

Lógica de negocio que liquida una compra (carrito, IVA, descuento por volumen, cupones, envío y puntos), desarrollada con TDD en TypeScript. No tiene interfaz ni base de datos.

## Requisitos

- Node.js 20 o superior (probado con 24)
- npm

## Cómo ejecutar las pruebas

```bash
npm install
npm test
```

Reporte de cobertura (el umbral es 80 % de líneas):

```bash
npm run test:cov
```

El reporte HTML queda en `coverage/lcov-report/index.html`.

## Estructura

```
src/
  dominio/tipos.ts   Tipos compartidos (Producto, ItemCarrito, Inventario...)
  precios/           HU-02 IVA, HU-03 descuento por volumen, HU-04 cupones
  carrito/  envio/  puntos/   HU-01, HU-05, HU-06
tests/               Pruebas, con la misma estructura que src/
docs/
  plan-de-pruebas.md
  matriz-casos-de-prueba.md
  registro-de-defectos.md
```

## Convenciones

- Commits del ciclo TDD: `test:` (prueba en rojo), `feat:` (código que la pasa), `refactor:` (mejora).
- Los nombres de las pruebas empiezan con el ID del caso de la matriz, por ejemplo `[CP-17]`.
- Dinero en pesos enteros; el .5 se redondea hacia arriba.
- La fecha se pasa como parámetro (`AAAA-MM-DD`); el código no lee el reloj.
