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
    `/assets/img/$1$2@4.${props.webp === 'true' ? 'webp' : '$3'}`
  )

  imgSrc.value = _image.src

  onMounted(() => {
    _image.onload = function () {
      let size

      if (_image.width < 300) {
        size = _image.width
      } else if (_image.width >= 300 && _image.width < 600) {
        size = 600
      } else if (_image.width >= 601 && _image.width < 900) {
        size = 900
      } else if (_image.width >= 901 && _image.width < 1200) {
        size = 1200
      } else {
        size = 1920
      }

      console.log(props.webp)

      if (size !== undefined && size >= 300) {
        imgSrc.value = props.src.replace(
          /\/assets\/img\/(|.*)([a-zA-Z0-9_-])\.(png|jpg|jpeg|gif)$/i,
          `/assets/img/$1$2${props.webp !== 'false' ? '@' + size : ''}.${
            props.webp !== 'false' ? 'webp' : '$3'
          }`
        )
      } else {
        imgSrc.value = props.src.replace(
          /\/assets\/img\/(|.*)([a-zA-Z0-9_-])\.(png|jpg|jpeg|gif)$/i,
          `/assets/img/$1$2.${props.webp === 'true' ? 'webp' : '$3'}`
        )
      }
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
