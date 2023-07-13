<script setup lang="ts">
  import { RouterView } from 'vue-router'
</script>

<template>
  <Suspense>
    <RouterView v-slot="{ Component, route }">
      <Transition :name="(route?.meta?.transition as string)" mode="out-in">
        <Component :is="Component" :key="route.fullPath" />
      </Transition>
    </RouterView>
  </Suspense>
</template>
