<template>
  <component :is="`layout-${name}`">
    <slot />
  </component>
</template>

<script setup>
  defineProps({
    name: {
      type: String,
      default: 'default',
    },
  })
</script>
