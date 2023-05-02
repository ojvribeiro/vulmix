const { absoluteVulmixPaths } = require('./paths.js')

module.exports.UnpluginAutoImports = function (isDevMode = false) {
  return [
    require('unplugin-vue-components/webpack')({
      /* options */

      // Vue version of project. It will detect automatically if not specified.
      // Acceptable value: 2 | 2.7 | 3
      version: 3,

      // relative paths to the directory to search for components.
      dirs: [
        `${absoluteVulmixPaths(isDevMode).absoluteRootPath}/components`,
        `${
          absoluteVulmixPaths(isDevMode).absolutePackagePath
        }/src/vue/components/**`,
      ],

      // valid file extensions for components.
      extensions: ['vue', 'ts', 'js'],

      // Allow subdirectories as namespace prefix for components.
      directoryAsNamespace: true,

      // Collapse same prefixes (camel-sensitive) of folders and components
      // to prevent duplication inside namespaced component name.
      // works when `directoryAsNamespace: true`
      collapseSamePrefixes: true,

      // generate `components.d.ts` global declarations,
      // also accepts a path for custom filename
      // default: `true` if package typescript is installed
      dts:
        isDevMode === true
          ? `${
              absoluteVulmixPaths(isDevMode).absolutePackagePath
            }/types/components.d.ts`
          : `${
              absoluteVulmixPaths(isDevMode).absoluteRootPath
            }/.vulmix/types/components.d.ts`,
    }),

    require('unplugin-auto-import/webpack')({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],

      // global imports to register
      imports: [
        // presets
        'vue',
        'vue-router',
        // custom
        {
          '@vueuse/core': [
            // named imports
            'useFetch', // import { useMouse } from '@vueuse/core',
          ],
        },
      ],
      // Enable auto import by filename for default module exports under directories
      defaultExportByFilename: false,

      // Auto import for module exports under directories
      // by default it only scan one level of modules under the directory
      dirs: [
        // './hooks',
        // './composables' // only root modules
        // './composables/**', // all nested modules
        `${absoluteVulmixPaths(isDevMode).absoluteRootPath}/composables/**`, // all nested modules
      ],

      // Filepath to generate corresponding .d.ts file.
      // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
      // Set `false` to disable.
      dts:
        isDevMode === true
          ? `${
              absoluteVulmixPaths(isDevMode).absolutePackagePath
            }/types/auto-imports.d.ts`
          : `${
              absoluteVulmixPaths(isDevMode).absoluteRootPath
            }/.vulmix/types/auto-imports.d.ts`,

      // Auto import inside Vue template
      // see https://github.com/unjs/unimport/pull/15 and https://github.com/unjs/unimport/pull/72
      vueTemplate: true,

      // Custom resolvers, compatible with `unplugin-vue-components`
      // see https://github.com/antfu/unplugin-auto-import/pull/23/
      resolvers: [
        /* ... */
      ],
    }),
  ]
}
