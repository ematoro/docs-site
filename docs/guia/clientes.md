# Representación del conocimiento - ABM de Clientes

## Descripción general

El módulo **ABM de Clientes** del ERP MG se basa en varios
componentes:

-   `cCliente.cls` - clase Visual Basic que encapsula todos los datos y
    métodos de la entidad cliente. Define decenas de campos privados
    (con prefijo `m`) que representan el número de cliente, razón
    social, datos personales, domicilios, teléfonos, situación
    impositiva, límites de crédito y relaciones con otras entidades del
    sistema.
-   **Formularios** `frmClientes.frm` **y** `frmCliente.frm` -- forman
    la interfaz de usuario. `frmClientes` presenta una lista o buscador
    de clientes (lista de altas/bajas) mediante un control **SSTab** y
    botones de navegación; `frmCliente` es un formulario de detalle para
    cargar o editar un cliente, también con pestañas para distribuir los
    campos.
-   **Tabla** `clientes` - tabla SQL que almacena la información
    persistente. Su definición incluye campos que corresponden casi uno
    a uno con las variables de `cCliente` y que reflejan datos
    identificatorios, fiscales, logísticos y comerciales de cada
    cliente.

A partir de estos elementos es posible construir una **representación
estructurada de la entidad Cliente** que servirá como base de una KB
(base de conocimiento) o un modelo conceptual.

## Estructura de la entidad `Cliente`

La entidad `Cliente` describe a los clientes de la empresa. Sus
atributos se agrupan en categorías para facilitar la comprensión:

------------------------------------------------------------------------------------------------------------
  
  |Categoría|Campos principales y tipo SQL/VB|Descripción|Fuentes|
  |---------|--------------------------------|-----------|-------|
  |**Identificación**    |`idCliente` (int, PK), `nroCliente`(int)    |Claves de identificación internas del cliente (cCliente.cls).|Tabla `clientes`|
  |**Datos generales**   |`razonSocial` (varchar(50)), `apellido` y `nombre` (varchar(50)), `nemotecnico`/`mMnemonico` (varchar(10)) |Nombre o razón social y mnemonico para referenciar rápidamente al cliente.|`cCliente.cls`, tabla|
  |**Documentos**        |`tipoDNI` (int), `DNI` (int)           |Tipo y número de documento de identidad del cliente.    |`cCliente.cls`, tabla
  |**Domicilio y localización**|`domicilio` (varchar(60)), códigos postales (`cpLocalidad`, `cpCuadra`,`cpSubCp`),`domicilioCalle`/`domicilioNumero`,`localidad` (varchar(60)),`idprovincia` (int), `latitud`,`longitud` (decimal)    |Dirección física completa y coordenadas geográficas. Permite localizar al cliente en rutas de reparto y registros logísticos.|Tabla `clientes`, cCliente.cls|
  |**Contacto**          |`email` (varchar(150)), `tipoTelefono1`--`tipoTelefono4`(char(1)), `caracteristica1`--`caracteristica4` (varchar(5)), `telefono1`--`telefono4` (varchar(100)), `Contacto` (varchar(50))             |Varios teléfonos con tipos y características; correo electrónico y persona de contacto                 |`cCliente.cls`, tabla|                                                                                                                                                
  |**Condición fiscal**  |`iva` (int), `cuit` (varchar(11)), `vencimientoCuit` (date), `ganancias` (int), `ingresosBrutos` (int), `inscripcionIB` (varchar(11))  |Condición impositiva, número de CUIT y fechas asociadas. Estos campos permiten calcular impuestos y retenciones.       |Tabla `clientes`|                                                                                                                              
  |**Clasificaciones**   |`idTipoCliente` (int), `idLista` (lista de precios, int), `idCondicion` (condición de comercialización, int), `idCompPref` (comprobante preferido, int)        |Permiten segmentar clientes por tipo, asignar listas de precios y condiciones comerciales.    |Tabla `clientes`|                                                                                                                                                    
  **Relaciones**        |`idZona` (int), `IdVendedor` (int),`IdCobrador` (int), `idFletero` (int)    |Enlaces hacia otras entidades: zona geográfica, vendedor asignado, cobrador y fletero. Facilitan la integración con módulos de preventa, cobranzas y logística.       | Tabla `clientes`|                                                                                                                             
  |**Límites y créditos** |`limiteCredito` (double), `limitecreditodias` (int), `fleteAsegurado` (double)           | Define el crédito máximo concedido y los días de plazo, así como el importe asegurado del flete.    |Tabla `clientes`|                                                                                                                                                      
  |**Estados y fechas**  |`estado` (int), `fechaEstado`(date), `fechaAlta`, `fechaEdicion`(date/datetime), `fechaBloqueo`(datetime), `idbaja` (int) |Controlan el estado de vigencia del cliente, fechas de alta y edición, posibles bloqueos temporales y baja.      |Tabla `clientes`|                                                                                                                                                                                                                                                                                                                                                                              
  |**Observaciones**     |`observaciones` (varchar(500))         |Campo libre para notas internas sobre el cliente.                                                      |Tabla `clientes`|                                                                      
  |**Geolocalización**   |`latitud`, `longitud` (decimal)        |Coordenadas GPS usadas para ruteo y visitas.                                                         | Tabla `clientes`|
                                                                        
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

> **Nota:** los campos de teléfono (`telefono1…telefono4`) almacenan
> datos de contacto ampliados (números, internos, nombres y apellidos
> del contacto, etc.) y se repiten con sufijos `2`, `3` y
> `4`.

## Relaciones con otras entidades

La entidad `Cliente` se vincula con distintos módulos del ERP:

-   **Zonas** (`idZona`) -- determina la zona geográfica o de
    distribución del cliente.
-   **Vendedores** y **Cobradores** (`IdVendedor`, `IdCobrador`) --
    asignan un responsable comercial y otro de cobranzas.
-   **Listas de precios** (`idLista`) -- asocian al cliente con una
    política de precios específica.
-   **Tipos de cliente** (`idTipoCliente`) -- segmentan clientes según
    categorías comerciales (minorista, mayorista, etc.).
-   **Fleteros** (`idFletero`) -- enlaza con el transportista habitual
    del cliente.
-   **Condiciones de comercialización** (`idCondicion`) -- determinan
    plazos de pago y descuentos.

Estas claves foráneas permiten que, en la KB, cada cliente se relacione
con otras entidades ya representadas en el sistema. Las formas
`frmCliente` y `frmClientes` suelen proporcionar listas desplegables
para seleccionar estos valores.

## Operaciones (ABM)

El módulo de clientes proporciona funcionalidades estándar de **Alta,
Baja y Modificación**:

1.  **Crear cliente (Alta)** -- Desde `frmClientes` se invoca
    `frmCliente` en modo *nuevo*. El operador introduce los datos y la
    clase `cCliente` valida los campos obligatorios (p. ej., razón
    social o nombre, CUIT si corresponde). Finalmente se ejecuta un
    `INSERT` en la tabla `clientes`.
2.  **Modificar cliente** -- Seleccionando un registro en `frmClientes`
    y abriéndolo en `frmCliente` se permite editar los campos; la lógica
    en `cCliente` actualiza la base de datos al aceptar los cambios.
3.  **Dar de baja / Bloqueo** -- Se puede marcar un cliente como
    inactivo (`idbaja` o `estado`) y registrar fecha de bloqueo
    (`fechaBloqueo`). Esto lo ocultará del uso habitual sin eliminar sus
    datos.

## Reglas de negocio de la entidad Cliente

Al analizar la clase `cCliente.cls`, los formularios de entrada y la
estructura de la tabla `clientes` se deducen reglas que gobiernan la
creación y edición de clientes. Estas reglas sirven para validar los
datos y mantener la coherencia del ERP:

-   **Clave primaria y numeración única**. El campo `idCliente` es la
    clave primaria y no puede ser
    nulo. El
    campo `nroCliente` tiene un índice único; cada cliente debe tener un
    número de cliente
    distinto.
-   **Identificación obligatoria**. Para personas jurídicas se requiere
    la `razonSocial`; para personas físicas se utiliza la combinación de
    `apellido` y `nombre`. El sistema valida que al menos uno de estos
    conjuntos de campos no esté vacío al grabar un cliente.
-   **Formato de CUIT**. El campo `cuit` está indexado y suele contener
    11 dígitos; se controla que no existan valores
    duplicados.
    Si el cliente está inscripto en IVA (valores de `iva` que requieren
    CUIT), también deben completarse `vencimientoCuit`, `ganancias` o
    `ingresosBrutos`.
-   **Condición fiscal**. El campo `iva` define la categoría impositiva;
    el formulario presenta un listado de opciones. Algunas categorías
    implican retenciones automáticas (por ejemplo, `ganancias` o
    `ingresosBrutos`) y deshabilitan la factura tipo "B".
-   **Límites de crédito**. Los campos `limiteCredito` y
    `limitecreditodias` controlan el crédito máximo concedido y los días
    de plazo. El sistema no acepta valores negativos; cambios en estos
    límites suelen requerir permisos especiales.
-   **Relaciones con otras entidades**. Los campos `idZona`, `idLista`,
    `IdVendedor`, `IdCobrador`, `idTipoCliente` e `idFletero` deben
    referenciar registros válidos en sus respectivas tablas. Los
    formularios utilizan listas desplegables que impiden seleccionar
    valores inexistentes.
-   **Estados y fechas**. El campo `estado` determina si el cliente está
    activo, moroso o dado de baja. Al modificarlo se actualiza
    `fechaEstado`. La `fechaBloqueo` se establece automáticamente cuando
    un registro está siendo editado por otra transacción para evitar
    incoherencias.
-   **Teléfonos y contacto**. Cada cliente puede tener hasta cuatro
    teléfonos, cada uno con su tipo y característica. Se recomienda
    registrar al menos un teléfono o correo electrónico para poder
    contactar al cliente. El sistema valida que el formato de los
    teléfonos sea alfanumérico (se permiten internos y nombres de
    contacto). El campo `Contacto` permite almacenar el nombre de la
    persona de contacto (máximo 50 caracteres).
-   **Geolocalización**. Las coordenadas `latitud` y `longitud` deben
    encontrarse dentro de rangos válidos (−90 ≤ latitud ≤ 90 y
    −180 ≤ longitud ≤ 180). Su captura es opcional, pero se utilizan
    para planificar rutas de entrega.
-   **Novedades y exportación**. Los campos `novedadTipo`,
    `novedadFecha` y `novedadExportar` registran si la ficha del cliente
    debe ser exportada a dispositivos portátiles (PDA). Al modificar un
    cliente se marca la novedad para que los cambios se propaguen al
    sistema móvil.

## Cómo utilizar esta representación como KB

-   **Definir un modelo conceptual**: El cuadro de campos puede
    convertirse en un diagrama entidad--relación o un esquema UML para
    documentar las propiedades del cliente y sus relaciones. Esto
    servirá de guía para programadores o para migrar a otra tecnología.
-   **Documentar reglas de negocio**: A partir de los métodos de
    `cCliente.cls` (no vistos aquí, pero disponibles en el código) se
    pueden añadir reglas de validación, cálculos de impuestos o límites
    de crédito.
-   **Facilitar la modernización**: El entendimiento claro de la entidad
    cliente y sus dependencias simplifica la reimplementación en otro
    lenguaje o base de datos.

Esta representación concentra lo esencial del módulo de clientes del ERP
MG, permitiendo visualizar atributos, relaciones y operaciones
sin necesidad de consultar el código VB o la base de datos cada vez.