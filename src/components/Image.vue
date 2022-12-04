<template>
  <img
    :src="imgSrc"
    :alt="props.alt ? props.alt : ''"
    :title="props.title ? props.title : ''"
    :loading="targetIsVisible ? 'eager' : 'lazy'"
    ref="imageEl"
  />
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useElementVisibility } from '@vueuse/core'

  const props = defineProps({
    src: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: 'Image',
    },
    title: {
      type: String,
      default: '',
    },
    webp: {
      type: String,
      default: 'true',
    },
  })

  const imageEl = ref(null)
  const imgSrc = ref(props.src)

  const targetIsVisible = useElementVisibility(imageEl)

  const _image = new Image()
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

<style scoped>
  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
</style>
