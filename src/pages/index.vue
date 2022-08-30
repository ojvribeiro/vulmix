<template>
  <div>
    <h1>Home</h1>

    <MyComponent />

    <p>And some <Link to="/test-page">Test Page</Link></p>
  </div>
</template>

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
