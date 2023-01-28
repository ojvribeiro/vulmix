<script setup lang="ts">
  import { ref, onMounted, Ref } from 'vue'
  import { useElementVisibility } from '@vueuse/core'

  const props = defineProps<{
    src: string
    alt?: string | 'Image'
    title?: string | ''
    webp?: string | 'true'
  }>()

  const imageEl = ref<HTMLImageElement>(null)
  const imgSrc = ref<string>(props.src)

  const targetIsVisible: Ref<boolean> = useElementVisibility(imageEl)

  const _image: HTMLImageElement = new Image()
  _image.src = props.src.replace(
    /\/assets\/img\/(|.*)([a-zA-Z0-9_-])\.(png|jpg|jpeg|gif)$/i,
    `/assets/img/$1$2.${props.webp === 'true' ? 'webp' : '$3'}`
  )

  imgSrc.value = _image.src

  onMounted(() => {
    _image.onload = function () {
      imgSrc.value = props.src.replace(
        /\/assets\/img\/(|.*)([a-zA-Z0-9_-])\.(png|jpg|jpeg|gif)$/i,
        `/assets/img/$1$2.${props.webp === 'true' ? 'webp' : '$3'}`
      )
    }
  })
</script>

<template>
  <img
    :src="imgSrc"
    :alt="props.alt ? props.alt : ''"
    :title="props.title ? props.title : ''"
    :loading="targetIsVisible ? 'eager' : 'lazy'"
    ref="imageEl"
  />
</template>

<style scoped>
  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
</style>
