<script setup lang="ts">
  import { computed } from 'vue'
  import { Icon } from '@iconify/vue'

  interface Props {
    name?: string
    icon?: string
    font?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    font: true,
  })

  const maskSrc = computed<string>(() => `/assets/icons/${props.name}.svg`)
</script>

<template>
  <i
    v-if="!props.icon"
    class="icon"
    :style="
      props.font === true
        ? {
            '-webkit-mask-image': `url(${maskSrc})`,
            'mask-image': `url(${maskSrc})`,
            'background-color': 'currentColor',
          }
        : { 'background-image': `url(${maskSrc})` }
    "
  />

  <component
    v-else
    :is="props.icon && Icon"
    :icon="props.icon"
    class="icon"
  ></component>
</template>

<style scoped>
  .icon {
    display: inline-block;
    vertical-align: middle;
    width: 1em;
    height: 1em;
  }

  i.icon {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center;
  }
</style>
