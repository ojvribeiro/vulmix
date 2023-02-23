<script setup lang="ts">
  import { ref, Ref } from 'vue'
  import { useElementVisibility } from '@vueuse/core'

  const props = defineProps<{
    src: string
    alt?: string | 'Image'
    title?: string | ''
  }>()

  const imageEl = ref<HTMLImageElement>(null)

  const targetIsVisible: Ref<boolean> = useElementVisibility(imageEl)
</script>

<template>
  <img
    :src="props.src"
    :alt="props.alt ? props.alt : ''"
    :title="props.title ? props.title : ''"
    :loading="targetIsVisible ? 'eager' : 'lazy'"
    ref="imageEl"
  />
</template>
