<template>
  <i v-if="!props.icon"
    :style="
      props.font === 'true'
        ? {
            'mask-image': `url(${maskSrc})`,
            'background-color': 'currentColor',
          }
        : { 'background-image': `url(${maskSrc})` }
    "
  ></i>

  <component
    v-else
    :is="props.icon && Icon"
    :icon="props.icon"
  ></component>
</template>

<style scoped lang="scss">
  i {
    display: inline-block;
    vertical-align: middle;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center;
    width: 1em;
    height: 1em;
  }
</style>

<script setup>
  import { computed } from 'vue'
  import { Icon } from '@iconify/vue'

  const props = defineProps({
    name: {
      type: String,
    },
    icon: {
      type: String,
    },
    font: {
      type: String,
      default: 'true',
    },
  })

  const maskSrc = computed(() => {
    return `/assets/icons/${props.name}.svg`
  })
</script>
