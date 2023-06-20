<script setup>
  import { RouterView } from 'vue-router'
</script>

<template>
      <Component :is="Component" :key="route.fullPath" />
  <Suspense>
    <RouterView v-slot="{ Component, route }">
      <Transition :name="route.meta.transition" mode="out-in">
      </Transition>
    </RouterView>
  </Suspense>
</template>
