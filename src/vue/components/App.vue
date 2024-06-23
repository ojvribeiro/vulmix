<script setup lang="ts">
  import { RouterView } from 'vue-router'
</script>

<template>
  <Suspense>
    <RouterView v-slot="{ Component, route }">
      <Suspense>
        <Transition :name="(route?.meta?.transition as string)" mode="out-in">
          <Component :is="Component" :key="route.fullPath" />
        </Transition>
      </Suspense>
    </RouterView>
  </Suspense>
</template>
