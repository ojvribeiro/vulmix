<template>
  <img
    :src="imgSrc"
    :alt="props.alt"
    :title="props.title"
    :loading="targetIsVisible ? 'eager' : 'lazy'"
    ref="imageEl"
  />
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useElementSize, useElementVisibility } from '@vueuse/core'

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
    webp: {
      type: String,
      default: 'true',
    },
  })

  const imageEl = ref(null)
  const imgSrc = ref(props.src)

  const { width, height } = useElementSize(imageEl)
  const targetIsVisible = useElementVisibility(imageEl)

  function replace(size) {
    const _image = new Image()
    _image.src = props.src.replace(
      /\/assets\/img\/(|.*)([a-zA-Z0-9_-])\.(png|jpg|jpeg|gif)$/i,
      `/assets/img/$1$2@50.${
        props.webp === 'true' ? 'webp' : '$3'
      }`
    )

    imgSrc.value = _image.src

    _image.onload = function () {
      imgSrc.value = props.src.replace(
        /\/assets\/img\/(|.*)([a-zA-Z0-9_-])\.(png|jpg|jpeg|gif)$/i,
        `/assets/img/$1$2@${size}.${
          props.webp === 'true' ? 'webp' : '$3'
        }`
      )
    }

  }

  onMounted(() => {
    if (imageEl.value.width < 300) {
      replace('300')
    } else if (imageEl.value.width >= 300 && imageEl.value.width < 600) {
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

<style scoped lang="scss">
  img {
    background-color: rgba(#000, 10%);
  }
</style>
