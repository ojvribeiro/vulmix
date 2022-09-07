<template>
  <img
    :src="image"
    :width="props.width && props.width.replace(/(\d+)(px|rem|em|%|)/i, '$1')"
    :height="props.height && props.height.replace(/(\d+)(px|rem|em|%|)/i, '$1')"
    :alt="props.alt"
    :title="props.title"
    :loading="props.loading"
  />
</template>

<script setup>
  import { ref } from 'vue'
  import { useWindowSize } from '@vueuse/core'

  const { width: windowWidth, height: windowHeight } = useWindowSize()

  const imageSize = ref({})

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
      default: 'Imagem',
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

  const image = ref('')

  function replace(size) {
    let currentIndex
    const sizes = ['300', '600', '900', '1200', '1920']

    sizes.forEach((item, i) => {
      if (item === size) {
        currentIndex = i
      }
    })

    const img = new Image()
    img.src = image.value

    img.onload = function () {
      image.value = props.src.replace(
        /\/assets\/img\/(|.*)([a-zA-Z0-9_-])\.(png|jpg|jpeg|gif)$/i,
        `/.vulmix/assets/img/$1$2@${size}.${
          props.webp === 'true' ? 'webp' : '$3'
        }`
      )
    }

    img.onerror = function () {
      image.value = props.src.replace(
        /\/assets\/img\/(|.*)([a-zA-Z0-9_-])\.(png|jpg|jpeg|gif)$/i,
        `/.vulmix/assets/img/$1$2@${sizes[currentIndex - 1]}.${
          props.webp === 'true' ? 'webp' : '$3'
        }`
      )

      replace(sizes[currentIndex - 1])
    }
  }

  function loadImage() {
    if (windowWidth.value < 320) {
      replace('300')
    } else if (windowWidth.value >= 320 && windowWidth.value < 578) {
      replace('600')
    } else if (windowWidth.value >= 578 && windowWidth.value < 768) {
      replace('900')
    } else if (windowWidth.value >= 992 && windowWidth.value < 1600) {
      replace('1200')
    } else {
      replace('1920')
    }
  }

  loadImage()
</script>
