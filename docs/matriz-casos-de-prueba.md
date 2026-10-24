# Matriz de casos de prueba

44 casos. Cada caso pasa de **Pendiente** a **Pasa** cuando su prueba se ejecuta en verde. Los supuestos citados (S4, S6, S9) son los de la sección 9 del plan de pruebas.

## HU-01. Agregar productos al carrito (Integrante B)

| ID | Historia | Descripción | Datos de entrada | Resultado esperado | Estado |
|---|---|---|---|---|---|
| CP-01 | HU-01 CA1 | Agrega 1 unidad (límite inferior) con stock suficiente | Producto P, cantidad 1, stock 100 | Carrito con P × 1 | Pendiente |
| CP-02 | HU-01 CA1 | Agrega 50 unidades (límite superior) con stock suficiente | P, cantidad 50, stock 100 | Carrito con P × 50 | Pendiente |
| CP-03 | HU-01 CA2 | Rechaza 0 unidades | P, cantidad 0 | Error de cantidad inválida; carrito sin cambios | Pendiente |
| CP-04 | HU-01 CA2 | Rechaza 51 unidades | P, cantidad 51, stock 100 | Error de cantidad inválida; carrito sin cambios | Pendiente |
| CP-05 | HU-01 CA3 | Informa stock insuficiente (doble de prueba del inventario) | P, cantidad 10, stock 5 | Error de stock insuficiente; carrito sin cambios | Pendiente |
| CP-06 | HU-01 CA4 | Suma cantidades si el producto ya está en el carrito | Agrega P × 2 y luego P × 3 | Carrito con P × 5 en una sola línea | Pendiente |
| CP-07 | HU-01 CA4 + CA2 (S9) | Rechaza si la cantidad acumulada supera 50 | Agrega P × 30 y luego P × 25 | Error de cantidad inválida; el carrito conserva P × 30 | Pendiente |
| CP-08 | HU-01 CA1 | Consulta el stock al inventario con el id del producto (doble de prueba) | P con id `p1`, cantidad 2 | `consultarStock` se llama una vez con `p1` | Pendiente |

## HU-02. Calcular el IVA (Integrante A)

| ID | Historia | Descripción | Datos de entrada | Resultado esperado | Estado |
|---|---|---|---|---|---|
| CP-09 | HU-02 CA1 | IVA de tarifa 0 % | $4.500 × 1, tarifa 0 %, sin descuento | IVA $0 | Pendiente |
| CP-10 | HU-02 CA1 | IVA de tarifa 5 % | $15.000 × 1, tarifa 5 %, sin descuento | IVA $750 | Pendiente |
| CP-11 | HU-02 CA1 | IVA de tarifa 19 % | $180.000 × 1, tarifa 19 %, sin descuento | IVA $34.200 | Pendiente |
| CP-12 | HU-02 CA1 | Redondea al peso más cercano (el .5 sube) | $4.510 × 1, tarifa 5 %, sin descuento | IVA $226 (225,5 → 226) | Pendiente |
| CP-13 | HU-02 CA2 | IVA sobre el valor con descuento | $180.000 × 1, tarifa 19 %, descuento 5 % | IVA $32.490 | Pendiente |
| CP-14 | HU-02 CA2 | IVA total del ejemplo del enunciado | Licuadora × 1 ($180.000, 19 %), cafés × 2 ($15.000, 5 %), arroces × 4 ($4.500, 0 %); descuento 5 % | Licuadora $32.490 + cafés $1.425 + arroces $0 = $33.915 | Pendiente |

## HU-03. Descuento por volumen (Integrante A)

| ID | Historia | Descripción | Datos de entrada | Resultado esperado | Estado |
|---|---|---|---|---|---|
| CP-15 | HU-03 CA1 | Sin descuento bajo el umbral | Subtotal $50.000 | 0 % | Pasa |
| CP-16 | HU-03 CA1 | Sin descuento en el límite superior del tramo | Subtotal $199.999 | 0 % | Pasa |
| CP-17 | HU-03 CA2 | Límite inferior del 5 % | Subtotal $200.000 | 5 % | Pasa |
| CP-18 | HU-03 CA2 | Límite superior del 5 % | Subtotal $499.999 | 5 % | Pasa |
| CP-19 | HU-03 CA3 | Límite inferior del 10 % | Subtotal $500.000 | 10 % | Pasa |
| CP-20 | HU-03 CA3 | Subtotal alto | Subtotal $1.000.000 | 10 % | Pasa |
| CP-21 | HU-03 CA2 | Monto del descuento del ejemplo | Subtotal $228.000 | Descuento $11.400 | Pasa |
| CP-42 | HU-03 CA2 | Redondea el monto del descuento al peso más cercano (el .5 sube) | Subtotal $200.010 | Descuento $10.001 (10.000,5 → 10.001) | Pasa |

## HU-04. Usar cupones (Integrante A)

| ID | Historia | Descripción | Datos de entrada | Resultado esperado | Estado |
|---|---|---|---|---|---|
| CP-22 | HU-04 CA1 | SABANERO10 en el subtotal mínimo | SABANERO10, subtotal $50.000, fecha vigente | 10 % de descuento; envío no gratis | Pasa |
| CP-23 | HU-04 CA1 (S4) | SABANERO10 por debajo del mínimo | SABANERO10, subtotal $49.999 | Error de cupón no aplicable | Pasa |
| CP-24 | HU-04 CA2 | ENVIOGRATIS deja el envío en $0 | ENVIOGRATIS, subtotal $30.000 | 0 % de descuento; envío gratis | Pasa |
| CP-25 | HU-04 CA3 | Cupón inexistente | NOEXISTE, subtotal $100.000 | Error de cupón inválido | Pasa |
| CP-26 | HU-04 CA3 | Cupón vencido | Cupón con vencimiento 2026-01-31; fecha de hoy 2026-02-01 | Error de cupón inválido | Pasa |
| CP-27 | HU-04 CA4 | Solo se aplica el mayor: cupón 10 % contra volumen 5 % | Subtotal $300.000 + SABANERO10 | 10 % ($30.000), no 15 % | Pasa |
| CP-28 | HU-04 CA4 | Empate de descuentos: no se suman | Subtotal $600.000 + SABANERO10 | 10 % ($60.000), no 20 % | Pasa |
| CP-29 | HU-04 CA4 (S6) | ENVIOGRATIS no anula el descuento por volumen | Subtotal $300.000 + ENVIOGRATIS | 5 % ($15.000) y envío gratis | Pasa |
| CP-43 | HU-04 CA3 | El cupón sigue vigente el día de su vencimiento | Cupón con vencimiento 2026-01-31; fecha de hoy 2026-01-31 | 10 % de descuento; envío no gratis | Pasa |
| CP-44 | HU-04 CA4 | Sin cupón se aplica solo el descuento por volumen | Subtotal $228.000, sin cupón | 5 % ($11.400); envío no gratis | Pasa |

## HU-05. Calcular el envío (Integrante B)

| ID | Historia | Descripción | Datos de entrada | Resultado esperado | Estado |
|---|---|---|---|---|---|
| CP-30 | HU-05 CA1 | Envío dentro de Sincelejo | Destino Sincelejo; productos con IVA $100.000 | Envío $8.000 | Pendiente |
| CP-31 | HU-05 CA1 | Envío a otro municipio de Sucre | Destino Corozal; productos con IVA $100.000 | Envío $15.000 | Pendiente |
| CP-32 | HU-05 CA2 | Envío gratis en el límite | Productos con IVA $150.000 | Envío $0 | Pendiente |
| CP-33 | HU-05 CA2 | Se cobra el envío justo bajo el límite | Sincelejo; productos con IVA $149.999 | Envío $8.000 | Pendiente |
| CP-34 | HU-05 CA3 | Total = subtotal − descuento + IVA + envío | Subtotal $100.000; descuento $0; IVA $19.000; envío $8.000 | Total $127.000 | Pendiente |
| CP-35 | HU-05 + HU-04 CA2 | Envío $0 con cupón ENVIOGRATIS | Sincelejo; productos con IVA $100.000; ENVIOGRATIS | Envío $0 | Pendiente |

## HU-06. Acumular puntos (Integrante B)

| ID | Historia | Descripción | Datos de entrada | Resultado esperado | Estado |
|---|---|---|---|---|---|
| CP-36 | HU-06 CA1 | 1 punto por cada $1.000 completos | Total sin envío $12.999, cliente ESTÁNDAR | 12 puntos | Pendiente |
| CP-37 | HU-06 CA1 | Menos de $1.000 no da puntos | Total sin envío $999 | 0 puntos | Pendiente |
| CP-38 | HU-06 CA1 | Límite exacto de $1.000 | Total sin envío $1.000 | 1 punto | Pendiente |
| CP-39 | HU-06 CA2 | El cliente ORO recibe el doble | Total sin envío $12.999, cliente ORO | 24 puntos | Pendiente |
| CP-40 | HU-06 CA1 | El envío no suma puntos | Total pagado $258.515 con envío $8.000 | 250 puntos | Pendiente |

## Integración

| ID | Historia | Descripción | Datos de entrada | Resultado esperado | Estado |
|---|---|---|---|---|---|
| CP-41 | HU-01 a HU-06 | Ejemplo del enunciado | Cliente ESTÁNDAR en Sincelejo, sin cupón; 1 licuadora $180.000 (IVA 19 %), 2 cafés $15.000 (IVA 5 %), 4 arroces $4.500 (IVA 0 %) | Subtotal $228.000; descuento 5 % = $11.400; IVA $33.915; envío $0; total $250.515; 250 puntos | Pendiente |

## Trazabilidad de los criterios de aceptación

Los 18 criterios quedan cubiertos.

| Criterio | Casos | Criterio | Casos |
|---|---|---|---|
| HU-01 CA1 | CP-01, 02, 08 | HU-04 CA1 | CP-22, 23 |
| HU-01 CA2 | CP-03, 04, 07 | HU-04 CA2 | CP-24, 35 |
| HU-01 CA3 | CP-05 | HU-04 CA3 | CP-25, 26, 43 |
| HU-01 CA4 | CP-06, 07 | HU-04 CA4 | CP-27, 28, 29, 44 |
| HU-02 CA1 | CP-09, 10, 11, 12 | HU-05 CA1 | CP-30, 31 |
| HU-02 CA2 | CP-13, 14 | HU-05 CA2 | CP-32, 33 |
| HU-03 CA1 | CP-15, 16 | HU-05 CA3 | CP-34 |
| HU-03 CA2 | CP-17, 18, 21, 42 | HU-06 CA1 | CP-36, 37, 38, 40 |
| HU-03 CA3 | CP-19, 20 | HU-06 CA2 | CP-39 |
