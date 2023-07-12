<script setup>
  import { RouterView } from 'vue-router'
</script>

<template>
  <Suspense>
    <RouterView v-slot="{ Component, route }">
      <Transition :name="route.meta.transition" mode="out-in">
        <KeepAlive>
          <Component :is="Component" :key="route.fullPath" />
        </KeepAlive>
      </Transition>
    </RouterView>
  </Suspense>
</template>
