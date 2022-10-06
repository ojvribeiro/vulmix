<template>
  <RouterLink :to="to">
    <slot />
  </RouterLink>
</template>

<script setup>
  defineProps({
    to: String,
  })
</script>
