<script setup lang="ts">
  const props = defineProps<{
    name: string | 'default'
  }>()
</script>

<template>
  <Component :is="`layout-${props.name}`">
    <slot />
  </Component>
</template>
