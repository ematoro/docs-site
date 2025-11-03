# Análisis de Mobiliza Gestión

## Arquitectura General y Lenguaje

El proyecto está implementado principalmente en **Visual Basic 6.0** (99,8 %) con algunos módulos en **VBA** (0,2 %). Todas las funcionalidades están organizadas en clases y formularios; utiliza `ADODB` para la conexión a la base de datos.

## Módulos Principales

### 1. Gestión de artículos e inventario
- Clases como `cArticulo`, `cArticuloCodigoAdicional`, `cArticuloDepositoConfiguracionStock`, `cArticuloProveedorOferta`, `cUnidadMedida`, etc. contienen información sobre códigos de producto, nombres, unidades de medida, peso y si administra stock.
- Formas de control de stock y configuración de depósitos (`cDeposito`, `cTipoMovimientoMaterial`, `cLote`).

### 2. Clientes y ventas
- La clase `cCliente` almacena identificadores, razón social, CUIT/IVA, direcciones fiscal y comercial, teléfono, email, límites de crédito, localización (latitud/longitud) y datos fiscales adicionales.
- Módulos complementarios para visitas y rutas (`cClienteVisitas`, `cHojaRutaPreventas`, `cHorarioVisita`), ventas (`cPedido`, `cPedidoLinea`), vendedores (`cVendedor`) y listas de precios (`cListaPrecio`).

### 3. Compras y proveedores
- Clases para gestionar proveedores (`cProveedor`, `cProveedorImpuesto`), ofertas (`cArticuloProveedorOferta`) y pedidos (`cPedido`, `cPedidoLinea`).
- Control de facturas electrónicas (`cFacturaElectronica`), retenciones (`cRetencion`) e impuestos asociados.

### 4. Finanzas y contabilidad
- Módulos contables como `cAsiento`, `cAsientoDetalle`, `cSubDiario`, `cCentroCosto`.
- Módulos de tesorería: bancos y conciliación bancaria (`cBanco`, `cConciliacionBancaria`), cheques y chequeras.
- Administración de impuestos: `cImpuestoEscala`, `cImpuestoPercepciones`, `cImpuestoRefContable`, `cTipoImpuesto`.

### 5. Logística y cadena de suministro
- Gestión de depósitos (`cDeposito`), movimientos de materiales (`cTipoMovimientoMaterial`, `cTipoMovMaterialesPorGrupoRef`), lotes (`cLote`).
- Elementos de transporte y flete (`cFlete`, `cFleteAsegurado`).

### 6. Configuración y catálogos
- Clases de parametrización: `cTipoCliente`, `cTipoImpuesto`, `cTipoMedioPago`, `cTipoMovimientoMaterial`, `cPais`, `cProvincia`, `cZona`, `cSucursal`, etc..
- Organización de la contabilidad: `cSerie` (series de numeración), `cReferenciaContable` y grupos de referencia contable.

### 7. Funcionalidades adicionales
- Gestión de rutas y promociones (`cHojaRutaPreventas`, `cPromocion`).
- Clases de apoyo como `cStringBuilder` y `clsCrypto` para operaciones de cadena y criptografía.

## Diseño de Clases (ejemplos)

- **`cCliente`**: contiene numerosas propiedades públicas (e.g. `mNroCliente`, `mRazonSocial`, `mCuit`, `mLimiteCredito`, `mLatitud`, `mLongitud`) y campos ADODB para conexión a la base de datos.
- **`cArticulo`**: define campos como `mIdArticulo`, `mCodigo`, `mNombreProducto`, `mDescripcion`, `mPeso`, `mCantidadElementos` y `mAdministraStock`.
- **Formularios y módulos**: muchos formularios (`FrmIngresoCC.frm`, `FrmUMAlternativaArticulo.frm`) implementan la interfaz de usuario; módulos `.bas` contienen rutinas de utilidad.

## Conclusiones

- **Cobertura amplia**: el ERP abarca inventario, compras, ventas, finanzas, impuestos, logística, CRM y facturación electrónica.
- **Modularidad**: el uso de clases independientes permite modularidad y facilita la ampliación o mantenimiento.
- **Enfoque local**: términos como *CUIT*, *IVA* e *Ingresos Brutos* indican que el sistema está adaptado a la normativa argentina.
- **Tecnología madura**: el uso de Visual Basic 6.0 sugiere que se trata de un software sólido pero con margen de modernización hacia tecnologías actuales.
