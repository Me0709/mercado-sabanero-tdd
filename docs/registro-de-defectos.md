# Registro de defectos

Defectos reales encontrados durante el desarrollo y la revisión entre pares. Los tres primeros son huecos en las pruebas; el código que probaban era correcto. El cuarto fue una diferencia de comportamiento, corregida con la prueba CP-45.

| ID | Descripción | Pasos para reproducir | Severidad | Estado |
|---|---|---|---|---|
| DEF-001 | Hueco de prueba en HU-01. La rama de `carrito.ts` que conserva los demás productos al sumar uno repetido nunca se ejecutaba: ninguna prueba tenía otro producto en el carrito. | Ejecutar `npm run test:cov` en la rama `feat/hu-01-carrito` (commit `c774e4d`). `carrito.ts` aparece con 91,66 % de ramas y la línea 26 sin cubrir. | Baja | Corregido con la prueba CP-06b (commit `028e4c5`, PR #1) |
| DEF-002 | Trazabilidad rota en HU-02. Dos pruebas de `iva.test.ts` usaban el mismo ID `[CP-14]`, así que un caso de la matriz no se podía asociar a una sola prueba. | Buscar `CP-14` en `tests/precios/iva.test.ts`: aparece en dos pruebas. | Baja | Corregido: se separaron en CP-14a y CP-14b (PR #5) |
| DEF-003 | Hueco de prueba en HU-04. El rechazo de cupones vencidos solo se probaba con un cupón de porcentaje; un cupón ENVIOGRATIS vencido no tenía prueba. | Revisar CP-26 en `tests/precios/cupones.test.ts`: el catálogo de la prueba solo tiene un cupón de tipo `PORCENTAJE`. | Baja | Corregido con la prueba CP-46 (PR #5) |
| DEF-004 | En HU-01 el stock se compara con las unidades que se agregan y no con la cantidad acumulada en el carrito. El supuesto 9 del plan dice que debe ser la acumulada. | Con stock 10 y un carrito que ya tiene 8 unidades del producto, llamar a `agregarAlCarrito` con cantidad 5: no lanza error y el carrito queda con 13 unidades. | Media | Corregido con la prueba CP-45 (commits ebaa931 y bcc97b2) |

Severidad: Alta (calcula mal el dinero o bloquea una historia), Media (falla en un caso límite o de error), Baja (mensaje, nombre o detalle menor).
Estado: Abierto, Corregido, Descartado.
