// Types
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Container: typeof import('../src/components/Container.vue')['default']
    Head: typeof import('../src/components/Head.vue')['default']
    Icon: typeof import('../src/components/Icon.vue')['default']
    Image: typeof import('../src/components/Image.vue')['default']
    Link: typeof import('../src/components/Link.vue')['default']
    VulmixWelcome: typeof import('../src/components/VulmixWelcome.vue')['default']
  }
}

export const Container: typeof import('../src/components/Container.vue')['default']
export const Head: typeof import('../src/components/Head.vue')['default']
export const Icon: typeof import('../src/components/Icon.vue')['default']
export const Image: typeof import('../src/components/Image.vue')['default']
export const Link: typeof import('../src/components/Link.vue')['default']
export const VulmixWelcome: typeof import('../src/components/VulmixWelcome.vue')['default']
