<template>
  <div class="vx-container">
    <slot />
  </div>
</template>

<style>
  .vx-container {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    max-width: 80rem/* 1280px */;
    padding-left: 1rem/* 16px */;
    padding-right: 1rem/* 16px */;
  }

  @media (min-width: 640px) {
    .vx-container {
      padding-left: 1.5rem/* 24px */;
      padding-right: 1.5rem/* 24px */;
    }
  }

  @media (min-width: 1024px) {
    .vx-container {
      padding-left: 2rem/* 32px */;
      padding-right: 2rem/* 32px */;
    }
  }
</style>
