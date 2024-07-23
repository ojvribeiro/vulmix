<template>
  <span
    v-if="!props.icon"
    v-bind="$attrs"
    :class="['icon', props.class]"
    :style="
      props.multitone === false || props.format === 'svg'
        ? {
            '-webkit-mask-image': `url(${iconUrl})`,
            'mask-image': `url(${iconUrl})`,
            'mask-size': 'contain',
            'mask-repeat': 'no-repeat',
            'background-color': props.format === 'svg' ? 'currentColor' : null,
          }
        : {
            'background-image': `url(${iconUrl})`,
            'background-color': props.format === 'svg' ? 'currentColor' : null,
            'background-size': 'contain',
            'background-repeat': 'no-repeat',
          }
    "
  />

  <template v-else>
    <IconifyIcon :icon="props.icon" v-bind="$attrs" :class="[props.class]" />
  </template>
</template>

<script setup lang="ts">
  import { Icon as IconifyIcon } from '@iconify/vue'

  defineOptions({
    inheritAttrs: false,
  })

  interface Props {
    name?: string
    icon?: string
    format?: 'svg' | 'png'
    class?: string | string[] | Record<string, boolean>
    multitone?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    format: 'svg',
    multitone: false,
  })

  const iconUrl = ref<string | Record<string, any>>('')

  function getIcon() {
    try {
      let iconsImport: any,
        iconTransformedPath: any,
        currentFormat: string = 'svg'

      if (props.format === 'svg') {
        iconsImport = require.context('@assets/icons/', true, /\.svg$/)

        currentFormat = 'svg'
      }

      if (props.format === 'png') {
        iconsImport = require.context('@assets/icons/', true, /\.png$/)

        currentFormat = 'png'
      }

      if (props.icon) {
        return
      }

      const key = iconsImport
        .keys()
        .find((key: string) => key.includes(props.name + '.' + currentFormat))

      iconTransformedPath = iconsImport(key).default

      iconUrl.value = iconTransformedPath
    } catch (e) {
      if (props.name) {
        console.error(`Icon '${props.name}' doesn't exist in 'assets/icons'`, e)
      }
    }
  }

  getIcon()

  watchEffect(getIcon)
</script>

<style scoped>
  span.icon {
    height: 1em;
    width: 1em;
    display: inline-block;
    vertical-align: middle;
  }

  span.icon > svg,
  .iconify:is(svg) {
    height: 1em;
    width: 1em;
    display: inline-block;
    vertical-align: middle;
    fill: currentColor;
  }
</style>
