<template>
  <i
    :style="
      props.font === 'true'
        ? {
            'mask-image': `url(${maskSrc})`,
            'background-color': 'currentColor',
          }
        : { 'background-image': `url(${maskSrc})` }
    "
  />
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

  const props = defineProps({
    name: {
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
