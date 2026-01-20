# MG Clientes Frontend

Interfaz SPA en Vue 3 para gestionar clientes y sus domicilios. Usa Vite y Pinia para el estado, con servicios API y componentes organizados.

## Características
- Framework: Vue 3
- Bundler: Vite
- Estado: Pinia
- Arquitectura: SPA con rutas y servicios API centralizados

## Requisitos
- Node.js (recomendado LTS: 16+ o 18+)
- npm / pnpm / yarn

## Instalación
Clona el repositorio e instala dependencias:

```bash
npm install
```

## Desarrollo
Arranca el servidor de desarrollo:

```bash
npm run dev
```

Construir para producción:

```bash
npm run build
```

## Estructura principal
- Entrada: ***src/main.js***
- App root: ***src/App.vue***
- Rutas: ***src/router.js***
- Vistas: ***src/views/ClientesView.vue***
- Componentes: ***src/components/DomicilioPanel.vue***, ***src/components/HelloWorld.vue***
- Servicios API: ***src/services/clientesApi.js***, ***src/services/domiciliosApi.js***, ***src/services/http.js***
- Stores: ***src/stores/clientesStore.js***, ***src/stores/domiciliosStore.js***
- Estilos globales: ***src/style.css***

## Integración opcional: PrimeVue
Para añadir PrimeVue (componentes UI):

```bash
npm install primevue primeicons primeflex
```

En `src/main.js` importa e instala PrimeVue y los estilos, por ejemplo:

```js
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

app.use(PrimeVue)
app.component('Button', Button)
```

Y luego en cualquier componente:

```html
<template>
  <Button label="Guardar" icon="pi pi-check" />
</template>
```

## Flujo y convenciones
- Las llamadas HTTP están centralizadas en [src/services/http.js](src/services/http.js).
- Las APIs específicas consumen ese helper y están en `src/services/`.
- El estado de la aplicación está en `src/stores/`.

## Pruebas / Lint
No hay scripts de test o linter configurados por defecto.

## Despliegue
Genera la carpeta `dist/` con `npm run build` y sirve estático (Netlify, Vercel, NGINX, etc.).
