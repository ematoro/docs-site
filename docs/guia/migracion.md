# Migración

# Arquitectura Propuesta – Migración a API en la Nube (Azure)

## 1. Introducción

El presente documento describe la **arquitectura de alto nivel propuesta** para la migración del sistema legacy hacia una solución moderna basada en **API REST**, **contenedores** y **servicios administrados en la nube de Azure**.

La propuesta adopta un enfoque **API-first**, desacoplando el frontend del backend, y permite una **migración incremental**, reduciendo riesgos técnicos y operativos.

---

## 2. Objetivos de la Arquitectura

- Modernizar la arquitectura del sistema existente.
- Desacoplar frontend, lógica de negocio y persistencia.
- Facilitar escalabilidad, mantenibilidad y despliegues continuos.
- Utilizar servicios cloud administrados para reducir costos operativos.
- Permitir una migración progresiva desde el sistema legacy.

---

## 3. Principios de Diseño

- **Separación de responsabilidades**
- **API como contrato**
- **Contenedorización**
- **Configuración por ambiente**
- **Seguridad por defecto**
- **Observabilidad integrada**
- **Evolución incremental (Strangler Pattern)**

---

## 4. Vista Lógica de la Arquitectura

### 4.1 Frontend (SPA)

- Aplicación web tipo SPA (por ejemplo, Vue.js).
- Consume la API mediante HTTPS.
- Maneja autenticación mediante tokens.
- Implementa validaciones de UI y experiencia de usuario.
- Desacoplada completamente del backend.

### 4.2 Backend – API REST

- API REST desarrollada en .NET.
- Arquitectura en capas:
  - **API**: controladores, endpoints, validaciones, CORS.
  - **Application**: casos de uso y lógica de aplicación.
  - **Domain**: entidades y reglas de negocio.
  - **Infrastructure**: acceso a datos y servicios externos.
- Documentación mediante OpenAPI / Swagger.
- Versionado de endpoints.

### 4.3 Persistencia

- Base de datos MySQL.
- Modelo relacional normalizado.
- Migraciones de esquema versionadas.
- Backups automáticos y restauración.

---

## 5. Vista de Despliegue (Azure)

### 5.1 Componentes Principales

- **Azure Container Apps**  
  Ejecución de la API en contenedores con escalado automático.

- **Azure Container Registry (ACR)**  
  Almacenamiento de imágenes Docker versionadas.

- **Azure Database for MySQL – Flexible Server**  
  Base de datos administrada.

- **Azure Key Vault**  
  Gestión segura de secretos y credenciales.

- **Application Insights / Log Analytics**  
  Observabilidad y monitoreo.

- **CDN / Hosting estático (opcional)**  
  Publicación del frontend.

---

## 6. Seguridad

### 6.1 Autenticación y Autorización

- Autenticación basada en tokens (JWT).
- Autorización por roles y/o permisos.
- Expiración y rotación de credenciales.

### 6.2 CORS

- Restricción de orígenes permitidos.
- Configuración específica por ambiente (dev, staging, prod).

### 6.3 Gestión de Secretos

- Secretos almacenados fuera del código fuente.
- Uso de Key Vault y variables de entorno.
- Principio de mínimo privilegio.

---

## 7. Observabilidad y Operación

- Logs estructurados.
- Métricas de performance y uso de recursos.
- Trazabilidad de requests end-to-end.
- Alertas ante errores críticos o degradación del servicio.

---

## 8. Escalabilidad y Performance

- Escalado automático de la API según carga.
- Pool de conexiones a base de datos.
- Paginación en endpoints de consulta.
- Preparado para incorporar cache distribuido en el futuro.

---

## 9. Ciclo de Vida y CI/CD

### 9.1 Pipeline de Entrega

1. Commit de código fuente.
2. Build y ejecución de tests.
3. Construcción de imagen Docker.
4. Push a Azure Container Registry.
5. Despliegue automático en Container Apps.
6. Ejecución de migraciones de base de datos.
7. Validaciones post-deploy.

### 9.2 Versionado

- Versionado semántico de la API.
- Versionado explícito de endpoints (`/api/v1`).

---

## 10. Estrategia de Migración

- Migración por módulos funcionales.
- Convivencia temporal con el sistema legacy.
- Reemplazo progresivo de funcionalidades.
- Reducción del riesgo operativo.

---

## 11. Riesgos y Mitigaciones

| Riesgo | Mitigación |
|------|-----------|
| Complejidad del sistema legacy | Migración incremental |
| Errores de performance | Observabilidad temprana |
| Exposición de datos sensibles | Uso de Key Vault |
| Cambios en contratos API | Versionado y documentación |

---

## 12. Diagrama Conceptual (Texto)

Usuario  
→ Frontend SPA  
→ API REST (.NET en contenedor)  
→ Base de Datos MySQL  

Servicios transversales:
- CI/CD
- Observabilidad
- Gestión de secretos

---

## 13. Conclusión

La arquitectura propuesta proporciona una base sólida, escalable y segura para la modernización del sistema, alineada con buenas prácticas de arquitectura cloud y preparada para evolucionar hacia un modelo SaaS en el futuro.



