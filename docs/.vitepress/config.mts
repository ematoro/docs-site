import { defineConfig } from 'vitepress'
//import Mermaid from '@vitepress/plugin-mermaid'

export default defineConfig({
  lang: 'es-AR',
  title: 'Mi Documentación',
  description: 'Docs del proyecto',
  //markdown: { config: (md) => md.use(Mermaid) },
  themeConfig: {
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Guía', link: '/guia/' }
    ],
    sidebar: {
      '/': [
        { text: 'Introducción', link: '/' },
        { text: 'Guía', items: [
          { text: 'Sistema Legado', link: '/guia/legado' },
		      { text: 'Módulos', link: '/guia/modulos' },
		      { text: 'Base Datos', link: '/guia/bd' },
		      { text: 'Lógica Negocio', link: '/guia/negocio' },
		      { text: 'Módulo Clientes', link: '/guia/clientes' },
          { text: 'Propuesta de Migración', link: '/guia/migracion' },
          { text: 'POC Cliente Frontend', link: '/guia/frontend'},
          { text: 'POC Servidor Backend', link: '/guia/backend'},
          { text: 'POC Catálogos', link: '/guia/catalogos'},
          { text: 'Módulo Ventas', link: '/guia/ventas' },
        ] }
      ]
    },
    search: { provider: 'local' } // buscador local listo
  }
})
