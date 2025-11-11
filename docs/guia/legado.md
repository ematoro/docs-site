# Modelo Cliente–Servidor en una Aplicación de Escritorio VB6 con MySQL Legada

Este documento explica el funcionamiento del modelo **Cliente–Servidor** aplicado a una aplicación desarrollada en **Visual Basic 6 (VB6)** que se conecta a una base de datos **MySQL**, junto con un diagrama de arquitectura en formato *draw.io*.

---

## 📘 Concepto General

El modelo **cliente–servidor** divide la aplicación en dos partes principales:

- **Cliente (VB6):** ejecuta la lógica de presentación y parte de la lógica de negocio.  
- **Servidor (MySQL):** gestiona los datos, consultas y seguridad.

Esta arquitectura permite que varios usuarios trabajen simultáneamente sobre la misma base de datos central.

## Diagrama cliente-servidor

<pre>
   ┌───────────────────────┐            ┌───────────────────────────┐
   │  Cliente (VB6)        │            │  Servidor de BD (MySQL)   │
   │  ───────────────────  │            │  ──────────────────────   │
   │  - Formularios GUI    │   TCP/IP   │  - Tablas                 │
   │  - Lógica VB6         │───────────▶│  - Procedimientos SQL     │
   │  - Conexión ODBC/ADO  │◀───────────│  - Motor MySQL            │
   └───────────────────────┘            └───────────────────────────┘
             ↑                                         ↑
             │                                         │
     Usuario final                           Administración DBA
</pre>

## 🧩 Componentes del Modelo

### 1. Cliente (Aplicación VB6)
- Interfaz gráfica para el usuario (formularios, botones, cuadros de texto).  
- Implementa la lógica de negocio básica.  
- Se conecta al servidor mediante **ODBC** o **ADO**.  
- Envía consultas SQL al servidor y muestra los resultados.  

### 2. Servidor de Base de Datos (MySQL)
- Centraliza la información de la aplicación.  
- Ejecuta las consultas SQL recibidas del cliente.  
- Controla el acceso y la seguridad.  
- Permite el trabajo concurrente de múltiples usuarios.  

### 3. Comunicación
- Se realiza mediante **protocolo TCP/IP**, normalmente en el puerto **3306**.  
- El cliente necesita acceso de red al servidor y credenciales válidas.  

---

## ⚙️ Flujo de Operación

1. El **usuario final** abre la aplicación VB6.  
2. La aplicación se conecta al **servidor MySQL** usando ADO/ODBC.  
3. El usuario realiza acciones (consultas, altas, modificaciones).  
4. VB6 envía las **consultas SQL** al servidor.  
5. El servidor procesa las consultas y devuelve los resultados.  
6. VB6 muestra los datos al usuario.  

---

## 💡 Ejemplo de Conexión en VB6 (usando ADO)

```vb
Dim conn As ADODB.Connection
Set conn = New ADODB.Connection

conn.ConnectionString = "Driver={MySQL ODBC 8.0 Driver};" & _
                        "Server=192.168.1.10;" & _
                        "Database=mi_base;" & _
                        "User=myuser;Password=mypass;Option=3;"
conn.Open

MsgBox "Conexión exitosa!"
````

## 🧭 Resumen

|Rol|Función Principal|Ejemplo|
|---|-----------------|-------|
|Cliente VB6| Enviar consultas SQL y mostrar resultados|App de escritorio|
|Servidor MySQL|Procesar consultas y administrar datos|Motor de base de datos|
|Comunicación|TCP/IP (puerto 3306)|Red local o remota|
|Usuario final|Interactúa con la aplicación|Operador o empleado|
|DBA/Admin|Mantiene la base, los permisos y backups|Responsable técnico|

## 🧱 Ventajas del Modelo Cliente–Servidor

- Centralización de los datos.
- Mantenimiento más sencillo.
- Integridad y seguridad mejoradas.
- Escalabilidad (múltiples clientes concurrentes).
- Reducción de duplicación de datos.

💬 Nota:
Este modelo fue muy utilizado en sistemas empresariales de escritorio antes del auge de las aplicaciones web y SaaS.
Aún hoy es común en empresas con sistemas legados o de red local (LAN).

