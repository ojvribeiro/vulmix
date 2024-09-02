const { unheadComposablesImports } = require('unhead')
const { absoluteVulmixPaths, relativeVulmixPaths } = require('./paths.js')

module.exports.UnpluginAutoImports = () => {
  const ABSOLUTE_ROOT_PATH = absoluteVulmixPaths().absoluteRootPath
  const RELATIVE_ROOT_PATH = relativeVulmixPaths().relativeRootPath
  const ABSOLUTE_PACKAGE_PATH = absoluteVulmixPaths().absolutePackagePath
  const RELATIVE_PACKAGE_PATH = relativeVulmixPaths().relativePackagePath

  const VULMIX_CONFIG_PATH = `${ABSOLUTE_ROOT_PATH}/.vulmix/vulmix.config.js`
  const VulmixConfig = require(VULMIX_CONFIG_PATH).default

  return [
    require('unplugin-vue-components/webpack').default({
      // Vue version of project. It will detect automatically if not specified.
      // Acceptable value: 2 | 2.7 | 3
      version: 3,

      // relative paths to the directory to search for components.
      dirs: [
        `${RELATIVE_ROOT_PATH}/components`,
        `${RELATIVE_ROOT_PATH}/.vulmix/runtime/components`,
        `${RELATIVE_PACKAGE_PATH}/src/vue/components`,
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
      dts: `${ABSOLUTE_ROOT_PATH}/.vulmix/types/components.d.ts`,
    }),

    require('unplugin-auto-import/webpack').default({
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
        ...(VulmixConfig.imports?.presets || []),
        'vue',
        'vue-router',
        unheadComposablesImports[0],
      ],
      // Enable auto import by filename for default module exports under directories
      defaultExportByFilename: true,

      // Auto import for module exports under directories
      // by default it only scan one level of modules under the directory
      dirs: [
        // './hooks',
        // './composables' // only root modules
        // './composables/**', // all nested modules
        ...(VulmixConfig.imports?.dirs || []),
        `${ABSOLUTE_PACKAGE_PATH}/src/vue/composables/**`, // all nested modules
        `${ABSOLUTE_PACKAGE_PATH}/src/vue/utils/**`, // all nested modules
        `${ABSOLUTE_ROOT_PATH}/composables/**`, // all nested modules
        `${ABSOLUTE_PACKAGE_PATH}/src/vue/composables/**`, // all nested modules
      ],

      // Filepath to generate corresponding .d.ts file.
      // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
      // Set `false` to disable.
      dts: `${ABSOLUTE_ROOT_PATH}/.vulmix/types/auto-imports.d.ts`,

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
