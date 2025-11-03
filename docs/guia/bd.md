# Estructura de la base de datos (MySQL) del ERP

## Descripción general

El archivo `democc.sql` contiene la definición de más de 400 tablas que
dan soporte a todas las áreas del ERP. Las tablas están declaradas con
el motor **InnoDB** y charset `latin1`. A continuación se destacan los
módulos principales y las tablas que los componen.

### Gestión de artículos e inventario

-   **articulos**: almacena la ficha de cada producto. Incluye
    identificador, número de artículo, código, presentación,
    descripción, peso, unidad de medida, cantidad de elementos, costos y
    precios históricos, e identificadores de marca, envase, capacidad,
    moneda, comisiones, categorías y
    grupos. Dispone
    de campos para indicar si gestiona stock, si es categoría de
    venta/compra/inventario y parámetros de conversión de
    unidades.
-   **articulodeposito_configuracionstock**, **stock**: mantienen el
    stock de cada artículo por depósito y fecha. La tabla `stock` guarda
    débitos, créditos y saldo acumulado para cada artículo, sucursal y
    depósito.
-   **depositos**, **unidadmedida**, **tipomovimientomateriales**:
    describen los depósitos físicos, unidades de medida y tipos de
    movimientos de materiales (ingresos, egresos, transferencias).

### Clientes, ventas y CRM

-   **clientes**: contiene datos de los clientes, como id, número, razón
    social, nombre y apellido, domicilio, teléfonos (hasta cuatro
    contactos), correo electrónico, condición de IVA y CUIT, límites de
    crédito y coordenadas
    latitud/longitud.
    También registra la zona de reparto, lista de precios asignada,
    vendedor y cobrador por defecto, flete asegurado, fecha de bloqueo y
    observaciones.
-   **pedidos** y **pedidoarticulos**: las órdenes de venta se guardan
    en `pedidos`, que registra fechas de ingreso y entrega, forma de
    pago, observaciones, cliente, vendedor, flete, zona, totales y
    estado. Cada línea de pedido se almacena en `pedidoarticulos` con el
    artículo, cantidad, precio unitario, promociones aplicadas y
    descuentos.
-   **facturas** y **facturaarticulos**: la tabla `facturas` registra
    cabeceras de facturación: id, número, tipo y estado, fecha, forma de
    pago, pedido asociado, cliente, vendedor, importe neto, IVA,
    impuestos internos, percepciones y otros
    totales. Incluye
    banderas para emisión y numeración electrónica. Las líneas de
    factura se almacenan en `facturaarticulos`.
-   **vendedores**, **vendedorzonas**, **hojaruta** y
    **hojarutacliente**: gestionan los vendedores y sus zonas, las hojas
    de ruta y las visitas a clientes.
-   **promociones**, **promocionarticulos**, **promocionclientes**,
    **listaprecioart**, **listasprecio**: permiten asignar promociones a
    artículos y clientes, gestionar listas de precios y ofertas
    especiales.

### Compras y proveedores

-   **proveedores**: almacena proveedores con razón social, nombre de
    fantasía, domicilios, teléfonos, emails, condición de IVA y CUIT,
    límites de crédito y datos de CAI (controlador
    fiscal).
-   **articuloproveedores** y **articuloproveedores_ofertas**: vinculan
    artículos con proveedores y guardan ofertas de compra.
-   **condicioncomercializacion**, **pedidos de compra**,
    **retenciones**: gestionan condiciones comerciales y retenciones
    impositivas aplicables en compras.

### Contabilidad y finanzas

-   **asientos**, **asientodetalle**, **asientosaldos**: representan los
    asientos contables (diarios) con fecha, descripción, número de
    asiento y su detalle de cuentas, importes en el debe y
    haber.
-   **centrocosto**, **cuentascontables**, **subdiarios**,
    **saldosclientes**, **saldosproveedores**: permiten asignar
    transacciones a centros de costo y cuentas contables y mantienen los
    saldos de clientes y proveedores.
-   **bancos**, **conciliacionbancaria**, **conciliacionbancariamov**:
    gestionan bancos, chequeras, cuentas bancarias y las conciliaciones.
-   **tipocomprobante**, **tipoimpuesto**, **tipomediopago**:
    parametrizan tipos de comprobantes (facturas, recibos, notas de
    crédito), tipos de impuestos y medios de pago.

### Logística y distribución

-   **depositos**, **sucursales**, **zonas**, **fleteros**,
    **fleterozonas**: organizan la red de depósitos, sucursales y zonas
    de entrega, así como los fleteros y sus zonas asignadas.
-   **hojaruta**, **hojarutacliente**, **hojarutavendedor**: definen las
    hojas de ruta y los clientes o vendedores asociados a cada
    recorrido.
-   **viajes** y **viajedetalle**: controlan los viajes de distribución
    y los artículos transportados.
-   **turnoreparto**: define turnos de reparto para logística.

### Configuración, seguridad y otros módulos

-   **usuarios**, **usuarioroles**, **roles**: gestionan los usuarios
    del sistema, sus roles y permisos.
-   **modulos**, **modulosfunciones** y **rolesfunciones**: definen los
    módulos del ERP y las funciones que se asignan a cada rol.
-   **parametros** y **parametrosconf**: almacenan parámetros generales
    y de configuración de la aplicación.
-   **tipomovimientomateriales**, **tipocomprobante**, **tipoimpuesto**,
    **unidadmedida**: catálogos para parametrización de tipos de
    movimientos, comprobantes, impuestos y unidades de medida.

### Observaciones generales

1.  **Granularidad de datos**: la base de datos maneja un elevado nivel
    de detalle. Por ejemplo, la tabla `articulos` incluye campos para
    precios históricos, presentación, dimensiones, categorías de venta,
    compra e inventario, y parámetros de conversión de
    unidades.
2.  **Gestión financiera completa**: la presencia de tablas de
    contabilidad (`asientos`, `asientodetalle`, `centrocosto`) y
    bancarias indica que el ERP permite llevar contabilidad general,
    cuentas corrientes y conciliaciones.
3.  **Flexibilidad y parametrización**: numerosas tablas de tipos
    (`tipocomprobante`, `tipoimpuesto`, `tipomediopago`,
    `tipomovimientomateriales`, `tiposcliente`) permiten adaptar el
    sistema a distintos procesos y normas tributarias.
4.  **Adaptación a la normativa argentina**: columnas como `cuit`,
    `iva`, `ingresosBrutos`, `nroCai` e `inscripcionIB` en las tablas de
    clientes y
    proveedores
    evidencian que la base de datos está diseñada para el contexto
    fiscal de Argentina.
5.  **Relaciones**: la mayoría de las tablas utilizan identificadores
    numéricos (enteros) como claves primarias y referencias a otras
    tablas mediante campos `id` (por ejemplo, `idCliente` en `pedidos` y
    `facturas`), facilitando el establecimiento de claves foráneas y la
    integridad referencial.

## Conclusión

El archivo `democc.sql` revela una base de datos relacional amplia y
bien estructurada que respalda las funciones del ERP **MG**.
Las tablas cubren gestión de artículos, clientes y ventas, compras y
proveedores, contabilidad, logística, promociones y configuración. Esta
estructura confirma que el ERP está preparado para operar en entornos
empresariales de tamaño medio, con soporte integral para procesos
administrativos y comerciales en Argentina.