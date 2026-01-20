# Informe sobre Formularios (.frm) y Módulos (.bas) del ERP MG

El sistema **MG** contiene un voluminoso código fuente de
Visual Basic 6 (VB6) que implementa un ERP completo. Además de los
módulos de clases de negocio, el proyecto incorpora
numerosos **formularios** (archivos `.frm` acompañados por sus binarios
`.frx`) y **módulos** (`.bas`) que estructuran la interfaz de usuario y
la lógica procedimental del sistema. La siguiente síntesis agrupa los
formularios y módulos por temática.

## Módulos VB6 principales (.bas)

Los módulos permiten agrupar funciones y procedimientos compartidos que
no se encapsulan en clases. Entre los que aparecen en la raíz del
repositorio destacan:

|Módulo                                |Observaciones|
|--------------------------------------| ------------|
|  `ClavesEncriptacion.bas`            |Almacena claves o rutinas de encriptación utilizadas por el ERP para proteger datos sensibles.|
|`ControlSstab.bas`                    |Proporciona funciones para manipular y personalizar controles tipo pestaña (`SSTab`) de los formularios.|
|  `CtesFunciones.bas`                 |Define constantes de uso general y funciones utilitarias que se invocan desde varias partes del     programa.|      
|  `ImpresoraFiscal.bas` y  `fiscalEPSON.bas`|Implementan la comunicación con impresoras fiscales (por ejemplo, Epson), necesarias para emitir facturas electrónicas y tickets.|       
|  `ImpuestosRetenciones.bas` `ImpuestosRetencionescopia.bas`|Contienen las rutinas relacionadas con retenciones e impuestos aplicables a facturas y pagos.|         
| `JsonConverter.bas`                  |Módulo de conversión de datos a y desde formato JSON.|
|  `ReportesTrx.bas` y `RptOrdenRecibo.bas`|Encargados de generar reportes de transacciones y órdenes de recibo.|        
| `SeleccionDirectorio.bas`            |Proporciona diálogos para seleccionar carpetas dentro del sistema operativo.|
| Otros módulos                        |Existen otros módulos dispersos, como control de selección de impresora, gestión de retenciones y utilidades varias; muchos de ellos están asociados a formularios específicos (ej. `fiscalEPSON.bas`).|

## Formularios del ERP (.frm)

Cada funcionalidad del ERP se implementa como un formulario VB6 (`.frm`)
acompañado por su archivo de recursos `.frx`. En total el repositorio
contiene cientos de formularios que cubren todas las áreas de la
empresa. A continuación se agrupan por dominio funcional y se mencionan
ejemplos representativos (entre paréntesis se indican los formularios
`.frx` correspondientes). Esta clasificación no es exhaustiva pero
refleja la cobertura amplia del sistema.

### Inventario y artículos

El módulo de inventario gestiona el ciclo de vida de los artículos
(productos), sus proveedores, códigos alternativos, sustitutos y control
de stock.

-   **Gestión de artículos y proveedores**: formularios como
    `frmArticulo.frm`, `frmArticulos.frm` y `frmArticulosBloqueados.frm`
    permiten crear, listar y bloquear
    productos.
    Hay formularios específicos para códigos de proveedor
    (`frmArticuloCodigosProveedor.frm`), proveedores de artículos
    (`frmArticuloProveedores.frm`) y sustitutos
    (`frmArticuloSustitutos.frm`).
-   **Stock y costos**: `frmAdministracionStockCritico.frm` gestiona
    niveles de stock crítico, mientras que `frmActualizarCostos.frm` y
    `frmActualizacionMasiva.frm` facilitan la actualización individual y
    masiva de precios y
    costos.
    Formularios como `frmCargaCamion.frm` y `frmCargaTransaccion.frm` se
    usan para cargar transacciones de movimiento de
    mercadería.
-   **Catálogos y atributos**: `frmAtributo.frm`, `frmAtributos.frm` y
    `frmAlicuota.frm` permiten definir atributos y alícuotas (alícuota
    de IVA) para los
    artículos.
    Formularios como `frmCategoriasIva.frm` y
    `frmCategoriaProveedor.frm` configuran categorías de IVA y
    categorías de
    proveedores.

### Clientes y ventas

Se incluyen numerosos formularios para la gestión de clientes, visitas,
abonos (suscripciones) y condiciones comerciales.

-   **Clientes**: `frmCliente.frm`, `frmClientes.frm` y
    `frmClienteEventual.frm` gestionan la alta y modificación de
    clientes permanentes y
    eventuales.
    Complementos como `frmClienteSucursales.frm` permiten manejar
    sucursales, `frmClienteVisitas.frm` registra visitas comerciales y
    `frmClienteRutas.frm` asigna rutas de
    preventa.
-   **Abonos y comisiones**: los formularios `frmAbono.frm`,
    `frmAbonos.frm` y `frmAbonosXCliente.frm` llevan el control de
    servicios abonados por los
    clientes.
    El sistema también administra comisiones mediante `frmComision.frm`,
    `frmComisionImportes.frm` y
    `frmComisiones.frm`.
-   **Condiciones comerciales y límites de crédito**:
    `frmCondicion.frm`, `frmCondicionesComercializaciones.frm` y
    `frmComposicionLimiteCredito.frm` configuran condiciones de venta y
    límites de
    crédito.
-   **Consulta y reportes**: `frmConsultarPedidos.frm`,
    `frmConsultaValores.frm` y `frmConsultaResumenCta.frm` permiten
    consultar pedidos, valores y resúmenes de
    cuentas.
-   **Precios y promociones**: `frmCargarPreciosArticulo.frm` carga
    listas de precios, mientras que `frmActPromocion.frm`,
    `frmActEscalaPromocion.frm` y `frmActObsequioPromocion.frm`
    gestionan promociones, escalas y
    obsequios.

### Compras y proveedores

Hay formularios dedicados a la gestión de proveedores, órdenes de compra
y categorías de proveedores.

-   **Proveedores**: `frmCategoriaProveedor.frm`,
    `frmCategoriaProveedores.frm` y `frmCategoriasOtrosCliProv.frm`
    organizan proveedores por
    categorías.
-   **Órdenes de compra**: `frmCrearOC.frm` y su contraparte `.frx`
    permiten generar órdenes de
    compra.
-   **Consultas de gastos y exportaciones**: `frmConsultarGastos.frm` y
    `frmConsultarExportaciones.frm` obtienen reportes de gastos y
    exportaciones.

### Finanzas y contabilidad

El ERP incluye formularios para bancos, cajas, cheques, conciliaciones
bancarias y asientos contables.

-   **Bancos y cajas**: `frmBanco.frm`, `frmBancos.frm`, `frmCaja.frm`,
    `frmCajas.frm` y `frmCajaMedioPago.frm` permiten administrar bancos
    y cajas con sus medios de
    pago.
-   **Cheques y chequeras**: `frmChequera.frm` y `frmChequeras.frm`
    gestionan chequeras, mientras que `frmAsignacionCheques.frm`
    registra la asignación de
    cheques.
-   **Conciliación bancaria**: formularios como
    `frmConciliacionBancaria.frm`, `frmConciliacionIngresarExtracto.frm`
    y `frmConciliaciones.frm` procesan extractos bancarios y
    conciliaciones.
-   **Asientos y contabilidad**: `frmAsiento.frm`, `frmAsientos.frm` y
    `frmAsientosDetalle.frm` manejan los asientos contables y sus
    detalles.
    También existen formularios para centros de costo
    (`frmCentroCosto.frm`, `frmCentrosCostos.frm`) y configuraciones de
    impuestos y
    percepciones.

### Logística y operaciones

Estos formularios soportan la logística y el movimiento de mercadería.

-   **Cargas y transacciones**: `frmCargaCamion.frm`,
    `frmCargaTransaccion.frm` y `frmCargaTransaccionModifAlicuotas.frm`
    permiten registrar cargas de camiones y ajustar alícuotas de
    impuestos en
    movimientos.
-   **Capacidades y campos**: `frmCampos.frm`, `frmCamposCOT.frm` y
    `frmCapacidades.frm` definen los campos personalizados y las
    capacidades de almacenes o
    vehículos.
-   **Exportaciones y aduanas**: `frmConsultarExportaciones.frm` y
    `frmAduanas.frm` se ocupan de trámites de aduana y
    exportación.

### Configuración y utilidades

El ERP ofrece muchas pantallas de configuración y utilidades generales.

-   **Categorías y parámetros**: formularios como
    `frmCategoriasIva.frm`, `frmCategoriaProveedor.frm` y
    `frmCategoriaOtrosCliProv.frm` configuran categorías de IVA,
    proveedores u otros
    actores.
-   **Contraseñas y conexiones**: `frmCambiarContraseña.frm`,
    `frmCambiarContraseñaMySql.frm` y `frmConexionPrincipal.frm` se
    utilizan para cambiar contraseñas y definir conexiones a bases de
    datos.
-   **Backups y utilidades**: `frmBackUpBD.frm` realiza copias de
    seguridad de la base de
    datos,
    mientras que `frmAyuda.frm` proporciona ayuda al
    usuario y
    `frmSeleccionDirectorio.bas` soporta la selección de directorios.
-   **Autorizaciones**: formularios `frmCAEA.frm`, `frmCAI.frm` y
    `frmAutorizaciones.frm` gestionan códigos de autorización de emisión
    y permisos
    especiales.

### Consultas y reportes

Hay un extenso conjunto de formularios cuyo nombre comienza con
`frmConsulta` o `frmConsultar`. Estos sirven para visualizar información
mediante filtros y reportes:

-   **Consultas de stock, valores y cuentas**: `frmConsultaStock.frm`,
    `frmConsultaValores.frm` y `frmConsultaResumenCta.frm` muestran el
    inventario, cheques/valores disponibles y resúmenes de
    cuenta.
-   **Consultas de comprobantes, pedidos y gastos**:
    `frmConsultarComprobantes.frm`, `frmConsultarPedidos.frm` y
    `frmConsultarGastos.frm` permiten encontrar documentos
    específicos.
-   **Control de precios**: `frmControlPrecios.frm` gestiona controles y
    ajustes de listas de
    precios.

## Conclusión

El ERP **MG** se apoya en una estructura de **módulos** y
**formularios** escrita en Visual Basic 6. Los módulos `.bas`
centralizan constantes, utilidades y funciones de hardware (impresoras
fiscales, conversión JSON), mientras que los formularios `.frm`
representan las interfaces de usuario para cada proceso de negocio. La
cantidad y variedad de formularios evidencian la amplitud del ERP:
abarca inventario, clientes, proveedores, ventas, compras, finanzas,
logística, marketing, impuestos y utilidades administrativas. Cada área
cuenta con pantallas dedicadas para altas/bajas/modificaciones,
consultas y reportes, lo que permite que el sistema sea altamente
parametrizable y adaptable a la normativa argentina.

Este informe sintetiza la organización observada en el código fuente;
aunque no enumera los cientos de formularios individualmente, agrupa los
más relevantes y destaca su propósito, ayudando a entender cómo se
distribuyen las funcionalidades en la interfaz del ERP.

