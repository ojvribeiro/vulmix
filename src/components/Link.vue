<script setup lang="ts">
  defineProps<{
    to: string
  }>()
</script>

<template>
  <RouterLink :to="to">
    <slot />
  </RouterLink>
</template>
