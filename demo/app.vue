<template>
  <div>
    <h1>Hello</h1>

    <button @click="show = !show">Toggle</button>

    <div v-if="show">
      <h2>World</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const show = ref(true)
</script>
