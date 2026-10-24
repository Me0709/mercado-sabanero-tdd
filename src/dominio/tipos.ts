// Tipos compartidos entre los módulos del equipo. Son solo contratos: no tienen lógica.

export type TarifaIva = 0 | 5 | 19;

export type CategoriaCliente = 'ESTANDAR' | 'ORO';

export interface Producto {
  id: string;
  nombre: string;
  precio: number; // pesos, entero
  tarifaIva: TarifaIva; // porcentaje
}

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

// Servicio externo. En las pruebas se reemplaza por un doble de prueba (mock).
export interface Inventario {
  consultarStock(productoId: string): number;
}

// Resultado de combinar descuento por volumen y cupón (HU-03 + HU-04).
export interface ResultadoDescuentos {
  porcentajeDescuento: number;
  montoDescuento: number; // pesos, entero
  envioGratis: boolean;
}
