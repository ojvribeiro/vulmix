const { unheadComposablesImports } = require('unhead')
const { absoluteVulmixPaths, relativeVulmixPaths } = require('./paths.js')

module.exports.UnpluginAutoImports = () => {
  const ABSOLUTE_ROOT_PATH = absoluteVulmixPaths().absoluteRootPath
  const ABSOLUTE_PACKAGE_PATH = absoluteVulmixPaths().absolutePackagePath
  const RELATIVE_ROOT_PATH = relativeVulmixPaths().relativeRootPath

  const VULMIX_CONFIG_PATH = `${ABSOLUTE_ROOT_PATH}/.vulmix/vulmix.config.js`
  const VulmixConfig = require(VULMIX_CONFIG_PATH).default

  return [
    require('unplugin-vue-components/webpack').default({
      version: 3,
      dirs: [
        `${RELATIVE_ROOT_PATH}/.vulmix/runtime/components`,
        `${RELATIVE_ROOT_PATH}/components`,
      ],
      extensions: ['vue', 'ts', 'js'],
      directoryAsNamespace: true,
      collapseSamePrefixes: true,
      dts: `${ABSOLUTE_ROOT_PATH}/.vulmix/types/components.d.ts`,
    }),

    require('unplugin-auto-import/webpack').default({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: [
        ...(VulmixConfig.imports?.presets || []),
        'vue',
        'vue-router',
        unheadComposablesImports[0],
      ],
      defaultExportByFilename: true,
      dirs: [
        ...(VulmixConfig.imports?.dirs || []),
        `${ABSOLUTE_PACKAGE_PATH}/src/vue/composables/**`,
        `${ABSOLUTE_PACKAGE_PATH}/src/vue/utils/**`,
        `${ABSOLUTE_ROOT_PATH}/composables/**`,
        `${ABSOLUTE_PACKAGE_PATH}/src/vue/composables/**`,
      ],
      dts: `${ABSOLUTE_ROOT_PATH}/.vulmix/types/auto-imports.d.ts`,
      vueTemplate: true,
    }),
  ]
}
