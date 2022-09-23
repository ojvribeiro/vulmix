<template>
  <img
    :src="imgSrc"
    :width="width"
    :height="height"
    :alt="props.alt"
    :title="props.title"
    :loading="props.loading"
    ref="imageEl"
  />
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useElementSize } from '@vueuse/core'

  const props = defineProps({
    src: {
      type: String,
      default: '',
    },
    width: {
      type: String,
    },
    height: {
      type: String,
    },
    alt: {
      type: String,
      default: 'Image',
    },
    title: {
      type: String,
      default: '',
    },
    loading: {
      type: String,
      default: 'eager', // or 'lazy'
    },
    webp: {
      type: String,
      default: 'true',
    },
  })

  const imageEl = ref(null)
  const imgSrc = ref(props.src)

  const { width, height } = useElementSize(imageEl)

  function replace(size) {
    imgSrc.value = props.src.replace(
      /\/assets\/img\/(|.*)([a-zA-Z0-9_-])\.(png|jpg|jpeg|gif)$/i,
      `/.vulmix/assets/img/$1$2@${size}.${
        props.webp === 'true' ? 'webp' : '$3'
      }`
    )
  }

  onMounted(() => {
    if (imageEl.value.width < 300) {
      replace('300')
    } else if (imageEl.value.width >= 301 && imageEl.value.width < 600) {
      replace('600')
    } else if (imageEl.value.width >= 601 && imageEl.value.width < 900) {
      replace('900')
    } else if (imageEl.value.width >= 901 && imageEl.value.width < 1200) {
      replace('1200')
    } else {
      replace('1920')
    }
  })
</script>
