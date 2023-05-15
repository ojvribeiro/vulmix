<script setup>
  import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition :name="route.meta.transition" mode="out-in">
      <Component :is="Component" :key="route.fullPath" />
    </Transition>
  </RouterView>
</template>
