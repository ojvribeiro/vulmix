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
    color: #d43d3d;

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
      color: #7150cc;
    }
  }
</style>
