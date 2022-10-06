<template>
  <div class="p-6 space-y-6 bg-zinc-800 text-white h-full">
    <h1 class="text-5xl">Home</h1>

    <MyComponent />

    <p>And some <Link to="/test-page">Test Page</Link></p>
    <p>And some <Link to="/non-existing-page">404 page</Link></p>
  </div>
</template>

<style scoped lang="scss">
  // Importing Sass utilities
  @import '@/assets/sass/utils';

  h1 {
    color: #d43d3d;

    // Using breakpoint based media-queries
    @include media(sm) {
      color: #3b3bcc;
    }

    @include media(md) {
      color: #ff0062;
    }

    @include media(lg) {
      color: #c78800;
    }

    @include media(xl) {
      color: #00a767;
    }

    @include media('2xl') {
      color: #c850cc;
    }

    @include media('3xl') {
      // Using the `color` function to get a color
      // from the ./assets/sass/_variables.scss color palette.
      color: color(sample-gold-400);
    }
  }

  a {
    @apply text-blue-400;
  }
</style>
