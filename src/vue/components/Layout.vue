<script setup lang="ts">
  interface Props {
    name?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    name: 'default',
  })
</script>

<template>
  <Component :is="`layout-${props.name}`">
    <slot />
  </Component>
</template>
