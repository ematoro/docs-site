# MG.Clientes API

API REST para gestionar clientes y sus domicilios. Desarrollada en .NET 9 con arquitectura de capas.

## 📋 Descripción General

**MG.Clientes API** es una API REST que permite gestionar información de clientes y sus domicilios de forma segura y escalable. Utiliza Entity Framework Core para acceso a datos con MySQL y sigue patrones de arquitectura limpia.

### Características principales

- ✅ Gestión completa de clientes (CRUD)
- ✅ Gestión de domicilios asociados a clientes
- ✅ Soporte para múltiples domicilios por cliente
- ✅ Swagger/OpenAPI integrado
- ✅ CORS configurado para desarrollo
- ✅ Migraciones automáticas de base de datos
- ✅ Seeding de datos inicial
- ✅ Inyección de dependencias

## 🏗️ Arquitectura

El proyecto está organizado en capas siguiendo principios de clean architecture:

```
MG.Clientes.API/           → API REST, controladores, DTOs
MG.Clientes.Application/   → Interfaces de repositorios
MG.Clientes.Domain/        → Entidades de dominio
MG.Clientes.Infrastructure → Base de datos, repositorios, migraciones
```

### Estructura de carpetas

```
MG.Clientes.API/
├── Controllers/            # Controladores REST
│   ├── ClientesController.cs
│   └── ClientesDomiciliosController.cs
├── Dtos/                   # Data Transfer Objects
│   ├── DomicilioCreateDto.cs
│   ├── DomicilioUpdateDto.cs
│   └── DomicilioDto.cs
├── Properties/             # Configuraciones
├── appsettings.json       # Configuración general
├── appsettings.Development.json
├── Program.cs             # Punto de entrada
└── MG.Clientes.API.http   # Peticiones de prueba

MG.Clientes.Infrastructure/
├── ClientesDbContext.cs   # Contexto de Entity Framework
├── Repositories/          # Implementaciones de repositorios
├── Migrations/            # Migraciones de base de datos
└── Seed/                  # Datos iniciales

MG.Clientes.Domain/
└── Entities/              # Modelos de dominio
    ├── Cliente.cs
    └── Domicilio.cs

MG.Clientes.Application/
└── Interfaces/            # Contratos de repositorios
    ├── IClienteRepository.cs
    └── IDomicilioRepository.cs
```

## 📊 Modelo de Datos

### Entidad Cliente

Representa a un cliente en el sistema.

```csharp
public class Cliente
{
    public int Id { get; set; }
    public string Codigo { get; set; }        // Código único del cliente
    public string RazonSocial { get; set; }   // Nombre o razón social
    public string Cuit { get; set; }          // CUIT/CUIL
    public string Email { get; set; }         // Correo electrónico
    public bool Activo { get; set; }          // Estado activo/inactivo
    public ICollection<Domicilio> Domicilios { get; set; } // Domicilios asociados
}
```

### Entidad Domicilio

Representa un domicilio asociado a un cliente. Un cliente puede tener múltiples domicilios.

```csharp
public class Domicilio
{
    public int Id { get; set; }
    public int ClienteId { get; set; }
    public string Tipo { get; set; }          // Principal, Secundario, Fiscal, etc.
    public bool EsPrincipal { get; set; }
    public string Calle { get; set; }
    public string Numero { get; set; }
    public string? Piso { get; set; }
    public string? Depto { get; set; }
    public string Localidad { get; set; }
    public string Provincia { get; set; }
    public string CodigoPostal { get; set; }
    public Cliente? Cliente { get; set; }     // Navegación
}
```

## 🚀 Primeros Pasos

### Requisitos

- .NET 9 SDK
- MySQL 8.0 o superior
- Visual Studio 2022 / VS Code
- Git

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd MobilizaGestion.Api
   ```

2. **Restaurar dependencias**
   ```bash
   dotnet restore
   ```

3. **Configurar la conexión a base de datos**
   
   Editar `appsettings.Development.json`:
   ```json
   {
     "ConnectionStrings": {
       "MySqlConnection": "Server=localhost;Port=3306;Database=mgclientes;User=root;Password=tu_password"
     },
     "Logging": {
       "LogLevel": {
         "Default": "Information"
       }
     }
   }
   ```

4. **Ejecutar la API**
   ```bash
   dotnet run --project MG.Clientes.API
   ```

   La API estará disponible en `http://localhost:5000`
   
   Swagger disponible en `http://localhost:5000/swagger`

### Con Docker Compose

```bash
docker-compose up -d
```

## 📡 Endpoints

### Clientes

#### Obtener todos los clientes
```http
GET /api/clientes
```

**Respuesta (200 OK):**
```json
[
  {
    "id": 1,
    "codigo": "CLI001",
    "razonSocial": "Empresa S.A.",
    "cuit": "30-12345678-9",
    "email": "contacto@empresa.com.ar",
    "activo": true,
    "domicilios": []
  }
]
```

#### Obtener cliente por ID
```http
GET /api/clientes/{id}
```

**Parámetros:**
- `id` (int, required): ID del cliente

**Respuesta (200 OK):**
```json
{
  "id": 1,
  "codigo": "CLI001",
  "razonSocial": "Empresa S.A.",
  "cuit": "30-12345678-9",
  "email": "contacto@empresa.com.ar",
  "activo": true,
  "domicilios": []
}
```

#### Crear cliente
```http
POST /api/clientes
Content-Type: application/json

{
  "codigo": "CLI002",
  "razonSocial": "Nueva Empresa",
  "cuit": "30-98765432-1",
  "email": "info@nuevaempresa.com.ar",
  "activo": true
}
```

**Respuesta (201 Created):**
```json
{
  "id": 2,
  "codigo": "CLI002",
  "razonSocial": "Nueva Empresa",
  "cuit": "30-98765432-1",
  "email": "info@nuevaempresa.com.ar",
  "activo": true,
  "domicilios": []
}
```

#### Actualizar cliente
```http
PUT /api/clientes/{id}
Content-Type: application/json

{
  "id": 1,
  "codigo": "CLI001",
  "razonSocial": "Empresa S.A. Actualizada",
  "cuit": "30-12345678-9",
  "email": "nuevoemail@empresa.com.ar",
  "activo": true
}
```

**Respuesta (204 No Content)**

#### Eliminar cliente
```http
DELETE /api/clientes/{id}
```

**Parámetros:**
- `id` (int, required): ID del cliente

**Respuesta (204 No Content)**

---

### Domicilios

#### Obtener domicilios de un cliente
```http
GET /api/clientes/{clienteId}/domicilios
```

**Parámetros:**
- `clienteId` (int, required): ID del cliente

**Respuesta (200 OK):**
```json
[
  {
    "id": 1,
    "clienteId": 1,
    "tipo": "Principal",
    "esPrincipal": true,
    "calle": "Av. Corrientes",
    "numero": "1234",
    "piso": "5",
    "depto": "A",
    "localidad": "Buenos Aires",
    "provincia": "Buenos Aires",
    "codigoPostal": "1043"
  }
]
```

#### Obtener domicilio principal de un cliente
```http
GET /api/clientes/{clienteId}/domicilios/principal
```

**Parámetros:**
- `clienteId` (int, required): ID del cliente

**Respuesta (200 OK):**
```json
{
  "id": 1,
  "clienteId": 1,
  "tipo": "Principal",
  "esPrincipal": true,
  "calle": "Av. Corrientes",
  "numero": "1234",
  "piso": "5",
  "depto": "A",
  "localidad": "Buenos Aires",
  "provincia": "Buenos Aires",
  "codigoPostal": "1043"
}
```

#### Crear domicilio para un cliente
```http
POST /api/clientes/{clienteId}/domicilios
Content-Type: application/json

{
  "tipo": "Principal",
  "calle": "Av. Corrientes",
  "numero": "1234",
  "piso": "5",
  "depto": "A",
  "localidad": "Buenos Aires",
  "provincia": "Buenos Aires",
  "codigoPostal": "1043"
}
```

**Parámetros:**
- `clienteId` (int, required): ID del cliente

**Respuesta (201 Created):**
```json
{
  "id": 1,
  "clienteId": 1,
  "tipo": "Principal",
  "esPrincipal": true,
  "calle": "Av. Corrientes",
  "numero": "1234",
  "piso": "5",
  "depto": "A",
  "localidad": "Buenos Aires",
  "provincia": "Buenos Aires",
  "codigoPostal": "1043"
}
```

#### Actualizar domicilio
```http
PUT /api/clientes/{clienteId}/domicilios/{id}
Content-Type: application/json

{
  "tipo": "Fiscal",
  "calle": "Av. 9 de Julio",
  "numero": "5678",
  "piso": "3",
  "depto": null,
  "localidad": "Buenos Aires",
  "provincia": "Buenos Aires",
  "codigoPostal": "1045",
  "esPrincipal": false
}
```

**Parámetros:**
- `clienteId` (int, required): ID del cliente
- `id` (int, required): ID del domicilio

**Respuesta (200 OK):**
```json
{
  "id": 1,
  "clienteId": 1,
  "tipo": "Fiscal",
  "esPrincipal": false,
  "calle": "Av. 9 de Julio",
  "numero": "5678",
  "piso": "3",
  "depto": null,
  "localidad": "Buenos Aires",
  "provincia": "Buenos Aires",
  "codigoPostal": "1045"
}
```

#### Eliminar domicilio
```http
DELETE /api/clientes/{clienteId}/domicilios/{id}
```

**Parámetros:**
- `clienteId` (int, required): ID del cliente
- `id` (int, required): ID del domicilio

**Respuesta (204 No Content)**

---

## 🔧 Configuración

### appsettings.json

```json
{
  "ConnectionStrings": {
    "MySqlConnection": "Server=localhost;Port=3306;Database=mgclientes;User=root;Password=password"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.EntityFrameworkCore": "Debug"
    }
  },
  "AllowedHosts": "*"
}
```

### CORS

Por defecto, la API está configurada para permitir solicitudes desde:
- `http://localhost:5173`
- `http://127.0.0.1:5173`
- `https://localhost:5173`
- `https://127.0.0.1:5173`
- `https://white-stone-05251ea10.4.azurestaticapps.net`

Para modificar, editar `Program.cs` en la sección de CORS.

## 🗄️ Migraciones y Seed

### Aplicar migraciones manualmente

```bash
dotnet ef database update --project MG.Clientes.Infrastructure
```

### Crear nueva migración

```bash
dotnet ef migrations add NombreMigracion --project MG.Clientes.Infrastructure --startup-project MG.Clientes.API
```

### Seed de datos

El sistema aplica automáticamente migraciones y datos iniciales en el startup. Editar `MG.Clientes.Infrastructure/Seed/DbSeeder.cs` para personalizar.

## 📝 Códigos de Error

| Código | Descripción |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado exitosamente |
| 204 | No Content - Solicitud exitosa sin contenido |
| 400 | Bad Request - Datos inválidos |
| 404 | Not Found - Recurso no encontrado |
| 409 | Conflict - Violación de regla de negocio |
| 500 | Internal Server Error - Error en el servidor |

## 🔒 Reglas de Negocio

### Clientes

- El ID se asigna automáticamente
- Los campos `RazonSocial` y `CUIT` son obligatorios
- El campo `Activo` es `true` por defecto
- Un cliente puede tener múltiples domicilios

### Domicilios

- Actualmente, un cliente solo puede tener un domicilio (validación)
- Por defecto, todo domicilio nuevo es marcado como principal (`EsPrincipal = true`)
- El tipo de domicilio está predefinido (Principal, Secundario, Fiscal, etc.)
- Todos los campos de dirección son obligatorios

## 🧪 Testing

### Usar el archivo .http

El proyecto incluye `MG.Clientes.API.http` con peticiones de prueba:

```bash
# En Visual Studio Code con extensión REST Client
# Presionar "Send Request" en el editor
```

### Usar Swagger

1. Ejecutar la aplicación
2. Navegar a `http://localhost:5000/swagger`
3. Probar endpoints interactivamente

### Usar Postman/Insomnia

Importar las peticiones desde el archivo `.http` o crearlas manualmente con la documentación de endpoints.

## 📚 Dependencias Principales

```xml
<ItemGroup>
  <PackageReference Include="Microsoft.EntityFrameworkCore" Version="9.0.x" />
  <PackageReference Include="Pomelo.EntityFrameworkCore.MySql" Version="9.0.x" />
  <PackageReference Include="Microsoft.AspNetCore.Mvc.Api.Analyzers" Version="9.0.x" />
  <PackageReference Include="Swashbuckle.AspNetCore" Version="6.x" />
</ItemGroup>
```

## 🐛 Troubleshooting

### Error de conexión a MySQL

```
InvalidOperationException: Falta ConnectionStrings:MySqlConnection
```

**Solución:** Verificar que `appsettings.Development.json` tenga la cadena de conexión correcta.

### Error de migraciones

```
DbUpdateException: An error occurred while updating the entries
```

**Solución:** 
1. Verificar que MySQL está corriendo
2. Ejecutar `dotnet ef database update --project MG.Clientes.Infrastructure`

### CORS bloqueado

```
Access to XMLHttpRequest at 'http://localhost:5000/api/clientes' from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solución:** Agregar el origen a la política CORS en `Program.cs`.
