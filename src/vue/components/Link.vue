<script setup lang="ts">
  import { RouterLink } from 'vue-router'

  const props = defineProps<{
    to?: string
    href?: string
  }>()
</script>

<template>
  <RouterLink v-if="props.to && !props.href" :to="props.to">
    <slot />
  </RouterLink>

  <RouterLink v-else-if="props.href && !props.to" :to="props.href">
    <slot />
  </RouterLink>

  <RouterLink v-else-if="props.href && props.to" :to="props.to">
    <slot />
  </RouterLink>

  <a v-else>
    <slot />
  </a>
</template>
