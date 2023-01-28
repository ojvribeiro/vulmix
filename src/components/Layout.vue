<template>
  <component :is="`layout-${props.name}`">
    <slot />
  </component>
</template>

<script setup lang="ts">
  const props = defineProps<{
    name: string | 'default',
  }>()
</script>
