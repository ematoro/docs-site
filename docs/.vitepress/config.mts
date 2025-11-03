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
          { text: 'Instalación', link: '/guia/instalacion' },
          { text: 'Uso', link: '/guia/uso' },
		  { text: 'Módulos', link: '/guia/modulos' },
		  { text: 'Base Datos', link: '/guia/bd' },
		  { text: 'Lógica Negocio', link: '/guia/negocio' },
		  { text: 'Clientes', link: '/guia/clientes' }
        ] }
      ]
    },
    search: { provider: 'local' } // buscador local listo
  }
})
