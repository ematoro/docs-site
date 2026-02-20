# 📦 Módulo de Ventas – Propuesta Funcional y Técnica (MVP)

## 1. Introducción

El presente documento describe la propuesta funcional y técnica para la implementación del **Módulo de Ventas** dentro del ERP MVP.

El objetivo es incorporar capacidades transaccionales al sistema, evolucionando desde una solución basada en datos maestros (Clientes y Catálogos) hacia un modelo orientado a operaciones comerciales reales.

Este módulo constituye el núcleo transaccional del ERP.

---

# 2. Objetivos del Módulo

## 2.1 Objetivo General

Permitir el registro, gestión y control de transacciones de venta, incluyendo cálculo de importes, estados del documento y reglas de negocio básicas.

## 2.2 Objetivos Específicos

* Registrar ventas asociadas a clientes.
* Gestionar ítems (productos/servicios).
* Calcular automáticamente subtotales e impuestos.
* Administrar estados del documento (Borrador, Confirmado, Anulado).
* Garantizar integridad de reglas de negocio.
* Servir como base para futura integración contable y de stock.

---

# 3. Alcance del MVP

El MVP contempla:

* Registro de ventas tipo **Pedido** o **Factura Interna**.
* Cálculo automático de totales.
* Gestión de estados.
* Consulta y filtrado de ventas.
* API REST para operaciones CRUD controladas por estado.

No incluye en esta etapa:

* Integración AFIP.
* Gestión avanzada de stock.
* Contabilidad automática.
* Multi-moneda.
* Notas de crédito/débito.

---

# 4. Modelo Funcional

## 4.1 Entidades Principales

### 4.1.1 Venta (Comprobante)

| Campo             | Tipo       | Descripción                     |
| ----------------- | ---------- | ------------------------------- |
| id                | GUID / INT | Identificador único             |
| tipo              | string     | PEDIDO / FACTURA_INT            |
| numero            | int        | Número asignado al confirmar    |
| fecha             | date       | Fecha del comprobante           |
| clienteId         | FK         | Referencia a Cliente            |
| estado            | string     | BORRADOR / CONFIRMADO / ANULADO |
| subtotal          | decimal    | Importe sin impuestos           |
| ivaTotal          | decimal    | Total de impuestos              |
| total             | decimal    | Importe final                   |
| fechaConfirmacion | datetime   | Fecha de confirmación           |
| motivoAnulacion   | string     | Texto libre                     |

---

### 4.1.2 VentaItem

| Campo          | Tipo       | Descripción                   |
| -------------- | ---------- | ----------------------------- |
| id             | GUID / INT | Identificador                 |
| ventaId        | FK         | Referencia a Venta            |
| productoId     | FK         | Producto/Servicio             |
| descripcion    | string     | Copia del nombre del producto |
| cantidad       | decimal    | Cantidad                      |
| precioUnitario | decimal    | Precio unitario               |
| alicuotaIva    | decimal    | % IVA                         |
| subtotalLinea  | decimal    | Importe sin IVA               |
| ivaLinea       | decimal    | IVA calculado                 |
| totalLinea     | decimal    | Total línea                   |

---

# 5. Estados y Reglas de Negocio

## 5.1 Estados del Documento

* **BORRADOR**

  * Se puede editar.
  * No tiene número definitivo.
  * No genera efectos externos.

* **CONFIRMADO**

  * Se asigna número secuencial.
  * No puede modificarse.
  * Puede generar eventos futuros (stock, contabilidad).

* **ANULADO**

  * No se elimina físicamente.
  * Requiere motivo de anulación.
  * Mantiene trazabilidad histórica.

---

## 5.2 Reglas Principales

1. Una venta debe tener al menos un ítem para confirmarse.
2. No se puede confirmar una venta sin cliente.
3. No se puede modificar una venta confirmada.
4. Los totales deben recalcularse automáticamente.
5. El número se asigna únicamente al confirmar.

---

# 6. Cálculo de Importes

Para cada línea:

```
subtotalLinea = cantidad × precioUnitario
ivaLinea = subtotalLinea × (alicuotaIva / 100)
totalLinea = subtotalLinea + ivaLinea
```

Totales del comprobante:

```
subtotal = SUM(subtotalLinea)
ivaTotal = SUM(ivaLinea)
total = subtotal + ivaTotal
```

El cálculo se realiza en backend para garantizar integridad.

---

# 7. API REST Propuesta

## 7.1 Endpoints

### Crear venta (Borrador)

```
POST /api/ventas
```

### Modificar venta (solo BORRADOR)

```
PUT /api/ventas/{id}
```

### Confirmar venta

```
POST /api/ventas/{id}/confirmar
```

### Anular venta

```
POST /api/ventas/{id}/anular
```

### Obtener venta por ID

```
GET /api/ventas/{id}
```

### Listado con filtros

```
GET /api/ventas?clienteId=&desde=&hasta=&estado=
```

---

# 8. Ejemplo JSON

## Crear Venta

```json
{
  "clienteId": 15,
  "fecha": "2026-02-20",
  "items": [
    {
      "productoId": 2,
      "cantidad": 3,
      "precioUnitario": 1000,
      "alicuotaIva": 21
    }
  ]
}
```

---

# 9. Arquitectura y Diseño

## 9.1 Patrón de Diseño

* Agregado principal: **Venta**
* Entidad dependiente: **VentaItem**
* Enfoque recomendado: Domain-Driven Design (DDD)
* Cálculo encapsulado en el dominio.

## 9.2 Responsabilidades del Dominio

La entidad `Venta` debe:

* Agregar ítems.
* Recalcular totales.
* Validar reglas antes de confirmar.
* Cambiar estados respetando invariantes.

---

# 10. Evolución Futura

El módulo podrá extenderse para incluir:

* Gestión de stock automática.
* Integración contable.
* Facturación electrónica (AFIP).
* Multi-sucursal.
* Multi-moneda.
* Notas de crédito.
* Eventos de dominio.
* Auditoría avanzada.

---

# 11. Impacto en el ERP

Con la incorporación del módulo de ventas:

* El sistema deja de ser solo maestro de datos.
* Se convierte en un ERP transaccional.
* Se habilita información gerencial.
* Se construye el núcleo para migración de sistemas legacy.

---

# 12. Roadmap de Implementación

### Iteración 1

* Modelo de datos.
* CRUD Venta en BORRADOR.
* Cálculo automático.

### Iteración 2

* Confirmación + numerador.
* Anulación con motivo.
* Listado con filtros.

### Iteración 3

* Dashboard básico.
* Auditoría.
* Preparación para stock.

---

# 13. Conclusión

El módulo de Ventas constituye el núcleo operativo del ERP MVP, permitiendo demostrar capacidad transaccional, aplicación de reglas de negocio y diseño orientado al dominio.

Este componente es la base para la evolución hacia un ERP SaaS moderno y escalable.