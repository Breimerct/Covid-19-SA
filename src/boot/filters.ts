import { boot } from 'quasar/wrappers'

// Los filtros de Vue 2 han sido deprecados en Vue 3
// Las funciones de formato ahora están disponibles como funciones exportables
// en src/helpers/formatters.ts
//
// Ejemplo de migración:
// Antes: {{ text | capitalizeFirstLetter }}
// Ahora: {{ capitalizeFirstLetter(text) }}

export default boot(() => {
  // Este archivo ya no registra filtros globales
  // Las funciones de formato están disponibles en src/helpers/formatters.ts
})
