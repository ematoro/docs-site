# MG Clientes Catálogos
## 14. Implementación Actual – Gestión de Catálogos Asociados a Cliente

### 14.1 Contexto Funcional

En el Mini ERP se implementó inicialmente el módulo de **Clientes** junto con sus **Catálogos o Datos Maestros asociados**, tales como:

- Tipo de Cliente
- Condición Fiscal
- Provincia
- Localidad
- Categorías u otros valores parametrizables

Estos catálogos permiten mantener información estructurada y reutilizable, evitando valores hardcodeados y asegurando consistencia en los datos.

---

### 14.2 Modelo de Implementación

Los catálogos fueron implementados bajo los siguientes criterios:

- Cada catálogo posee su propia tabla en base de datos.
- Se expone un conjunto de endpoints REST específicos para su gestión (ABM).
- Se utiliza una entidad base con estructura común:
  - `Id`
  - `Code`
  - `Name`
  - `IsActive` (boolean)
  - Campos de auditoría (opcional)

Ejemplo conceptual de estructura:

```sql
Id INT (PK)
Code VARCHAR(...)
Name VARCHAR(...)
IsActive BIT
```

Descripción
- Esta API expone endpoints para obtener listados de catálogos (tipos de cliente, listas de precio, cobradores, etc.).
- Todos los endpoints devuelven solo elementos activos (`IsActive == true`) con los campos mínimos: `Id`, `Code`, `Name`.

Autenticación
- Requiere autorización (atributo `[Authorize]`).
- En solicitudes usar `Authorization: Bearer <token>`.

Ruta base
- `/api/catalogos`

Endpoints

- **GET** `/api/catalogos/tipos-cliente`
  - Descripción: Devuelve los tipos de cliente activos.
  - Respuesta: `200 OK` con un arreglo de objetos `{ id, code, name }`.

- **GET** `/api/catalogos/listas-precio`
  - Descripción: Devuelve las listas de precio activas.
  - Respuesta: `200 OK` con un arreglo de objetos `{ id, code, name }`.

- **GET** `/api/catalogos/cobradores`
  - Descripción: Devuelve los cobradores activos.
  - Respuesta: `200 OK` con un arreglo de objetos `{ id, code, name }`.

- **GET** `/api/catalogos/fleteros`
  - Descripción: Devuelve los fleteros activos.
  - Respuesta: `200 OK` con un arreglo de objetos `{ id, code, name }`.

- **GET** `/api/catalogos/zonas`
  - Descripción: Devuelve las zonas activas.
  - Respuesta: `200 OK` con un arreglo de objetos `{ id, code, name }`.

- **GET** `/api/catalogos/condiciones-comerciales`
  - Descripción: Devuelve las condiciones comerciales activas.
  - Respuesta: `200 OK` con un arreglo de objetos `{ id, code, name }`.

- **GET** `/api/catalogos/categorias-iva`
  - Descripción: Devuelve las categorías de IVA activas.
  - Respuesta: `200 OK` con un arreglo de objetos `{ id, code, name }`.

- **GET** `/api/catalogos/vendedores`
  - Descripción: Devuelve los vendedores activos.
  - Respuesta: `200 OK` con un arreglo de objetos `{ id, code, name }`.

Ejemplo de respuesta (todos los endpoints)

```json
[
  { "id": 1, "code": "TC01", "name": "Tipo A" },
  { "id": 2, "code": "TC02", "name": "Tipo B" }
]
```

Notas de implementación
- Implementado en `CatalogosController` dentro de la API; usa `ClientesDbContext`.
- Cada endpoint filtra por `IsActive` y proyecta a `{ Id, Code, Name }`.
- No aceptan parámetros; todos son listados completos filtrados por activos.

Consideraciones y mejoras sugeridas
- Paginación y filtros (por código o nombre) si los listados crecen.
- Documentar códigos numéricos/semántica de `Code` para integraciones externas.

Archivo de referencia: `MG.Clientes.API/Controllers/CatalogosController.cs`
