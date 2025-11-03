# Informe de clases del ERP *MG*

## Introducción

El proyecto MG incluye un amplio conjunto de **módulos de clase
(.cls)** escritos en Visual Basic 6 que implementan la lógica de negocio
del ERP. Para elaborar este informe se accedió al directorio `clases`
del repositorio y se revisaron los nombres de las clases para
identificar su propósito y agruparlas por área funcional. A continuación
se resumen las categorías principales y algunos ejemplos representativos
de cada
una.

## Categorías de clases y ejemplos

### Artículos e inventario

Estas clases gestionan los productos, unidades de medida,
configuraciones de stock y relación con proveedores:

-   **cArticulo, cArticuloCodigoAdicional,
    cArticuloDepositoConfiguracionStock, cArticuloFoto** -- describen
    los productos, permiten asociar códigos alternativos, configurar
    stocks por depósito y gestionar fotografías de
    artículos.
-   **cArticuloProveedorOferta, cArticuloProveedor,
    cArticuloUMAlternativa, cArticuloUMModeloOperacion** -- manejan las
    ofertas de proveedores, relaciones con proveedores y unidades de
    medida alternativas y modelos de
    operación.
-   **cDeposito, cDepositoImp, cTipoMovimientoMaterial,
    cTipoMovMaterialesPorGrupoRef** -- representan depósitos y tipos de
    movimientos de materiales para el módulo de almacenes e
    inventario.
-   **cLote, cCapacidad, cEnvase** -- gestionan lotes de productos,
    capacidades de almacenamiento y
    envases).

### Clientes y ventas

Clases que almacenan la información de clientes y soportan el ciclo de
ventas:

-   **cCliente y cClienteVisitas** -- modelan al cliente y las visitas o
    rutas comerciales
    asociadas.
-   **cListaPrecio, cLimiteCredito, cPromocion, cPedido y cPedidoLinea**
    -- gestionan las listas de precios, límites de crédito y pedidos de
    venta, incluyendo sus
    líneas.
-   **cHojaRutaPreventas, cHorarioVisita, cNoVisita** -- organizan las
    rutas de preventa y los horarios/visitas a
    clientes.
-   **cFacturaElectronica** -- genera facturas electrónicas y controla
    la comunicación con la
    AFIP.

### Compras y proveedores

Módulos que permiten administrar proveedores y compras:

-   **cProveedor, cProveedorImpuesto y cProveedorImpuestoEx** --
    registran datos de proveedores y sus retenciones/impuestos
    asociados.
-   **cArticuloProveedorOferta, cCategoriaProveedor** -- relacionan
    artículos con proveedores y agrupan proveedores por
    categorías.

### Finanzas y contabilidad

Implementan asientos contables, cuentas bancarias, cajas y
conciliaciones bancarias:

-   **cAsiento y cAsientoDetalle** -- crean y almacenan los asientos
    contables y sus
    partidas.
-   **cSubDiario, cCentroCosto y cTipoComp** -- administran subdiarios,
    centros de costos y tipos de
    comprobantes.
-   **cBanco, cCaja y cCajaMedioPago** -- modelos para bancos, cajas y
    medios de pago en
    caja.
-   **cConciliacionBancaria y cConciliacionBancariaMov** -- realizan
    conciliaciones bancarias y registros de
    movimientos.
-   **cImputacion, cCuentaContable, cRendicion, cRendicionValores** --
    permiten imputar pagos, gestionar cuentas contables y
    rendiciones.

### Documentos y comprobantes

Agrupan clases relacionadas con los comprobantes comerciales (facturas,
notas, remitos) y sus numeradores:

-   **cCbte, cCbteLinea, cCbteLineaPendImp y cCbteAsociado** --
    representan los comprobantes (cabecera y líneas), líneas pendientes
    de impresión e
    interrelaciones.
-   **cSerie, cTipoComp, cTipoComprobante** -- gestionan series y tipos
    de comprobantes (facturas, notas de
    crédito/débito).
-   **cCai, cCae, cTipoImpuesto** -- manejan la codificación CAI/CAE y
    los tipos de impuestos
    aplicables.

### Impuestos y retenciones

Controlan las escalas y tipos de impuestos, retenciones y percepciones:

-   **cImpuestoEscala, cImpuestoIBIG, cImpuestoPercepciones,
    cImpuestoRefContable, cImpuestoTiposComprobantes** -- definen las
    escalas de impuestos, retenciones de Ingresos Brutos, percepciones
    de IVA, referencia contable de impuestos y qué impuestos aplican a
    cada
    comprobante.
-   **cRetencion, cRetencionDetalle** -- calculan y almacenan las
    retenciones aplicadas a pagos o
    facturas.

### Recursos humanos y logística

-   **cVendedor, cCobrador** -- clases para registrar a los vendedores y
    cobradores asignados a los
    clientes.
-   **cFletero y cFleteroZonas** -- gestionan datos de fleteros
    (transportistas) y sus zonas de
    reparto.
-   **cViaje, cViajeDetalle, cHojaRutaPreventa** -- representan viajes
    de reparto y las hojas de ruta generadas para distribuir
    pedidos.

### Configuración y catálogos

Clases usadas para parametrizar el ERP con catálogos y constantes:

-   **cPais, cProvincia, cLocalidad, cZona** -- tablas maestras de
    geografía y
    zonas.
-   **cTipoCliente, cTipoImpuesto, cTipoMedioPago, cTipoAtributo** --
    tablas de clasificación de clientes, impuestos, medios de pago y
    atributos.
-   **cUnidadMedida, cTipoMovimientoMaterial,
    cTipoMovMaterialesPorGrupoRef** -- unidades de medida y tipos de
    movimientos de
    inventario.
-   **cParametros, cCondicionComercializacion, cListaPrecio** --
    parámetros globales y condiciones comerciales (listas de precios,
    plazos).

### Otras utilidades y apoyo

Además de las clases de negocio principales, existen numerosos módulos
de apoyo:

-   **cStringBuilder** -- utilería para concatenar cadenas de forma
    eficiente.
-   **clsCrypto** -- clase para funciones de criptografía y encriptación
    de
    datos.
-   **cmouse, cToolTip** -- controlan el manejo de mouse y la
    visualización de tooltips en la
    interfaz.
-   **cRegistro (Registry)** -- acceso al registro de Windows para
    guardar configuraciones
    locales.
-   **cCampo, cAtributo, cTipoAtributo** -- estructuras para campos y
    atributos dinámicos
    configurables.

## Conclusiones

El directorio de clases de **MG‑completo** contiene más de un centenar
de módulos que encapsulan la lógica de negocio de todas las áreas del
ERP: ventas, compras, finanzas, impuestos, logística y configuración. La
nomenclatura de los archivos (prefijo `c` para clase) facilita la
identificación de su propósito. Agrupar las clases por área funcional
permite comprender la amplitud del sistema y constituye un punto de
partida para tareas de migración o modernización.
