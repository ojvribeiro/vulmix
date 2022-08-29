<template>
  <div>
    <h1>Home</h1>

    <MyComponent />
  </div>
</template>

<script setup>
  import MyComponent from '@components/MyComponent'
</script>
<style scoped lang="scss">
  @import '@sass/utils';

  h1 {
    color: red;

    @include media(xl) {
      color: blue;
    }

    @include media('2xl') {
      @apply text-[#c850cc];
    }
  }
</style>
