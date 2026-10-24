# Plan de pruebas ágil: módulo de liquidación de Mercado Sabanero

Electiva Profesional en Ingeniería de Software · Agilidad Continua · IX semestre
Integrantes: Integrante A (completar nombre) · Integrante B (completar nombre)

## 1. Objetivo

Verificar con pruebas unitarias automatizadas, escritas antes del código (TDD), que el módulo de liquidación calcula correctamente el carrito, el IVA, los descuentos, los cupones, el envío y los puntos de fidelidad.

## 2. Alcance

**Incluye:** las historias HU-01 a HU-06 y sus 18 criterios de aceptación (CA). Solo lógica de negocio en TypeScript.

**No incluye:** interfaz gráfica, base de datos, API, inventario real (se reemplaza por un doble de prueba), pagos ni autenticación.

**Convención de valores:** pesos enteros, sin decimales, redondeo al peso más cercano (el .5 sube).

## 3. Estrategia

- **TDD por criterio de aceptación.** Ciclo rojo (prueba que falla) → verde (mínimo código que la pasa) → refactor (mejora sin cambiar el comportamiento). Commits con prefijo `test:`, `feat:` y `refactor:`.
- **Trazabilidad.** Cada CA tiene al menos un caso en la matriz (`docs/matriz-casos-de-prueba.md`) y cada caso tiene al menos una prueba. El nombre de la prueba empieza con el ID del caso, por ejemplo `[CP-17]`.
- **Patrón AAA.** Cada prueba separa Arrange (preparar), Act (ejecutar) y Assert (verificar).
- **Nombres descriptivos.** Formato `[CP-xx] <unidad> devuelve/lanza <resultado> cuando <condición>`.
- **Valores límite** con pruebas parametrizadas (`test.each`): 0, 1, 50 y 51 unidades; $49.999 y $50.000; $149.999 y $150.000; $199.999 y $200.000; $499.999 y $500.000.
- **Pruebas de error** con `toThrow` para cantidades inválidas, stock insuficiente y cupones inválidos.
- **Doble de prueba** del inventario con `jest.fn()`.
- **Determinismo.** La fecha se recibe como parámetro, así que las pruebas de cupones vencidos no dependen del día en que se ejecuten.
- **Dinero con aritmética entera**, para evitar errores de coma flotante.

## 4. Tipos de prueba

| Tipo | Qué cubre | Herramienta |
|---|---|---|
| Unitaria | Cada regla de negocio por separado | Jest |
| Integración ligera | El ejemplo completo del enunciado, uniendo los módulos (sin entrada/salida) | Jest |
| Cobertura | Líneas de la lógica de negocio | Jest con Istanbul (`--coverage`) |

No se hacen pruebas de interfaz, extremo a extremo, rendimiento ni seguridad, porque están fuera del alcance.

## 5. Herramientas y justificación

| Herramienta | Uso | Por qué |
|---|---|---|
| TypeScript 6 | Lenguaje | El tipado atrapa errores al compilar (por ejemplo, la tarifa de IVA es el tipo `0 \| 5 \| 19`). Está en las opciones del enunciado. |
| Jest 30 + ts-jest | Pruebas, dobles de prueba y cobertura | Una sola herramienta ejecuta, simula (`jest.fn`), parametriza (`test.each`) y mide cobertura. |
| Git y GitHub | Control de versiones | Los commits muestran el ciclo TDD y el aporte de cada integrante. |

No se usa NestJS porque no hay API. TypeScript se fija en la serie 6 porque `ts-jest` 29 todavía no soporta TypeScript 7.

## 6. Criterios de éxito

- Todas las pruebas pasan con `npm test`.
- Al menos 20 pruebas unitarias (la matriz planifica 42 casos), con al menos 2 parametrizadas, 4 de error y 2 con doble de prueba.
- Cobertura de líneas de al menos 80 % (`npm run test:cov`, con el umbral configurado en `jest.config.js`).
- El ejemplo del enunciado da: subtotal $228.000, descuento $11.400, IVA $33.915, envío $0, total $250.515 y 250 puntos.
- Commits `test:` → `feat:` → `refactor:` en las 6 historias.
- Los defectos encontrados quedan en `docs/registro-de-defectos.md`.

## 7. Riesgos

| Riesgo | Mitigación |
|---|---|
| Criterios ambiguos | Las decisiones quedan en la sección 9 y se confirman con la docente. |
| Errores de redondeo por números decimales | Aritmética entera y un caso de redondeo del .5 (CP-12). |
| Pruebas que dependen de la fecha actual | La fecha se inyecta como parámetro. |
| Conflictos entre los módulos de cada integrante | Los tipos compartidos se fijan al inicio en `src/dominio/tipos.ts` y cada historia vive en su propio archivo. |
| Pruebas acopladas a la implementación | Se prueban entradas y salidas, no detalles internos. |
| Cobertura alta con verificaciones débiles | Revisión entre pares de los `expect` y de los casos límite. |
| Disponibilidad desigual del equipo | Historias independientes por integrante y revisión frecuente de ramas. |

## 8. Organización del trabajo

| Integrante | Historias | Carpetas |
|---|---|---|
| A | HU-02 (IVA), HU-03 (descuento por volumen), HU-04 (cupones) | `src/precios/`, `tests/precios/` |
| B | HU-01 (carrito), HU-05 (envío), HU-06 (puntos) | `src/carrito/`, `src/envio/`, `src/puntos/` y sus pruebas |

- Ramas: `main` y una rama por historia (`feat/hu-03-descuento-volumen`).
- Revisión entre pares cruzada: A revisa las pruebas de B y B las de A, con comentarios en la solicitud de cambios (pull request).
- La prueba del ejemplo completo (CP-41) se escribe cuando los módulos de A y B estén en `main`.

## 9. Supuestos sobre los criterios de aceptación

El enunciado deja algunos puntos abiertos. Se decidió lo siguiente y debe confirmarse con la docente.

1. **Redondeo:** el IVA se redondea por línea de producto y el descuento sobre el monto total, siempre al peso más cercano con el .5 hacia arriba.
2. **IVA con descuento (HU-02 CA2):** el porcentaje de descuento se aplica a cada línea antes de calcular su IVA.
3. **Descuento por volumen (HU-03):** se calcula sobre el subtotal. Tramos: menos de $200.000 → 0 %; desde $200.000 y menos de $500.000 → 5 %; desde $500.000 → 10 %.
4. **Cupón bajo el mínimo (HU-04 CA1):** SABANERO10 con subtotal menor a $50.000 se rechaza con un error de cupón no aplicable. El enunciado no define este caso.
5. **Descuento mayor (HU-04 CA4):** se compara el porcentaje por volumen con el del cupón y se aplica solo el mayor. En un empate se aplica uno solo.
6. **ENVIOGRATIS (HU-04 CA2):** no es un descuento porcentual. Solo deja el envío en $0 y no anula el descuento por volumen.
7. **Cupones vencidos (HU-04 CA3):** cada cupón tiene fecha de vencimiento en formato `AAAA-MM-DD`; está vigente si la fecha de hoy es menor o igual a la de vencimiento. Los códigos se comparan exactamente, sin normalizar.
8. **Envío gratis (HU-05 CA2):** "productos con IVA suman $150.000 o más" es la suma de precio × cantidad, a valor de lista y antes del descuento, de los productos con tarifa de IVA mayor a 0 %. El límite es inclusivo.
9. **Carrito (HU-01):** el máximo de 50 unidades y la verificación de stock se aplican a la cantidad acumulada en el carrito.
10. **Puntos (HU-06):** "el doble de puntos" es 2 × (total pagado sin envío ÷ 1.000, parte entera).
