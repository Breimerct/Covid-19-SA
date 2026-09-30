// commitlint.config.js
export default {
  // Hereda las reglas del estándar Conventional Commits
  extends: ['@commitlint/config-conventional'],

  // Reglas: [nivel, 'always' | 'never', valor]
  //   0 = desactivada  |  1 = advertencia  |  2 = error (bloquea el commit)
  rules: {
    // Tipos de commit permitidos
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'chore',
        'ci',
        'perf',
        'revert',
        'build',
      ],
    ],
    'type-case': [2, 'always', 'lower-case'], // el tipo debe ir en minúsculas
    'type-empty': [2, 'never'], // el tipo no puede estar vacío

    // Scope — por defecto es opcional, descomenta para restringirlo:
    // 'scope-enum':  [2, 'always', ['auth', 'api', 'ui', 'db']],  // lista fija
    // 'scope-empty': [2, 'never'],  // exigir scope siempre
    'scope-case': [2, 'always', 'lower-case'],

    // Descripción corta
    'subject-empty': [2, 'never'], // no puede estar vacía
    'subject-full-stop': [2, 'never', '.'], // no termina con punto
    'subject-max-length': [2, 'always', 90], // máximo 72 caracteres

    // Cuerpo y footer — advertencia si no tienen línea en blanco antes
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'],
  },
};
