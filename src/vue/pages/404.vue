<template>
  <div>
    <Head>
      <title>Page not found</title>
    </Head>

    <div class="vx-page-outter">
      <div class="vx-page-inner">
        <h1>404</h1>

        <p>
          <a href="/">Return to Home</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .vx-page-outter {
    display: grid;
    place-items: center;
    height: 100vh;
    text-align: center;
    background-color: #27272a;
    font-family: Arial, Helvetica, sans-serif;
  }

  .vx-page-outter .vx-page-inner {
    margin-top: calc(1rem * calc(1 - 0));
    margin-bottom: calc(1rem * 0);
  }

  .vx-page-outter .vx-page-inner h1 {
    font-size: 6rem /* 96px */;
    line-height: 1;
    color: #bfdbfe;
    font-weight: 700;
  }

  .vx-page-outter .vx-page-inner p,
  .vx-page-outter .vx-page-inner a {
    color: #60a5fa;
  }
</style>
